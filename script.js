// define html elements

const board = document.getElementById('game-board')

//define game varaibles 
let snake = [{ x: 10, y: 10 }];

// draws map and food
function draw() {
    board.innerHTML = '';
    drawSnake();
}

//draw snake
function drawSnake(){
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment)
        board.appendChild(snakeElement);
    })
}

//creates snake and food cube/div
function createGameElement(tag, className){
    const element = document.createElement(tag);
    element.className = className
    return element;
}

// set position of the snake or the food
function setPosition(element, position){
    element.style.gridColumn = position.x
    element.style.gridRow = position.y;
}

// testing draw function
draw();