const range = document.getElementById('canvas-range');
const sizeTextNodes = document.querySelectorAll('.size-text');
const canvas = document.querySelector('.canvas');
const colors = document.querySelector('.colors');
const colorPick = document.querySelectorAll('.color-pick');
const resetBtn = document.getElementById('reset');
const rainbowBtn = document.getElementById('rainbow');
const eraseBtn = document.getElementById('erase');


const DEFAULT_SIZE = 20;
const DEFAULT_DIVS_COLOR = '#FFFFF9'
const DEFAULT_ACTIVE = '#000000';
const DEFAULT_COLOR1 = '#000000';
const DEFAULT_COLOR2 = '#0000FF';
const DEFAULT_COLOR3 = '#FFF000';
const DEFAULT_MODE = 'color'
const DEFAULT_CANVAS_SIZE = canvas.clientWidth;
const DEFAULT_DIVS_DIMENSION = DEFAULT_CANVAS_SIZE/DEFAULT_SIZE;


let colorActive = DEFAULT_ACTIVE;
let color1 = DEFAULT_COLOR1;
let color2 = DEFAULT_COLOR2;
let color3 = DEFAULT_COLOR3;
let size = DEFAULT_SIZE;
let canvasSize = DEFAULT_CANVAS_SIZE
let divsDimension= DEFAULT_DIVS_DIMENSION;
let mode = DEFAULT_MODE;


let mouseDown = false;
window.onmousedown = () => mouseDown = true;
window.onmouseup = () => mouseDown = false;

let touchDown = false;
document.ontouchstart = () => touchDown = true;
document.ontouchend = () => touchDown = false;

function changeSize(newSize) {
    size = newSize;
}

function changeTextSize(size) {
    sizeTextNodes.forEach(node => {
        node.textContent = `${size}`
    })
}

function putDivsInCanvas(size) {
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (let i=0; i<size*size; i++) {
        let divs = document.createElement('div');
        divs.classList.add('divs')
        canvas.appendChild(divs);
    }
}

function deleteDivs() {
    while (canvas.hasChildNodes()) {
        canvas.removeChild(canvas.firstChild);
    }
}

function changeColorInput() {
    colorPick.forEach(color => {
        color.oninput = (e) => {
            colorActive = e.target.value;
            mode = 'color';
            console.log(colorActive);
        }
    })
}

function pickColor() {
    colorPick.forEach(color => {
        color.addEventListener('click', (e) => {
            colorActive = e.target.value;
            mode = 'color';
            console.log(colorActive);
        })
    })
}

function pickColorForTouch() {
    colorPick.forEach(color => {
        color.addEventListener('touchstart', (e) => {
            colorActive = e.target.value;
            mode = 'color';
            console.log(colorActive);
        })
    })
}


function reset() {
    let canvasChildren = canvas.childNodes;
    canvasChildren.forEach(child => {
        child.style.backgroundColor = DEFAULT_DIVS_COLOR;
    })
}

function generateRandomColor() {
    const lettersAndNums = ['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9'];
    let randomText = '#'
    for (let i=0; i<6; i++){
        let randomIndex = Math.floor(Math.random() * lettersAndNums.length);
        let randomLettersAndNums = lettersAndNums[randomIndex];
        randomText = randomText.concat(randomLettersAndNums);
    }
    return randomText;
}

function modeSelectedMouse(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (mode == 'rainbow') {
        let randomColor = generateRandomColor();
        colorActive = randomColor;
        e.target.style.backgroundColor = colorActive;
    } else if (mode == 'erase') {
        colorActive = DEFAULT_DIVS_COLOR;
        e.target.style.backgroundColor = colorActive;
    } else if (mode == 'color') {
        e.target.style.backgroundColor = colorActive;
    }
}

function modeSelectedTouch(e) {
    if (mode == 'rainbow') {
        let randomColor = generateRandomColor();
        colorActive = randomColor;
        e.target.style.backgroundColor = colorActive;
    } else if (mode == 'erase') {
        colorActive = DEFAULT_DIVS_COLOR;
        e.target.style.backgroundColor = colorActive;
    } else if (mode == 'color') {
        e.target.style.backgroundColor = colorActive;
    }
}



range.addEventListener('input', (e) => {
    changeSize(e.target.value);
    changeTextSize(size);
})

range.addEventListener('click', (e) => {
    deleteDivs();
    putDivsInCanvas(size);
})

range.addEventListener('touchend', (e) => {
    deleteDivs();
    putDivsInCanvas(size);
})

colors.addEventListener('click', () => {
    changeColorInput()
    pickColor()
})


colors.addEventListener('touchstart', () => {
    changeColorInput()
    pickColorForTouch()
})



resetBtn.onclick = reset;
rainbowBtn.onclick = () => mode = 'rainbow';
eraseBtn.onclick = () => mode = 'erase';
resetBtn.ontouchstart = reset;
rainbowBtn.ontouchstart = () => mode = 'rainbow';
eraseBtn.ontouchstart = () => mode = 'erase';
canvas.addEventListener('mouseover', (e) => modeSelectedMouse(e))
canvas.addEventListener('mousedown', (e) => modeSelectedMouse(e))
canvas.addEventListener('touchstart', (e) => modeSelectedTouch(e))


window.onload = putDivsInCanvas(size);
