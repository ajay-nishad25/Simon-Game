// Array of Colors
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern  = [];

var level = 0;

var started = false;

// check user pressed any key or not
$("body").keypress(function(event){
    if(!started){
        $("h1").text("Level "+level);
        console.log("game started by pressing "+event.key);
        nextSequence();
        started = true;
    }
});


// onclicking 
$(".btn").click(function(){

    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);

    playSound(userChoosenColor);

    // animate color-box when user click
    animatePress(userChoosenColor);

    // now check for sequences
    checkAnswer(userClickedPattern.length-1);
});



function nextSequence() {

    // clear the userClickedPattern
    userClickedPattern  = [];

    level++;
    $("h1").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 10) % 4;
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("In the checkAnswer()");
        console.log("success");
        console.log(userClickedPattern[level])
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }else{
        // WRONG answer
        console.log("wrong");
        if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]){

            // animate wrong 
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);

            // make h1 as GAME OVER
            $("h1").text("Game Over, Press Any Key to Restart");
            started = false;

            // disable click on color-btn
            
            console.log("wrong");
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();

            startOver();
        }
    }

}


function playSound(currentColor){
    // play audio of current color-box
    var audio = new Audio("sounds/"+currentColor+".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

//restart game
function startOver(){
    started = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    $("body").keypress(function(event){
        if(!started){
            $("h1").text("Level "+level);
            nextSequence();
            started = true;
        }
    });
}