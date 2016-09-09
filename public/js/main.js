var tableCanvas = document.getElementById("table");
var context = tableCanvas.getContext('2d');
context.strokeStyle = "#00f";

function Table(){
  context.lineWidth = 4;
  this.render = function() {
    context.fillStyle = "white";
    context.fillRect(1,1,274,299)
    context.strokeRect(0,0,275,300);
  }
}

function Ball(xpos,ypos,bsize){
  this.xSpeed = Math.random() * (20-5) + 5;
  this.ySpeed = Math.random() * (20 -5) + 5;

  this.xpos = xpos;
  this.ypos = ypos;
  this.bsize = bsize;

  this.render = function() {
    context.fillStyle = "#000"
    context.arc(this.xpos,this.ypos,this.bsize,0,2*Math.PI,false);
    context.fillStyle="black";
    context.fill();
    context.lineWidth= 3;
    context.strokeStyle = 'black';
    context.stroke();

  }
}

// function --Paddle -- sets up a paddle with position
//                             length and width properities
//                             may add position properties as args later
function Paddle(xpos,ypos,plength,pwidth,speed){
  this.speed = 17;
  this.xpos = xpos;
  this.ypos = ypos;
  this.paddleLength = plength;
  this.paddleWidth = pwidth;
  this.render = function(){
    context.fillStyle = '#00f';
    context.fillRect(this.xpos,this.ypos,this.paddleWidth,this.paddleLength);
  };
  this.move = function(event) {
    this.whichKey = event.key;
    // console.log(this.whichKey);
    if ((this.whichKey === 'k') && (this.ypos > 5)) {
      // context.clearRect(this.xpos,this.ypos,this.paddleWidth,this.paddleLength);

      this.ypos = this.ypos - this.speed;
      console.log(this.ypos);
      // animate(Step);
      // this.render(tableContext);

      // if k key is pressed move paddle location up  speed number of pixels
      // unless paddle is at the top of the table
    } else if ((this.whichKey === 'm') && (this.ypos < (290 - this.paddleLength))) {
      // context.clearRect(this.xpos,this.ypos,this.paddleWidth,this.paddleLength);

      this.ypos = this.ypos + this.speed;
      console.log(this.ypos);
      // animate(Step);

      // if m key is pressed move paddle location down speed number of pixels
      // unless paddle is at the bottom of the table
    }
    }
  }




var ntable = new Table();
var nball = new Ball(125,145,6);
var computerPaddle = new Paddle(15,15,55,12);
var playPaddle = new Paddle(250,245,55,12);

// function render(context) takes a context object and calls the render functions
//                           of the two paddles and ball objects
var render = function() {
  ntable.render();
  nball.render();
  playPaddle.render();
  computerPaddle.render();
  window.onkeypress = function(e){
    playPaddle.move(e);
  }

}

var Step = function () {
  render();
  animate(Step);


}

window.onload = function() {
  // ntable.render(tableContext);
  // render(tableContext);
  console.log('beforeanimate');
  animate(Step);
  console.log('afteranimate');
  }


var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame     ||
        window.msRequestAnimationFrame     ||
        function(Step) { window.setTimeout(Step, 1000/100) };
