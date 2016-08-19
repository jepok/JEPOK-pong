var tableCanvas = document.getElementById("table");
var tableContext = tableCanvas.getContext('2d');
tableContext.strokeStyle = "#00f";

function Table(context){
  context.lineWidth = 4;
  this.render = function(context) {
    context.strokeRect(0,0,275,300);
  }
}

function Ball(context,xpos,ypos,bsize){
  this.xpos = xpos;
  this.ypos = ypos;
  this.bsize = bsize;
  this.render = function(context) {
    context.fillStyle = "#000"
    context.fillRect(this.xpos,this.ypos,this.bsize,this.bsize);

  }
}

// function --Paddle -- sets up a paddle with position
//                             length and width properities
//                             may add position properties as args later
function Paddle(context,xpos,ypos,plength,pwidth){
  this.xpos = xpos;
  this.ypos = ypos;
  this.paddleLength = plength;
  this.paddleWidth = pwidth;
  this.render = function(context){
    context.moveTo(this.xpos,this.ypos);
    context.lineTo(this.xpos,this.ypos + this.paddleLength);
    context.lineWidth = this.paddleWidth;
    context.stroke();
  }


}

var ntable = new Table(tableContext);
var nball = new Ball(tableContext,125,145,10);
var computerPaddle = new Paddle(tableContext,15,15,45,12);
var playPaddle = new Paddle(tableContext,260,245,45,12);

// function render(context) takes a context object and calls the render functions
//                           of the two paddles and ball objects
var render = function(context) {
  nball.render(tableContext);
  playPaddle.render(tableContext);
  computerPaddle.render(tableContext);
}

var Step = function () {
  render(tableContext);
}

window.onload = function() {
  ntable.render(tableContext);
  render(tableContext);
  }


var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(Step) { window.setTimeout(callback, 1000/60) };
