const buttonClicked = (id) => {
    console.log("id: "+id)
    let el = document.getElementById(id)
    let chosenColor = document.getElementById(chosenColorId)
    el.style.backgroundColor = chosenColor.style.backgroundColor
    setAttributes(el, {"hexcode": chosenColor.getAttribute("hexcode")})
}

const makeTable = (cols, rows) => {
    let elTable = document.createElement("table")
    let elTableBody = document.createElement("tbody")
    for (let rc = 0; rc < rows; rc++) {
        let tempRow = document.createElement("tr")
        for (let cc = 0; cc < cols; cc++) {
            let tempCell = document.createElement("td")
            let tempButton = document.createElement("button")
            setAttributes(tempButton, {
                "id": "x"+cc+"y"+rc, "class": "grid", "hexcode": colorList[0], "x": cc, "y": rc
            })
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
            console.log("id: "+"x"+cc+"y"+rc)
            let cell = document.getElementById("x"+cc+"y"+rc)
            cell.setAttribute("hexcode", colorList[0])
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
            saveOutTable[rc][cc] = cell.getAttribute("hexcode")
        }
    }
    console.log(saveOutTable)
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

const makeField = (title, id) => {
    let d = document.createElement("div")
    setAttributes(d, {"class": "editorFields"})
    let p = makeTitle(title)
    let i = document.createElement("input")
    i.setAttribute("id", id)
    p.appendChild(i)
    d.appendChild(p)
    return d
}

const makeButton = (title, func) => {
    let b = document.createElement("button")
    b.innerText = title
    b.addEventListener("click", func)
    return b
}

const colorSelected = (id) => {
    let colorChoice = document.getElementById(id)
    let colorChosen = document.getElementById(chosenColorId)
    colorChosen.style.backgroundColor = colorChoice.style.backgroundColor
    setAttributes(colorChosen, {"hexcode": colorChoice.getAttribute("hexcode")})
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
                setAttributes(tempButton, {
                    "id": "x"+cc+"y"+rc+"p", "hexcode": colorList[colorIndex], "class": "paletteColor"
                })
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
    setAttributes(tempCell, {"colspan": paletteWidth})
    let chosenColorDiv = document.createElement("div")
    setAttributes(chosenColorDiv, {"id": chosenColorId, "class": "paletteColor"})
    chosenColorDiv.style.backgroundColor = colorList[0]
    chosenColorDiv.style.width = (paletteWidth * 50) + "px"
    tempCell.appendChild(chosenColorDiv)
    tempRow.appendChild(tempCell)
    elTableBody.appendChild(tempRow)
    elTable.appendChild(elTableBody)

    let paletteDiv = document.createElement("div")
    let paletteTitle = document.createElement("p")
    setAttributes(paletteDiv, {"id": paletteId})
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

const makeEditorSection = () => {
    let d = document.createElement("div")
    setAttributes(d, {"class": "editorSection"})
    return d
}

const setupEditor = () => {
    let body = document.getElementsByTagName("body")[0]
    let paletteWidget = drawPalette(paletteColumns)
    body.appendChild(paletteWidget)

    let d = document.getElementById(contentName)
    d.style.backgroundColor = "#ffffff"
    d.style.left = "110px"
    d.style.marginBottom = "5px"
    d.style.padding = "5px"
    d.style.position = "absolute"

    let fieldDiv = makeEditorSection()
    fieldDiv.appendChild(makeField("Name", imageName))
    fieldDiv.appendChild(makeField("Description", imageDescription))
    fieldDiv.appendChild(makeField("Gap", imageGap))
    d.appendChild(fieldDiv)

    let gridDiv = makeEditorSection()
    let tableTitle = makeTitle("Editor")
    tableTitle.appendChild(makeTable(colCount, rowCount))
    gridDiv.appendChild(tableTitle)
    d.appendChild(gridDiv)

    let buttonDiv = makeEditorSection()
    let controlsTitle = makeTitle("Controls")
    controlsTitle.appendChild(makeButton("Reset Grid", resetTable))
    controlsTitle.appendChild(makeButton("Save Image", saveData))
    buttonDiv.appendChild(controlsTitle)
    d.appendChild(buttonDiv)

    d.appendChild(makeHr())

    let selectDiv = makeEditorSection()
    let selectTitle = makeTitle("Choose display...")
    selectTitle.appendChild(makeImageChoiceControl())
    selectDiv.appendChild(selectTitle)
    d.appendChild(selectDiv)
}

const startUp = () => {
    setBackgroundColor("#ffffff")
    makeDivContent()
    setupEditor()
    loadImageList()
    resizeAll()
}
