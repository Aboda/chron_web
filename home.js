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
        "styles":["colored_row","hor_flex"]
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
        "styles":["hor_flex","row_height"]
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
        "styles":["colored_row_2","hor_flex"]
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
        "styles":["hor_flex","row_height"]
    })
    section_container.append(white_sub_container)

    white_sub_container.append(build_appearing_text_block(`Syncrhonicity will use these settings to produce a written script representing the Month/Date evaluated and the timeframes during the day in which the meeting can be scheduled.`))

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
        "styles":["colored_row_3","hor_flex"]
    })
    section_container.append(colored_sub_container)

    colored_sub_container.append(build_subtitle_block(`Additionally you can compare your availability with other google calendar users who previously shared their busy/avaialable details with you.
    
    This allows you to effectively know the availability of both calendars`))

    colored_sub_container.append(ao.qq({
        "nodetype":"img",
        "src":"https://synchronicity.cloud/additional_consideration.png",
        "styles":["wide_margin"]
    }))

    let white_sub_container = ao.qq({
        "nodetype":"div",
        "styles":["hor_flex","row_height"]
    })
    section_container.append(white_sub_container)

    white_sub_container.append(build_appearing_text_block("The application was thought as a tool to quickly evaluate the calendars of your choice to seek availability, as a part of secretarial work or for consultants reserving timeframes in their schedule for diverse activities."))

    white_sub_container.append(build_big_black_letters("Offload this repetitive task from your mind."))

    return section_container
}

function build_about_us(){
    let section_container = ao.qq({
        "id":"AboutUs",
        "nodetype":"div",
    })

    let colored_sub_container = ao.qq({
        "nodetype":"div",
        "styles":["colored_row_3","hor_flex","row_height"]
    })
    section_container.append(colored_sub_container)

    colored_sub_container.append(build_subtitle_block(`We at Synchronicity are modern professionals looking to participate helping those interested in making their activities simpler and more efficient. 
    
    We look forward to generate software solutions for the betterment of the individual relationship we all have with time.`))

    return section_container
}

function build_contact_us(){
    let section_container = ao.qq({
        "id":"ContactUs",
        "nodetype":"div",
    })

    let white_sub_container = ao.qq({
        "nodetype":"div",
        "styles":["hor_flex","row_height"]
    })
    section_container.append(white_sub_container)

    white_sub_container.append(build_contact_pannel_container())

    white_sub_container.append(build_big_black_letters("Share your thoughts with us."))

    return section_container
}

function build_contact_pannel_container(){
    let contact_pannel_container = ao.qq({
        "nodetype":"div",
        "id":"Contact",
        "styles":["vertical_list"]
    })
    contact_pannel_container.append(ao.qq({
        "nodetype":"input",
        "id":"email_address",
        "placeholder":"preferred contact",
        "triggers":[["keypress",function(){validate_contact_form()}]]
    }))
    contact_pannel_container.append(ao.qq({
        "nodetype":"div",
        "id":"message_box",
        "contentEditable":true,
        "styles":["comment_box","minimal_spacing"],
        "triggers":[["keypress",function(){validate_contact_form()}]]
    }))
    contact_pannel_container.append(ao.qq({
        "nodetype":"button",
        "id":"contact_button",
        "value":"Send Message",
        "disabled":true,
        "triggers":[["click",function(){send_contact_message()}]]
    }))
    return contact_pannel_container
}

function validate_contact_form() {
    let email_input = ao.simple.email_address.node.value.length
    let message_input = ao.simple.message_box.node.innerText.length
    let controlled_button = ao.simple.contact_button.node
    
    if (email_input > 0 && message_input > 0) {controlled_button.disabled = false}else{
        controlled_button.disabled = true
    }
}

function send_contact_message(){
    let email_input = ao.simple.email_address.node.value
    let message_input = ao.simple.message_box.node.innerText
    let inbox_address = "https://synchronicity.cloud/messages"

    function message_received(reply){
        console.log("message_sent",reply)
    }

    console.log("sending",email_input,message_input)

    ao.fe("POST",inbox_address,message_received,JSON.stringify({"c":email_input,"m":message_input}))
}

function main_build(){
    document.body.append(build_home())
    document.body.append(build_the_app())
    document.body.append(build_features())
    document.body.append(build_about_us())
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