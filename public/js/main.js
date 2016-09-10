var tableCanvas = document.getElementById("table");
var context = tableCanvas.getContext('2d');
context.strokeStyle = "#00f";
var keysDown = {};

var tableWidth = 280;
var tableLength = 300;
var player1_score = 0;
var player2_score = 0;

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

  this.move = function() {
    //collision detect and reflect off floor and ceiling
    if(this.ypos<=this.bsize || this.ypos>=tableLength-this.bsize){
      this.ySpeed = -this.ySpeed;
    }
    // collision detect and reflect off playPaddle
    if((this.xpos + this.bsize) >= playPaddle.xpos  &&
      (this.ypos>=playPaddle.ypos
      && this.ypos<=playPaddle.ypos+playPaddle.paddleLength))
      {
      this.xSpeed = -this.xSpeed;
      this.ySpeed += playPaddle.speed/32;
    }
    //  collision detect and reflect off computerPaddle
    if((this.xpos-this.bsize) <= (computerPaddle.xpos+computerPaddle.paddleWidth) &&
      (this.ypos>=computerPaddle.ypos &&
        this.ypos<=computerPaddle.ypos+computerPaddle.paddleLength))
    {
      this.xSpeed = -this.xSpeed;
      this.ySpeed += computerPaddle.speed/32;
    }
    // collistion detect sides of table to score and re-serve ball
    if(this.xpos>=tableWidth-5)
    {
      player2_score += 1;
      Serve();
    }
    if(this.xpos<=5)
    {
      player1_score += 1;
      Serve();
    }
    this.xpos += this.xSpeed;
    this.ypos += this.ySpeed;

  }

  this.render = function() {
    // this.move();
    context.fillStyle = "#000"

    // if(this.ypos<=this.bsize || this.ypos>=tableLength-this.bsize){
    //   context.fillStyle = "red"
    // }
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
function Paddle(xpos,ypos,plength,pwidth,speed){
  this.speed = 10;
  this.xpos = xpos;
  this.ypos = ypos;
  this.paddleLength = plength;
  this.paddleWidth = pwidth;
  this.render = function(){
    context.fillStyle = '#00f';
    context.fillRect(this.xpos,this.ypos,this.paddleWidth,this.paddleLength);
  };
  this.move = function(event) {
    //keydown experiment for better animate
    for(var key in keysDown) {
  var value = Number(key);
  if(value == 75 && (this.ypos > 5)) {
      this.ypos = this.ypos - this.speed;
  } else if (value == 77 && (this.ypos < (290 - this.paddleLength))) {
      this.ypos = this.ypos + this.speed;
  } else {
    this.ypos = this.ypos;
   }
}
  //original key detection for playpaddle movement
    // this.whichKey = event.key;
    // // console.log(this.whichKey);
    // if ((this.whichKey === 'k') && (this.ypos > 5)) {
    //   // context.clearRect(this.xpos,this.ypos,this.paddleWidth,this.paddleLength);
    //   //
    //   // this.ypos = this.ypos - this.speed/2;
    //   // context.fillRect(this.xpos,this.ypos,this.paddleWidth,this.paddleLength);
    //   // console.log(this.ypos);
    //   this.ypos = this.ypos - this.speed;
    //   // animate(Step);
    //   // this.render(tableContext);
    //   // if k key is pressed move paddle location up  speed number of pixels
    //   // unless paddle is at the top of the table
    // } else if ((this.whichKey === 'm') && (this.ypos < (290 - this.paddleLength))) {
    //   // context.beginPath();
    //   // context.clearRect(this.xpos,this.ypos,this.paddleWidth,this.paddleLength);
    //   // context.closePath();
    //   // context.beginPath();
    //   // this.ypos += this.speed/2;
    //   // context.fillRect(this.xpos,this.ypos,this.paddleWidth,this.paddleLength);
    //   // context.closePath();
    //   this.ypos = this.ypos + this.speed;
    //   // animate(Step);
    //   // if m key is pressed move paddle location down speed number of pixels
    //   // unless paddle is at the bottom of the table
    // }
    }
  }

 Paddle.prototype.update = function() {
      if(nball.xSpeed<=0){

     var diff = this.ypos - nball.ypos;
     if(diff<0){
     if(diff<-0.5){
       this.ypos=this.ypos+0.5;
     } else {
       this.ypos=nball.ypos;
     }
   }else if(diff>0){
     if(diff>0.5){
       this.ypos = this.ypos - 0.5;

     } else {
       this.ypos = nball.ypos;
     }
   }
    //  this.ySpeed = -this.ySpeed;
    //  this.ypos = nball.ypos - computerPaddle.paddleLength/2;
   }
 }


var ntable = new Table();
var nball = new Ball(132,150,6);
var computerPaddle = new Paddle(0,15,55,10,2);
var playPaddle = new Paddle(265,245,55,10);


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
    // playPaddle.move(e);
  }
  window.onkeyup = function(e){
    delete keysDown[e.keyCode];
  }
  // window.addEventListener("keydown", function(event) {
  //   keysDown[event.keyCode] = true;
  // });
  //
  // window.addEventListener("keyup", function(event) {
  //   delete keysDown[event.keyCode];
  // });
  computerPaddle.update();
  nball.move();
  playPaddle.move();


}

var Step = function () {
  render();
  animate(Step);


}

 var Serve = function() {

 nball.xpos = 132;
 nball.ypos = 150;
 nball.xSpeed = Math.random() * (-2-5) + 5;
 nball.ySpeed = Math.random() * (-2 -5) + 5;

 }
window.onload = function() {



  // ntable.render(tableContext);
  // render(tableContext);
  console.log('beforeanimate');
  Serve();
  animate(Step);
  console.log('afteranimate');
  }


var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame     ||
        window.msRequestAnimationFrame     ||
        function(callback) { window.setTimeout(callback, 1000/60) };
