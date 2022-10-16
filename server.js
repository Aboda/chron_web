const fs = require("fs")
const https = require("https")
let stream = fs.createWriteStream("../din/log.txt", {flags:'a'})
let service_no = 0
let toolbox = {}
let cache = {}
const server_conf = {
    key: fs.readFileSync("/etc/letsencrypt/live/synchronicity.cloud/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/synchronicity.cloud/fullchain.pem"),
    maxCachedSessions: 0,
    keepAliveTimeout: 0,
    headersTimeout: 1000,
    maxHeadersCount: 10,
    requestTimeout: 2000,
    timeout:3000
}
const loc_log = (thing_to_log) => {
    stream.write(JSON.stringify(thing_to_log, null, 2)+",\n")
}
const clean_ipv6_trail_if_present = (address_to_eval) => {
    let processed_adress
    address_to_eval.startsWith("::ffff:") ? processed_adress = address_to_eval.substring(7) : processed_adress = address_to_eval
    return processed_adress;
}
const fetch_local = (item_path,force_reload,raw,circle_pass) => {
    if (circle_pass.cache[item_path] == undefined || force_reload == true){
        raw == true ? circle_pass.cache[item_path] = fs.readFileSync(item_path) : circle_pass.cache[item_path] = fs.readFileSync(item_path).toString()
        return circle_pass.cache[item_path]
    }else{
        return circle_pass.cache[item_path]
    }
}
const get_or_update_toolbox = ()=>{
    let raw = fs.readFileSync("./toolbox.js").toString()
    toolbox = eval(raw)
    toolbox.cache = cache
    toolbox.fetch = fetch_local
}
get_or_update_toolbox()
https.createServer(server_conf, (req, res) => {
    service_no++
    let report = {
        "service_no":service_no,
        "timestamp":new Date(),
        "caller_ip":clean_ipv6_trail_if_present(req.connection.remoteAddress),
        "host":req.headers.host,
        "url":req.url,
        "method":req.method,
    }
    if (req.headers.referer != undefined) {
        report.referer = req.headers.referer;
    }
    try {
        eval_and_serve_item(req,res,report,toolbox)
     } catch (err) {
        report.endcode = 500
        report.error = err.stack
        report.headers = req.headers
        loc_log(report)
        res.writeHead(report.endcode)
        res.end()
    }
}).listen(443)
delete server_conf
const eval_and_serve_item = (req,res,report,toolbox) => {
    break_url(req,report)
    report.lng = assert_lng(req.headers["accept_languaje"],report.query)
    if (report.query != undefined) {
        read_commands(report)
    }
    if (report.retool == true) {
        get_or_update_toolbox()
    }
    loc_log(report)
    if (toolbox.domains[report.host] != undefined) {
        let reply = toolbox.tasks.route(req,report,toolbox)
        res.writeHead(reply.code)
        res.end(reply.content)   
    }else{
        res.writeHead(418)
        res.end()
    }
}

const break_url = (req,report) => {
    let split_loc = req.url.indexOf("?")
    if (split_loc !=  -1) {
        report.path = req.url.substring(0,split_loc);
        report.query = req.url.substring(split_loc);
    }else{
        report.path = req.url
    }
    if (report.path == "/") {
        report.s1 = report.path
    }else{
        report.s1 = report.path.split("/")[1]
    }
}

const assert_lng = (acclngstr,searchstring) => {
    var default_lang = "en";
    var chosen_lang;
    if (acclngstr != undefined) {
        var es_pos = acclngstr.indexOf("es");
        var en_pos = acclngstr.indexOf("en");
        if (es_pos != -1 && en_pos == -1) {chosen_lang = "es"} else
        if (en_pos != -1 && es_pos == -1) {chosen_lang = "en"} else
        if (en_pos != -1 && en_pos < es_pos && es_pos != -1){chosen_lang = "en";}else 
        if (es_pos != -1 && es_pos < en_pos && en_pos != -1){chosen_lang = "es";}
    }    
    if (searchstring != undefined) {
        if (searchstring.includes("lng")) {
            var required_languaje = searchstring.substring(searchstring.indexOf("lng")+4,searchstring.indexOf("lng")+6);
            if (required_languaje == "en" || required_languaje == "es") {
                chosen_lang = required_languaje
            }
        }  
    }
    if (chosen_lang == undefined) {chosen_lang = default_lang}
    return chosen_lang;
}

const read_commands  = (report) => {
    if(report.query.includes("reload")){
        let commandloc = report.query.indexOf("reload")
        let commandinput = report.query.substring(commandloc+7,commandloc+10)
        if (commandinput == "all"){
            report.retool = true
            report.repage = true
        }
        if (commandinput == "roo"){
            report.retool = true
        }
        if (commandinput == "pag"){
            report.repage = true
        }
    }
}