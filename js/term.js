var prompt = "";
var cmds = {};
cmds["help"] = function(){help()};
cmds["whoami"] = function(){info()};
cmds["myprojs"] = function(){projects()};
cmds["enter"] = function(){enter()};
cmds["version"] = function(){version()};
cmds[""] = function(){nada()};
var version_ = "webterminal v0.2.0";
var welcomemsg = "Welcome to my website, you may enter the graphical user interface by typing the command 'enter' and if you wish to use the terminal type 'help' for more commands."
var info_v = "</br></br>My name is Faraz Oman, and I am a student at McGill University, Majoring in Software Engineering and Minoring in Mathematics. I am currently entering my second year and I am a part of a veritiy of extracurriculars. I am the editor-in-cheif of the <a target='_blank' href='http://www.plumbersfaucet.ca'>Plumber's Faucet</a> and I am regularly involved in McGill Engineering Undergraduate Society events.</br></br>I enjoy to spend my time listening to music, learning spanish and biking.</br></br>I can be reached at farazoman@gmail.com if you wish to get in contact with me. Enjoy the rest of the site.</br>";
var errmsg = "</br></br><span id='err'>Sorry</span> that is not valid command, refer to the valid commads below.";
var proj_info = "</br></br>Hi there, thanks for the interest, my projects can be found at my <a target='_blank' href='http://www.github.com/farazoman'>github</a> also visit <a target='_blank' href='http://finance.mcgilleus.ca'>here</a> to get a glimpse of the project headed by me. The mcgilleus project is made to digitize the submission and authentication of cheque requisions for the Engineering Undergraduate Society of McGill university. On github you can view projects that I have worked on from highschool including a few things I have worked on including this terminal style interface.</br>"
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

function projects(){
	add_to_div(proj_info)
}

function version(){
    var version_info = "</br></br>" + version_ + "</br>This version is still in beta with many features still to be implemented. Source code can be viewed <a target='_blank' href='http://www.github.com/farazoman/terminal_webapp'>here</a></br>";

    add_to_div(version_info);
}

function help(){
	var ayudar = "</br></br><u>The available commands are:</u>";

	for(i in cmds){
		ayudar += "</br>";
		ayudar += i;
	}

	add_to_div(ayudar);

}

function enter(){
    add_to_div("</br>The graphical user interface has not yet been completed, sorry for the dissapointment, but you can view this cute gif of <a target='_blank' href='../res/mudkip.gif'>mudkip</a> instead");
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

window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // Left
            
        break;

    case 38: // Up
        break;

    case 39: // Right
        break;

    case 40: // Down
        break;
  }
}, false);

function left_cursor(){
    var str = document.getElementById("term_area").innerHTML;

}

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
