function build_compound_main_message(){
    let composition_container = ao.qq({
        "nodetype":"div",
        "id":"main_comp_1",
        "styles":["wide_margin"]
    })

    let biggest_letters = build_appearing_title_block(`Find the time`)
    composition_container.append(biggest_letters)
    let just_big_letters = build_subtitle_block("Add to your Google Calendar now")
    composition_container.append(just_big_letters)
    let link = ao.qq({
        "nodetype":"a",
        "href":"https://workspace.google.com/marketplace"
    })
    let get_it_icon = ao.qq({
        "nodetype":"img",
        "src":"https://synchronicity.cloud/gwm.png",
        "styles":["internal_nav_button"]
    })
    link.append(get_it_icon)
    composition_container.append(link)

    return composition_container
}

function build_appearing_title_block(text){
    return ao.qq({ 
        "nodetype":"p",
        "styles":["main_clear_text","soft_appear","vertical_list"],
        "innerText":text
    })
}

function build_subtitle_block(text){
    return ao.qq({ 
        "nodetype":"p",
        "styles":["subtitle_clear_text","lim_w_text"],
        "innerText":text
    })
}

function build_appearing_text_block(text){
    return ao.qq({ 
        "nodetype":"p",
        "styles":["soft_appear","lim_w_text","wide_margin"],
        "innerText":text
    })
}

function build_big_black_letters(text){
    return ao.qq({ 
        "nodetype":"p",
        "styles":["soft_appear","lim_w_text","wide_margin","main_text"],
        "innerText":text
    })
}

function build_home() {
    let section_container = ao.qq({
        "id":"Home",
        "nodetype":"div",
    })

    let colored_sub_container = ao.qq({
        "nodetype":"div",
        "styles":["colored_row","hor_flex","container_border_spacing"]
    })
    section_container.append(colored_sub_container)

    colored_sub_container.append(build_compound_main_message())

    colored_sub_container.append(ao.qq({
        "nodetype":"img",
        "src":"https://synchronicity.cloud/appscreenshot.png",
        "styles":["wide_margin"]
    }))

    let white_sub_container = ao.qq({
        "nodetype":"div",
        "styles":["hor_flex","container_border_spacing","row_height"]
    })
    section_container.append(white_sub_container)


    white_sub_container.append(build_appearing_text_block(`Synchronicity helps you find available timeframes in one or more google calendars of your choice.
    
    Have your availability written out with a single click.`))

    white_sub_container.append(build_big_black_letters(`Let the algorithm work for you`))

    return section_container
}

function build_the_app(){
    let section_container = ao.qq({
        "id":"TheApp",
        "nodetype":"div",
    })

    let colored_sub_container = ao.qq({
        "nodetype":"div",
        "styles":["colored_row_2","hor_flex","container_border_spacing"]
    })
    section_container.append(colored_sub_container)

    colored_sub_container.append(ao.qq({
        "nodetype":"img",
        "src":"https://synchronicity.cloud/settingscapture.png",
        "styles":["wide_margin"]
    }))

    colored_sub_container.append(build_subtitle_block(`Be precise in the dates, days, hours of the day, length of the sought available timeframe and the google calendars that you want to consider.
    
    Enjoy having a digital assistant sidebar that will perform this basic yet recurrent task for people who manage busy agendas.`))

    let white_sub_container = ao.qq({
        "nodetype":"div",
        "styles":["hor_flex","container_border_spacing","row_height"]
    })
    section_container.append(white_sub_container)

    white_sub_container.append(build_appearing_text_block(`Syncrhonicity will use this parameter to produce a written script representing the Month/Date evaluated and the timeframes during the day in which the meeting can be scheduled.`))

    white_sub_container.append(build_appearing_text_block(`Thu 11/10, 9a - 1p, 2p - 5p
    Fri 11/11, 9a - 1p, 3p - 5p
    Mon 11/14, 10a - 12p, 1p - 5p
    Tue 11/15, 9a - 10a, 11a - 1p, 2p - 5p
    Wed 11/16, 9a - 11a, 12p - 1p, 2p - 5p`))

    return section_container
}

function build_features(){
    let section_container = ao.qq({
        "id":"Features",
        "nodetype":"div",
    })

    let colored_sub_container = ao.qq({
        "nodetype":"div",
        "styles":["colored_row_3","hor_flex","container_border_spacing"]
    })
    section_container.append(colored_sub_container)

    colored_sub_container.append(ao.qq({
        "nodetype":"img",
        "src":"https://synchronicity.cloud/settingscapture.png",
        "styles":["wide_margin"]
    }))

    colored_sub_container.append(build_subtitle_block(`Be precise in the dates, days, hours of the day, length of the sought available timeframe and the google calendars that you want to consider.
    
    Enjoy having a digital assistant sidebar to your google calendar that wil perform this basic yet recurrent task for people who manage busy agendas.`))

    let white_sub_container = ao.qq({
        "nodetype":"div",
        "styles":["hor_flex","container_border_spacing","row_height"]
    })
    section_container.append(white_sub_container)


    white_sub_container.append(build_appearing_text_block("Synchronicity helps you analyze your google calendars for available timeframes of the size of your choice, generating a simple plain text output:"))

    white_sub_container.append(build_appearing_text_block(`Thu 11/10, 9a - 1p, 2p - 5p
    Fri 11/11, 9a - 1p, 3p - 5p
    Mon 11/14, 10a - 12p, 1p - 5p
    Tue 11/15, 9a - 10a, 11a - 1p, 2p - 5p
    Wed 11/16, 9a - 11a, 12p - 1p, 2p - 5p`))


    return section_container
}

function build_about_us(){
    let section_container = ao.qq({
        "id":"AboutUs",
        "nodetype":"div",
    })

    return section_container
}

function build_reviews(){
    let section_container = ao.qq({
        "id":"Reviews",
        "nodetype":"div",
    })



    return section_container
}

function build_contact_us(){
    let section_container = ao.qq({
        "id":"ContactUs",
        "nodetype":"div",
    })

    let white_sub_container = ao.qq({
        "nodetype":"div",
        "styles":["hor_flex","container_border_spacing","row_height"]
    })
    section_container.append(white_sub_container)



    white_sub_container.append(build_big_black_letters("Share your thought with us."))

    white_sub_container.append(build_contact_pannel_container())


    return section_container
}

function build_contact_pannel_container(){
    let contact_pannel_container = ao.qq({
        "nodetype":"div"
    })
    contact_pannel_container.append(ao.qq({
        "nodetype":"input",
        "placeholder":"contact email"
    }))
    contact_pannel_container.append(ao.qq({
        "nodetype":"div",
        "contenteditable":true,
        "styles":["comment_box"]
    }))
    return contact_pannel_container
}



function main_build(){
    document.body.append(build_home())
    document.body.append(build_the_app())
    document.body.append(build_features())
    document.body.append(build_about_us())
    document.body.append(build_reviews())
    document.body.append(build_contact_us())
}

function page_build(){
    build_headbar()
    main_build()
    build_closer_line()
}

window.onload = () => {
    page_build()
}

window.onresize = () => {
    ao.size_change_monitor()
}