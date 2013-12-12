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

function write(x){
    window.onload = function(){
        document.getElementById("console").innerHTML = x;
    };
}
//here we set up our initial data set
data = [];
xValue = [];
for(var i = 0; i<11;i++){
  
  data.push(180*Math.random());
  xValue.push(40*i);
  dot(context1,xValue[i]-5,data[i],"yellow");
}
//here we write a little helper function to check which line segment
//x belongs in 
function checkLineSegment(xValues,x){
  for(var j = 0; j<data.length;j++){
    if (x<xValue[j]){
      return [xValue[j-1],xValue[j]]; 
    }
  }
}
//here's the linear interpolation
//what we are trying to do is find f(x) when we only have
//a limited number of datapoints
//the function takes three arguments: data, xValue, and x
//x is the value of x inputed into f(x)
//xValue, for this example, is [0,40,80,...]. 
//and the data is [f(0),f(40),f(80),...]
//not sure if I explained that well...
function linear(data,xValue,x){
  //this just simply draws the lines
  //we'll do a better job of this in the quadratic interpolation
  for(var i = 0; i<data.length;i++){
      draw(context1,xValue[i],data[i],xValue[i+1],data[i+1]);
  }
  //here, we want to check which segment x is in
  return checkLineSegment(xValue,x);
 
}
chk = linear(data,xValue,119); 


write(["<br> Expected rate of return: <br>  <br>new line <br>" + chk ]);
