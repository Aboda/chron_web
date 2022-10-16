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
            ${circle_pass.templates.base_head_google_tag_manager(circle_pass.tags[params.gtag])}
            </head>
            <body>
            ${circle_pass.templates.base_body_google_tag_manager(circle_pass.tags[params.gtag])}
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
        }
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
        "base_head_google_tag_manager":(tag)=>{
            return `<!-- Google Tag Manager -->
            <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${tag}');</script>
            <!-- End Google Tag Manager -->`
        },
        "base_body_google_tag_manager":(tag)=>{
            return `<!-- Google Tag Manager (noscript) -->
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${tag}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
            <!-- End Google Tag Manager (noscript) -->`
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
        "sinchronicity.cloud":{
            "favicon.ico":{
                "loc":"https://sinchronicity.cloud/favicon.ico",
                "special":"favicon",
                "route":"./basic.ico"
            },
            "robots.txt":{
                "loc":"https://sinchronicity.cloud/robots.txt",
                "special":"robots"
            },
            "sitemap.xml":{
                "loc":"https://sinchronicity.cloud/sitemap.xml",
                "special":"sitemap"
            },
            "index.html":{
                "loc":"https://sinchronicity.cloud/index.html",
                "special":"index"
            },
            "/":{
                "loc":"https://sinchronicity.cloud/",
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
                    "./general.js"
                ]
            },
            "blog":{
                "loc":"https://demian.app/blog",
                "sitemap":true,
                "index":true,
                "title":{
                    "es":"Blog:PLP",
                    "en":"Blog:PLP"
                },
                "short":{
                    "es":"Blog de tecnología",
                    "en":"Tech Blog"
                },
                "descrip":{
                    "es":"Página principal de mi blog de tecnología y trabajo",
                    "en":"Main page of my technology and work blog"
                },
                "gtag":"plp_gtag",
                "css":[
                    "./parts/sdb.css",
                    "./parts/plp.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./parts/plp_sidebar.js",
                    "./pages/d_blog.js"
                ]
            },
            "aboutme":{
                "loc":"https://demian.app/aboutme",
                "sitemap":true,
                "index":true,
                "title":{
                    "es":"Acerca de mi:PLP",
                    "en":"About me:PLP"
                },
                "short":{
                    "es":"Acerca de mi",
                    "en":"About me"
                },
                "descrip":{
                    "es":"Aquí hablo de mi mismo",
                    "en":"Here I talk about myself"
                },
                "gtag":"plp_gtag",
                "css":[
                    "./parts/sdb.css",
                    "./parts/plp.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./parts/plp_sidebar.js",
                    "./pages/d_aboutme.js"
                ]
            },
            "soma":{
                "loc":"https://demian.app/soma",
                "sitemap":true,
                "index":true,
                "title":{
                    "es":"soma",
                    "en":"soma"
                },
                "short":{
                    "es":"Administrador Social",
                    "en":"Social Manager"
                },
                "descrip":{
                    "es":"Herramienta para curar contenido y distribuirlo en redes sociales.",
                    "en":"Content curation and social media distribution tool."
                },
                "gtag":"plp_gtag",
                "css":[
                    "./parts/sdb.css",
                    "./parts/plp.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./pages/d_soma.js"
                ]
            },
            "antojitos":{
                "loc":"https://demian.app/antojitos",
                "sitemap":true,
                "index":true,
                "title":{
                    "es":"Antojitos",
                    "en":"Antojitos"
                },
                "short":{
                    "es":"Aplicación para comercio local de alimentos",
                    "en":"Local food commerce app"
                },
                "descrip":{
                    "es":"Esta aplicación permite el generar y localizar registros de productores de antojitos para realizarles pedidos locales",
                    "en":"This app allows for the creation of snack productors records to perform local purchases requests"
                },
                "gtag":"plp_gtag",
                "css":[
                    "./parts/sdb.css",
                    "./parts/plp.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./parts/plp_sidebar.js",
                    "./pages/d_antojitos.js"
                ]
            },
            "trajectory":{
                "loc":"https://demian.app/trajectory",
                "sitemap":true,
                "index":true,
                "title":{
                    "es":"Trayectoria",
                    "en":"Trajectory"
                },
                "short":{
                    "es":"Historial profesional y academico",
                    "en":"Work and education history"
                },
                "descrip":{
                    "es":"Datos de historial laboral y educativo navegable por año y actividades",
                    "en":"Year and subject browsable work and education history"
                },
                "gtag":"plp_gtag",
                "css":[
                    "./parts/sdb.css",
                    "./parts/plp.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./parts/plp_sidebar.js",
                    "./pages/d_trajectory.js"
                ]
            },
            "projects":{
                "loc":"https://demian.app/projects",
                "sitemap":true,
                "index":true,
                "title":{
                    "es":"Proyectos",
                    "en":"Projects"
                },
                "short":{
                    "es":"Proyectos personales",
                    "en":"Personal Proyects"
                },
                "descrip":{
                    "es":"Aqui converso en general de los diversos intereses y persecuciones en los que me encuentro, analiso y comparto perspectivas de los mismos",
                    "en":"Here I review the projects I am involved with, I perform analisis and commentary on them"
                },
                "gtag":"plp_gtag",
                "css":[
                    "./parts/sdb.css",
                    "./parts/plp.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./parts/plp_sidebar.js",
                    "./pages/d_projects.js"
                ]
            },
            "schedule":{
                "loc":"https://demian.app/schedule",
                "sitemap":true,
                "index":true,
                "title":{
                    "es":"Agenda",
                    "en":"Schedule"
                },
                "short":{
                    "es":"Herramienta de administración de agenda de consultoria",
                    "en":"Consulting schedule control tool"
                },
                "descrip":{
                    "es":"Herramienta de adiministración de horarios de agenda para la consultoría",
                    "en":"Schedule control for consulting services"
                },
                "gtag":"plp_gtag",
                "css":[
                    "./parts/sdb.css",
                    "./parts/plp.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./parts/plp_sidebar.js",
                    "./pages/d_schedule.js"
                ]
            },
            "appform":{
                "loc":"https://demian.app/appform",
                "sitemap":true,
                "index":true,
                "title":{
                    "es":"Consultapp",
                    "en":"AppConsult"
                },
                "short":{
                    "es":"Aplicación de estimación de costo de desarrollo de app",
                    "en":"Interactive app quote builder app"
                },
                "descrip":{
                    "es":"Esta herramienta le permitira estimar el tiempo y costo de desarrollo de una apliación basado en sus requerimientos",
                    "en":"This tool helps you perform an estimation of the time and cost of development of an app based on your requirements"
                },
                "gtag":"plp_gtag",
                "css":[
                    "./parts/sdb.css",
                    "./parts/plp.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./parts/plp_sidebar.js",
                    "./pages/d_appform.js"
                ]
            },
            "info":{
                "loc":"https://demian.app/info",
                "sitemap":true,
                "index":true,
                "title":{
                    "es":"PlatInfo",
                    "en":"PlatInfo"
                },
                "short":{
                    "es":"Información en vivo de la plataforma",
                    "en":"Live platform information"
                },
                "descrip":{
                    "es":"Información en vivo de la infraestructura y el proceso de desarrollo de esta plataforma",
                    "en":"Live platform infrastructure and development information"
                },
                "gtag":"plp_gtag",
                "css":[
                    "./parts/sdb.css",
                    "./parts/plp.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./parts/plp_sidebar.js",
                    "./pages/d_info.js"
                ]
            },
            "services":{
                "loc":"https://demian.app/services",
                "sitemap":true,
                "index":true,
                "title":{
                    "es":"Servicios",
                    "en":"Services"
                },
                "short":{
                    "es":"Servicios digitales y profesionales",
                    "en":"Digital and professional services"
                },
                "descrip":{
                    "es":"Aqui detallamos los productos manejados, tanto aplicativos en linea, como desarrollo y servicios de marketing de contenidos.",
                    "en":"Here you can find details on my products; online applications, development and content marketing"
                },
                "gtag":"plp_gtag",
                "css":[
                    "./parts/sdb.css",
                    "./parts/plp.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./parts/plp_sidebar.js",
                    "./pages/d_services.js"
                ]
            },
            "developer":{
                "loc":"https://demian.app/developer",
                "sitemap":true,
                "index":true,
                "title":{
                    "es":"DemDev",
                    "en":"DemDev"
                },
                "short":{
                    "es":"Proyectos de desarrollo activos",
                    "en":"Active development proyects"
                },
                "descrip":{
                    "es":"Aqui encontraras una reseña de los proyectos que estoy desarrollando y podrás ayudarme a probar algunos de ellos",
                    "en":"Here you will find info on the projects I am developing and you will be able to help me test some of them"
                },
                "gtag":"plp_gtag",
                "css":[
                    "./parts/sdb.css",
                    "./parts/plp.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./parts/plp_sidebar.js",
                    "./pages/d_dev.js"
                ]
            },
            "donate":{
                "loc":"https://demian.app/donate",
                "sitemap":true,
                "index":true,
                "title":{
                    "es":"Donativo",
                    "en":"Donation"
                },
                "short":{
                    "es":"Página de donativos",
                    "en":"Donations page"
                },
                "descrip":{
                    "es":"Puedes realizar un donativo a mis esfuerzos de desarrollo independiente desde esta página",
                    "en":"From this page you can perform a donation to my independent development efforts."
                },
                "gtag":"plp_gtag",
                "css":[
                    "./parts/sdb.css",
                    "./parts/plp.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./parts/plp_sidebar.js",
                    "./pages/d_donate.js"
                ]
            },
            "message":{
                "loc":"https://demian.app/message",
                "sitemap":true,
                "index":true,
                "title":{
                    "es":"Mensaje",
                    "en":"Message"
                },
                "short":{
                    "es":"Envíame un mensaje para iniciar contacto",
                    "en":"Send me a message to initiate contact"
                },
                "descrip":{
                    "es":"Envía un mensaje al autor de este sitio",
                    "en":"Send a message to the author of this site"
                },
                "gtag":"plp_gtag",
                "css":[
                    "./parts/sdb.css",
                    "./parts/plp.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./parts/plp_sidebar.js",
                    "./pages/d_message.js"
                ]
            }
        },
        "remansonocturno.com":{
            "robots.txt":{
                "loc":"https://remansonocturno.com/robots.txt",
                "special":"robots"
            },
            "sitemap.xml":{
                "loc":"https://remansonocturno.com/sitemap.xml",
                "special":"sitemap"
            },
            "index.html":{
                "loc":"https://remansonocturno.com/index.html",
                "special":"index"
            },
            "favicon.ico":{
                "loc":"https://remansonocturno.com/favicon.ico",
                "special":"favicon",
                "route":"./parts/ren_icons/ren_favicon.ico"
            },
            "/":{
                "title":{
                    "es":"Inicio:Remanso Nocturno",
                    "en":"Home:Nocturnal Haven"
                },
                "short":{
                        "es":"Portada y Noticias",
                        "en":"News and welcome screen"
                    },
                "descrip":{
                    "es":"Información de la red de páginas de Remanso Nocturno",
                    "en":"Nocturnal Haven network information"
                },
                "loc":"https://remansonocturno.com/",
                "sitemap":true,
                "index":true,
                "gtag":"ren_gtag",
                "css":[
                    "./parts/ren.css",
                    "./parts/sdb.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./pages/r_root.js"
                ]
            },
            "blog":{
                "title":{
                    "es":"Blog:Remanso Nocturno",
                    "en":"Blog:Nocturnal Haven"
                },
                "short":{
                        "es":"Blog Creativo",
                        "en":"Creative Blog"
                    },
                "descrip":{
                    "es":"Ficción de autores temas y estilos variados",
                    "en":"Fiction of varied authors subjects and kinds"
                },
                "loc":"https://remansonocturno.com/blog",
                "sitemap":true,
                "index":true,
                "gtag":"ren_gtag",
                "css":[
                    "./parts/ren.css",
                    "./parts/sdb.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./pages/r_blog.js"
                ]
            }
        },
        "neorrey.art":{
            "robots.txt":{
                "loc":"https://neorrey.art/robots.txt",
                "special":"robots"
            },
            "sitemap.xml":{
                "loc":"https://neorrey.art/sitemap.xml",
                "special":"sitemap"
            },
            "index.html":{
                "loc":"https://neorrey.art/index.html",
                "special":"index"
            },
            "favicon.ico":{
                "loc":"https://neorrey.art/favicon.ico",
                "special":"favicon",
                "route":"./parts/ren_icons/ren_favicon.ico"
            },
            "/":{
                "title":{
                    "es":"Inicio:Remanso Nocturno",
                    "en":"Home:Nocturnal Haven"
                },
                "short":{
                        "es":"Portada y Noticias",
                        "en":"News and welcome screen"
                    },
                "descrip":{
                    "es":"Información de la red de páginas de Remanso Nocturno",
                    "en":"Nocturnal Haven network information"
                },
                "loc":"https://remansonocturno.com/",
                "sitemap":true,
                "index":true,
                "gtag":"ren_gtag",
                "css":[
                    "./parts/ren.css",
                    "./parts/sdb.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./pages/r_root.js"
                ]
            },
            "blog":{
                "title":{
                    "es":"Blog:Remanso Nocturno",
                    "en":"Blog:Nocturnal Haven"
                },
                "short":{
                        "es":"Blog Creativo",
                        "en":"Creative Blog"
                    },
                "descrip":{
                    "es":"Ficción de autores temas y estilos variados",
                    "en":"Fiction of varied authors subjects and kinds"
                },
                "loc":"https://remansonocturno.com/blog",
                "sitemap":true,
                "index":true,
                "gtag":"ren_gtag",
                "css":[
                    "./parts/ren.css",
                    "./parts/sdb.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./pages/r_blog.js"
                ]
            }
        },
        "senderoholistico.com":{
            "robots.txt":{
                "loc":"https://senderoholistico.com/robots.txt",
                "special":"robots"
            },
            "sitemap.xml":{
                "loc":"https://senderoholistico.com/sitemap.xml",
                "special":"sitemap"
            },
            "index.html":{
                "loc":"https://senderoholistico.com/index.html",
                "special":"index"
            },
            "favicon.ico":{
                "loc":"https://senderoholistico.com/favicon.ico",
                "special":"favicon",
                "route":"./parts/ren_icons/shl_favicon.ico"
            },
            "/":{
                "title":{
                    "es":"Sendero Holístico",
                    "en":"Holistic Path"
                },
                "short":{
                        "es":"Información general y bienvenida",
                        "en":"General info and welcome screen"
                    },
                "descrip":{
                    "es":"Sitio de exploración y reflexión al respecto de la vida",
                    "en":"Website dedicated to exploration and reflection about life"
                },
                "loc":"https://senderoholistico.com/",
                "sitemap":true,
                "index":true,
                "gtag":"shl_gtag",
                "css":[
                    "./parts/shl.css",
                    "./parts/sdb.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./pages/r_root.js"
                ]
            },
            "blog":{
                "title":{
                    "es":"Blog:Remanso Nocturno",
                    "en":"Blog:Nocturnal Haven"
                },
                "short":{
                        "es":"Blog Creativo",
                        "en":"Creative Blog"
                    },
                "descrip":{
                    "es":"Ficción de autores temas y estilos variados",
                    "en":"Fiction of varied authors subjects and kinds"
                },
                "loc":"https://remansonocturno.com/blog",
                "sitemap":true,
                "index":true,
                "gtag":"ren_gtag",
                "css":[
                    "./parts/ren.css",
                    "./parts/sdb.css"
                ],
                "js":[
                    "./parts/alpha.js",
                    "./parts/beta_nav.js",
                    "./pages/r_blog.js"
                ]
            }
        }
    }
}})()