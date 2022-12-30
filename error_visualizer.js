function build_base_display(){
    document.body.append(
        ao.qq({
            "nodetype":"div",
            "id":"main_container",
            "styles":["vertical_list"]
        })
    )
}

function fill_data_displays () {
    let data = JSON.parse(ao.simple.error_report_data_input.node.innerText)
    console.log(data)

    
    let settings_layout = ao.simple.settings_layout.node
    let settings_change = ao.simple.settings_change.node
    
    console.log(settings_layout,settings_change)
    
    settings_layout.innerText = JSON.stringify(data.last_event_report,null,2,true)
    settings_change.innerText = JSON.stringify(data.last_event_settings_change,null,2,true)
 
}

function assemble_data_receptor(){

    let section_container =  ao.qq({
        "nodetype":"div",
        "id":"data_receptor_container",
        "styles":["horizontal_list"]
    })
    ao.simple.main_container.node.append(section_container)

    let receptor = ao.qq({
        "id":"error_report_data_input",
        "nodetype":"div",
        "contentEditable":true,
        "styles":["data_input"],
        
    })
    section_container.append(receptor)

    let go_button = ao.qq({
        "id":"ingest_button",
        "nodetype":"button",
        "value":"read data",
        "triggers":[
            ["click",()=>{fill_data_displays()}]
        ]
    })
    section_container.append(go_button)


}

function assemble_settings_display(){
    document.body.append(
        ao.qq({
            "id":"settings_layout",
            "nodetype":"div",
            "styles":["vertical_list"]
        })
    )
}

function assemble_settings_change(){
    document.body.append(
        ao.qq({
            "id":"settings_change",
            "nodetype":"div",
            "styles":["vertical_list"]
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
    build_base_display()
    assemble_data_receptor()
    assemble_settings_display()
    assemble_settings_change()
    assemble_events_pool()
    assemble_availability_map()
}

window.onload = () => {
    page_build()
}