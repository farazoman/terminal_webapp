var prompt = "";
var cmds = {};
cmds["help"] = function(){help()};
cmds["whoru"] = function(){info()};
cmds[""] = function(){nada()};
var welcomemsg = "Welcome to my website, you may enter the graphical user interface by typing the command 'enter' and if you wish to use the terminal type 'help' for more commands."
var info_v = "</br>I am Faraz oman";
var errmsg = "</br>Sorry that is not valid command, refer to the valid commads below.</br>";
var bk_colour;
var txt_colour;
var cmd = "";
var endline = "</br>";
var blinkerOn = false;

function load(prompt_){
	var termdiv = document.getElementById("term_area");

	welcome();

    prompt = endline;
    prompt += prompt_;

    termdiv.innerHTML += prompt;
    
    setInterval(function(){blinker()}, 500);
}

function nada(){}

function add_to_div(text){
	var termdiv = document.getElementById("term_area");
	var str = termdiv.innerHTML;
	str += text;
	termdiv.innerHTML = str;
}

function welcome(){
	add_to_div(welcomemsg);
}

function info(){
	add_to_div(info_v);
}

function help(){
	var ayudar = "</br>The available commands are:"

	for(i in cmds){
		ayudar += "</br>";
		ayudar += i;
	}

	add_to_div(ayudar);

}

function error(){
	add_to_div(errmsg);
	help();
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
    add_to_div(ltr);
}

//Event listener for keypressed
document.addEventListener('keypress', function(event) {

	//When enter is pressed, process input
    if(event.keyCode == 13) {
    	//process cmd here!!!
    	backspace(true);
    	try{
    		cmds[cmd]();
    	}
    	catch(err){
    		error();
		}

		backspace(true);
    	cmd="";
    	add_to_div(prompt); 
    }
    else{
    	var ltr = String.fromCharCode(event.keyCode);
    	backspace(true);
    	blinkerOn = false;
    	add_to_div(ltr)

    	cmd += ltr;
    	
    }
});

function backspace(blinkerOnly){
    var str = document.getElementById("term_area").innerHTML;
   	
   	if(blinkerOn){
		str = str.substring(0, str.length - 1);
		blinkerOn = false;
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
