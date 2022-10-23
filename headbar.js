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
        "styles":["internal_nav_button","link_list"]
    })

    appname_container.append(ao.qq({
        "id":"app_icon",
        "nodetype":"img",
        "src":"https://synchronicity.cloud/favicon.ico",
        "width":"20px",
        "height":"20px",
    }))

    appname_container.append(ao.qq({
        "id":"appname",
        "nodetype":"p",
        "innerText":"Synchronicity",
        "styles":["half_space_left"]
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
            "styles":["internal_nav_button"],
            "triggers":[["click",function(){window.location.href = lnk[2]}]]
        }))
    }

    headbar.append(links_container)

    document.body.append(headbar)
    document.body.append(ao.qq({
        "id":"antydisconfortbar",
        "nodetype":"div",
        "styles":["antydisconfortbar"]
    }))
}