const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let speed = 7;

//Screen:
    //20 por 20 quadrados pois width="400" height="400" o canvas
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let score = 0;

//snake
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let xVelocity = 0;
let yVelocity = 0;

//apple
let appleX = 5;
let appleY = 5;



//-------------------------Game Loop------------------------

function drawGame(){
    changeSnakePosition();

    let result = isGameOver();
    if(result){
        return;
    }

    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000/speed);
}

//-------------------------functions------------------------


function drawSnake(){

    ctx.fillStyle = 'green';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
        
    }

    snakeParts.push(new SnakePart(headX,headY));
    if(snakeParts.length > tailLength){
        snakeParts.shift();
    }

    ctx.fillStyle = 'orange'; 
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawScore(){
    ctx.fillStyle = 'white'
    ctx.font = "18px Verdana"
    ctx.fillText("Score " + score, canvas.width -80, 15);
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }
}

function isGameOver(){
    let gameOver = false;
    if(xVelocity === 0 && yVelocity === 0){
        return false; 
    }

    //walls
    if(headX < 0){
        gameOver = true;
    }
    if(headX === tileCount){
        gameOver = true;
    }
    if(headY < 0){
        gameOver = true;
    }
    if(headY === tileCount){
        gameOver = true;
    }

    //bodyWall

    for(let i = 0; i < snakeParts.length;i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    //gameOver

    if(gameOver){
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        ctx.fillText("GAME OVER", canvas.width / 8, canvas.height / 2);
    }

    return gameOver;
}
//---------------------keyboardListeners--------------------

document.body.addEventListener('keydown',keyDown)

function keyDown(event){
    //upArrow
    if(event.keyCode == 38){
        if(yVelocity==1){
            return;
        }

        yVelocity = -1;
        xVelocity = 0;
    }
    //downArrow
    if(event.keyCode == 40){
        if(yVelocity==-1){
            return;
        }

        yVelocity = 1;
        xVelocity = 0;
    }
    //LeftArrow
    if(event.keyCode == 37){
        if(xVelocity==1){
            return;
        }

        yVelocity = 0;
        xVelocity = -1;
    }
    //RightArrow
    if(event.keyCode == 39){
        if(xVelocity==-1){
            return;
        }

        yVelocity = 0;
        xVelocity = 1;
    }
}


//---------------------
drawGame();