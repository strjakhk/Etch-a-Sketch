const container = document.querySelector(".container");



const defaultGridSize = 16;
const defaultDivColor = "#ddd";

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

drawGrid(defaultGridSize);