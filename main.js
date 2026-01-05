const container = document.querySelector(".container");

const defaultGridSize = 32;
const defaultDivColor = "#ddd";

let selectedColor = "#AA0033";

drawGrid(defaultGridSize);

// set event listener for squres in the grid
document.querySelectorAll(".square").forEach(square => {
    square.addEventListener("contextmenu", (e) => {
        e.preventDefault()
    });
    square.addEventListener("mouseenter", () => {
        printSquare(square, selectedColor);
    });
    square.addEventListener("mouseleave", () => {
        if (!square.classList.contains("printed")){
            printSquare(square, defaultDivColor);
        }
    });
    square.addEventListener("mousemove", (e) => {
        if (e.buttons === 1 && !square.classList.contains("printed")){
            square.classList.add("printed");
        }

        if (e.buttons === 2 && square.classList.contains("printed")){
            square.classList.remove("printed");
        }
    })
    square.addEventListener("mousedown", (e) => {
        if (e.buttons & 1){
            printSquare(square, selectedColor);
            square.classList.add("printed");
        }else if (square.classList.contains("printed")){
            printSquare(square, defaultDivColor);
            square.classList.remove("printed");
        }
    });
});


function drawGrid(size){
    for (let row = 0; row < size; row++){
        const divRow = document.createElement("div");
        divRow.classList = "row";
        for (let column = 0; column < size; column++){
            const square = document.createElement("div");
            square.classList = "square";
            square.style.backgroundColor = defaultDivColor;
            divRow.appendChild(square);
        }
        container.appendChild(divRow)
    }
}

/** @param {HTMLDivElement} square */
function printSquare(square, color){
    square.style.backgroundColor = color;
}