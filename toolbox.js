(()=>{return {
    "tags":{},
    "tasks":{
        "route":(req,report,circle_pass)=>{ 
            let params = circle_pass.domains[report.host][report.s1]
            if (params == undefined) {
                let msg = {"en":"Page not found","es":"Página no encontrada"}
                let reply = {
                    "code":400,
                    "content":""
                }
                reply.content = reply.content + circle_pass.templates.html_base()
                reply.content = reply.content + circle_pass.templates.html_languaje(report.lng)
                reply.content = reply.content + circle_pass.templates.html_meta_defaults()
                reply.content = reply.content + circle_pass.templates.html_title("404")
                reply.content = reply.content + circle_pass.templates.html_description(msg[report.lng])
                return reply
            }
            if (params.special == undefined){
                return circle_pass.tasks.default(req,report,circle_pass)
            }else{
                return circle_pass.tasks[params.special](req,report,circle_pass)
            }
        },
        "favicon":(req,report,circle_pass)=>{
            let params = circle_pass.domains[report.host][report.s1]
            let reply =  {
                "code":200,
                "content":circle_pass.fetch(params.route,false,true,circle_pass)
            }            
            return reply
        },
        "robots":(req,report,circle_pass)=>{
            let reply =  {
                "code":200,
                "content":`
                User-Agent: *
                allow: /
                Sitemap: https://${report.host}/sitemap.xml`
            }
            return reply
        },
        "sitemap":(req,report,circle_pass)=>{
            let domtree = circle_pass.domains[report.host]
            let reply =  {
                "code":200,
                "content":"<?xml version='1.0' encoding='UTF-8'?><urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>"
            }
            
            for (let things in domtree) {
                let elements = domtree[things]
                if (elements.sitemap === true) {
                    reply.content = reply.content + "<url>"
                    if (elements.loc != undefined) {
                        reply.content = reply.content + "<loc>" + elements.loc + "</loc>"
                    }
                    if (elements.lastmod != undefined) {
                        reply.content = reply.content + "<lastmod>" + elements.lastmod + "</lastmod>"
                    }
                    reply.content = reply.content + "</url>\n"
                }
            }
            reply.content = reply.content + "</urlset>"
            return reply
        },
        "index":(req,report,circle_pass)=>{
            let params = circle_pass.domains[report.host]["/"]
            let descrip = {
                "en":"Domain Index",
                "es":"Indice de Dominio"
            }
            let title = {
                "en":"Index",
                "es":"Indice"
            }
            let css = [
                "./parts/sdb.css",
                "./parts/plp.css"
            ]
            let js = [
                "./parts/alpha.js",
                "./parts/beta_nav.js",
                "./parts/plp_sidebar.js",
            ]
            let reply =  {}
            reply.content = 
            `
            ${circle_pass.templates.html_base()}
            ${circle_pass.templates.html_languaje(report.lng)}
            <head>
            ${circle_pass.templates.html_meta_defaults()}
            ${circle_pass.templates.html_description(descrip[report.lng])}
            ${circle_pass.templates.html_title(title[report.lng])}
            ${circle_pass.templates.base_head_google_tag_manager(circle_pass.tags[params.gtag])}
            </head>
            <body>
            ${circle_pass.templates.base_body_google_tag_manager(circle_pass.tags[params.gtag])}
            ${circle_pass.templates.index(circle_pass.domains[report.host],report.lng)}
            </body>
            <style>
            ${circle_pass.templates.add_arrays(css,circle_pass,report.repage)}
            </style>
            <script>
            ${circle_pass.templates.add_arrays(js,circle_pass,report.repage)}
            </script>
            </html>
            `
            reply.code = 200
            return reply
        },
        "default":(req,report,circle_pass)=>{
            let params = circle_pass.domains[report.host][report.s1]
            let reply =  {}
            reply.content = 
            `
            ${circle_pass.templates.html_base()}
            ${circle_pass.templates.html_languaje(report.lng)}
            <head>
            ${circle_pass.templates.html_meta_defaults()}
            ${circle_pass.templates.html_description(params.descrip[report.lng])}
            ${circle_pass.templates.html_title(params.title[report.lng])}
            </head>
            <body>
            </body>
            <style>
            ${circle_pass.templates.add_arrays(params.css,circle_pass,report.repage)}
            </style>
            <script>
            ${circle_pass.templates.add_arrays(params.js,circle_pass,report.repage)}
            </script>
            </html>
            `
            reply.code = 200
            return reply
        },

        "deflect":(req,report,circle_pass)=>{
            let params = circle_pass.domains[report.host][report.s1]
            let data = ""
            req.on('data', chunk => {
                data = data + chunk
            });
            req.on('end', () => {
                circle_pass.tasks.simple_post(data,params.endpoint)
            })
            let reply =  {}
            reply.content = 
            `message stored`
            reply.code = 200
            return reply
        },

        "simple_post":(postData,endpoint)=>{
            var options = {
            hostname: 'script.google.com',
            port: 443,
            path: endpoint,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': postData.length
                }
            };

            var req = https.request(options, (res) => {
                res.on('data', (d) => {
                    process.stdout.write(d);
                });
            });

            req.on('error', (e) => {
                console.error(e);
            });

            req.write(postData);
            req.end();
        },
    },
    "templates":{
        "html_base":()=>{
            return "<!DOCTYPE html>"
        },
        "html_languaje":(languaje_tag)=>{
            languaje_tag == "es" ? languaje_tag = "es-MX" :  languaje_tag = "en-US"
            return `<html lang='${languaje_tag}'>`
        },
        "html_meta_defaults":()=>{
            return `<base target='_top'>
                    <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'>`
        },
        "html_title":(title_text)=>{
            return `<title>${title_text}</title>`;
        },
        "html_description":(description_text)=>{
            return `<meta name='description' content='${description_text}'>`;
        },
        "add_arrays":(array_of_references,circle_pass,repage)=>{
            let added = ""
            for (let fileref of array_of_references){
                added = added + "\n"+circle_pass.fetch(fileref,repage,false,circle_pass)
            }
            return added
        },
        "index": (domaintoreport,lng)=>{
            let codified_html = "<div id='app_container'>"
            for (let paths in domaintoreport) {
                let obj = domaintoreport[paths]
                if (obj.index === true){
                    codified_html = codified_html + `
                    <div>
                    <a href="${obj.loc}">${obj.short[lng]}</a>
                    <p>${obj.descrip[lng]}</p>
                    <br>
                    </div>`
                }
            }
            codified_html = codified_html + "</div>"
            return codified_html
        }
    },
    "domains":{
        "synchronicity.cloud":{
            "favicon.ico":{
                "loc":"https://synchronicity.cloud/favicon.ico",
                "special":"favicon",
                "route":"./basic.ico"
            },
            "messages":{
                "loc":"https://synchronicity.cloud/messages",
                "special":"deflect",
                "endpoint":"https://script.google.com/macros/s/AKfycbyJogC4Deqc5uktxX46nt9ZjtQi4WwJgZl66hvH6CWrjzzEVn2icwRq1ZhtA6yco025QA/exec"
            },
            "error-report":{
                "loc":"https://synchronicity.cloud/error-report",
                "special":"deflect",
                "endpoint":"https://script.google.com/macros/s/AKfycbwDY1i9XRJbdkAuC5AwbZseTSs7buqats93WXIa6shwOhvXjgeNSCJMA-EfvjywpZQaEg/exec"
            },
            "midlogo.png":{
                "loc":"https://synchronicity.cloud/midlogo.png",
                "special":"favicon",
                "route":"../Comp.png"
            },
            "largelogo.png":{
                "loc":"https://synchronicity.cloud/largelogo.png",
                "special":"favicon",
                "route":"../Original.png"
            },
            "gwm.png":{
                "loc":"https://synchronicity.cloud/gwm.png",
                "special":"favicon",
                "route":"../GWM.PNG"
            },
            "appscreenshot.png":{
                "loc":"https://synchronicity.cloud/appscreenshot.png",
                "special":"favicon",
                "route":"../appscreenshot.PNG"
            },
            "settingscapture.png":{
                "loc":"https://synchronicity.cloud/settingscapture.png",
                "special":"favicon",
                "route":"../settingscapture.PNG"
            },
            "additional_consideration.png":{
                "loc":"https://synchronicity.cloud/additional_consideration.png",
                "special":"favicon",
                "route":"../additional_consideration.PNG"
            },
            "robots.txt":{
                "loc":"https://synchronicity.cloud/robots.txt",
                "special":"robots"
            },
            "sitemap.xml":{
                "loc":"https://synchronicity.cloud/sitemap.xml",
                "special":"sitemap"
            },
            "index.html":{
                "loc":"https://synchronicity.cloud/index.html",
                "special":"index"
            },
            "/":{
                "loc":"https://synchronicity.cloud/",
                "sitemap":true,
                "index":true,
                "title":{
                    "es":"Inicio",
                    "en":"Home"
                },
                "short":{
                    "es":"Pagina de Inicio",
                    "en":"Home page"
                },
                "descrip":{
                    "es":"Punto de partida para la navegacion del sitio",
                    "en":"Homepage with links to domain options"
                },
                "css":[
                    "./general.css"
                ],
                "js":[
                    "./general.js",
                    "./across_bars.js",
                    "./home.js"
                ]
            },
            "terms_of_service":{
                "loc":"https://synchronicity.cloud/terms_of_service",
                "sitemap":true,
                "index":true,
                "title":{
                    "es":"Synchronicity Terminos del Servicio",
                    "en":"Synchronicity Terms of Service"
                },
                "short":{
                    "es":"ToS",
                    "en":"ToS"
                },
                "descrip":{
                    "es":"Terminos del servicio proveido por Synchronicity",
                    "en":"Terms of service provided by Synchronicity"
                },
                "css":[
                    "./general.css"
                ],
                "js":[
                    "./general.js",
                    "./across_bars.js",
                    "./tos.js"
                ]
            },
            "privacy_policy":{
                "loc":"https://synchronicity.cloud/privacy_policy",
                "sitemap":true,
                "index":true,
                "title":{
                    "es":"Politica de Privacidad",
                    "en":"Privacy policy"
                },
                "short":{
                    "es":"PP",
                    "en":"PP"
                },
                "descrip":{
                    "es":"Politica de Privacidad de Synchronicity",
                    "en":"Synchronicity Privacy Policy"
                },
                "css":[
                    "./general.css"
                ],
                "js":[
                    "./general.js",
                    "./across_bars.js",
                    "./pp.js"
                ]
            }
        }
    }
}})()