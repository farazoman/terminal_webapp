var prompt = "";
var cmds = {};
cmds["testing"] = function(){test()};
var bk_colour;
var txt_colour;
var cmd = "";
var endline = "</br>";
var blinkerOn = false;


function load(prompt_){
	prompt += prompt_;

    var termdiv = document.getElementById("term_area");
    termdiv.innerHTML = prompt;

    prompt = endline;
    prompt += prompt_;
    cmds["testing"]();
    setInterval(function(){blinker()}, 500);
}

function test(){
	alert("asdf");
}

function blinker(){
	var ltr = '';
	if(blinkerOn){
    	backspace(true)
    	blinkerOn = false;
    }
    else{
    	ltr += '|';
    	blinkerOn = true;
    }
    document.getElementById("term_area").innerHTML += ltr;
}

//Event listener for keypressed
document.addEventListener('keypress', function(event) {

	//When enter is pressed, process input
    if(event.keyCode == 13) {
    	//process cmd here!!!

		backspace(true);
		blinkerOn = false;
    	cmd="";
    	document.getElementById("term_area").innerHTML += prompt; 
    }
    else{
    	var ltr = String.fromCharCode(event.keyCode);
    	
    	backspace(true);
    	blinkerOn = false;
    	document.getElementById("term_area").innerHTML += ltr; 

    	cmd += ltr;
    	
    }
});

function backspace(blinkerOnly){
    var str = document.getElementById("term_area").innerHTML;
   	
   	if(blinkerOn){
		str = str.substring(0, str.length - 1);
	}

	if(cmd.length != 0 && !blinkerOnly){
    	str = str.substring(0, str.length - 1);
    	cmd = cmd.substring(0, cmd.length - 1);
	}

	document.getElementById("term_area").innerHTML = str;
}


//Allow use of backspace to delete characters and not force it to go back a page
$(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === 'INPUT' && 
             (
                 d.type.toUpperCase() === 'TEXT' ||
                 d.type.toUpperCase() === 'PASSWORD' || 
                 d.type.toUpperCase() === 'FILE' || 
                 d.type.toUpperCase() === 'EMAIL' || 
                 d.type.toUpperCase() === 'SEARCH' || 
                 d.type.toUpperCase() === 'DATE' )
             ) || 
             d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }
        else {
            doPrevent = true;
        }
        backspace(false);
        blinkerOn = false;
    }

    if (doPrevent) {
        event.preventDefault();
    }
});