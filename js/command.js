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
var HTMLCmd = function (txt) {
    this.txt = txt;
};

var RemoveCmd = function (tag) {
    this.tag = tag;
};

var BuiltInCmd = function (fnc) {
    this.command = fnc;
};

//an object to be compose of many commands 
var CompositeCmd = function (name, cmd) {
    this.name = name;
    this.cmdList = [];
    this.cmdList.push(cmd);
};

//declare and setup object inheritance
inheritsFrom(HTMLCmd, termCmd);
inheritsFrom(RemoveCmd, termCmd);
inheritsFrom(BuiltInCmd, termCmd);
inheritsFrom(CompositeCmd, termCmd);


//set up the execute functions for each object here
HTMLCmd.prototype.execute = function(){
    add_to_div("<br>" + this.txt);
}

BuiltInCmd.prototype.execute = function(){
    this.command();
}

RemoveCmd.prototype.execute = function(){
    var cmd_ele = $("cmd[remove-cmd='" + this.tag + "']")
    console.log(cmd_ele);
    cmd_ele.remove()
}

CompositeCmd.prototype.execute = function(){

    for(i = 0, max = this.cmdList.length; i < max; i++){
        this.cmdList[i].execute();

    }
}

/*
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

    //var ttt = new HTMLCmd("Ttt", );
    //ttt.execute();
    var cmds = {};
  

    var eles = document.getElementsByTagName('cmd');
   
      for (var i=0, max=eles.length; i < max; i++) {
        var tmpName = eles[i].getAttribute("name");
        var tmpCmd = new HTMLCmd(eles[i].innerHTML);
        
        cmds[tmpName] = new compositeCmd(tmpName, tmpCmd);
        
      }
      //TODO use the clear function here
      termdiv.innerHTML = "";
      cmds["test"].execute();
      //  tmpCmd.execute(); 
      
}
*/