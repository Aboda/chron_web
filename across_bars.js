function build_headbar(){
    let links = [
        ["Home","Inicio","https://synchronicity.cloud/#Home"],
        ["The App","La Aplicación","https://synchronicity.cloud/#TheApp"],
        ["Features","Caracteristicas","https://synchronicity.cloud/#Features"],
        ["About Us","Acerca de Nosotros","https://synchronicity.cloud/#AboutUs"],
        ["Contact","Contacto","https://synchronicity.cloud/#Contact"]
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

    let display_mode

    function assert_initial_display(){
        if (window.innerWidth < 1000){
            display_mode = 1
        }else{
            display_mode = 0
        }
    }

    assert_initial_display()

    let headbar = ao.qq({
        "id":"headbar",
        "nodetype":"div",
        "styles":["color_contrast_1","top_header_bar","extra_l_r_borders"]
    })

    let appname_container = ao.qq({
        "id":"appname_container",
        "nodetype":"div",
        "styles":["hor_flex","minimal_spacing"]
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
        "nodetype":"b",
        "innerText":"Synchronicity (Beta)",
        "styles":["half_space_left"]
    }))

    headbar.append(appname_container)
    document.body.append(headbar)
    document.body.append(ao.qq({
        "id":"antydisconfortbar",
        "nodetype":"div",
        "styles":["antydisconfortbar"]
    }))

    
    if (display_mode == 0) {
        build_displayed_options(links)
    }

    if (display_mode == 1) {
        build_hamburger_options(links)
        menu_coordinator()
    }    
}

function build_displayed_options(links){
    let links_container = ao.qq({
        "nodetype":"div",
        "styles":["hor_flex"]
    })
  
    for (let lnk of links){
        links_container.append(ao.qq({
            "nodetype":"div",
            "innerText":lnk[0],
            "styles":["internal_nav_button","minimal_spacing"],
            "triggers":[["click",function(){window.location.href = lnk[2]}]]
        }))
    }

    ao.simple.headbar.node.append(links_container)
}

function build_hamburger_options(links){
    let burger_svg = `
    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="white"/></svg>`

    let burger_button = ao.qq({
        "nodetype":"div",
        "styles":["hamburger_button","vertical_list"],
        "triggers":[["click",()=>{
            add_overlay_menu()
        }]]
    })
    
    burger_button.append(svg_from_string(burger_svg))
    
    ao.simple.headbar.node.append(burger_button)

    let fullscreen_item = ao.qq({
        "id":"full_screen_menu",
        "nodetype":"div",
        "styles":["vertical_list","color_contrast_1"]
    })
    
    for (let lnk of links){
        fullscreen_item.append(ao.qq({
            "nodetype":"div",
            "innerText":lnk[0],
            "styles":["internal_nav_button","minimal_spacing"],
            "triggers":[["click",function(){
                window.location.href = lnk[2]
                remove_overlay_menu()
            }]]
        }))
    }
}

function svg_from_string(string){
    var parser = new DOMParser();
    var doc = parser.parseFromString(string, "image/svg+xml");
    return doc.childNodes[0]
}

function add_overlay_menu() {
    document.body.append(ao.simple.full_screen_menu.node)
}

function remove_overlay_menu() {
    ao.simple.full_screen_menu.node.remove()
}

function build_closer_line(){
    let container = ao.qq({
        "nodetype":"div",
        "styles":["hor_flex","color_contrast_1"]
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
        "innerText":"Support",
        "href":"mailto:synchronicity_support@demian.app"
    }))

    links_box_2.append(ao.qq({
        "nodetype":"a",
        "innerText":"Developer Site",
        "href":"https://demian.app"
    }))

    container.append(ao.qq({
        "nodetype":"p",
        "innerText":"© 2023 by Synchronicity Cloud LLC."
    }))

    document.body.append(container)
}

function menu_coordinator() {
    let coordinator = {
        size_element() {
            console.log("Sizing menu coordinator",innerWidth,innerHeight)
        }
    }
    ao.size_watch.push(coordinator)
}