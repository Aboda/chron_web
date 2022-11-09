
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

    first_cell.append(build_compund_main_message())
    second_cell.append(build_appearing_text_block("right appearing text"))

    return container
}

function build_second_line(){
    let row = ao.qq({
        "nodetype":"tr",
        "styles":["row_height"]
    })

    let first_cell = ao.qq({
        "nodetype":"td"
    })
    row.append(first_cell)

    let second_cell = ao.qq({
        "nodetype":"td"
    })
    row.append(second_cell)

    first_cell.append(build_appearing_text_block("Second First"))
    second_cell.append(build_appearing_text_block("Second Second"))

    return row
}

function build_main_message(text){
    return ao.qq({ 
        "nodetype":"p",
        "styles":["soft_appear"],
        "innerText":text
    })
}

function build_appearing_text_block(text){
    return ao.qq({ 
        "nodetype":"p",
        "styles":["main_clear_text","soft_appear"],
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