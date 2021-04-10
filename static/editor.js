const colCount = 8;
const rowCount = 8;
const colorGrid = []
const colorList = [
    "#000000",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#00ffff",
    "#ffff00",
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

const buttonClicked = (el) => {
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
            tempButton.addEventListener("click", () => { buttonClicked(tempButton) })

            tempCell.appendChild(tempButton)
            tempRow.appendChild(tempCell)
        }
        elTableBody.appendChild(tempRow)
    }

    elTable.appendChild(elTableBody)
    let body = document.getElementsByTagName("body")[0]
    body.appendChild(elTable)
}

const startUp = () => {
    setupGrid(colCount, rowCount)
    makeTable(colCount, rowCount)
}
