
function build_first_line(){
    let container = ao.qq({
        "id":"Home",
        "nodetype":"div",
        "styles":["colored_row","text_list"]
    })

    let first_cell = ao.qq({
        "nodetype":"div",
        "styles":["minimal_spacing"]
    })
    container.append(first_cell)

    let second_cell = ao.qq({
        "nodetype":"div",
        "styles":["minimal_spacing"]
    })
    container.append(second_cell)

    first_cell.append(build_compound_main_message())

    second_cell.append(ao.qq({
        "nodetype":"img",
        "src":"https://synchronicity.cloud/appscreenshot.png"
    }))
    
    return container
}

function build_compound_main_message(){
    let composition_container = ao.qq({
        "nodetype":"div",
        "id":"main_comp_1"
    })

    let biggest_letters = build_appearing_title_block(`Know your
    availability
    at a click.`)
    composition_container.append(biggest_letters)
    let just_big_letters = build_appearing_subtitle_block("Add to your Goolge Calendar now")
    composition_container.append(just_big_letters)
    let get_it_icon = ao.qq({
        "nodetype":"img",
        "src":"https://synchronicity.cloud/gwm.png"
    })
    composition_container.append(get_it_icon)
    return composition_container
}

function build_second_line(){
    let container = ao.qq({
        "nodetype":"div",
        "styles":["text_list"]
    })

    let first_cell = ao.qq({
        "nodetype":"div"
    })
    container.append(first_cell)

    let second_cell = ao.qq({
        "nodetype":"div"
    })
    container.append(second_cell)

    first_cell.append(build_appearing_text_block("Synchronicity helps you analyze your google calendars for available timeframes of the size of your choice, generating a simple plain text output:"))

    second_cell.append(build_appearing_text_block(`Thu 11/10, 9a - 1p, 2p - 5p
    Fri 11/11, 9a - 1p, 3p - 5p
    Mon 11/14, 10a - 12p, 1p - 5p
    Tue 11/15, 9a - 10a, 11a - 1p, 2p - 5p
    Wed 11/16, 9a - 11a, 12p - 1p, 2p - 5p`))

    return container
}

function build_appearing_title_block(text){
    return ao.qq({ 
        "nodetype":"p",
        "styles":["main_clear_text","soft_appear"],
        "innerText":text
    })
}

function build_appearing_subtitle_block(text){
    return ao.qq({ 
        "nodetype":"p",
        "styles":["subtitle_clear_text","soft_appear","lim_w_text"],
        "innerText":text
    })
}

function build_appearing_text_block(text){
    return ao.qq({ 
        "nodetype":"p",
        "styles":["soft_appear","lim_w_text"],
        "innerText":text
    })
}

function build_big_image_container(){
    document.body.append(ao.qq({
        "nodetype":"img",
        "src":"https://synchronicity.cloud/largelogo.png"
    }))
}

function build_third_line(){
    let container = ao.qq({
        "id":"TheApp",
        "nodetype":"div",
        "styles":["colored_row_2"]
    })

    let table = ao.qq({
        "nodetype":"table",
        "styles":["main_table"]
    })
    container.append(table)

    let row = ao.qq({
        "nodetype":"tr",
        "styles":["row_height"]
    })
    table.append(row)

    let first_cell = ao.qq({
        "nodetype":"td"
    })
    row.append(first_cell)

    let second_cell = ao.qq({
        "nodetype":"td",
        "styles":["output_example_1"]
    })
    row.append(second_cell)

    first_cell.append(ao.qq({
        "nodetype":"img",
        "src":"https://synchronicity.cloud/settingscapture.png"
    }))

    second_cell.append(build_appearing_subtitle_block(`Precisely configure your availability search specifying:

    Duration of the timeframe being sought.

    Date and hour range where to look for availability. 

    Days of the week that you want to consider.

    Google calendars (you have access to) that you want to consider.

    And the ability to create the output adjusted to a different timezone.`))
    
    return container
}

function build_fourth_line(){

    let table = ao.qq({
        "nodetype":"table",
        "styles":["main_table"]
    })

    let row = ao.qq({
        "nodetype":"tr"
    })
    table.append(row)

    let first_cell = ao.qq({
        "nodetype":"td"
    })
    row.append(first_cell)

    let second_cell = ao.qq({
        "nodetype":"td"
    })
    row.append(second_cell)

    first_cell.append(build_appearing_text_block(`If you find yourself frequently scheduling one or more calendars, this is a helpful tool with minimal hassle and no surprises.`))

    second_cell.append(build_appearing_text_block(`The generated output is easily shareable trough messaging or emails as plain text, granting as many options as available for you or a third party to consider.`))

    return table
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