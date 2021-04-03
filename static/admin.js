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
