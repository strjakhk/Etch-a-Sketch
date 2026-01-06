const container = document.querySelector(".container");

const defaultGridSize = 16;

let bgColor = "#ddd";
let firstColor = "#333";
let secondColor = bgColor;
let activeColor = firstColor;

drawGrid(defaultGridSize);

/**
 * size handler
 */
document.querySelector("#size").addEventListener("input", (e) => {
    const size = e.target.value;
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

/** @param {HTMLDivElement} square */
function printSquare(square, color){
    square.style.backgroundColor = color;
}