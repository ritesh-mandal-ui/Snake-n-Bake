let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{x: 13, y: 15}];
let food = {x: 6, y: 7};

function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed) return;
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) return true;
    return false;
}
i
function gameEngine() {
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key or button to play again!");
        snakeArr = [{x: 13, y: 15}];
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
        musicSound.play();
    }

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score++;
        if(score > highscoreval){
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "HighScore: " + highscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        food = {
            x: Math.floor(Math.random() * 16) + 2,
            y: Math.floor(Math.random() * 16) + 2
        };
    }

    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add(index === 0 ? "head" : "snake");
        board.appendChild(snakeElement);
    });

    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

musicSound.play();
let highscore = localStorage.getItem("highscore");
let highscoreval = highscore ? JSON.parse(highscore) : 0;
highscoreBox.innerHTML = "HighScore: " + highscoreval;

window.requestAnimationFrame(main);

window.addEventListener("keydown", e => {
    inputDir = {x: 0, y: 1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp": inputDir = {x: 0, y: -1}; break;
        case "ArrowDown": inputDir = {x: 0, y: 1}; break;
        case "ArrowLeft": inputDir = {x: -1, y: 0}; break;
        case "ArrowRight": inputDir = {x: 1, y: 0}; break;
    }
});

function changeDirection(dir) {
    moveSound.play();
    switch (dir) {
        case "up": inputDir = {x: 0, y: -1}; break;
        case "down": inputDir = {x: 0, y: 1}; break;
        case "left": inputDir = {x: -1, y: 0}; break;
        case "right": inputDir = {x: 1, y: 0}; break;
    }
}
