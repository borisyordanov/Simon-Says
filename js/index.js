$(document).ready(function() {

  var sequence =[];
  var counter = 0;
  var playing = false;
  var move = 0;
  var clickCount= 0;

function gameStart(){
  if (counter >= 20){
    
    $('.msgWinner').removeClass('hidden');
  }else{
    if (playing ===false){
      addToSequence();
      counter++;
      updateCounter(counter);
      playSequence(sequence);
    }
  } 
}

function addToSequence(){
var random = Math.floor(Math.random()*4)+1;
sequence.push(random);
}

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
} 

function lightUp(box){
  playSound(box);
  var $box = $('#' + box).addClass('lit');
  window.setTimeout(function(){
    $box.removeClass('lit');
  },400);
}

function updateCounter(counter){
  $('.counter').text('Round: '+ counter);
}

  $('.box').on('click', function(){
    //if the player has not repeated the full sequence
    if(clickCount < sequence.length && playing === true){
        move = $(this).attr('data-box');
        lightUp(move);
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
      
  });

function checkSequence(move, clickCount){
  var result = false;
  if (move == sequence[clickCount]){
    result = true;
  }
  return result;
}

function playSound(clip){
  var sound = $('#clip'+ clip)[0];
  sound.currentTime = 0;
  sound.play();
}
$('.start').on('click', function(){
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

});