const contentName = "content"
const canvasName = "theCanvas"
const defaultIntervalTime = 10000
const defaultGap = 2
const imageDescription = "imageDescription"
const imageGap = "imageGap"
const imageName = "imageName"
const colCount = 16;
const rowCount = 16;
const colorGrid = []
const colorList = [
    "#000000",
    "#ff0000",
    "#ffaa00",
    "#ffff00",
    "#0000ff",
    "#00ffff",
    "#00ff00",
    "#cc00cc",
    "#660099",
    "#ffffff"
]
const paletteId = "thePalette"
const chosenColorId = "chosenColor"
const paletteColumns = 2
const hexCodeAttr = "hexCode"

const makeDivContent = () => {
    let dc = document.createElement("div")
    dc.setAttribute("id", contentName)
    let body = document.getElementsByTagName("body")[0]
    body.appendChild(dc)
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

const setBackgroundColor = (bgcolor) => {
    let b = document.getElementsByTagName("body")[0]
    b.style.backgroundColor = bgcolor
}