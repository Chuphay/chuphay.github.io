//This code let's us draw on the canvas
var my_canvas1 = document.getElementById('canvas1');
var context1 = my_canvas1.getContext("2d");

//this code flips the y axis, so that it's not inverted 

context1.transform(1,0,0,-1.0,0,150);

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
dot(context1,10,10,"yellow");
//this code let's us write to the html

function write(x){
    window.onload = function(){
        document.getElementById("console").innerHTML = x;
    };
}



write(["<br> Expected rate of return: <br>  <br>new line" ]);
var currentX = 0;
var currentY = 0;
function steps(screen,n) {
    currentX = 0;
    currentY = 0;
    var spacing = 1;
    var otherSpacing =1;
    for(var i=0;i<n;i++){
        var rdm = 2*Math.random()-1;
        
        if (rdm>=0){
            draw(screen,currentX,currentY,currentX + spacing,currentY +otherSpacing);
            currentX = currentX + spacing;
            currentY = currentY +otherSpacing;
        }
        else {
            draw(screen,currentX,currentY,currentX + spacing,currentY -otherSpacing);
            currentX = currentX + spacing;
            currentY = currentY -otherSpacing;
        }
        
    }
}

function monteCarlo(screen,m,n) {
    for (var i = 0; i < m; i++) {
        currentY = 0;
        var color = "#ff"+i+"000";
        screen.beginPath();
        screen.strokeStyle = color;
        steps(screen,n);
        var index = i;   
    }    
}
monteCarlo(context1,10,200);
