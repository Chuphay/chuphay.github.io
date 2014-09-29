from inspect import getsourcelines, getargspec 
from iAnimation.js import interpret
   
def internal_parser(line, spot):
    """checking for indentation"""
    space = len(line) - len(line.lstrip())
    if(space>spot):
        spot = space
    elif(space<spot):
        spot = space
    else:
        pass
    if(spot%4 != 0): raise ValueError('spot%4 != 0')     
    return spot    
    
def parse(fn):
    #print("FUNCTION NAME: " + fn.__name__)
    z, g = getsourcelines(fn)
    output = ''
    try:
        var_name = getargspec(fn).args[0]
    except IndexError:
        #print("function has no argument")
        pass
    #the spot variable will be used to keep track of spacing and indentation
    spot = 0 

    for line in z:
        #I ended up using another function to check for indentations
        #but perhaps this isn't actually necessary
        new_spot = internal_parser(line,spot)
        line = line.strip()
        

        if(new_spot>spot):
            #we have an indent, this corresponds with a new phrase, hence a brace
            spot = new_spot
            output += ' { \n' 

        elif(new_spot<spot):
            #end of a phrase, or perhaps more than one
            for i in range((spot-new_spot)//4):
                output += ' '*(spot-4*i-4) +'}\n'
            spot = new_spot    
        else:
            #nothing happened, don't really need this condition
            spot = new_spot
            
        #here's some fairly general control operations    
        if(line[:3] == 'def'):
            output += ' '*spot +'function next(x)'
        elif(line[:2] == 'if'):
            output += ' '*spot +line[:-1]
        elif(line[:4] == 'else'):
            output += ' '*spot +line[:-1]
        elif(line[:4] == 'elif'):
            output += ' '*spot +'else if ' + line[4:-1]
            
        #here's some more specific commands    
        elif(line[:3] == 'iA.'):
            try:
                out = interpret(line[3:])
                output += ' '*spot + out +';\n'
            except:
                raise KeyError("couldn't evaluate the expression :(")
        elif(line[:11] == 'iAnimation.'):
            try:
                out = interpret(line[11:])
                output += ' '*spot + out +';\n'
            except:
                raise KeyError("couldn't evaluate the expression :(")

            
        
        #here's some weird outliers
        elif 'np.random.rand' in line:
            line = str.replace(line,'np.random.rand','Math.random')
            output += ' '*spot + line +';\n'               
        
        
        
        #final clean up... should almost be an error :/
        else:
            output += ' '*spot + line +';\n'
    
    #checking for final closing braces
    for i in range(spot//4):
        output += ' '*(spot-4*i-4) +'}\n'            
    

    return output       
