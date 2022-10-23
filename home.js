function build_big_image_container(){
    body.append(ao.qq({
        "nodetype":"img",
        "src":"https://synchronicity.cloud/midlogo.png",
        "width":"200px",
        "height":"200px"
    }))
}

window.onload = () => {
    build_headbar()
    build_big_image_container()
}