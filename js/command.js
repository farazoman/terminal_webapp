//Faraz Oman
//Commands to be executed by the terminal itself. This does all the processing needed

//to make an object be the child of another
var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};

//basic command template
var termCmd = function(){};

//function template
termCmd.prototype.execute = function() {}

 
//
var textCmd = function (txt) {
    this.txt = txt;
};

//an object to be compose of many commands 
var compositeCmd = function (name, cmd) {
    this.name = name;
    this.cmdList = [];
    console.log(cmdList.push(cmd));
};

//declare and setup object inheritance
inheritsFrom(textCmd, termCmd);
inheritsFrom(compositeCmd, termCmd);


//set up the execute functions for each object here
textCmd.prototype.execute = function(){
    add_to_div(this.txt);
}

compositeCmd.prototype.execute = function(){

    for(i = 0, max = this.cmdList.length; i < max; i++){
        this.cmdList[i].execute();

    }
}


function test(){

  add_to_div(termCmd.execute());
}

function add_to_div(text){
    var termdiv = document.getElementById("term_area");
    var str = termdiv.innerHTML;
    str += text;
    termdiv.innerHTML = str;
}

function load(prompt_){
    var termdiv = document.getElementById("term_area");

    //termdiv.innerHTML = "help";

    //var ttt = new textCmd("Ttt", );
    //ttt.execute();
    var cmds = {};
  

    var eles = document.getElementsByTagName('cmd');
   
      for (var i=0, max=eles.length; i < max; i++) {
        var tmpName = eles[i].getAttribute("name");
        var tmpCmd = new textCmd(eles[i].innerHTML);
        
        cmds[tmpName] = new compositeCmd(tmpName, tmpCmd);
        
      }
      //TODO use the clear function here
      termdiv.innerHTML = "";
      cmds["test"].execute();
      //  tmpCmd.execute(); 
      
}
