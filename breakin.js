var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
const GAME_WIDTH = 256;
const GAME_HEIGHT = 256;
const PADDLE_WIDTH = 40;
const PADDLE_HEIGHT = 8;
const PADDLE_SPEED = 20;
const BALL_WIDTH = 8;
const BALL_HEIGHT = 8;
const BALL_SPEED = 30;
var gameStart = false;
var lastTime = 0;
var gameOver = false;
var score = 0;

/* Game objects */
var paddle = {
    x: GAME_WIDTH/2 - PADDLE_WIDTH/2,
    y: GAME_HEIGHT - PADDLE_HEIGHT,
    w: PADDLE_WIDTH,
    h: PADDLE_HEIGHT,
    x_vel: 0,
    movL: 0,
    movR: 0
};

var ball = {
    x: GAME_WIDTH/2 - BALL_WIDTH/2,
    y: GAME_HEIGHT/2 - BALL_HEIGHT/2,
    w: BALL_WIDTH,
    h:BALL_HEIGHT,
    x_vel: 0,
    y_vel: 1
}

/************* SUPPORT FUNCTIONS *************/


/************* MAIN FUNCTIONS *************/

function input() {
    document.addEventListener("keydown", (event)=> {
        if (!gameOver) {
            if (event.key == 'ArrowRight') {
                paddle.movR = PADDLE_SPEED;
            }
            if (event.key == 'ArrowLeft') {
                paddle.movL = -PADDLE_SPEED;
            }
        }
    })

    document.addEventListener("keyup", (event)=> {
        if (!gameOver) {
            if (event.key == 'ArrowRight') {
                paddle.movR = 0;
            }
            if (event.key == 'ArrowLeft') {
                paddle.movL = 0;
            }
        }
    })
}

function update(deltaTime) {
    paddle.x_vel = 0;
    paddle.x_vel = paddle.movR + paddle.movL;
    if (paddle.x >= GAME_WIDTH - paddle.w/2 && paddle.x_vel > 0 ||
        paddle.x <= -paddle.w/2 && paddle.x_vel < 0) 
    {
        paddle.x = paddle.x;
    } else {
        paddle.x += paddle.x_vel * deltaTime;
    }
    ball.x += ball.x_vel * deltaTime * BALL_SPEED;
    ball.y += ball.y_vel * deltaTime * BALL_SPEED;

}

function draw(deltaTime) {
    //ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = 'white'
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillRect(ball.x, ball.y, ball.w, ball.h);
}

function gameLoop(timestamp) {
    var deltaTime = (timestamp - lastTime)/100; 
    lastTime = timestamp;
    input();
    update(deltaTime);
    draw(deltaTime);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);