let content = {
    "en":{
        "title":"Privacy Policy",
        "last_update":"In Revision",
        "paragraphs":[
            ["Privacy Policy.",`Synchronicity Cloud LLC (“Synchronicity”, “we”, or “us”) recognizes the importance of privacy. We want you to feel confident using our services, and this privacy notice (“Privacy Notice” or “Notice”) is to help you understand and describe how we collect, use, and disclose your information.
            What information we collect and how it is collected
            With whom we may share information
            Legal basis for processing the information
            Your rights and choices
            Security and storage of the information
            Third-party websites
            Users outside the United States
            CCPA Compliance
            Changes to the Notice; and
            Contacting Synchronicity
            Throughout this document, we will use a few terms to describe various products and roles. All of the text, data, information, software, graphics, photographs and more that we and our affiliates may make available to you, plus our websites and any services, plug-ins, software, or applications (including Synchronicity Click, Synchronicity for Chrome, Synchronicity for Firefox, and any Synchronicity applications) that we may provide all together constitute the Synchronicity “Website.” 
            `],
            ["Information We Collect.","We do not collect information about you." ],
            ["Calendar Information.","A Synchronicity User may connect their calendar with Synchronicity. Our calendar integration only checks the duration and free/busy status of the events in your calendar so that we don’t book you when you’re busy. We never store who you are meeting with, their email address, the meeting title, or any other details about the appointments in your connected calendar."],
            ["Information Collected Automatically.","The workspace addOn deployment environment performs anonymized data recollection to assist in the development and troubleshooting of the service delivered."],
            ["Log & Device data.","When you use Synchronicity, our servers automatically record information (“log data”), including information that your browser sends whenever you visit our Website. This log data may include the web address you came from or are going to, your device model, operating system, browser type, unique device identifier, IP address, mobile network carrier, and time zone or location. Whether we collect some or all of this information often depends on what type of device you’re using and its settings. For example, different types of information are available depending on whether you’re using a Mac or PC, or an iPhone or an Android phone. To learn more about what information your device makes available to us, please check the policies of your device manufacturer or software provider."],
            ["Cookie data.",`Depending on how you’re accessing our services and subject to your opt-out preferences, we may use “Cookies” (a small text file sent by your computer each time you visit our Website, unique to your Synchronicity account or your browser) or similar technologies to record log data. When we use Cookies, we may use ‘session’ Cookies (that last until you close your browser) or ‘persistent’ Cookies (that last until you or your browser deletes them). For example, we may use Cookies to keep you logged into Synchronicity. Some of the Cookies we use are associated with your Synchronicity account (including personal information about you, such as the email address you gave us), and other Cookies are not. `],
            ["Third Party Tools.",`we use third-party Service Providers such as Google Analytics to provide certain analytics and Viewer interactions services to Synchronicity in connection with our operation of our Website, including the collection and tracking of certain data and information regarding the characteristics and activities of visitors to Synchronicity. You may opt-out of relevant cookies using opt-out features on their respective websites.
            Synchronicity may implement Google reCAPTCHA Enterprise to help prevent spam and abuse. reCAPTCHA Enterprise collects hardware and software information, such as device and application data, and sends it to Google for purposes of providing, maintaining, and improving reCAPTCHA Enterprise and for general security purposes. This information is not used by Google for personalized advertising. Your use of reCAPTCHA Enterprise is subject to Google’s Privacy Policy and Terms of Use.`],
            ["How We Use Your Information.",`We do not collect data about you.`],
            ["How We Use Your Information.",`We do not collect data about you.`]
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
            ["Sin garantias","The software is presented as is. With no waranteess of fitness for purpose. And no additional compromises from the provider"],
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