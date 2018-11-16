const localDatabase = () => {
    let bodyElement = document.getElementsByTagName('body')[0];
    let localStorageContent = localStorage.getItem('notepad');
    let notepadElement = document.getElementById('notepad_div');
    notepadElement.innerHTML = localStorageContent === null ? "" : localStorageContent;
    let timer = false;
    bodyElement.addEventListener('input', function () {
        // Avoid saving to local storage on every input key if they type very fast
        // The function will execute after 500 milli seconds
        clearTimeout(timer);
        timer = setTimeout(function () {
            localStorage.setItem('notepad', notepadElement.innerHTML);
        }, 500);

    });
};

function changeColor(backgroundColor, textColor) {
    document.getElementById("body").style["background-color"] = backgroundColor;
    document.getElementById("body").style["color"] = textColor;
    localStorage.setItem('backgroundColor', backgroundColor);
    localStorage.setItem('textColor', textColor);
}

// Getting Background Colors
const bgcolor = localStorage.getItem('backgroundColor');
const color = localStorage.getItem('textColor');
if (bgcolor) document.getElementById("body").style["background-color"] = bgcolor;
if (color) document.getElementById("body").style["color"] = color;