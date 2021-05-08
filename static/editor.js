const buttonClicked = (id) => {
    let el = document.getElementById(id)
    let chosenColor = document.getElementById(chosenColorId)
    el.style.backgroundColor = chosenColor.style.backgroundColor
    el.setAttribute(hexCodeAttr, chosenColor.getAttribute(hexCodeAttr))
}

const makeTable = (cols, rows) => {
    let elTable = document.createElement("table")
    let elTableBody = document.createElement("tbody")
    for (let rc = 0; rc < rows; rc++) {
        let tempRow = document.createElement("tr")
        for (let cc = 0; cc < cols; cc++) {
            let tempCell = document.createElement("td")
            let tempButton = document.createElement("button")
            tempButton.setAttribute("id", "x"+cc+"y"+rc)
            tempButton.setAttribute("x", cc)
            tempButton.setAttribute("y", rc)
            tempButton.setAttribute("class", "grid")
            tempButton.setAttribute(hexCodeAttr, colorList[0])
            tempButton.style.backgroundColor = colorList[0]
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
            tempButton.setAttribute(hexCodeAttr, colorList[0])
            cell.style.backgroundColor = colorList[0]
        }
    }
}

const readOutTable = () => {
    let saveOutTable = []
    for (let rc = 0; rc < rowCount; rc++) {
        saveOutTable[rc] = []
        for (let cc = 0; cc < colCount; cc++) {
            let cell = document.getElementById("x"+cc+"y"+rc)
            saveOutTable[rc][cc] = cell.getAttribute(hexCodeAttr)
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
    if (valueGap == "") {
        valueGap = defaultGap
    } else {
        valueGap = parseInt(valueGap)
    }

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
    return document.createElement("hr")
}

const colorSelected = (id) => {
    let colorChoice = document.getElementById(id)
    let colorChosen = document.getElementById(chosenColorId)
    colorChosen.style.backgroundColor = colorChoice.style.backgroundColor
    colorChosen.setAttribute(hexCodeAttr, colorChoice.getAttribute(hexCodeAttr))
}

const drawPalette = (cols) => {
    let paletteWidth = cols == undefined ? 2 : cols;
    let elTable = document.createElement("table")
    let elTableBody = document.createElement("tbody")
    let colorIndex = 0;
    for (let rc = 0; colorIndex < colorList.length; rc++) {
        let tempRow = document.createElement("tr")
        for (let cc = 0; cc < paletteWidth; cc++) {
            if (colorIndex < colorList.length) {
                let tempCell = document.createElement("td")
                let tempButton = document.createElement("button")
                tempButton.setAttribute("id", "x"+cc+"y"+rc+"p")
                tempButton.setAttribute("class", "paletteColor")
                tempButton.setAttribute(hexCodeAttr, colorList[colorIndex])
                tempButton.style.backgroundColor = colorList[colorIndex]
                tempButton.style.padding = "1px"
                tempButton.addEventListener("click", () => { colorSelected("x"+cc+"y"+rc+"p") })
                tempCell.appendChild(tempButton)
                tempRow.appendChild(tempCell)
                colorIndex += 1
            }
        }
        elTableBody.appendChild(tempRow)
    }
    let tempRow = document.createElement("tr")
    let tempCell = document.createElement("td")
    tempCell.setAttribute("colspan", paletteWidth)
    let chosenColorDiv = document.createElement("div")
    chosenColorDiv.setAttribute("id", chosenColorId)
    chosenColorDiv.setAttribute("class", "paletteColor")
    chosenColorDiv.style.backgroundColor = colorList[0]
    chosenColorDiv.style.width = (paletteWidth * 50) + "px"
    tempCell.appendChild(chosenColorDiv)
    tempRow.appendChild(tempCell)
    elTableBody.appendChild(tempRow)
    elTable.appendChild(elTableBody)

    let paletteDiv = document.createElement("div")
    let paletteTitle = document.createElement("p")
    paletteDiv.setAttribute("id", paletteId)
    paletteTitle.style.textAlign = "center"
    paletteTitle.innerText = "Choose color"
    paletteDiv.appendChild(paletteTitle)
    paletteDiv.appendChild(elTable)

    return paletteDiv
}

const resizeAll = () => {
    setDivSize()
    centerDisplayDiv()
}

const setupEditor = () => {
    let d = document.getElementById(contentName)
    let body = document.getElementsByTagName("body")[0]
    let paletteWidget = drawPalette(paletteColumns)
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

    body.appendChild(paletteWidget)
}

const startUp = () => {
    setBackgroundColor("#ffffff")
    makeDivContent()
    setupEditor()
    loadImageList()
    resizeAll()
}
