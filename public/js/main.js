var tableCanvas = document.getElementById("table");
var context = tableCanvas.getContext('2d');
context.strokeStyle = "#00f";
var keysDown = {};
var gameStart = false;
var winnerIs = ""

var tableWidth = 380;
var tableLength = 400;
var player1_score = 0;
var player2_score = 0;

var scoreBoard = document.getElementById('scores');
var score1 = document.getElementById('player1');
var score2 = document.getElementById('player2');
var startScreen = document.getElementById('startScreen');

function Table(){
  context.lineWidth = 4;
  this.render = function() {
    context.fillStyle = "white";
    context.fillRect(1,1,tableWidth-1,tableLength-1)
    context.strokeRect(0,0,tableWidth,tableLength);
  }
}

function Ball(xpos,ypos,bsize){

  this.xpos = xpos;
  this.ypos = ypos;
  this.bsize = bsize;
  this.xSpeed = 3;

  this.move = function() {
    //collision detect and reflect off floor and ceiling
    if(this.ypos<=this.bsize || this.ypos>=tableLength-this.bsize){
      this.ySpeed = -(this.ySpeed+.001);
    }
    // collision detect and reflect off playPaddle
    if((this.xpos + this.bsize) >= playPaddle.xpos &&
      (this.ypos>playPaddle.ypos
      && this.ypos<(playPaddle.ypos - 3)+(playPaddle.paddleLength + 3)))
      {
      this.xSpeed = -3;
      this.ySpeed += playPaddle.speed/4;
    }
    //  collision detect and reflect off computerPaddle
    if((this.xpos-this.bsize) <= (computerPaddle.xpos+computerPaddle.paddleWidth) &&
      (this.ypos>=computerPaddle.ypos &&
        this.ypos<=computerPaddle.ypos+computerPaddle.paddleLength))
    {
      this.xSpeed = 3;
      this.ySpeed += computerPaddle.speed/4;
    }
    // collision detect sides of table to score and re-serve ball
    if(this.xpos>=tableWidth-6)
    {
      player2_score += 1;
      nball.xSpeed = 3;
      // Serve();
      displayScore();
      newGame.checkScore();
    }
    if(this.xpos<=6)
    {
      player1_score += 1;
      nball.xSpeed = -3;
      Serve();
      displayScore();
      newGame.checkScore();

    }
    this.xpos += this.xSpeed;
    this.ypos += this.ySpeed;

  }

  this.render = function() {
    context.fillStyle = "#000"


    context.beginPath();
    context.arc(this.xpos,this.ypos,this.bsize,0,2*Math.PI,false);
    // context.fillStyle="black";
    context.fill();
    context.lineWidth= 3;
    context.strokeStyle = 'black';
    context.stroke();
    context.closePath();

  }
}

// function --Paddle -- sets up a paddle with position
//                             length and width properities
//                             may add position properties as args later
function Paddle(xpos,ypos,plength,pwidth,speed,paddleColor){
  this.speed = 10;
  this.xpos = xpos;
  this.ypos = ypos;
  this.paddleLength = plength;
  this.paddleWidth = pwidth;
  this.render = function(){
    context.fillStyle = paddleColor;
    context.fillRect(this.xpos,this.ypos,this.paddleWidth,this.paddleLength);
  };
  this.move = function(event) {
    //run through the keys down and check for k and m and then move accordingly
    for(var key in keysDown) {
  var value = Number(key);
  if(value == 75 && (this.ypos > 4)) {
      this.ypos = this.ypos - this.speed;
  } else if (value == 77 && (this.ypos < ((tableLength-8) - this.paddleLength))) {
      this.ypos = this.ypos + this.speed;
   } else
  {
    this.ypos = this.ypos;
   }
}
    }
  }

 Paddle.prototype.update = function() {
      if(nball.xSpeed<=0){

     var diff = (this.ypos+this.paddleLength/2) - nball.ypos;
     if(this.ypos>=tableLength-this.paddleLength){
       this.ypos=tableLength-this.paddleLength;
     } else if(this.ypos<=0){
       this.ypos=0;
     }
     if(diff<0){
     if(diff<-0.5){
       this.ypos=this.ypos+1;
     } else {
       this.ypos=nball.ypos-this.paddleLength/2;
     }
   }else if(diff>0){
     if(diff>0.5){
       this.ypos = this.ypos - 1;
     } else {
       this.ypos = nball.ypos-this.paddleLength/2;
     }

   }
     }
 }

var newGame = new GameControl();
var ntable = new Table();
var nball = new Ball(190,200,5);
var computerPaddle = new Paddle(0,15,55,10,2,'#00f');
var playPaddle = new Paddle(368,345,55,10,2,'#00FF40');

var displayScore = function() {
  score1.innerHTML = player1_score;
  score2.innerHTML = player2_score;
}

// function render(context) takes a context object and calls the render functions
//                           of the two paddles and ball objects
var render = function() {
  ntable.render();
  nball.render();
  playPaddle.render();
  computerPaddle.render();
  computerPaddle.update();
  window.onkeydown = function(e){
    keysDown[e.keyCode] = true
  }
  window.onkeyup = function(e){
    delete keysDown[e.keyCode];
  }

  // computerPaddle.update();
  // nball.move();
  // playPaddle.move();
}

var Step = function () {
  render();
  if(gameStart==true){
    animate(Step);
    computerPaddle.update();
    nball.move();
    playPaddle.move();
  }
}

 var Serve = function() {
 nball.xpos = 190;
 nball.ypos = 200;
 nball.ySpeed = Math.random() * (-1 -3) + 3;
 }

window.onload = function() {
  // Serve();
  // animate(Step);
  render();
  window.onkeypress =  function(event){
    var x = event.which || event.keyCode;
    if(x == 32 && gameStart == false){
      newGame.startGame();
    }
  }

  displayScore();
  }



 function GameControl(){
   this.startGame = function() {
        player1_score = 0;
        player2_score = 0;
        displayScore();
        startScreen.innerHTML = "";
         gameStart = true;
         Serve();
         animate(Step);

   }
    this.checkScore = function() {
     if(player1_score === 3) {
       winnerIs = "Player 1";
       this.endgame();
     } else if(player2_score === 3){
       winnerIs = "Player 2";
       this.endgame();
     }
     Serve();
   }
   this.endgame = function(){
     gameStart = false;

     startScreen.innerHTML =   winnerIs +   ' Wins!!<p>Press &lt;SPACEBAR&gt; to restart the game</p>';

   }
 }

var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame     ||
        window.msRequestAnimationFrame     ||
        function(callback) { window.setTimeout(callback, 1000/60) };
