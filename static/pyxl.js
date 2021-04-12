const setImage = (image) => {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status != 200) {
            console.log("Error code: " + xhr.status)
        }
    };

    xhr.responseType = "json"
    xhr.open("PUT", "/image/"+image, true)
    xhr.send();
}

const getPixelSize = (canvas, count, gap) => {
    let totalGap = (count * gap) + gap
    let pixelSize = Math.floor((canvas.height - totalGap) / count)
    return pixelSize
}

const drawPixels = (display, pixelCount, pixelGap) => {
    let c = document.getElementById(canvasName)
    let ctx = c.getContext("2d");
    let pixelSize = getPixelSize(c, pixelCount, pixelGap)
    let yPos = pixelGap

    for(let cy = 0; cy < pixelCount; cy++) {
        let xPos = pixelGap

        for (let cx = 0; cx < pixelCount; cx++) {
            ctx.fillStyle = display[cy][cx]
            ctx.fillRect(xPos, yPos, pixelSize, pixelSize)
            xPos += (pixelSize + pixelGap)
        }

        yPos += (pixelSize + pixelGap)
    }
}

const loadImage = () => {
    let xhr = new XMLHttpRequest();

    xhr.onload = () => {
        if (xhr.status == 200) {
            let resp = xhr.response
            drawPixels(resp["display"], resp["count"], resp["gap"])
        }
        else {
            console.log("Error code: " + xhr.status)
        }
    };

    xhr.responseType = "json"
    xhr.open("GET", "/image", true)
    xhr.send();
}

const setCanvasSize = () => {
    let c = document.getElementById(canvasName)
    c.width = c.parentElement.offsetWidth
    c.height = c.parentElement.offsetHeight
}

const resizeAll = () => {
    setDivSize()
    centerDisplayDiv()
    setCanvasSize()
    loadImage()
}

const makeCanvas = () => {
    let c = document.createElement("canvas")
    c.setAttribute("id", canvasName)
    let d = document.getElementById(contentName)
    d.appendChild(c)

}

const startUp = () => {
    makeDivContent()
    makeCanvas()
    setInterval(loadImage, defaultIntervalTime)
    resizeAll()
}
