function build_base_display(){
    document.body.append(
        ao.qq({
            "nodetype":"div",
            "id":"main_container",
            "styles":["hor_flex"]
        })
    )
}

function assemble_data_receptor(){

    let section_container =  ao.qq({
        "nodetype":"div",
        "id":"data_receptor_container",
        "styles":["hor_flex","input_card_1"]
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
    console.log(Object.keys(data))
    console.log(data)
    ao.simple.ingest_button.node.disabled = true
    ao.simple.reset_button.node.disabled = false
    
    for (let item in data.last_event_report){
        ao.simple.main_container.node.append(build_essential_card(item,JSON.stringify(data.last_event_report[item])))
    }
    /*
    ao.simple.main_container.node.append(build_datapacket_resume(data,data_length))
    ao.simple.main_container.node.append(assemble_settings_display(data))
    ao.simple.main_container.node.append(assemble_events_display(data))
    */
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

function build_datapacket_resume(data, data_lenght){
    let container = ao.qq({
        "nodetype":"div",
        "id":"datapacket_resume",
        "styles":["vertical_list"]
    })
    let packet_size_display = ao.qq({
        "nodetype":"div",
        "id":"packet_size_display",
        "styles":["hor_flex"],
        "innerText":data_lenght + " Characters"
    })
    container.append(packet_size_display)

    let version_display = ao.qq({
        "nodetype":"div",
        "id":"version_display",
        "styles":["hor_flex"],
        "innerText":data.last_event_report.version
    })
    container.append(version_display)
    let email_display = ao.qq({
        "nodetype":"div",
        "id":"email_display",
        "styles":["hor_flex"],
        "innerText":data.last_event_report.email
    })
    container.append(email_display)
    let load_event_display = ao.qq({
        "nodetype":"div",
        "id":"load_event_display",
        "styles":["hor_flex"],
        "innerText":data.last_event_report.load_event
    })
    container.append(load_event_display)
    let first_sigth_display = ao.qq({
        "nodetype":"div",
        "id":"first_sigth_display",
        "styles":["hor_flex"],
        "innerText":data.last_event_report.first_connection
    })
    container.append(first_sigth_display)
    let this_sigth_display = ao.qq({
        "nodetype":"div",
        "id":"this_sigth_display",
        "styles":["hor_flex"],
        "innerText":data.last_event_report.last_connection
    })
    container.append(this_sigth_display)
    return container
}

function assemble_settings_display(data){
    let first_settings_container  = ao.qq({
        "id":"first_settings_container",
        "nodetype":"div",
        "styles":["hor_flex"]
    })

    let dotw_container = ao.qq({
        "id":"dotw_container",
        "nodetype":"div",
        "styles":["vertical_list"]
    })
    first_settings_container.append(dotw_container)

    for (let ordered_day of data.last_event_report.weekdays) {
        dotw_container.append(
            ao.qq({
                "nodetype":"p",
                "id":"settings_dotw_"+ordered_day,
                "innerText":ordered_day + " "+rewrite_boolean(data.last_event_report.dotw[ordered_day],"Consider","Ignore")
            })
        )
        
    }

    let main_query_settings_container = dotw_container = ao.qq({
        "id":"main_query_settings_container",
        "nodetype":"div",
        "styles":["vertical_list"]
    })
    first_settings_container.append(main_query_settings_container)

    let duration_display = ao.qq({
        "nodetype":"div",
        "id":"duration_display",
        "styles":["hor_flex"],
        "innerText":data.last_event_report.duration
    })
    main_query_settings_container.append(duration_display)

    let timeframe_display = ao.qq({
        "nodetype":"div",
        "id":"timeframe_display",
        "styles":["hor_flex"],
        "innerText":data.last_event_report.hour_frame.start.hours + ":"+data.last_event_report.hour_frame.start.minutes + " to " + data.last_event_report.hour_frame.end.hours + ":"+data.last_event_report.hour_frame.end.minutes
    })
    main_query_settings_container.append(timeframe_display)

    let user_script_utc_timezone = ao.qq({
        "nodetype":"div",
        "id":"user_script_utc_timezone",
        "styles":["hor_flex"],
        "innerText":data.last_event_report.script_user_timezone + " " + data.last_event_report.script_user_offset
    })
    main_query_settings_container.append(user_script_utc_timezone)
    
    let date_frame_dsiplay = ao.qq({
        "nodetype":"div",
        "id":"date_frame_dsiplay",
        "styles":["hor_flex"],
        "innerText":data.last_event_report.date_frame.start + " to " + data.last_event_report.date_frame.end
    })
    main_query_settings_container.append(date_frame_dsiplay)

    let target_offset_display = ao.qq({
        "nodetype":"div",
        "id":"target_offset_display",
        "styles":["hor_flex"],
        "innerText":data.last_event_report.target_offset
    })
    main_query_settings_container.append(target_offset_display)

    return first_settings_container
}

function assemble_events_display(data){
    let placeholder = ao.qq({
        "nodetype":"div",
        "innerText":JSON.stringify(data.last_event_report.events_from_blocking_calendars,null,2,true)
    })

    return placeholder
}

function rewrite_boolean(boolean,value_if_true,value_if_else){
    if (boolean) {
        return value_if_true
    }else{
        return value_if_else
    }
}

function assemble_settings_change(){
    ao.simple.main_container.node.append(
        ao.qq({
            "id":"settings_change",
            "nodetype":"div",
            "styles":["vertical_list"]
        })
    )
}

function assemble_events_pool(){
    ao.simple.main_container.node.append(
        ao.qq({
            "id":"events_list",
            "nodetype":"div",
            "styles":["vertical_list"]
        })
    )
}

function assemble_availability_map(){
    ao.simple.main_container.node.append(
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
}

window.onload = () => {
    page_build()
}