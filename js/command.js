
var termCmd = function(name){
  this.name = name;

};

termCmd.prototype.execute = function() {
   
}
 
var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};

var htmlLoaded = function (txt) {
    this.txt = txt;
};

var compositeCmd = function (name, cmd) {
    this.name = name;
    this.cmdList = [];
    console.log(cmdList.push(cmd));
};


inheritsFrom(htmlLoaded, termCmd);
inheritsFrom(compositeCmd, termCmd);

htmlLoaded.prototype.execute = function(){

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

    //var ttt = new htmlLoaded("Ttt", );
    //ttt.execute();
    var cmds = {};
  

    var eles = document.getElementsByTagName('cmd');
   
      for (var i=0, max=eles.length; i < max; i++) {
        var tmpName = eles[i].getAttribute("name");
        var tmpCmd = new htmlLoaded(eles[i].innerHTML);
        
        cmds[tmpName] = new compositeCmd(tmpName, tmpCmd);
        
      }
      //TODO use the clear function here
      termdiv.innerHTML = "";
      cmds["test"].execute();
      //  tmpCmd.execute(); 
      
}
