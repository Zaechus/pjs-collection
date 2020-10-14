// Pong Warrior

const width = window.innerWidth < window.innerHeight
  ? window.innerWidth - 10
  : window.innerHeight - 10;
const height = width;

// new p5();

var CPUPaddleSpeed;

// Start Screen
var startButtonW = width / 2.5;
var startButtonH = height / 8;
var startButtonX = width / 2 - startButtonW / 2;
var startButtonY = height / 3 - startButtonH / 3;

// Court
var courtTop = height / 9;
var winScore = 5;
var playerScore = 0;
var CPUScore = 0;

// Score Screen
var returnButtonW = width / 2.7;
var returnButtonH = height / 6;
var returnButtonX = width / 2;
var returnButtonY = height / 2;

// Pages
var currPage = 0;

// Paddle
var paddleW = width / 20;
var paddleH = height / 5;

// Player Paddle
var playerPaddleX = width / 30;
var playerPaddleY = height / 3;

// CPU Paddle
var CPUPaddleX = width / 1.09;
var CPUPaddleY = height / 3;
var CPUReaction = width / 2;

// Ball
var ballSpeedVX;
var ballSpeedVY;
var ballX;
var ballY;
var ballSize;
var ballSpeedLow;
var ballSpeedHigh;
var ballVX;
var ballVY;
var ballBounce;

function setup() {
  createCanvas(width, height);
  CPUPaddleSpeed = random(4, 6);

  ballSpeedLow = 5;
  ballSpeedHigh = 7;
  ballSpeedVX = random(ballSpeedLow, ballSpeedHigh);
  ballSpeedVY = random(ballSpeedLow, ballSpeedHigh);
  ballX = width / 2;
  ballY = height / 2;
  ballSize = width / 20;
  ballVX = ballSpeedVX;
  ballVY = ballSpeedVY;
  ballBounce = -1;
}

function StartButton(x, y) {
  stroke(255);
  noFill();
  strokeWeight(3);

  rect(x, y, startButtonW, startButtonH, 5);
  textSize(40);
  text("Start", x + startButtonW / 2, y + startButtonH / 2);
}

function ReturnButton(x, y) {
  stroke(255);
  strokeWeight(5);

  noFill();
  rect(
    x - returnButtonW / 2,
    y - returnButtonH / 2,
    returnButtonW,
    returnButtonH,
    5,
  );
  fill(255);
  textAlign(CENTER, CENTER);
  text("Return", x, y);
}

function PressStart() {
  if (currPage === 0) {
    if (
      mouseX > startButtonX && mouseY > startButtonY &&
      mouseX < (startButtonX + startButtonW) &&
      mouseY < (startButtonY + startButtonH)
    ) {
      currPage += 1;
    }
  }
}

function PressReturn() {
  if (currPage === 2 || currPage === 3) {
    if (
      mouseX > (returnButtonX - returnButtonW / 2) &&
      mouseY > (returnButtonY - returnButtonH / 2) &&
      mouseX < (returnButtonX + returnButtonW) &&
      mouseY < (returnButtonY + returnButtonH)
    ) {
      currPage = 0;
      playerScore = 0;
      CPUScore = 0;
    }
  }
}

var served = false;

function mouseReleased() {
  if (currPage === 1) {
    served = true;
  }
  PressStart();
  PressReturn();
}

function drawStartScreen() {
  background(0);

  stroke(255);
  noFill();
  strokeWeight(3);

  textAlign(CENTER, CENTER);
  textSize(width / 6.667);
  // TITLE
  text("Pong Warrior", width / 2, height / 10);

  StartButton(startButtonX, startButtonY);
}

function drawCourt(x, y) {
  strokeWeight(3);
  stroke(255);

  // LINES
  line(x, y + courtTop, x + width, courtTop); // TOP
  line(x + width / 2, y, x + width / 2, y + height); // MIDDLE
  // CIRCLE
  noFill();
  ellipse(x + width / 2, y + height / 2, width / 5, width / 5);
  // SCOREBOARD
  textAlign(LEFT, BOTTOM);
  textSize(width / 10);
  // PADDLES
  text(playerScore, x + width / 2.4, y + height / 9); // PLAYER
  text(CPUScore, x + width / 1.9, y + height / 9); // CPU
}

function drawPaddle(x, y) {
  noStroke();
  fill(255);
  rect(x, y, paddleW, paddleH, 5);
}

function drawBall(x, y, size) {
  noStroke();
  fill(255);
  ellipse(x, y, size, size);
}

function MouseMovePlayerPaddle() {
  playerPaddleY = mouseY - paddleH / 2;
}

function MoveBall() {
  ballX -= ballVX;
  ballY += ballVY;
}

function WallBallCollisions() {
  if (ballY > height - ballSize / 2) { // BOTTOM
    if (ballVY > 0) {
      ballVY = random(ballSpeedLow, ballSpeedHigh);
    } else {
      ballVY = ballBounce * random(ballSpeedLow, ballSpeedHigh);
    }
    ballVY *= ballBounce;
  }
  if (ballY < courtTop + ballSize / 2) { // TOP
    if (ballVY > 0) {
      ballVY = random(ballSpeedLow, ballSpeedHigh);
    } else {
      ballVY = ballBounce * random(ballSpeedLow, ballSpeedHigh);
    }
    ballVY *= ballBounce;
  }
}

function PaddleBallCollisions() {
  // PLAYER PADDLE
  // SIDE
  if (
    ballX < (playerPaddleX + paddleW + ballSize / 2) &&
    ballY > playerPaddleY && ballY < (playerPaddleY + paddleH) &&
    ballX > paddleW
  ) {
    if (ballVX > 0) {
      ballVX = random(ballSpeedLow, ballSpeedHigh);
    } else {
      ballVX = -1 * random(ballSpeedLow, ballSpeedHigh);
    }
    ballVX *= ballBounce;
  }

  // CPU PADDLE
  // SIDE
  if (
    ballX > (CPUPaddleX - ballSize / 2) && ballY > CPUPaddleY &&
    ballY < (CPUPaddleY + paddleH) && ballX < width - paddleW
  ) {
    if (ballVX > 0) {
      ballVX = random(ballSpeedLow, ballSpeedHigh);
    } else {
      ballVX = -1 * random(ballSpeedLow, ballSpeedHigh);
    }
    ballVX *= ballBounce;
  }
}

function BallServed() {
  if (served === true) {
    MoveBall();
  }
}

function CPUPaddleAI() {
  if (ballX > CPUReaction && ballY < (CPUPaddleY + paddleH / 2)) { // ABOVE
    CPUPaddleY -= CPUPaddleSpeed;
  }
  if (ballX > CPUReaction && ballY > (CPUPaddleY + paddleH / 2)) { // BELOW
    CPUPaddleY += CPUPaddleSpeed;
  }
}

function ResetPos() {
  ballX = width / 2;
  ballY = height / 2;
  CPUPaddleY = height / 2 - paddleH / 2;
  served = false;
}

function Scoring() {
  if (ballX < 0 - ballSize / 2) { // LEFT
    ResetPos();
    CPUScore += 1;
  }
  if (ballX > width + ballSize / 2) { // RIGHT
    ResetPos();
    playerScore += 1;
  }
}

function PlayerWins() {
  background(0);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(width / 10.5);
  text("THE BATTLE'S WON", width / 2, height / 12);
  line(0, height / 6, width, height / 6);

  ReturnButton(returnButtonX, returnButtonY);
}

function CPUWins() {
  background(0);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(width / 10);
  text("YOU HAVE FAILED", width / 2, height / 12);
  line(0, height / 6, width, height / 6);

  ReturnButton(returnButtonX, returnButtonY);
}

function Winner() {
  stroke(255);
  textSize(30);

  if (playerScore > winScore) {
    currPage = 2;
  }
  if (CPUScore > winScore) {
    currPage = 3;
  }
} // Pages

function StartScreen() {
  if (currPage === 0) {
    drawStartScreen();
  }
}

function GameScreen() {
  if (currPage === 1) {
    // noCursor ();

    background(0);

    drawCourt(0, 0);

    // PLAYER'S PADDLE
    drawPaddle(playerPaddleX, playerPaddleY);

    // CPU'S PADDLE
    drawPaddle(CPUPaddleX, CPUPaddleY);

    drawBall(ballX, ballY, ballSize, ballSize);

    MouseMovePlayerPaddle();

    BallServed();

    WallBallCollisions();

    PaddleBallCollisions();

    Scoring();

    CPUPaddleAI();

    Winner();
  }
}

function ScoreScreen() {
  if (currPage === 2) {
    PlayerWins();
  }

  if (currPage === 3) {
    CPUWins();
  }
}

function draw() {
  StartScreen();
  GameScreen();
  ScoreScreen();
}
