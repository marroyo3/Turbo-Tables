var playing = false; 
var score;
var action;
var timeremaining;
var correctAnswer

document.getElementById("startreset").onclick=function(){
    if(playing==true){
        location.reload();
    }else{
        playing= true;
        score=0;
        document.getElementById("scoreValue").innerHTML = score;

        document.querySelector(".timeremaining").style.display="flex";
            timeremaining=60;
        document.querySelector(".score").style.display="block";

        document.getElementById("startreset").innerHTML="Reset Game";

        document.getElementById("gameover").style.display="none";
        startCountdown();

        generateQuestion();

    }
}

for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {
        if (playing == true) {
            if (this.innerHTML == correctAnswer) {
                score++;
                document.getElementById("scoreValue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function () {
                    hide("correct");
                }, 1000);

                generateQuestion();
            } else {
              
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
            }
        }
    };
}

function generateQuestion (){
    var x =1 + Math.round(9*Math.random());
    var y =1 + Math.round(9*Math.random());

    correctAnswer= x*y;

    document.getElementById("question").innerHTML= x+"x"+y;
    
    //fill random box with correct answer
    var correctposition= 1 + Math.round(3*Math.random());
    document.getElementById("box"+correctposition).innerHTML= correctAnswer
   
   
    //fill othe boxes with random answers
    for(i=1; i<5; i++){
        if (i !== correctposition){
            var wrongAnswer;
            do {
                wrongAnswer =
                    (1 + Math.round(9 * Math.random())) *
                    (1 + Math.round(9 * Math.random()));
            } while (wrongAnswer === correctAnswer);
            document.getElementById("box"+i).innerHTML= wrongAnswer
        }
    }
}

function startCountdown(){
    action= setInterval(function(){
        timeremaining-= 1;
        document.getElementById("timeremainingvalue").innerHTML= timeremaining;
    
    if(timeremaining==0){
            stopCountdown();
            document.getElementById("gameover").style.display="block";
            document.querySelector("#gameover span").innerHTML=score;   
            playing=false;
            document.querySelector(".timeremaining").style.display="none";
            document.querySelector(".score").style.display="none";
            hide("correct");
            hide("wrong");
            document.getElementById("startreset").innerHTML= "Start Game";
    }
        },1000);
        
}
function hide(Id){
    document.getElementById(Id).style.display="none";
}

function show(Id){
    document.getElementById(Id).style.display="block";
}

function stopCountdown(){
    clearInterval(action);
}
