
var gamepattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var level = 0, delayVal = 400, clicked = 0;


// game starts
$("body").keypress(function(event){
    if(event.key == 'a' || event.key == 'A'){
        setTimeout(function(){
            nextSequence();
        }, 100);
    }
});


// user clicking
$(".btn").click(function(){
    clicked++;
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    // play sound
    playSound(userChosenColour);

    // flash effect
    $("#" + userChosenColour).addClass("pressed");
    setTimeout(function () {
        $("#" + userChosenColour).removeClass("pressed");
    }, 100);

    if(clicked == level){
        var ans = checkAnswer();
        if(ans) setTimeout(function(){
            nextSequence();
        }, delayVal);
        else restartGame();
    }
});


// user typing
$("body").keypress(function(event){
    if(checkBtn(event.key)){
        clicked++;
        var userChosenColour = event.key;
        switch (userChosenColour) {
            case 'r':
                userChosenColour = "red";
                break;

            case 'g':
                userChosenColour = "green";
                break;

            case 'b':
                userChosenColour = "blue";
                break;

            case 'y':
                userChosenColour = "yellow";
                break;
    
            default:
                break;
        }
        console.log(userChosenColour+"\n");
        userClickedPattern.push(userChosenColour);

        // play sound
        playSound(userChosenColour);

        // flash effect
        $("#" + userChosenColour).addClass("pressed");
        setTimeout(function () {
            $("#" + userChosenColour).removeClass("pressed");
        }, 100);

        if(clicked == level){
            var ans = checkAnswer();
            if(ans) setTimeout(function(){
                nextSequence();
            }, delayVal);
            else restartGame();
        }
    } else if (event.key != 'a'){
        $("h1").text("Please press 'r', 'g', 'b' or 'y' only !");
        setTimeout(function(){
            $("h1").text("Level - " + level);
        }, 2000);
    }
});


// generating next sequence
function nextSequence(){
    //wait(100);

    $("h1").text("Level - " + level);
    // random color
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamepattern.push(randomChosenColour);

    // audio play
    playSound(randomChosenColour);

    // flash effect
    if(level != 0 && delayVal > 100 && level%5 == 0){
        delayVal = delayVal - 100;
        console.log(delayVal);
    }
    $("#"+randomChosenColour).fadeOut(delayVal).fadeIn(delayVal);

    level++;
    userClickedPattern = [];
    clicked = 0;
    console.log(gamepattern + "\n");
    console.log(userClickedPattern + "\n");
}


// sound
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


// checking answer
function checkAnswer(){
    for(var i=0; i<level; i++){
        if(gamepattern[i] != userClickedPattern[i]){
            console.log("Wrong");
            return false;
        }
    }
    console.log("Right");
    return true;
}


// restart game
function restartGame(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 1000);
    $("h1").text("Game Over Wrong Sequence! Press 'A' to restart");

    level = 0;
    gamepattern = [];
}


// check for btn
function checkBtn(btn){
    if(btn == 'r' || btn == 'g' || btn == 'b' || btn == 'y') return true;
    return false;
}