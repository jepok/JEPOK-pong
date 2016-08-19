var tableCanvas = document.getElementById("table");
var tableContext = tableCanvas.getContext('2d');
tableContext.strokeStyle = "#00f";

var table = function(context){
  tableContext.lineWidth = 4;
  tableContext.strokeRect(0,0,275,300);
}
var ball = function(context){
  var xpos = 125;
  var ypos = 145;
  var size = 10;
  tableContext.fillRect(xpos,ypos,size,size);
}

// function --computerPaddle -- sets up the player paddle with position
//                             length and width properities
//                             may add position properties as args later
var ComputerPaddle = function(context){
  var xpos = 15;
  var ypos = 15;
  var paddleLength = 45;
  var paddleWidth = 12;
context.moveTo(xpos,ypos);
context.lineTo(xpos,ypos + paddleLength);
context.lineWidth = paddleWidth;
context.stroke();

}

// function --PlayerPaddle -- sets up the player paddle with position
//                             length and width properities
//                             may add position properties as args later
var PlayerPaddle = function(context){
  var xpos = 260;
  var ypos = 290;
  var paddleLength = 45;
  var paddleWidth = 12;
  context.moveTo(xpos,ypos);
  context.lineTo(xpos,ypos - paddleLength);
  context.lineWidth = paddleWidth;
  context.stroke();
}
table(tableContext);
ball(tableContext);
ComputerPaddle(tableContext);
PlayerPaddle(tableContext);
