//this is all the database stuff
//I learned it here on codecademy
//http://www.codecademy.com/tracks/parse
//I imagine it would be extremely simple to hack
//since I have my codes all in the air
//but I guess that's just the way it is

function save(){
  
 Parse.initialize("pp3bsoOMSes3dtCQK2L6GO6Y1VH9FJDVwDz2nNLD","vArgfc0Ip0e5lRnS0VpgAWsLG1mtKagM50K8f9H9");
        var currentUser = Parse.User.current();
  if (currentUser) {
      
        document.getElementById("status").innerHTML = "please wait...";
        var userName = currentUser.getUsername();
        var newText = myCodeMirror.getValue()
        currentUser.set("code",newText);
        currentUser.save(null, {
            success: function(object) { document.getElementById("status").innerHTML = "you are making the 3D world: "+userName+". ";
            },
          error: function() { document.getElementById("status").innerHTML = "oops... try again";}});
  }else{
  document.getElementById("status").innerHTML = "you have to either start a new world or load a world to save";}}

function loging(form){
        document.getElementById("status").innerHTML = "Please wait...";
   Parse.initialize("pp3bsoOMSes3dtCQK2L6GO6Y1VH9FJDVwDz2nNLD","vArgfc0Ip0e5lRnS0VpgAWsLG1mtKagM50K8f9H9");
        Parse.User.logOut();
       
        Parse.User.logIn(form.userid.value, form.pswrd.value, {
            success: function(user) {
            var currentUser = Parse.User.current();
            var userName = currentUser.getUsername();
            var newText = currentUser.get("code");
            myCodeMirror.setValue(newText); 
            document.getElementById("status").innerHTML = "you are making the 3D world: "+userName+". ";
            },
           error: function() { document.getElementById("status").innerHTML = "oops... try again";}});
  }
function logout(){
     document.getElementById("status").innerHTML = "Please wait...";
   Parse.initialize("pp3bsoOMSes3dtCQK2L6GO6Y1VH9FJDVwDz2nNLD","vArgfc0Ip0e5lRnS0VpgAWsLG1mtKagM50K8f9H9");
        Parse.User.logOut();
        var oldCode = document.getElementById("code");
        myCodeMirror.setValue(oldCode.value)
        document.getElementById("status").innerHTML = "you have to start a world to save";
}           

function signup(form){
Parse.initialize("pp3bsoOMSes3dtCQK2L6GO6Y1VH9FJDVwDz2nNLD","vArgfc0Ip0e5lRnS0VpgAWsLG1mtKagM50K8f9H9");
       
        document.getElementById("status").innerHTML = "Please wait...";
        var user = new Parse.User();
        user.set("username",form.userid.value);
        user.set("password",form.pswrd.value);
  var newText = myCodeMirror.getValue()
  user.set("code",newText);
        user.signUp(null, {
            success: function(user) {
                var currentUser = Parse.User.current();              
               var userName = currentUser.getUsername(); document.getElementById("status").innerHTML = "you are making the 3D world: "+userName+". ";
            },
          error: function(){
          document.getElementById("status").innerHTML = "oops... try again. Every world name must be unique, your choice may have already been taken";
          }});}



function updateStatus(){
  document.getElementById("status").innerHTML = "please wait...";
 Parse.initialize("pp3bsoOMSes3dtCQK2L6GO6Y1VH9FJDVwDz2nNLD","vArgfc0Ip0e5lRnS0VpgAWsLG1mtKagM50K8f9H9");
    var currentUser = Parse.User.current();
    if (currentUser) {
        var userName = currentUser.getUsername();
        var query = new Parse.Query(Parse.User); document.getElementById("status").innerHTML = "please wait...";
        query.get(Parse.User("code"),{
            success: function(object) {              document.getElementById("status").innerHTML = "you are making the 3D world: "+userName+". ";
                var newtext = currentUser.get("code");
                myCodeMirror.setValue(newtext); 
            },
            error:function() {
                document.getElementById("status").innerHTML = "oops... try again";
                var newtext = "yikes! something failed miserably";
                document.getElementById("code").value = newtext;}}); } else {  
                document.getElementById("status").innerHTML = "you have to start a world to save";} }          
