from IPython.core.display import HTML
from inspect import getsourcelines, getargspec
from iAnimation.iParser import parse
from iAnimation.js import _draw, _request




class iAnimation(object):
    def __init__(self, width = '600px', height = '400px', scale = 1, x = 0, y = 0):
        self._function = False
        self._add_object = False
        
        self._canvas = """<canvas id='canvas' width = '{0}' height = '{1}'  style='border:1px solid #000000; background-color: grey;'>
        </canvas>\n""".format(width, height)

        self._scale = scale
        self.x_shift = x
        self.y_shift = y
        self._globals = []
        self._globals_string = ''
        
        self._script_start = """<script>
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var scaleConstant = {scale};
var x_shift = {x}*scaleConstant;
var y_shift = {y}*scaleConstant;
context.transform(scaleConstant,0,0,scaleConstant,x_shift, y_shift);
""".format(scale = str(scale), x = str(x), y = str(y))
        self._message  = ''
    
    def message(self, arg):
        """this is a hack job designed specifically to support finding the area of a circle"""
        if type(arg) is str:
            self._message += "'{0}' ".format(arg)
        else:
            for i, e in enumerate(arg):
                if (type(e) is str) and (i == 0):
                    self._message += "'{0}' ".format(e)
                else:    
                    self._message += "+ 4*count/total"




    def add_object(self, fn, args = None):
        self._add_object = True
        self._next =  parse(fn)

    
    def add_globals(self, variables, values):
        for i, e in enumerate(variables):
            self._globals.append(e)
            self._globals_string += e + ' = ' + str(values[i]) +';\n'


    def next_position(self, fn):
        """The argument must be a function that takes an array of values.
Usually, that means an x-coordinate and a y-coordinate, but can take more values as well.        
It should be a function that returns the position of an object
based upon its previous position."""

        self._fn = fn
  
        lines, num =  getsourcelines(self._fn)
      
      
        if (lines[0][:3] != 'def'):
            raise SyntaxError('unrecognized syntax, the function must begin with "def"')
        if (lines[-1].strip()[:6] != 'return'):
            raise SyntaxError( 'unrecognized syntax, the function must end with "return"')
            
        self._function = True
        var_name = getargspec(self._fn).args[0]
        self._next = """function next(x) {\n"""
        
        
        for line in lines[1:-1]:
            line = line.strip()
            if(line == ''):
                continue
            if(line[:len(var_name)+1] == var_name+ '['):
                self._next += '\t' + line + ';\n'
            else:
                self._next += '\t' + 'var ' + line + ';\n'
        
        self._next += '\t' + lines[-1].strip() +';\n'+ '}\n'
        
    


    def animate(self, init = [0,0], x = 0, y = 1, clear_screen = True, tick = 1):
        """init must be a valid array to set the initial position of the object.
        x and y are the coordinates to be drawn. For example, if your function takes an array 
        [x, x_velocity, y, y_velocity] , then your initial position might be pos = [1,0,0,0] and x = pos[0], y = pos[2].
        By default it will just plot the first two array values returned from next_position
        """
        
        if(self._function == True):
        
            try:
                z = self._fn(init)
                if(len(z) != len(init)):
                    raise IndexError('length of init must be the same length as that returned by y')
            except:
                raise RuntimeError('weird... ')   
  
            self._main = """var x = {init};
            ticker = 0;       
            function main(){{
            {comment}context.clearRect(-{x_shift},-{y_shift}, canvas.width/scaleConstant,canvas.height/scaleConstant);
            ticker++;
            if(ticker >= {tick}){{
            ticker = 0;
            x = next(x);
            }}            
            draw_pixel(x[{x}],x[{y}]);
            requestAnimFrame(function(){{main();}}); 
            }}
            main();
            </script>""".format(comment = '' if clear_screen else '//', init = str(init) ,
                                x_shift = str(self.x_shift), y_shift = str(self.y_shift), x = str(x), y = str(y), tick = str(tick))
        

        
        elif(self._add_object == True):

            self._main = """var x = {init};
            function write(x){{
            document.getElementById("log").innerHTML = x;
            }}
            ticker = 0;       
            function main(){{
            {comment}context.clearRect(-{x_shift},-{y_shift}, canvas.width/scaleConstant,canvas.height/scaleConstant);
            ticker++;
            if(ticker >= {tick}){{
            ticker = 0;
            next();
            write({message});
            }}            
            requestAnimFrame(function(){{main();}}); 
            }}
            main();
 

            </script>
            <div id = 'log'></div>""".format(comment = '' if clear_screen else '//', init = str(init) ,
                                x_shift = str(self.x_shift), y_shift = str(self.y_shift), x = str(x), 
                                             y = str(y), tick = str(tick), message = self._message)

        else:
            raise KeyError('yeah... you messed something up')
        raw_html = self._canvas + self._script_start + _request + _draw + self._globals_string + self._next + self._main
        return HTML(raw_html)
        
    

            
