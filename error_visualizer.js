function fill_data_displays () {
    let data = JSON.parse(ao.simple.error_report_data_input.node.innerText)
    console.log(data)

    let settings_layout = ao.simple.settings_layout.node
    
    settings_layout.innerText = JSON.stringify(data.last_event_report,null,2,true)

    let settings_change = ao.simple.settings_change.node
    settings_change.innerText = JSON.stringify(data.last_event_settings_change,null,2,true)
}

function assemble_data_receptor(){
    let container = ao.qq({
        "nodetype":"div",
        "id":"error_report_data_input_contianer"
    })
    document.body.append(container)

    let receptor = ao.qq({
        "id":"error_report_data_input",
        "nodetype":"div",
        "contentEditable":true,
        "styles":["data_input"],
        
    })
    container.append(receptor)

    let go_button = ao.qq({
        "nodetype":"button",
        "value":"read data",
        "triggers":[
            ["click",()=>{fill_data_displays()}]
        ]
    })
    container.append(go_button)
}

function assemble_settings_display(){
    document.body.append(
        ao.qq({
            "id":"settings_layout",
            "nodetype":"div",
            "styles":["parsed_json_text"]
        })
    )
}

function assemble_settings_display(){
    document.body.append(
        ao.qq({
            "id":"settings_change",
            "nodetype":"div",
            "styles":["parsed_json_text"]
        })
    )
}

function assemble_events_pool(){
    document.body.append(
        ao.qq({
            "id":"events_list",
            "nodetype":"div",
            "styles":["vertical_list"]
        })
    )
}

function assemble_availability_map(){
    document.body.append(
        ao.qq({
            "id":"availability_map",
            "nodetype":"div",
            "styles":["vertical_list"]
        })
    )
}

function page_build(){
    assemble_data_receptor()
}

window.onload = () => {
    page_build()
}