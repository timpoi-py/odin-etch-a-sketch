
let sizeText = document.querySelectorAll('.size-text');
let range = document.getElementById('canvas-range');
let canvas = document.querySelector('.canvas');

function changeDisplayTextSize() {
    range.addEventListener('input', function(e) {
        for (let i=0; i<sizeText.length; i++) {
            let canvasSize = e.target.value;
            sizeText[i].textContent = `${canvasSize}`;
        }
    })
}

function addDivsInCanvas(rangeSelected) {
    let canvasSizeFormat = Number(getComputedStyle(canvas).width.replace('px', ''));
    let div = document.createElement('div')
    range.addEventListener('input', function(e) {
        changeDisplayTextSize();
        let canvasSelected = Number(e.target.value);
        sizePerDiv = canvasSizeFormat/canvasSelected;
        canvas.append(div)*canvasSelected
    })

}

addDivsInCanvas()