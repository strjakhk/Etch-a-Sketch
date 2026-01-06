const container = document.querySelector(".container");
const sizeRange = document.querySelector("#size");
const firstColorInput = document.querySelector("#color-1");
const secondColorInput = document.querySelector("#color-2");
const pincelBtn = document.querySelector("#pincel");
const eraserBtn = document.querySelector("#eraser");
const clearBtn = document.querySelector("#clear");


/** @type {HTMLInputElement} */
const randomColorBox = document.querySelector("#random-color");

const defaultGridSize = 16;

let bgColor = "#fff";
let firstColor = "#333";
let secondColor = bgColor;
let activeColor = firstColor;

drawGrid(defaultGridSize);

/**
 * Clear button
 */
clearBtn.addEventListener("click", () => drawGrid(sizeRange.value));

/**
 * Pincel
 */
pincelBtn.addEventListener("click", () =>{
    firstColor = firstColorInput.value;
    secondColor = secondColorInput.value;
});

/**
 * Eraser
 */
eraserBtn.addEventListener("click", () => {
    firstColor = bgColor;
    secondColor = bgColor;
});

/**
 * Color Pickers
 */
firstColorInput.addEventListener("input", () =>{
    firstColor = firstColorInput.value;
});

secondColorInput.addEventListener("input", () =>{
    secondColor = secondColorInput.value;
});

/**
 * size handler
 */
sizeRange.addEventListener("input", () => {
    const size = sizeRange.value;
    const sizeValueNode = document.querySelector("#size-value");
    sizeValueNode.textContent = `${size} x ${size}`;
    drawGrid(size);
})

function drawGrid(size){
    if (container.hasChildNodes()) container.innerHTML = "";
    for (let row = 0; row < size; row++){
        const divRow = document.createElement("div");
        divRow.classList = "row";
        for (let column = 0; column < size; column++){
            const square = document.createElement("div");
            square.classList = "square";
            square.style.backgroundColor = bgColor;
            divRow.appendChild(square);
        }
        container.appendChild(divRow)
    }
    setEventListeners();
}

/**
 * 
 * On mouse enter, print the square with activeColor
 * On mouse leave, if the square is not "printed", print it with backgroundColor
 * While moving mouse inside the div, check for click inputs
 * If left click, activeColor equals to firstColor
 * If right click, activeColor equales to secondColor
 * Set the square status to printed by adding class "printed"
 * Print the square with activeColor
 * 
 */
function setEventListeners(){
    document.querySelectorAll(".square").forEach(square => {
        square.addEventListener("contextmenu", (e) => e.preventDefault());
        square.addEventListener("dragstart", (e) => e.preventDefault());
        
        square.addEventListener("mouseenter", () => {        
            if (!square.classList.contains("printed")){
                printSquare(square, activeColor);        
            }
        });
        square.addEventListener("mouseleave", () => {
            if (!square.classList.contains("printed")){
                printSquare(square, bgColor);
            }
        });
        square.addEventListener("mousemove", (e) => {
            if (updateActiveColor(e.buttons)){
                updatePrintedStatus(square, activeColor);
                printSquare(square, activeColor);
            } 
        })
        square.addEventListener("mousedown", (e) => {
            if (updateActiveColor(e.buttons)){
                updatePrintedStatus(square, activeColor);
                printSquare(square, activeColor);
            } 
        });
    });
}

function updateActiveColor(button){
    if (button & 1 && randomColorBox.checked){
        activeColor = getRandomColor();
        return true;
    }
    if (button){
        activeColor = button & 1 ? firstColor : secondColor;
        return true;
    }
    
    return false;
}

function updatePrintedStatus(square, color){
    if (color == bgColor){
        square.classList.remove("printed");
    }else if (!square.classList.contains("printed")){
        square.classList.add("printed");
    }
}

function getRandomColor(){
    return "#" + ((Math.random() * 0xFFFFFF) | 0).toString(16).padStart(6, 0);
}

/** @param {HTMLDivElement} square */
function printSquare(square, color){
    square.style.backgroundColor = color;
}