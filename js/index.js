$(document).ready(function() {
  // $('.winner').hide();
  var sequence =[];
  var counter = 0;
  var playing = false;
  var move = 0;
  var clickCount= 0;


function gameStart(){
  console.log('gameStart called');
  if (counter >= 20) {
    //player wins game end;
    $('.msgWinner').removeClass('hidden');
  }
  else {
    if (playing ===false){
    	addToSequence();
    	counter++;
    	updateCounter(counter);
    	playSequence(sequence);
    }//if
  } //if-else
}//gameStart

function addToSequence(){
var randVal = Math.floor(Math.random()*4)+1;
sequence.push(randVal);
console.log('sequence is: '+ sequence);
}//addToSequence

function playSequence(sequence){
  var i = 0;
  var interval = setInterval(function(){
    lightUp(sequence[i]);
    i++;
    if(i >= sequence.length){
      clearInterval(interval);
    }
  },700);
  playing = true;
} //playSequence

function lightUp(box){
  playSound(box);
  var $box = $('#' + box).addClass('lit');
  window.setTimeout(function(){
    $box.removeClass('lit');
  },400);
}//lightUp

function updateCounter(counter){
  $('.counter').text('Round: '+ counter);
}

//PLAYER'S TURN

  $('.box').on('click', function(){
    //if the player has not repeated the full sequence
    if(clickCount < sequence.length && playing === true){
        move = $(this).attr('data-box');
        lightUp(move);
        console.log('tile '+ move +' clicked');
        if (checkSequence(move,clickCount)){
          clickCount ++;
          if (clickCount >= sequence.length){
            playing = false;
            clickCount = 0;
            window.setTimeout(gameStart, 600);
          }
        }else{
          playing = false;
          updateCounter('X');
          $('.msgLoser').removeClass('hidden');
        }
      }
      
  }); //onClick



function checkSequence(move, clickCount){
  console.log('move is: '+ move);
  console.log('sequence[clickCount] is: '+ sequence[clickCount]);
  var result = false;
  if (move == sequence[clickCount]){
    result = true;
  }//checkSequence
  return result;
}

function playSound(clip){
  var sound = $('#clip'+ clip)[0];
  sound.currentTime = 0;
  sound.play();
}

//BUTTONS
$('.startOver').on('click', function(){
  sequence =[];
  counter = 0;
  playing = false;
  move = 0;
  clickCount= 0;
  updateCounter(counter);
  $(".msgWinner,.msgLoser ").addClass('hidden');
  gameStart();
}); 

$('.play').on('click', function(){
  sequence =[];
  counter = 0;
  playing = false;
  move = 0;
  clickCount= 0;
  updateCounter(counter);
  gameStart();
  });

});//document ready