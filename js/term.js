var prompt = "";
var cmds = {};
/*cmds["help"] = function(){help()};
cmds["whoami"] = function(){info()};
cmds["myprojs"] = function(){projects()};
//cmds["enter"] = function(){enter()};
cmds["version"] = function(){version()};
cmds["resumeplz"] = function(){resume()};
cmds["clear"] = function(){clear()};
cmds[""] = function(){nada()};
*/
var version_ = "webterminal v0.3.0";
//var info_v = "</br></br>My name is Faraz Oman, and I am a student at McGill University, Majoring in Software Engineering and Minoring in Hispanic Studies. I am in my third year and I am a part of a variety of extracurriculars. I was the editor-in-chief of the <a target='_blank' href='http://www.plumbersfaucet.ca'>Plumber's Faucet</a>, and was and currently am the editor-in-chief of the Academic Journal <a target='_blank' href='http://issuu.com/clashsamcgill'>'Voces'</a> and was the Vice President of Information Technology of <a target='_blank' href='http://www.actuarialmcgill.ca'>McGill Students' Actuarial Association</a>.</br></br>I enjoy to spend my time listening to music, learning spanish and writing calligraphy.</br></br>I can be reached at <a target='_blank' href='mailto:faraz@farazoman.com'>faraz@farazoman.com</a>. Enjoy the rest of the site.</br>";
//var welcomemsg = "Welcome to my website, to use the terminal type 'help' then press 'enter' for more commands."
//var errmsg = "</br></br><div id='err'>Sorry</div> that is not valid command, refer to the valid commads below.";
//var proj_info = "</br></br>Hi there, thanks for the interest, my projects can be found at my <a target='_blank' href='http://www.github.com/farazoman'>github</a>. You will see the code for projects such as this terminal interface and others such as a video game in java and various hackathon mini projects.</br>"
var version_info = "</br></br>" + version_ + "</br>This version is still in beta with many features still to be implemented. Source code can be viewed <a target='_blank' href='http://www.github.com/farazoman/terminal_webapp'>here</a></br>";
var cmd = "";
var endline = "</br>";
var blinkerOn = false;
var inFocus = false;
var remove_attr = "remove-cmd";

function load(prompt_){

	var termdiv = document.getElementById("term_area");
    var body = document.getElementsByTagName("body");
    var eles = document.getElementsByTagName('cmd');

    //load all the commands from the html
    for (var i=0, max = eles.length; i < max; i++) {
        var tmpName = eles[i].getAttribute("name");
        var rm_attr = eles[i].getAttribute(remove_attr);
        var tmpCmd = new HTMLCmd(eles[i].innerHTML);

        if(!tmpName){
            tmpName = i + "";
        }
        if(rm_attr){
            //TODO create a NEW command that is used to remove a certain type of element.
            cmds[rm_attr] = new RemoveCmd(rm_attr);
            tmpCmd = new HTMLCmd("<cmd " + remove_attr + "=" + rm_attr + ">" + eles[i].innerHTML + "</cmd>");
        }

        cmds[tmpName] = new CompositeCmd(tmpName, tmpCmd);
    }

    //add built in commands
    cmds["version"] = new BuiltInCmd(version); 
    cmds["help"] = new BuiltInCmd(ayuda);  
    cmds["clear"] = new BuiltInCmd(clear);  
    
    //clear out terminal after loading
    termdiv.innerHTML = "";

    //add initial texts
    add_to_div(termdiv.getAttribute("welcome"));
    prompt = endline + prompt_;
    add_to_div(prompt);
    //turn on the blinker like in a normal terminal/text editor
    setInterval(function(){blinker()}, 500);
    //for setting the focus on the terminal
    termdiv.addEventListener("click", setInFocus, false);
    body[0].addEventListener("click", setOutOfFocus);
}

//to make div independent from rest of the html
function setInFocus(){
    inFocus = true;
    $("#term_area").focus();
}

function setOutOfFocus(evt){
    if("term_area" == evt.target.id){
        setInFocus();
    }
    else{
        inFocus = false;
    }
}


function nada(){}

//adds an element to the terminal
function add_to_div(text, isBlinker = false){
    if(!isBlinker){
        $("#term_area").append("<span>"+text+"</span>");  
    }
    else{
        $("#term_area").append(text);  
    }

}


var version = function version(){
    add_to_div(version_info);
}

function resume(){
    //window.location.href = 'http://www.farazoman.com/files/cur_resume.pdf';
    window.open("http://www.farazoman.com/files/cur_resume.pdf", "_blank");
}

var clear = function clear(){
    var termdiv = document.getElementById("term_area");
    termdiv.innerHTML = "";
}

var ayuda = function help(){
	var ayuda = "</br></br><u>The available commands are:</u>";

	for(i in cmds){
		ayuda += endline;
		ayuda += i;
	}

	add_to_div(ayuda);

}

function error(){
	add_to_div(errmsg);
	ayuda();
}

function turnOffBlinker(){
    backspace(true)
    blinkerOn = false;
}

function blinker(){
	var ltr = '';
    if(inFocus){
    	if(blinkerOn){
            turnOffBlinker();
        }
        else{
        	ltr += '<blink>|</blink>';
        	blinkerOn = true;
        }
        add_to_div(ltr, true);
    }else{
        turnOffBlinker()    
    }

}

//Event listener for keypressed
document.addEventListener('keypress', function(event) {
    var termdiv = document.getElementById("term_area");

    //what does this do exactly?
    //window.scrollTo(0,document.body.scrollHeight);

	//When enter is pressed, process input
    if(inFocus){
        if(event.keyCode == 13) {
        	//process cmd here!!!
        	backspace(true);
            console.log(cmd);
        	try{
                if(cmd){
        		  cmds[cmd].execute();
                }
                else{
                    nada();
                }
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
        	turnOffBlinker();
        	add_to_div(ltr)

        	cmd += ltr;
        	
        }
        termdiv.scrollTop = termdiv.scrollHeight;
        //window.scrollTo(0,document.body.scrollHeight);
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
    ////////////////TODO TODO TODO , it isn't working, needs to be working . wierd shit happens, check it out
   	
   	if(blinkerOn && blinkerOnly){
        $("#term_area blink:last-child").remove();
		blinkerOn = false;
	}

    if(cmd.length != 0 && !blinkerOnly){
        //$("#term_area span:last-child").remove();
        //  $("#term_area span:last-child").remove();
        $("#term_area blink:last-child").remove();
        $("#term_area span:last-child").remove();
        cmd = cmd.substring(0, cmd.length - 1);
    }

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
        turnOffBlinker();
    }

    if (doPrevent) {
        event.preventDefault();
    }
});
