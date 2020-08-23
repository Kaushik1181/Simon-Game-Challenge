var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []; // array to define game gamePattern
var userClickedPattern = [] //array to store userClickedPattern

var started = false;
var level = 0; //initializing game level

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("level: " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  if (started) {
    var userChosenColour = $(this).attr("id"); //get id of button pressed
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    var index = userClickedPattern.length - 1;
    checkAnswer(index);
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level: " + level);

  var randomNumber = (Math.floor(Math.random() * 4)); //assign value of nextSequence to a variable randomNumber
  var randomChosenColor = buttonColours[randomNumber]; //Choosing a random color from buttonColours array
  gamePattern.push(randomChosenColor); // pushing the vlaue of a randomChosenColor in gamePattern array

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //play animation
  playSound(randomChosenColor); //play sound
}



function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    startOver();
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    wrongPress();
  }
}

function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}

//*******************Play sound and animation section****************************************
//sounds
function playSound(name) {
  var sounds = new Audio("sounds/" + name + ".mp3");
  sounds.play();
}

//amimations
function animatePress(currentColor) {
  //selecting the button id of the clicked button and applying the ".pressed" class
  $("." + currentColor).addClass("pressed");
  //setting timeout to remove ".pressed" class from the set button after 100 ms
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function wrongPress() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}
