// define html elements

const board = document.getElementById('game-board')
const instructionText = document.getElementById('instruction-texts')
const logo = document.getElementById('logo');

//define game varaibles 
const gridSize = 20
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = 'right'
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// draws map and food
function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
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
//draw();

//Draw foo functiomn
function drawFood(){
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

//generate food
function generateFood() {
const x = Math.floor(Math.random() * gridSize) + 1;
const y = Math.floor(Math.random() * gridSize) + 1;
return { x, y }; 
}

//moving the snake
function move() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y--;
        break;
        case 'down':
            head.y++;
        break;
        case 'left':
            head.x--;
        break;
        case 'right':
            head.x++;
        break;
    }
    snake.unshift(head);

   // snake.pop();

if (head.x === food.x && head.y === food.y){
    food = generateFood();
    clearInterval(); // clear past interval
    gameInterval = setInterval(() => {
        move();
        draw();
    },  gameSpeedDelay);
} else {
    snake.pop();
}

}

//test moving
//setInterval(() => {
   // move(); //move first
    //draw(); //draw again new postion
//}, 200);

// start game function
function startGame(){
    gameStarted = true; //keep track of running game
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        //checkCollision();
        draw();
    }, gameSpeedDelay)
}

// create keypress event listener
function handleKeyPress(event) {
    if (
        (!gameStarted && event.code === 'space') ||
        (!gameStarted && event.key === ' ') 
        
        ){
        startGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
                case 'ArrowDown':
                    direction = 'down';
                    break;
                    case 'ArrowLeft':
                        direction = 'left';
                        break;
                        case 'ArrowRight':
                            direction = 'right';
                            break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);