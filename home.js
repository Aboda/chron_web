
function build_first_line(){
    let container = ao.qq({
        "id":"Home",
        "nodetype":"div",
        "styles":["colored_row","hor_flex","container_border_spacing"]
    })

    container.append(build_compound_main_message())

    container.append(ao.qq({
        "nodetype":"img",
        "src":"https://synchronicity.cloud/appscreenshot.png",
        "styles":["wide_margin"]
    }))

    return container
}

function build_second_line(){
    let container = ao.qq({
        "nodetype":"div",
        "styles":["hor_flex","container_border_spacing"]
    })

    container.append(build_appearing_text_block("Synchronicity helps you analyze your google calendars for available timeframes of the size of your choice, generating a simple plain text output:"))

    container.append(build_appearing_text_block(`Thu 11/10, 9a - 1p, 2p - 5p
    Fri 11/11, 9a - 1p, 3p - 5p
    Mon 11/14, 10a - 12p, 1p - 5p
    Tue 11/15, 9a - 10a, 11a - 1p, 2p - 5p
    Wed 11/16, 9a - 11a, 12p - 1p, 2p - 5p`))

    return container
}


function build_third_line(){
    let container = ao.qq({
        "id":"TheApp",
        "nodetype":"div",
        "styles":["colored_row_2","hor_flex","container_border_spacing"]
    })

    container.append(ao.qq({
        "nodetype":"img",
        "src":"https://synchronicity.cloud/settingscapture.png",
        "styles":["wide_margin"]
    }))

    container.append(build_subtitle_block(`Control the parameters of your search:

    Duration of the event.

    Date and time range to schedule. 

    Google calendars to evaluate.

    And the ability to create the output adjusted to a different timezone.`))

    return container
}

function build_fourth_line(){

    let container = ao.qq({
        "nodetype":"div",
        "styles":["hor_flex","container_border_spacing"]
    })

    container.append(build_appearing_text_block(`If you find yourself frequently scheduling one or more calendars, this is a helpful tool with minimal hassle and no surprises.`))

    container.append(build_appearing_text_block(`The generated output is easily shareable trough messaging or emails as plain text, granting as many options as available for you or a third party to consider.`))

    return container
}

function build_compound_main_message(){
    let composition_container = ao.qq({
        "nodetype":"div",
        "id":"main_comp_1",
        "styles":["wide_margin"]
    })

    let biggest_letters = build_appearing_title_block(`Find the time`)
    composition_container.append(biggest_letters)
    let just_big_letters = build_subtitle_block("Add to your Goolge Calendar now")
    composition_container.append(just_big_letters)
    let get_it_icon = ao.qq({
        "nodetype":"img",
        "src":"https://synchronicity.cloud/gwm.png"
    })
    composition_container.append(get_it_icon)
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




function main_build(){
    document.body.append(build_first_line())
    document.body.append(build_second_line())
    document.body.append(build_third_line())
    document.body.append(build_fourth_line())
}

window.onload = () => {
    build_headbar()
    main_build()
    build_closer_line()
}