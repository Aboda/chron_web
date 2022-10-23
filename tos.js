let content = {
    "en":{
        "title":"Terms of Service",
        "last_update":"In Revision",
        "intro":"Thank you for your interest in Synchronicity, by using the Workpsace addOn you agree to these terms.",
        "paragraphs":[
            ["The application","Synchronicity is a Workspace Add On for Google Calendar (*The App*) that helps you generate shareable output (*The Output*) with the details of your calendar availability"],
            ["The use","Synchronicity performs an evaluation of the events in the indicated calendars and timerange looking for timeframes of a minimum length specified by the user, producing as output a short writing indicating available frames found"],
            ["The output","The output is a short writing that presents a single line for each day with the month/day evaluated and the timeranges in which there is continuos availability"],
            ["No Infringing or harmful use","You agree not to use The App or The Output with malicious or illegal purposes, including but not limited to spam"],
            ["No guarantees","The software is presented as is. With no waranteess of fitness for purpose. And no additional compromises from the provider"]
        ]
    },
    "es":{
        "title":"Terminos del Servicio",
        "last_update":"En revision",
        "intro":"Gracias por su interes en Synchronicity, al utilizar el Workspace addOn usted acepta estos terminos.",
        "paragraphs":[
            ["La aplicación","Synchronicity is a Workspace Add On for Google Calendar (*The App*) that helps you generate shareable output (*The Output*) with the details of your calendar availability"],
            ["El uso","Synchronicity performs an evaluation of the events in the indicated calendars and timerange looking for timeframes of a minimum length specified by the user, producing as output a short writing indicating available frames found"],
            ["El resultado","The output is a short writing that presents a single line for each day with the month/day evaluated and the timeranges in which there is continuous availability"],
            ["No utilizar para actividades perniciosas","You agree not to use The App or The Output with malicious or illegal purposes, including but not limited to spam"],
            ["Sin garantias","The software is presented as is. With no waranteess of fitness for purpose. And no additional compromises from the provider"]
        ]
    }    
}

function build_tos() {
    let general_container = ao.qq({
        "nodetype":"div"
    })
    
    for (let para of content.en.paragraphs) {
        let line_container = ao.qq({
            "nodetype":"div",
            "styles":["text_list"]
        })

        general_container.append(line_container)

        let title_container = ao.qq({
            "nodetype":"div",
            "styles":["text_list"],
            "width":window.innerWidth * .30 + "px"
        })
        line_container.append(title_container)

        title_container.append(ao.qq({
            "nodetype":"p",
            "innerText":para[0],
            "styles":["entry_title"]
        }))

        let text_container = ao.qq({
            "nodetype":"div",
            "width":window.innerWidth * .60 + "px"
        })
        line_container.append(text_container)

        text_container.append(ao.qq({
            "nodetype":"p",
            "innerText":para[1],
            "styles":["entry_text"]
        }))
    }
    document.body.append(general_container)
}

function build_tos_table(){
    let table = ao.qq({
        "nodetype":"table",
    })

    for (let para of content.en.paragraphs) {
        let row = ao.qq({
            "nodetype":"tr"
        })
        table.append(row)
        let title_cell = o.qq({
            "nodetype":"td"
        })
        row.append(title_cell)
        let content_cell = o.qq({
            "nodetype":"td"
        })
        row.append(content_cell)

        title_cell.append(ao.qq({
            "nodetype":"p",
            "innerText":para[1]
        }))

        content_cell.append(ao.qq({
            "nodetype":"p",
            "innerText":para[0]
        }))

    }

    document.body.append(table)
}

window.onload = () => {
    build_headbar()
    //build_tos()
}