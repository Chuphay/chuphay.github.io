_draw  =  """function draw_pixel(x,y){ 
    context.beginPath();
    context.rect(x, y, 1/scaleConstant, 1/scaleConstant);
    context.fillStyle = 'black';
    context.fill();  
}
function draw_circle(x,y, color, radius){
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#003300';
    context.stroke();
}


"""

def draw(x, y, color = 'black', shape = 'pixel', height = 1, length = 1):
    if(shape == 'pixel'):
        return 'draw_pixel(x,y)'
    if(shape == 'circle'):
        return 'draw_circle(x,y, color, height)'
    else:
        raise KeyError('thats not a recognized format')

        
 
