function build_headbar(){
    let links = [
        ["Home","Inicio","https://synchronicity.cloud/"],
        ["The App","La Aplicación","https://synchronicity.cloud/"],
        ["Features","Caracteristicas","https://synchronicity.cloud/"],
        ["About Us","Acerca de Nosotros","https://synchronicity.cloud/"],
        ["Reviews","Reseñas","https://synchronicity.cloud/"],
        ["Contact","Contacto","https://synchronicity.cloud/"]
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
        "styles":["link_list","minimal_spacing"]
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
            "styles":["internal_nav_button","minimal_spacing"],
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

function build_closer_line(){
    let container = ao.qq({
        "nodetype":"div",
        "styles":["text_list","color_contrast_1"]
    })

    let links_box_1 = ao.qq({
        "nodetype":"div",
        "styles":["minimal_spacing","vertical_list"]
    })
    container.append(links_box_1)
    
    let links_box_2 = ao.qq({
        "nodetype":"div",
        "styles":["minimal_spacing","vertical_list"]
    })
    container.append(links_box_2)

    links_box_1.append(ao.qq({
        "nodetype":"a",
        "innerText":"Terms of Service",
        "href":"https://synchronicity.cloud/terms_of_service"
    }))

    links_box_1.append(ao.qq({
        "nodetype":"a",
        "innerText":"Privacy Policy",
        "href":"https://synchronicity.cloud/privacy_policy"
    }))

    links_box_2.append(ao.qq({
        "nodetype":"a",
        "innerText":"Developer Site",
        "href":"https://demian.app"
    }))

    links_box_2.append(ao.qq({
        "nodetype":"a",
        "innerText":"Support",
        "href":"mailto:synchronicity_support@demian.app"
    }))

    document.body.append(container)
}