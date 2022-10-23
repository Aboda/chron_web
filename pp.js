let content = {
    "en":{
        "title":"Privacy Policy",
        "last_update":"In Revision",
        "paragraphs":[
            ["Security","All access control is managed by Google Apps Scripts, no information is sent by the client to any server."],
            ["Personal information","No information is automatically collected by the application. All queried information is evaluated on the spot by the addOn without communication with other backend that the Google data providing one. The exception is when creating a malfunction email report, in which case, the informattion attached is helpful to asses some malfunctions, and this process is manual and conducted by the user allowing for revision or censorship of the troubleshooting data." ],
            ["Platform","The Google Apps Scripts Workspace addOn environment is used as provided to manage and service the application functionality, any and all metrics or tracking observed belong to this infrastructure, not the company behind Syncrhonicity."]
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

function build_pp(){
    let general_container = ao.qq({
        "nodetype":"div"
    })

    let header = ao.qq({
        "nodetype":"p",
        "innerText":content.en.title,
        "styles":["hitting_text"]
    })
    general_container.append(header)


    let table = ao.qq({
        "nodetype":"table",
    })
    general_container.append(table)
   

    for (let para of content.en.paragraphs) {
        let row = ao.qq({
            "nodetype":"tr"
        })
        table.append(row)
        let title_cell = ao.qq({
            "nodetype":"td"
        })
        row.append(title_cell)
        let content_cell = ao.qq({
            "nodetype":"td"
        })
        row.append(content_cell)

        title_cell.append(ao.qq({
            "nodetype":"p",
            "innerText":para[0],
            "styles":["entry_title"]
        }))

        content_cell.append(ao.qq({
            "nodetype":"p",
            "innerText":para[1],
            "styles":["entry_text"]
        }))

    }

    document.body.append(general_container)
}

window.onload = () => {
    build_headbar()
    build_pp()
}