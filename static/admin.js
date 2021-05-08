const iccDropdownId = "iccDropdown"
const iccButtonId = "iccButton"
const iccControlId = "iccControl"
const iccDefaultValue = "-none-"
const iccDefaultText = "Choose an image..."

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

const selectImage = () => {
    let selectDropdown = document.getElementById(iccDropdownId)
    let selectedChoice = selectDropdown.options[selectDropdown.selectedIndex].value
    if (selectedChoice != iccDefaultValue) {
        setImage(selectedChoice)
    }
}

const getImageList = (callback) => {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status != 200) {
            console.log("Error code: " + xhr.status)
        } else {
            callback(xhr.response)
        }

    }
    xhr.responseType = "json"
    xhr.open("GET", "/images", true)
    xhr.send();
}

const setImageChoices = (json) => {
    let selectDropdown = document.getElementById(iccDropdownId)
    for (let img of json) {
        let newOption = document.createElement("option")
        newOption.setAttribute("value", img["file"])
        newOption.innerText = img["description"]
        selectDropdown.appendChild(newOption)
    }
}

const loadImageList = () => {
    let initialOption = document.createElement("option")
    initialOption.setAttribute("value", iccDefaultValue)
    initialOption.innerText = iccDefaultText

    let selectDropdown = document.getElementById(iccDropdownId)
    selectDropdown.innerHTML = ""
    selectDropdown.appendChild(initialOption)

    getImageList(setImageChoices)
}

const makeImageChoiceControl = () => {
    let selectDropdown = document.createElement("select")
    selectDropdown.setAttribute("id", iccDropdownId)
    selectDropdown.style.marginRight = "5px"

    let selectBtn = document.createElement("button")
    selectBtn.setAttribute("id", iccButtonId)
    selectBtn.addEventListener("click", selectImage)
    selectBtn.innerText = "Select Image"

    let selectControl = document.createElement("div")
    selectControl.setAttribute("id", iccControlId)

    selectControl.appendChild(selectDropdown)
    selectControl.appendChild(selectBtn)

    return selectControl
}