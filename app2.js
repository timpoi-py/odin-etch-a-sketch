let range = document.getElementById('canvas-range');
let sizeTextNodes = document.querySelectorAll('.size-text')
let canvas = document.querySelector('.canvas');
let colorPick1 = document.getElementById('color-pick-1');
let colorPick2 = document.getElementById('color-pick-2');
let colorPick3 = document.getElementById('color-pick-3');
let resetBtn = document.getElementById('reset')

const DEFAULT_SIZE = 20;
const DEFAULT_ACTIVE = '#000000';
const DEFAULT_COLOR1 = '#000000';
const DEFAULT_COLOR2 = '0000FF';
const DEFAULT_COLOR3 = '#FFF000';
const DEFAULT_CANVAS_SIZE = canvas.clientWidth;
const DEFAULT_DIVS_DIMENSION = DEFAULT_CANVAS_SIZE/DEFAULT_SIZE;

let colorActive = DEFAULT_ACTIVE;
let color1 = DEFAULT_COLOR1;
let color2 = DEFAULT_COLOR2;
let color3 = DEFAULT_COLOR3;
let size = DEFAULT_SIZE;
let canvasSize = DEFAULT_CANVAS_SIZE
let divsDimension= DEFAULT_DIVS_DIMENSION;


function creatingDivsElement() {
    const divs = document.createElement('div');
    return divs;
}

function changeDivsDimensions(canvasSize, size) {
    let newDivsDimension = canvasSize/size;
    divsDimension = newDivsDimension;
}

function changeSize(newSize) {
    size = newSize;
}

function changeSizeText(newSizeText) {
    sizeTextNodes.forEach(nodes => {
        nodes.textContent = `${newSizeText}`;
    })
}

function changeCanvasSize(newCanvasSize) {
    canvasSize = newCanvasSize;
}

function addDefaultDivs(size,canvasSize) {
    for (let i=0 ; i<size*size; i++) {
        let divs = creatingDivsElement();
        divs.setAttribute('style', `height:${canvasSize}px; width: ${canvasSize}px`)
        canvas.appendChild(divs);
        divs.className = 'divs';

    }
}

function deleteCanvasChildNodes() {
    // will remove the divs inside the canvas
    while (canvas.hasChildNodes()){
        canvas.removeChild(canvas.firstChild);
    }
}

function changingDivs(newDivsDimension,newSize) {
    deleteCanvasChildNodes() //removes the divs prior to adding new divs
    for (let i=0 ; i<newSize*newSize; i++) {
        let divs = creatingDivsElement();
        divs.setAttribute('style', `height:${newDivsDimension}px; width: ${newDivsDimension}px`)
        canvas.appendChild(divs);
        divs.className = 'divs';
    }
}

function resizeDivsDimensions(newDivsDimension) {
    let divs = document.querySelectorAll('.divs');
    divs.forEach(div => {
        div.style.width = `${newDivsDimension}px`;
        div.style.height = `${newDivsDimension}px`;
    })
}

function changeColor1(newColor1) {
    color1 = newColor1;
}

function changeColor2(newColor2) {
    color2 = newColor2;
}

function changeColor3(newColor3) {
    color3 = newColor3;
}

function activateSelectedColor(selectedColor) {
    colorActive = selectedColor;
}

function reset(divsDimension,size){
    let divs = document.querySelectorAll('.divs');
    divs.forEach(div => {
        div.style.backgroundColor = '#FFFFF9';
    })
}

function coloringDivs(color) {
    let divs = document.querySelectorAll('.divs')
    divs.forEach(div => {
    div.addEventListener('mouseover', (e) => {
        e.target.style.backgroundColor = color;
        

    });
})
}

// HERE'S WHERE THE FUNCTIONS ARE CALLED

addDefaultDivs(size, DEFAULT_DIVS_DIMENSION)

range.addEventListener('mouseup', (e) => {
    changeDivsDimensions(canvasSize, e.target.value);
    changingDivs(divsDimension,size);
})

range.addEventListener('input', (e) => {
    changeSize(e.target.value);
    changeSizeText(e.target.value);
    console.log(size);
})


window.addEventListener('resize', () => {
    changeCanvasSize(canvas.clientWidth);
    changeDivsDimensions(canvasSize, size);
    resizeDivsDimensions(divsDimension);
})

colorPick1.addEventListener('input', (e) => {
    changeColor1(e.target.value);
    activateSelectedColor(e.target.value);
    console.log(color1);
})

colorPick2.addEventListener('input', (e) => {
    changeColor2(e.target.value);
    activateSelectedColor(e.target.value);
    console.log(color2);

})

colorPick3.addEventListener('input', (e) => {
    changeColor3(e.target.value);
    activateSelectedColor(e.target.value);
    console.log(color3);
})

colorPick1.addEventListener('click', (e) => {
    changeColor1(e.target.value);
    activateSelectedColor(e.target.value);
    console.log(color1);
})

colorPick2.addEventListener('click', (e) => {
    changeColor2(e.target.value);
    activateSelectedColor(e.target.value);
    console.log(color2);

})

colorPick3.addEventListener('click', (e) => {
    changeColor3(e.target.value);
    activateSelectedColor(e.target.value);
    console.log(color3);
})

resetBtn.addEventListener('click', reset);

canvas.addEventListener('mouseover', () => {
    coloringDivs(colorActive)
})

// window.onclick = (e) => console.log(e.type);
// setInterval(() => {
//     console.log(colorActive);
// }, 1000);