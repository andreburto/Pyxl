const contentName = "content"
const canvasName = "theCanvas"
const defaultIntervalTime = 10000

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

const setDivSize = () => {
    let html = document.documentElement;
    let divSize = Math.min(html.clientWidth, html.clientHeight)
    let div = document.getElementById(contentName)
    div.style.width = divSize + "px"
    div.style.height = divSize + "px"
}

const centerDisplayDiv = () => {
    let html = document.documentElement;
    let div = document.getElementById(contentName)
    // Calculate horizontal spacing.
    let divX = Math.floor((html.clientWidth - div.offsetWidth) / 2)
    // Calculate vertical spacing.
    let divY = Math.floor((html.clientHeight - div.offsetHeight) / 2)
    // Assign positions to the two div elements.
    div.style.left = divX + "px"
    div.style.top = divY + "px"
}

const resizeAll = () => {
    setDivSize()
    centerDisplayDiv()
    setCanvasSize()
    loadImage()
}

const startUp = () => {
    setInterval(loadImage, defaultIntervalTime)
    resizeAll()
}
