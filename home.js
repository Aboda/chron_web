
function build_first_line(){
    let container = ao.qq({
        "nodetype":"div",
        "styles":["colored_row"]
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
        "nodetype":"td"
    })
    row.append(second_cell)

    first_cell.append(build_compound_main_message())
    second_cell.append(build_appearing_text_block("right appearing text"))

    return container
}

function build_compound_main_message(){
    let composition_container = ao.qq({
        "nodetype":"div",
        "id":"main_comp_1"
    })

    let biggest_letters
    let just_big_letters
    let get_it_icon

    return composition_container
}

function build_second_line(){

    let table = ao.qq({
        "nodetype":"table"
    })

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
        "nodetype":"td"
    })
    row.append(second_cell)

    first_cell.append(build_appearing_text_block("Synchronicity helps you analize google calendars for available timeframes of the size of your choice, generating a simple shareable output:"))
    second_cell.append(build_appearing_text_block(`Thu 11/10, 9a - 1p, 2p - 5p
    Fri 11/11, 9a - 1p, 3p - 5p
    Mon 11/14, 10a - 12p, 1p - 5p
    Tue 11/15, 9a - 10a, 11a - 1p, 2p - 5p
    Wed 11/16, 9a - 11a, 12p - 1p, 2p - 5p`))

    return table
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
        "styles":["subtitle_clear_text","soft_appear"],
        "innerText":text
    })
}

function build_appearing_text_block(text){
    return ao.qq({ 
        "nodetype":"p",
        "styles":["soft_appear"],
        "innerText":text
    })
}

function build_big_image_container(){
    document.body.append(ao.qq({
        "nodetype":"img",
        "src":"https://synchronicity.cloud/largelogo.png"
    }))
}

function main_build(){
    document.body.append(build_first_line())
    document.body.append(build_second_line())
}

window.onload = () => {
    build_headbar()
    main_build()
}