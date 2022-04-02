const gridContainer = document.querySelector('.gridContainer');
const gridInput = document.querySelector('#range');
const gridSizeLabel = document.querySelector('.gridSizeLabel');
const penColorSelector = document.querySelector('#penColor');
const colorModeBtn = document.querySelector('#colorModeBtn');
const rainbowModeBtn = document.querySelector('#rainbowModeBtn');
const eraserBtn = document.querySelector('#eraserBtn');
const clearBtn = document.querySelector('#clearBtn');
const hideGridBtn = document.querySelector('#hideGridBtn');
const gridContainerWidth = gridContainer.offsetWidth;
const gridContainerHeight = gridContainer.offsetHeight;
let gridItems;
let penColor = '#36311a';
let randomColor;
let eraserFlag = false;
let colorModeFlag = true;
let rainbowModeFlag = false;
let hideGridFlag = false;

function clearGrid(cssSelector, parentNode){
    const elements = parentNode.querySelectorAll(cssSelector);
    let fragment = document.createDocumentFragment(); 
    fragment.textContent=' ';
    fragment.firstChild.replaceWith(...elements);
}


function updateGridSizeLabel(){
    gridSizeLabel.textContent = `Grid Size: ${gridInput.value} x ${gridInput.value}`;
}

function createGrid(){
    let currentGridSize = gridInput.value;
    clearGrid('.gridItem', gridContainer);
    updateGridSizeLabel();
    const gridItemWidth = gridContainerWidth / currentGridSize;
    const gridItemHeight = gridContainerHeight / currentGridSize;
    for (let index = 1; index <= currentGridSize * currentGridSize; index++) {
        const gridItem = document.createElement('div');
        gridItem.style.width = gridItemWidth + 'px';
        gridItem.style.height = gridItemHeight + 'px';
        if(index <= currentGridSize){
            gridItem.style.borderTop = 'thin solid #9C9C9C';
        }
        if(index % currentGridSize === 0){
            gridItem.style.borderRight = 'thin solid #9C9C9C';
        }
        gridItem.classList.add('gridItem');
        gridContainer.appendChild(gridItem);
    }
    gridItems = document.querySelectorAll('.gridItem');
}

function toolbarBtnStyleToggle(targetBtn){
    targetBtn.classList.toggle('toggleBtnStyle');
}

function fillColor(e){
    let mouseOverItem = e.target;
    if(rainbowModeFlag){
        randomColor = Math.floor(Math.random()*16777215).toString(16);
        mouseOverItem.style.backgroundColor = '#' + randomColor;
    }
    else if(colorModeFlag){
        mouseOverItem.style.backgroundColor = penColor;
    }
    else if(eraserFlag){
        mouseOverItem.style.backgroundColor = 'white';
    }
}

function colorMode(){
    if(colorModeBtn.getAttribute('class') === 'toggleBtnStyle'){
        rainbowModeBtn.classList.remove('toggleBtnStyle');
        eraserBtn.classList.remove('toggleBtnStyle');
        eraserFlag = false;
        rainbowModeFlag = false;
        colorModeFlag = true;
        penColorSelector.addEventListener('input', function(e){
            penColor = e.target.value;
        });
        gridItems.forEach(div => {
            div.addEventListener('mouseover', fillColor);
        });
    }
    else{
        gridItems.forEach(div => {
            div.removeEventListener('mouseover', fillColor);
        });
    }
}

function rainbowMode(){
    if(rainbowModeBtn.getAttribute('class') === 'toggleBtnStyle'){
        colorModeBtn.classList.remove('toggleBtnStyle');
        eraserBtn.classList.remove('toggleBtnStyle');
        eraserFlag = false;
        colorModeFlag = false;
        rainbowModeFlag = true;
        gridItems.forEach(div => {
           div.addEventListener('mouseover', fillColor);
        });
    }
    else{
        gridItems.forEach(div => {
            div.removeEventListener('mouseover', fillColor);
        });
    }
}

function eraser(){
    if(eraserBtn.getAttribute('class') === 'toggleBtnStyle'){
        colorModeBtn.classList.remove('toggleBtnStyle');
        rainbowModeBtn.classList.remove('toggleBtnStyle');
        eraserFlag = true;
        colorModeFlag = false;
        rainbowModeFlag = false;
        gridItems.forEach(div =>{
            div.addEventListener('mouseover', fillColor)
        });
    }
    else{
        gridItems.forEach(div => {
            div.removeEventListener('mouseover', fillColor);
        });
    }
}

function clear(){
    gridItems.forEach(gridItem =>{
        gridItem.style.backgroundColor = 'white';
    });
}

function toggleGrid(){
    if(hideGridBtn.textContent === 'Hide Grid'){
        hideGridBtn.textContent = 'Show Grid';
        gridItems.forEach(gridItem =>{
            gridItem.classList.add('gridItemToggleBorder');
        });
    }
    else{
        hideGridBtn.textContent = 'Hide Grid';
        gridItems.forEach(gridItem =>{
            gridItem.classList.remove('gridItemToggleBorder');
        });
    }
}

function setupGrid(){
    createGrid();
    if(rainbowModeFlag){
        rainbowMode();
    }
    else if(colorModeFlag){
        colorMode();
    }
    else if(eraserFlag){
        eraser();
    }
}

toolbarBtnStyleToggle(colorModeBtn);
window.onload = setupGrid;
gridInput.addEventListener('input', setupGrid);
colorModeBtn.addEventListener('click', function(){
    toolbarBtnStyleToggle(colorModeBtn);
    colorMode();
});
rainbowModeBtn.addEventListener('click', function(){
    toolbarBtnStyleToggle(rainbowModeBtn);
    rainbowMode();
});
eraserBtn.addEventListener('click', function(){
    toolbarBtnStyleToggle(eraserBtn);
    eraser();
});
clearBtn.addEventListener('click', clear)
hideGridBtn.addEventListener('click',toggleGrid);
gridInput.addEventListener('input', function(){
    hideGridBtn.textContent = 'Hide Grid';
    gridItems.forEach(gridItem =>{
        gridItem.classList.remove('gridItemToggleBorder');
    });
})