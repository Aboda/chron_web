let links = [
    ["Home","Inicio","https://synchronicity.cloud/"],
    ["Terms of Service","Terminos del Servicio","https://synchronicity.cloud/terms_of_service"],
    ["Privacy Agreement","Politica de Privacidad","https://synchronicity.cloud/privacy_policy"]
]

let lnk_index = 2
let lng_index

function assert_lng_index(){
    if (ao.lng == "en") {
        lng_index = 0
    }
    if (ao.lng == "es") {
        lng_index = 1
    }
}

assert_lng_index()

let headbar = ao.qq({
    "name":"headbar",
    "nodetype":"div",
    "styles":["color_contrast_1"]
})

let link_list = ao.qq({
    "name":"link_list",
    "nodetype":"li",
})

headbar.append(link_list)

for (let lnk of links){
    let link = ao.qq({
        "nodetype":"a",
        "href":lnk[lnk_index],
    })
    
    let insite_nav_text_button = ao.qq({
        "nodetype":"p",
        "innerText":lnk[lng_index]
    })
    link.append(insite_nav_text_button)
    link_list.append(link)
}

body.append(headbar)