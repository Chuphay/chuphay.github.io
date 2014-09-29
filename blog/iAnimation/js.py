from re import search


_request = """window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    window.oRequestAnimationFrame || 
    window.msRequestAnimationFrame ||
    function(callback) {
          window.setTimeout(callback, 1000 / 90);
    };})();\n"""



_draw  =  """function draw_pixel(x,y){ 
    context.beginPath();
    context.rect(x, y, 1/scaleConstant, 1/scaleConstant);
    context.fillStyle = 'black';
    context.fill();  
}
function draw_circle(x,y, color, radius){
    context.beginPath();
    context.arc(x, y, radius/scaleConstant, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    //context.lineWidth = 1;
    //context.strokeStyle = '#003300';
    //context.stroke();
}


"""
def interpret(string):

    if (string[:4] == 'draw'):
        if(search("'circle'",string)):
            y = search('color', string)
            color = string[y.span()[1]+2 : search(r'\)|,', string[y.span()[1]+2])]
            #unfortunately couldn't get the full regular expression to work
            #so I ended up hacking a bit and had to use color[:-1]
            return 'draw_circle(x,y, {0}, {1})'.format(color[:-1], '1')
        else:
            return 'draw_pixel(x,y)' 
    else:
        raise KeyError('argg... only draw is accepted')


        
 
