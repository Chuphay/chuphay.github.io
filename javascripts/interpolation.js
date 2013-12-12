//This code let's us draw on the canvas
var my_canvas1 = document.getElementById('canvas1');
var context1 = my_canvas1.getContext("2d");

//this code flips the y axis, so that it's not inverted 

context1.transform(1,0,0,-1.0,0,200);

//this let's us draw to the canvas
//a,b is the current position
//and x,y is where you want to draw to
function draw(screen,a,b,x,y){
    screen.moveTo(a,b); 
    screen.lineTo(x,y);
    screen.stroke();
}
function dot(screen,x,y,color){
    screen.beginPath();
    screen.rect(x, y, 10, 10);
    screen.fillStyle = color;
    screen.fill();
 
   
}

//this code let's us write to the html
data = []; 
for(var i = 0; i<10;i++){
  var temp = 180*Math.random();
  data.push(temp);
  dot(context1,40*i,temp,"yellow");
}
function write(x){
    window.onload = function(){
        document.getElementById("console").innerHTML = x;
    };
}



write(["<br> Expected rate of return: <br>  <br>new line" ]);
