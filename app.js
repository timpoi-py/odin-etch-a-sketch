
const canvasDefaulColor = '#F3F3F3'
const colorDefault = '#fff000'

let sizeText = document.querySelectorAll('.size-text');
let range = document.getElementById('canvas-range');
let canvas = document.querySelector('.canvas');
let canvasChildren = document.querySelectorAll('.canvas');
let color = document.querySelectorAll('.color-pick');
let reset = document.getElementById('reset')
let rainbow = document.getElementById('rainbow')

function changeDisplayTextSize(e) {
    for (let i=0; i<sizeText.length; i++) {
        let canvasSize = e.target.value;
        sizeText[i].textContent = `${canvasSize}`;
    }
}

function addDefaultDivs(defaultValue) {
    let canvasSizeFormat = canvas.clientWidth;
    let rangeDefaultValue = Number(range.getAttribute('value'));
    sizePerDiv = canvasSizeFormat/rangeDefaultValue;
    for (let i=0; i<defaultValue**2; i++) {
        let div = document.createElement('div')
        div.setAttribute('style', `display: iherit; 
                        width: ${sizePerDiv}px; height: ${sizePerDiv}px; 
                        background-color: #F3F3F3; margin:0; padding:0; 
                        border-left: 0.5px solid #D9D9D9; border-top: 0.5px solid #D9D9D9 `)
        canvas.appendChild(div);
    }
}


function addDivsInCanvas(e) {
    let canvasSizeFormat = canvas.clientWidth;
    let rangeSelected = Number(e.target.value);
    sizePerDiv = canvasSizeFormat/rangeSelected;
    for (let i=0; i<rangeSelected**2; i++) {
        let div = document.createElement('div')
        div.setAttribute('style', `display: iherit; 
                        width: ${sizePerDiv}px; height: ${sizePerDiv}px; 
                        background-color: #F3F3F3; margin:0; padding:0; 
                        border-left: 0.5px solid #D9D9D9; border-top: 0.5px solid #D9D9D9 `)
        canvas.appendChild(div);
    }
}

function deleteDivsInCanvas() {
    while (canvas.hasChildNodes()) {
        canvas.removeChild(canvas.firstChild);
    }
}

function changeDivSizeIfWindowResize() {
    let canvasSize = canvas.clientWidth;
    let rangeSelected = Number(sizeText[0].textContent);
    let sizePerDiv = canvasSize/rangeSelected;
    let canvasChildren = canvas.children;
    for (let i=0; i<canvasChildren.length; i++) {
        let canvasChild = canvasChildren[i];
        canvasChild.style.width = `${sizePerDiv}px`
        canvasChild.style.height = `${sizePerDiv}px`
    }
}


function dblClickToOpenColorPicker() {
    color.forEach(element => {
        element.addEventListener('click', (e) => {
            if (e.detail !== 2) e.preventDefault();
        })
    })
}

function colorDivs(color) {
    let divsInCanvas = document.getElementById('canvas').childNodes;
    divsInCanvas.forEach(element => {
        element.addEventListener('mousedown', (e) => {
            e.target.style.backgroundColor = color;
        })
    })
}


function resetCanvas() {
    let canvasChildren = canvas.children;
    for (let i=0; i<canvasChildren.length; i++){
        let canvasChild = canvasChildren[i];
        canvasChild.style.backgroundColor = canvasDefaulColor;
    }
}

function rainbowButton(color) {
    let divsInCanvas = document.getElementById('canvas').childNodes;
    divsInCanvas.forEach(element => {
        element.addEventListener('mousedown', (e) => {
            e.target.style.backgroundImage = color;
            e.target.style.backgroundColor = 'none';

        })
    })
}


function randomColor() {
    const lettersAndNums = ['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9'];
    let randomText = '#'
    for (let i=0; i<6; i++){
        let randomIndex = Math.floor(Math.random() * lettersAndNums.length);
        let randomLettersAndNums = lettersAndNums[randomIndex];
        console.log(randomLettersAndNums);
        randomText = randomText.concat(randomLettersAndNums);
    }
    return randomText;
}

function colorDivsRainbow() {
    let canvasChildren = canvas.children;
    for (let i=0; i<canvasChildren.length; i++){
        let canvasChild = canvasChildren[i];
        canvasChild.addEventListener('mouseup', () => {
            let color = randomColor();
            colorDivs(color);
        })
    }
}

color.forEach(element => {
    element.addEventListener('click', (e) => {
        color = e.target.value;
        colorDivs(color);
    })
})


rainbow.addEventListener('mousedown', colorDivsRainbow)

reset.addEventListener('click', resetCanvas)
addDefaultDivs(Number(range.getAttribute('value')));
dblClickToOpenColorPicker();
window.addEventListener('resize', changeDivSizeIfWindowResize);
range.addEventListener('input', function(e) { changeDisplayTextSize(e) });
range.addEventListener('click', function(e) { 
    deleteDivsInCanvas();
    addDivsInCanvas(e);
})


