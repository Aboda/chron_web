function build_headbar(){
    let links = [
        ["Home","Inicio","https://synchronicity.cloud/"],
        ["Terms of Service","Terminos del Servicio","https://synchronicity.cloud/terms_of_service"],
        ["Privacy Agreement","Politica de Privacidad","https://synchronicity.cloud/privacy_policy"]
    ]
    
    let lng_index
    
    function assert_lng_index(){
        if (ao.lng == "en") {
            lng_index = 0
        }
        if (ao.lng == "es") {
            lng_index = 1
        }
    }
    
    assert_lng_index()
    
    let headbar = ao.qq({
        "name":"headbar",
        "nodetype":"div",
        "styles":["color_contrast_1","top_header_bar"]
    })
  
    for (let lnk of links){
        headbar.append(ao.qq({
            "nodetype":"div",
            "innerText":lnk[lng_index],
            "arb-target":lnk[2]
        }))
    }
    
    document.body.append(headbar)
}

window.onload = (event) => {
    build_headbar()
};