function build_headbar(){
    let links = [
        ["Home","Inicio","https://synchronicity.cloud/"],
        ["Terms of Service","Terminos del Servicio","https://synchronicity.cloud/terms_of_service"],
        ["Privacy Agreement","Politica de Privacidad","https://synchronicity.cloud/privacy_policy"]
    ]
    
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
        "id":"headbar",
        "nodetype":"div",
        "styles":["color_contrast_1","top_header_bar"]
    })

    let appname_container = ao.qq({
        "id":"appname_container",
        "nodetype":"div",
        "styles":["internal_nav_button"]
    })

    appname_container.append(ao.qq({
        "id":"app_icon",
        "nodetype":"img",
        "href":"https://synchronicity.cloud/favicon.ico"
    }))

    appname_container.append(ao.qq({
        "id":"appname",
        "id":"p",
        "innerText":"Synchronicity"
    }))

    headbar.append(appname_container)

    let links_container = ao.qq({
        "nodetype":"div",
        "styles":["link_list"]
    })
  
    for (let lnk of links){
        links_container.append(ao.qq({
            "nodetype":"div",
            "innerText":lnk[lng_index],
            "arb-target":lnk[2],
            "styles":["internal_nav_button"]
        }))
    }

    headbar.append(links_container)

    document.body.append(headbar)
}

window.onload = (event) => {
    build_headbar()
};