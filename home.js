function build_big_image_container(){
    document.body.append(ao.qq({
        "nodetype":"img",
        "src":"https://synchronicity.cloud/largelogo.png"
    }))
}

window.onload = () => {
    build_headbar()
    build_big_image_container()
}