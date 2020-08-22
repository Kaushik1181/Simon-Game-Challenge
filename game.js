// creating an array to store userClickedPattern
var userClickedPattern = []

//creating an array to define game gamePattern
var gamePattern = [];

//initializing game level
var level = 0;

// creating an array of colors
var buttonColours = ["red", "blue", "green", "yellow"]

function playSound(name) {
  var sounds = new Audio("sounds/" + name + ".mp3");
  sounds.play();
}

function animatePress(currentColor) {
  //selecting the button id of the clicked button and applying the ".pressed" class
  $("."+currentColor).addClass("pressed");
  //setting timeout to remove ".pressed" class from the set button after 100 ms
  setTimeout(function() {
    $("."+currentColor).removeClass("pressed");
  }, 100);
}

function newSequence() {

  var randomNumber = (Math.floor(Math.random() * 4)); //assign value of newSequence to a variable randomNumber

  var randomChosenColor = buttonColours[randomNumber]; //Choosing a random color from buttonColours array

  gamePattern.push(randomChosenColor); // pushing the vlaue of a randomChosenColor in gamePattern array

  animatePress(randomChosenColor); //play animation

  playSound(randomChosenColor); //play sound

  $("h1").text("Level: "+level);

  level = level + 1; //increment level by 1
}

$(".btn").click(function() {
  var userChosenColour = event.target.id; //get id of button pressed
  userClickedPattern.push(userChosenColour); //psuhing button id (color) to array
  playSound(userChosenColour); //play sound
  animatePress(userChosenColour); //play animation
});

$(document).keypress(function() {
  if(level===0) {
    newSequence();
  }
});
