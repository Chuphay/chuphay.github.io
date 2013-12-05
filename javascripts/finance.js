//This code let's us draw on the canvas
var my_canvas1 = document.getElementById('canvas1');
var context1 = my_canvas1.getContext("2d");
var my_canvas2 = document.getElementById('canvas2');
var context2 = my_canvas2.getContext("2d");
var my_canvas3 = document.getElementById('canvas3');
var context3 = my_canvas3.getContext("2d");
//this code flips the y axis, so that it's not inverted 

context1.transform(1,0,0,-2.0,0,150);
context2.transform(1,0,0,-2.0,0,150);
context3.transform(1,0,0,-2.0,0,150);
//this let's us draw to the canvas
//a,b is the current position
//and x,y is where you want to draw to
function draw(screen,a,b,x,y){
    screen.moveTo(a,b); 
    screen.lineTo(x,y);
    screen.stroke();
}
//this code let's us write to the html

function write(x){
    window.onload = function(){
        document.getElementById("console").innerHTML = x;
    };
}

//This is where the student will write her code
//and it should look like this when completed
function Stock(x,y){
    var info = x;
    var price = y;
    this.getAllPrices = function(){
        return price;
    };
    this.getInfo = function(){
        return info;
    };
    this.graphPrices = function(screen){
            for(var i=0;i<price.length;i++){
            draw(screen,i,price[i],i+1,price[i+1]);    
        }
    };
    this.getSimpleRate = function(a,b){
        return 100*(price[b]-price[a])/price[a];
    };
    this.graphSimpleRate = function(screen){
        for(var i=1;i<price.length;i++){   
            draw (screen,i-1,this.getSimpleRate(i-1,i),i,this.getSimpleRate(i,i+1));
        }
    };
    this.rateCheck = function(a,b){
        var occurences = 0;
        
        for(var i=0;i<price.length;i++){
            var check = this.getSimpleRate(i,i+1);
            if (check > a && check <= b){
                occurences = occurences + 1;
            }
        }
        return occurences;
    };
    this.fourierGraph = function(screen){
        
        for (var i = -150; i<150; i ++){   
            draw(screen,i+100,this.rateCheck((i-1)/2,i/2)+20,i+101,this.rateCheck(i/2,(i+1)/2)+20);
        }   
       
    };
  this.getExpectedSimpleRate = function(){
        var expectSum = 0;
        for(var i = 1 ; i<price.length;i++){
            var newExpect = this.getSimpleRate(i-1,i);
            expectSum = expectSum +newExpect;
        }
        return expectSum/(price.length - 1);
    };
  this.getSimpleVariance = function(){
        var expectedRate = this.getExpectedSimpleRate()/100;
        var variance = 0;
        for (var i = 1; i<price.length; i++){
            var newVariance = (this.getSimpleRate(i-1,i)/100-expectedRate)*(this.getSimpleRate(i-1,i)/100-expectedRate);
            variance = variance + newVariance;
        }
        return variance/(price.length - 1);
    };
}

//here I've provided the stock prices of disney
//these prices are available on finance.yahoo.com
var disney = new Stock("Weekly stock price of Disney from 5/19/08 to 5/20/13",[31.01,31.36,30.81,31.66,29.81,29.46,28.84,27.25,28.84,29.02,28.07,29.89,30.33,30.05,30.19,29.27,31.04,32.09,30.56,27.57,21.5,23.1,21.1,24.18,21.8,19.67,19.71,21.02,21.25,21.42,21.25,21.01,22.66,21.13,20.33,19.52,19.59,18.42,17.54,16.6,15.88,14.99,16.23,16.53,17.61,18.94,18.83,19.3,19.19,20.78,24.12,22.17,22.45,22.94,23.63,23.74,22.29,22.19,21.63,21.23,23.22,25.18,23.79,25.28,24.49,25.38,25.42,24.53,26.92,26.94,26.16,25.77,27.13,27.85,27.36,25.93,27.05,28.83,28.43,28.75,29.21,30.37,30.61,30.94,30.9,30.55,29.32,28.72,28.31,28.3,28.81,29.92,29.93,31.83,32.28,32.23,33.83,34.06,34.7,34.33,35.25,35.3,32.01,32.63,31.49,32.02,32.28,32.81,33.68,32.08,30.07,32.34,31.65,32.7,32.28,33.53,32.27,31.67,31.41,33.22,32.72,33.11,32.17,31.94,33.07,33.42,33.51,34.62,35.64,36.17,35.46,35.16,36.02,35.51,35.89,36.52,36.33,38.21,38.06,38.49,37.63,39.43,42.05,42.19,41.6,42.18,41.58,39.94,41.62,41.5,40.45,40.22,40.94,41.75,41.71,40.22,40.2,40.22,38.14,37.29,36.85,36.4,38.47,38.66,38.04,39.37,37.41,34.08,32.05,30.85,31.38,31.44,30.07,31.88,28.89,29.21,30.7,33.39,34.06,35.07,33.67,35.55,34.51,32.46,35.46,35.41,34.79,37.13,36.93,39.31,37.82,38.72,38.66,39.4,40.82,41.12,40.69,41.72,41.6,42.54,42.99,43.12,42.43,41.22,41.71,42.69,42.28,44.87,43.15,43.83,43.73,45.54,46.38,46.75,47.77,47.31,47.46,47.86,49.18,49.02,48.9,49.7,48.81,48.72,50.96,51.56,51.94,51.49,52.17,49.82,51.12,49.32,49.11,46.35,46.7,48.51,48.91,49.24,48.67,50,49.15,52.19,50.58,52.34,54.38,54.59,54.66,55.61,54.25,55.33,57.39,57.58,56.78,56.8,57.7,60.55,61.56,61.87,64.8,67.2,66.58,66.12]);

write([disney.getInfo(),"<br> Expected rate of return:"+disney.getExpectedSimpleRate().toFixed(4),"<br> Variance: " + disney.getSimpleVariance().toFixed(4)]);
disney.graphPrices(context1);
disney.graphSimpleRate(context2);
context2.beginPath();
context2.strokeStyle = "#f12aa0";
disney.fourierGraph(context2);
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
        context3.beginPath();
        context3.strokeStyle = color;
        steps(screen,n);
        var index = i;   
    }    
}
monteCarlo(context3,10,200);

