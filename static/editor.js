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

const readOutTable = () => {
    let saveOutTable = []
    for (let rc = 0; rc < rowCount; rc++) {
        saveOutTable[rc] = []
        for (let cc = 0; cc < colCount; cc++) {
            saveOutTable[rc][cc] = colorList[colorGrid[rc][cc]];
        }
    }
    return saveOutTable
}

const saveImage = (image) => {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status < 200 && xhr.status >= 300) {
            console.log("Error code: " + xhr.status)
        } else {
            loadImageList()
        }
    }

    xhr.responseType = "json"
    xhr.open("POST", "/image/save", true)
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(image));
}

const makeFileName = (name) => {
    let fileName = name.replace(" ", "_")
    fileName = fileName.replace(/\W/g, "")
    fileName = fileName + ".json"
    return fileName
}

const saveData = () => {
    let valueName = document.getElementById(imageName).value
    let valueDescription = document.getElementById(imageDescription).value
    let valueGap = document.getElementById(imageGap).value

    if (valueName == "") {
        console.log("You must provide a name.")
        return
    }
    if (valueDescription == "") { valueDescription = valueName }
    if (valueGap == "") { valueGap = defaultGap }

    let image = {
        "file": makeFileName(valueName),
        "count": colCount,
        "gap": valueGap,
        "description": valueDescription,
        "display": readOutTable()
    }

    saveImage(image)
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

const makeHr = () => {
    let hr = document.createElement("hr")
    hr.style.border = "1px solid #000000"
    return hr
}

const resizeAll = () => {
    setDivSize()
    centerDisplayDiv()
}

const setupEditor = () => {
    let d = document.getElementById(contentName)
    d.style.backgroundColor = "#ffffff"
    d.style.padding = "5px"
    d.style.marginBottom = "5px"

    d.appendChild(makeImageChoiceControl())
    d.appendChild(makeHr())

    d.appendChild(makeField("Name", imageName))
    d.appendChild(makeField("Description", imageDescription))
    d.appendChild(makeField("Gap", imageGap))

    let tableTitle = makeTitle("Editor")
    tableTitle.appendChild(makeTable(colCount, rowCount))
    d.appendChild(tableTitle)

    let controlsTitle = makeTitle("Controls")
    controlsTitle.appendChild(makeButton("Reset Grid", resetTable))
    controlsTitle.appendChild(makeButton("Save Image", saveData))
    d.appendChild(controlsTitle)
}

const startUp = () => {
    setBackgroundColor("#ffffff")
    makeDivContent()
    setupGrid(colCount, rowCount)
    setupEditor()
    loadImageList()
    resizeAll()
}
