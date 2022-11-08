function main_build(){
    let main_table = build_homepage_squeleton()
    main_table.append(build_first_line())
    document.body.append(main_table)
}

function build_first_line(){
    let row = ao.qq({
        "nodetype":"tr"
    })

    let first_cell = ao.qq({
        "nodetype":"td"
    })
    row.append(first_cell)

    let second_cell = ao.qq({
        "nodetype":"td"
    })
    row.append(second_cell)

    first_cell.append(build_appearing_text_block("left appearing text"))
    second_cell.append(build_appearing_text_block("right appearing text"))

    return row
}


function build_homepage_squeleton(){
   return ao.qq({
        "id":"main_table",
        "nodetype":"table",
        "styles":["main_table"]
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

window.onload = () => {
    build_headbar()
    main_build()
}