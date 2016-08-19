var tableCanvas = document.getElementById("table");
var tableContext = tableCanvas.getContext('2d');
tableContext.strokeStyle = "#00f";
tableContext.lineWidth = 4;
tableContext.strokeRect(0,0,275,300);

tableContext.fillRect(125,145,10,10);

tableContext.moveTo(15,15);
tableContext.lineTo(15,60);
tableContext.lineWidth = 12;
tableContext.stroke();
// 
// tableContext.moveTo(145,131);
// tableContext.lineTo(155,131);
// tableContext.lineWidth = 15;
// tableContext.stroke();

tableContext.moveTo(270,295);
tableContext.lineTo(270,235);
tableContext.lineWidth = 12;
tableContext.stroke();
