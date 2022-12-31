function assemble_data_receptor(){
    let main_container = ao.qq({
        "nodetype":"div",
        "id":"main_container",
        "styles":["hor_flex"]
    })
    document.body.append(main_container)

    let section_container =  ao.qq({
        "nodetype":"div",
        "id":"data_receptor_container",
        "styles":["hor_flex","card25x14"]
    })
    main_container.append(section_container)

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

    let reset_button = ao.qq({
        "id":"reset_button",
        "nodetype":"button",
        "value":"reset",
        "disabled":true,
        "triggers":[
            ["click",()=>{window.location.reload()}]
        ]
    })
    section_container.append(reset_button)
}

function fill_data_displays() {
    let input_text = ao.simple.error_report_data_input.node.innerText
    let data_length = input_text.length
    let data = JSON.parse(input_text)
    let mc = ao.simple.main_container.node
    console.log(data)
    ao.simple.ingest_button.node.disabled = true
    ao.simple.reset_button.node.disabled = false
    mc.append(build_datapacket_resume(data,data_length))
    mc.append(build_time_references_1(data))
    mc.append(build_essential_card("output",data.last_event_report.output))
    mc.append(build_time_references_2(data))
    mc.append(build_days_card(data))

    let exclusion_list = {
        "version":true,
        "email":true,
        "load_event":true,
        "first_connection":true,
        "last_connection":true,
        "script_user_timezone":true,
        "script_user_offset":true,
        "output":true,
        "duration":true,
        "hour_frame":true,
        "date_frame":true
    }

    for (let item in data.last_event_report){
        if (exclusion_list[item] == undefined) {
            ao.simple.main_container.node.append(build_essential_card(item+": ",JSON.stringify(data.last_event_report[item])))
        }
    }
}

function build_datapacket_resume(data, data_lenght){
    let container = ao.qq({
        "nodetype":"div",
        "styles":["vertical_list","card25x14"]
    })
    container.append(build_mini_card("version",data.last_event_report.version))
    container.append(build_mini_card("email",data.last_event_report.email))
    container.append(build_mini_card("load_event",data.last_event_report.load_event))
    container.append(build_mini_card("characters",data_lenght))
    return container
}

function build_time_references_1 (data){
    let container = ao.qq({
        "nodetype":"div",
        "styles":["vertical_list","card25x14"]
    })
    container.append(build_mini_card("first_connection",data.last_event_report.first_connection))
    container.append(build_mini_card("last_connection",data.last_event_report.last_connection))
    container.append(build_mini_card("script_user_timezone",data.last_event_report.script_user_timezone))
    container.append(build_mini_card("script_user_offset",data.last_event_report.script_user_offset))
    return container
}

function build_time_references_2 (data){
    let container = ao.qq({
        "nodetype":"div",
        "styles":["vertical_list","card25x14"]
    })
    let hour_frame_nice = data.last_event_report.hour_frame.start.hours + ":"+data.last_event_report.hour_frame.start.minutes + " -> " + data.last_event_report.hour_frame.end.hours + ":"+data.last_event_report.hour_frame.end.minutes


    container.append(build_mini_card("duration",data.last_event_report.duration))
    container.append(build_mini_card("hour_frame",hour_frame_nice))
    container.append(build_mini_card("date_frame(start)",data.last_event_report.date_frame.start))
    container.append(build_mini_card("date_frame(end)",data.last_event_report.date_frame.end))
    return container
}



function build_days_card(data){
    let dotw_container = ao.qq({
        "id":"dotw_container",
        "nodetype":"div",
        "styles":["vertical_list","basic_display_card"]
    })

    for (let ordered_day of data.last_event_report.weekdays) {
        dotw_container.append(
            ao.qq({
                "nodetype":"p",
                "innerText":ordered_day + " "+rewrite_boolean(data.last_event_report.dotw[ordered_day],"Consider","Ignore")
            })
        )
    }

    return dotw_container
}

function rewrite_boolean(boolean,value_if_true,value_if_else){
    if (boolean) {
        return value_if_true
    }else{
        return value_if_else
    }
}

function build_essential_card(title,content){
    let basic_card_base = ao.qq({
        "nodetype":"div",
        "styles":["hor_flex","basic_display_card"]
    })

    basic_card_base.append(ao.qq({
        "nodetype":"b",
        "innerText":title
    }))

    basic_card_base.append(ao.qq({
        "nodetype":"p",
        "innerText":content
    }))

    return basic_card_base
}

function build_mini_card(title,content){
    let basic_card_base = ao.qq({
        "nodetype":"div",
        "styles":["hor_flex","main_table"]
    })

    basic_card_base.append(ao.qq({
        "nodetype":"b",
        "innerText":title
    }))

    basic_card_base.append(ao.qq({
        "nodetype":"p",
        "innerText":content
    }))

    return basic_card_base
}

window.onload = () => {
    build_headbar()
    assemble_data_receptor()
    build_closer_line()    
}