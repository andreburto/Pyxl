const imageDescription = "imageDescription"
const imageGap = "imageGap"
const imageName = "imageName"
const colCount = 8;
const rowCount = 8;
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

const setupGrid = (cols, rows) => {
    for (let rc = 0; rc < rows; rc++) {
        colorGrid[rc] = []
        for (let cc = 0; cc < cols; cc++) {
            colorGrid[rc][cc] = 0;
        }
    }
}

const buttonClicked = (id) => {
    let el = document.getElementById(id)
    let x = el.getAttribute("x")
    let y = el.getAttribute("y")
    let colorIndex = colorGrid[y][x] + 1
    if (colorIndex >= colorList.length) { colorIndex = 0 }
    colorGrid[y][x] = colorIndex
    el.style.backgroundColor = colorList[colorIndex]
}

const makeTable = (cols, rows) => {
    const elTable = document.createElement("table")
    const elTableBody = document.createElement("tbody")
    for (let rc = 0; rc < rows; rc++) {
        let tempRow = document.createElement("tr")
        for (let cc = 0; cc < cols; cc++) {
            let tempCell = document.createElement("td")
            let tempButton = document.createElement("button")
            tempButton.setAttribute("id", "x"+cc+"y"+rc)
            tempButton.setAttribute("x", cc)
            tempButton.setAttribute("y", rc)
            tempButton.setAttribute("class", "grid")
            tempButton.style.backgroundColor = colorGrid[rc][cc]
            tempButton.addEventListener("click", () => { buttonClicked("x"+cc+"y"+rc) })
            tempCell.appendChild(tempButton)
            tempRow.appendChild(tempCell)
        }
        elTableBody.appendChild(tempRow)
    }
    elTable.appendChild(elTableBody)
    return elTable
}

const resetTable = () => {
    for (let rc = 0; rc < rowCount; rc++) {
        for (let cc = 0; cc < colCount; cc++) {
            let cell = document.getElementById("x"+cc+"y"+rc)
            colorGrid[rc][cc] = 0;
            cell.style.backgroundColor = colorList[0]
        }
    }
}

const saveData = () => {
    valueName = document.getElementById(imageName).innerText
    console.log(valueName)
}

const makeTitle = (title) => {
    let p = document.createElement("p")
    let s = document.createElement("span")
    let b = document.createElement("br")
    s.innerText = title
    p.appendChild(s)
    p.appendChild(b)
    return p
}

const makeField = (title, id) => {
    let p = makeTitle(title)
    let i = document.createElement("input")
    i.setAttribute("id", id)
    p.appendChild(i)
    return p
}

const makeButton = (title, func) => {
    let b = document.createElement("button")
    b.innerText = title
    b.addEventListener("click", func)
    return b
}

const resizeAll = () => {
    setDivSize()
    centerDisplayDiv()
}

const setupEditor = () => {
    let d = document.getElementById(contentName)
    let tableTitle = makeTitle("Editor")
    let controlsTitle = makeTitle("Controls")
    d.style.backgroundColor = "#ffffff"
    d.style.padding = "5px"
    d.appendChild(makeField("Name", imageName))
    d.appendChild(makeField("Description", imageDescription))
    d.appendChild(makeField("Gap", imageGap))
    tableTitle.appendChild(makeTable(colCount, rowCount))
    d.appendChild(tableTitle)

    controlsTitle.appendChild(makeButton("Reset Grid", resetTable))
    controlsTitle.appendChild(makeButton("Save Image", saveData))
    d.appendChild(controlsTitle)


}

const startUp = () => {
    makeDivContent()
    setupGrid(colCount, rowCount)
    setupEditor()
    resizeAll()
}
