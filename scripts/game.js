/* ------------------------ GLOBAL HELPER VARAIBLES ------------------------ */
// Difficulty Helpers
let astProjectileSpeed = 3;            // easy: 1, norm: 3, hard: 5

// Game Object Helpers
const windowWidth = $(window).width();
    const windowHeight = $(window).height();

    const avatarWidth = $('#avatar').width();
    // const avatarWidth = $('#avatar').height();

    console.log(windowWidth);
    console.log(windowHeight);
    console.log(avatarWidth);
    // console.log(avatarWidth);

let currentRain = 1;
let currentFish= 1;
let currentUmbrella = 1;
const AST_OBJECT_REFRESH_RATE = 15;
const maxPersonPosX = windowWidth - avatarWidth;
const maxPersonPosY = windowHeight - avatarWidth;
const PERSON_SPEED = 2;                // #pixels each time player moves by
const fishOccurrence = 15000;        // fish spawns every 15 seconds
const fishGone = 5000;               // fish disappears in 5 seconds
const umbrellaOccurrence = 10000;        // umbrella spawns every 10 seconds
const umbrellaGone = 5000;               // umbrella disappears in 5 seconds

// Movement Helpers
let LEFT = false;
let RIGHT = false;
let UP = false;
let DOWN = false;

// TODO: ADD YOUR GLOBAL HELPER VARIABLES (IF NEEDED)

let firstPlay = true; //true if this is the users first time playing the game, howtoplay should show
let danger = 20;
let start_danger = 20;
let level = 1;
let spawnSpeed = 800;
let start_spawnSpeed = 800;
let gameOver = false;
let avatar_right = 600;
let avatar_top = 320;
let umbrellaed = false; //true if there is a sheild on the player
let score = 0;
let needsReset = false;
/* --------------------------------- MAIN ---------------------------------- */
$(document).ready(function () {
  // jQuery selectors
  game_window = $('.game-window');
  game_screen = $("#actual-game");
  rain_section = $('.rainSection');
  // hide all other pages initially except landing page
  game_screen.hide();

  /* -------------------- ASSIGNMENT 2 SELECTORS BEGIN -------------------- */

  var slider = document.getElementById("myRange");
  var output = document.getElementById("volume");
  output.innerHTML = slider.value; // Display the default slider value
  
  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function() {
    output.innerHTML = this.value;
    document.getElementById("dieSound").volume = output.innerHTML/100;
    document.getElementById("collectSound").volume = output.innerHTML/100;
  }

  /* --------------------- ASSIGNMENT 2 SELECTORS END --------------------- */

  // TODO: DEFINE YOUR JQUERY SELECTORS (FOR ASSIGNMENT 3) HERE

  // Example: Spawn an rain that travels from one border to another
  // spawn(); // Uncomment me to test out the effect!

  cur('normal');

  

  var dangerOutput = document.getElementById("danger_num");
  dangerOutput.innerHTML = danger; // Display the value of danger
  
  var levelOutput = document.getElementById("level_num");
  levelOutput.innerHTML = level; // Display the value of level

  var scoreOutput = document.getElementById("score_num");
  scoreOutput.innerHTML = score; // Display the value of level

});


/* ---------------------------- EVENT HANDLERS ----------------------------- */
// Keydown event handler
document.onkeydown = function (e) {
  if (e.key == 'ArrowLeft') LEFT = true;
  if (e.key == 'ArrowRight') RIGHT = true;
  if (e.key == 'ArrowUp') UP = true;
  if (e.key == 'ArrowDown') DOWN = true;
}

// Keyup event handler
document.onkeyup = function (e) {
  if (e.key == 'ArrowLeft') LEFT = false;
  if (e.key == 'ArrowRight') RIGHT = false;
  if (e.key == 'ArrowUp') UP = false;
  if (e.key == 'ArrowDown') DOWN = false;
}

/* ------------------ ASSIGNMENT 2 EVENT HANDLERS BEGIN ------------------ */
function playGame_click(){
  //console.log("Hello World");

  if(firstPlay){
    $('#tutorial-panel').show();
  }

  else{
    //play the game
    startGame();
  }

  $('#landing-page').hide();
}

function settings_click(){
  console.log("settings");
  $('#settings-panel').show();
}
function close_click(){
  console.log("settings");
  $('#settings-panel').hide();
}

function cur(curval){
  //find active btn first
  var active_btn = document.querySelector('.difficulty-button.active');
  
  //if any active btn

  if(active_btn){
    //remove active class from it 
    active_btn.classList.remove('active');
  }
  
  //now add active class to selected button
  document.getElementById(curval).classList.add('active');
  document.body.style.cursor = curval;
  console.log('button');

  
  //changes the difficulty level var;
  if(curval =='easy'){
    astProjectileSpeed = 1;
    danger = 10;
    start_danger = 10;
    spawnSpeed = 1000;
    start_spawnSpeed = 1000;
  }
  else if(curval == 'normal'){
    astProjectileSpeed = 3;
    danger = 20;
    start_danger = 20
    spawnSpeed = 800;
    start_spawnSpeed = 800;
  }
  else{
    astProjectileSpeed = 5;
    danger = 30;
    start_danger = 30;
    spawnSpeed = 600;
    start_spawnSpeed = 600;
  }

  var dangerOutput = document.getElementById("danger_num");
  dangerOutput.innerHTML = danger; // Display the updated value of danger
}

/* ------------------- ASSIGNMENT 2 EVENT HANDLERS END ------------------- */

// TODO: ADD MORE FUNCTIONS OR EVENT HANDLERS (FOR ASSIGNMENT 3) HERE
function start_click(){
  console.log("Start Click");
  
    $('#tutorial-panel').hide();
    $('#avatar').hide();
    $('#gameover-panel').hide();
    startGame();

}
function startOver_click(){
  gameOver = false;
  console.log("StartOver Click");
    
    $('#tutorial-panel').hide();
    $('#avatar').hide();
    $('#gameover-panel').hide();
    

}


function startGame(){
  console.log(PERSON_SPEED);
  firstPlay = false;
  console.log("Play Game");
  //actual rains and stuff
  //should call getReady 3 sec
  $('#actual-game').show();
  $('#gameover-panel').hide();
  $('#score-panel').show();
  $('#getReadySection').show();
  setTimeout(getReady, 3000);
}

function getReady(){
  
  console.log("Get Ready");
  //shows get ready page for 3 seconds
  $('#getReadySection').hide();
  

  $('#avatar').show();
  playGame();

}

function playGame(){
  let ast = setInterval(function(){
    if(!gameOver){
    spawn();}
    else{
      clearInterval(ast);
    }
  },spawnSpeed);


  //setTimeout(function(){
    
    let she = setInterval(function(){
      if(!gameOver && !needsReset){
      spawn_Umbrella();
      }
      else{
        console.log('clear she');
        clearInterval(she);
        needsReset = false;
      }
    }, 10000);
    let por = setInterval(function(){
      if(!gameOver && !needsReset){
        spawn_fish();
        }

        else{
          console.log('clear por');
          clearInterval(por);
          needsReset = false;
        }
      }, 15000);
  //}, 5000);
    //}
    //else{
    



  let mov = setInterval(function (){
    if(!gameOver){
    moveShip();
    }
    else{
      clearInterval(mov);
    }
  }
    , 0);

  let sco = setInterval(function(){
    if(!gameOver){
    score += 40;
    var scoreOutput = document.getElementById("score_num");
  scoreOutput.innerHTML = score; // Display the value of level
  var dangerOutput = document.getElementById("danger_num");
  dangerOutput.innerHTML = danger; // Display the value of danger
  
  var levelOutput = document.getElementById("level_num");
  levelOutput.innerHTML = level; // Display the value of level
}
else{
  clearInterval(sco);
}
/*if(gameOver){
  clearInterval(ast);
  clearInterval(mov);
  clearInterval(sco);
}*/
  }, 500);

}



function moveShip(){
  if(!gameOver){
    
    if(LEFT && (avatar_right-2) > -10){
    
      avatar_right-=2;
      $('#avatar').css('left', avatar_right+"px");
      
      if(umbrellaed){
        $("#avatar img").attr("src", "./src/avatars/cooper_umbrella.png");
      }
      else{
        $("#avatar img").attr("src", "./src/avatars/cooper_avatar.png");
      }
  
    }
    if(RIGHT && (avatar_right+2) < maxPersonPosX){
        console.log("right");
      avatar_right+=2;
      $('#avatar').css('left', avatar_right+"px");
    
      if(umbrellaed){
        $("#avatar img").attr("src", "./src/avatars/cooper_umbrella.png");
      }
      else{
      $("#avatar img").attr("src", "./src/avatars/cooper_avatar.png");
      }
  
    }
    if(UP && (avatar_top-2) > -10){
      
      avatar_top-=2;
      $('#avatar').css('top', avatar_top+"px");

      if(umbrellaed){
        $("#avatar img").attr("src", "./src/avatars/cooper_umbrella.png");
      }
      else{
      $("#avatar img").attr("src", "./src/avatars/cooper_avatar.png");
      }
  
    }
    if(DOWN && (avatar_top+2) < maxPersonPosY){
      avatar_top+=2;
      $('#avatar').css('top', avatar_top+"px");
      
      if(umbrellaed){
      $("#avatar img").attr("src", "./src/avatars/cooper_umbrella.png");
      }
      else{
        $("#avatar img").attr("src", "./src/avatars/cooper_avatar.png");
      }
  
    }
    if(!(LEFT||RIGHT||UP||DOWN)){// no key is being pressed
      if(umbrellaed){
        $("#avatar img").attr("src", "./src/avatars/cooper_umbrella.png");
      }
      else{
        $("#avatar img").attr("src", "./src/avatars/cooper_avatar.png");
      }
    }
  }
}
  /*else{
    clearInterval(mov);
  }*/
  

  function gameover(){
    needsReset = true;
    console.log('gameover');
    $('#actual-game').hide();
    $('#landing-page').show();
    $('#gameover-panel').show();
    var scoreOutput = document.getElementById("score_num_end");
    scoreOutput.innerHTML = score; // Display the value of level
    $(".curRain").remove();
    $(".curfish").remove();
    $(".curUmbrella").remove();
    $(".curRain img").remove();
    $(".curfish img").remove();
    $(".curUmbrella img").remove();
    /*Rain.remove();
    fish.remove();
    Umbrella.remove();*/
    reset();
  }

  function reset(){
    // Game Object Helpers
    currentRain = 1;
    currentFish= 1;
    currentUmbrella = 1;
    
    // Movement Helpers
    LEFT = false;
      RIGHT = false;
    UP = false;
      DOWN = false;
    
    // TODO: ADD YOUR GLOBAL HELPER VARIABLES (IF NEEDED)
    level = 1;
    danger = start_danger;
    spawnSpeed = start_spawnSpeed;
    console.log('reset');
    avatar_right = (windowWidth - avatarWidth) / 2;
    avatar_top = (windowHeight - avatarWidth) / 2;
     umbrellaed = false; //true if there is a sheild on the player
    score = 0;
    console.log(score);
    console.log(danger);
    console.log(level);

    var dangerOutput = document.getElementById("danger_num");
    dangerOutput.innerHTML = danger; // Display the value of danger
  
    var levelOutput = document.getElementById("level_num");
    levelOutput.innerHTML = level; // Display the value of level

    var scoreOutput = document.getElementById("score_num");
    scoreOutput.innerHTML = score; // Display the value of level
    
    // $('#avatar').css('right', 607+"px");
    // $('#avatar').css('top', 320+"px");

    
    const leftPos = (windowWidth - avatarWidth) / 2;
    const topPos = (windowHeight - avatarWidth) / 2;

    $('#avatar').css({
      position: 'fixed',
      left: leftPos + 'px',
      top: topPos + 'px'
    });
    
    }
/* ---------------------------- GAME FUNCTIONS ----------------------------- */
// Starter Code for randomly generating and moving an rain on screen
class Rain {
  // constructs an Rain object
  constructor() {
    /*------------------------Public Member Variables------------------------*/
    // create a new Rain div and append it to DOM so it can be modified later
    let objectString = "<div id = 'a-" + currentRain + "' class = 'curRain' > <img src = 'src/images/rain.png'/></div>";
    rain_section.append(objectString);
    // select id of this Rain
    this.id = $('#a-' + currentRain);
    currentRain++; // ensure each Rain has its own id
    // current x, y position of this Rain
    this.cur_x = 0; // number of pixels from right
    this.cur_y = 0; // number of pixels from top

    /*------------------------Private Member Variables------------------------*/
    // member variables for how to move the Rain
    this.x_dest = 0;
    this.y_dest = 0;
    // member variables indicating when the Rain has reached the boarder
    this.hide_axis = 'x';
    this.hide_after = 0;
    this.sign_of_switch = 'neg';
    // spawn an Rain at a random location on a random side of the board
    this.#spawnRain();
  }

  // Requires: called by the user
  // Modifies:
  // Effects: return true if current Rain has reached its destination, i.e., it should now disappear
  //          return false otherwise
  hasReachedEnd() {
    if (this.hide_axis == 'x') {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_x > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_x < this.hide_after) {
          return true;
        }
      }
    }
    else {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_y > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_y < this.hide_after) {
          return true;
        }
      }
    }
    return false;
  }

  // Requires: called by the user
  // Modifies: cur_y, cur_x
  // Effects: move this Rain 1 unit in its designated direction
  updatePosition() {
    if(!gameOver){
    // ensures all rains travel at current level's speed
    this.cur_y += this.y_dest * astProjectileSpeed;
    this.cur_x += this.x_dest * astProjectileSpeed;
    // update rain's css position
    this.id.css('top', this.cur_y);
    this.id.css('right', this.cur_x);

    if(isColliding(this.id, $('#avatar'))){
      console.log("collide");
    
      if(umbrellaed){//uses umbrella
        umbrellaed = false;
        this.id.remove();
        if(!gameOver){
        $('#collectSound').get(0).play();
        }
      }
      else{
      gameOver=true;
      $('#dieSound').loop = false;
      $('#dieSound').get(0).play();
      this.id.remove();
      //clearInterval();
      setTimeout(gameover, 2000);
      }
      //console.log(umbrellaed);
    }
    }
  }

  // Requires: this method should ONLY be called by the constructor
  // Modifies: cur_x, cur_y, x_dest, y_dest, num_ticks, hide_axis, hide_after, sign_of_switch
  // Effects: randomly determines an appropriate starting/ending location for this Rain
  //          all rains travel at the same speed
  #spawnRain() {
    // REMARK: YOU DO NOT NEED TO KNOW HOW THIS METHOD'S SOURCE CODE WORKS
    let x = getRandomNumber(0, windowWidth);
    let y = getRandomNumber(0, windowHeight);
    let floor = windowHeight + avatarWidth;
    let ceiling = 0 - avatarWidth;
    let left = windowWidth + avatarWidth;
    let right = 0 - avatarWidth;
    let major_axis = Math.floor(getRandomNumber(0, 2));
    let minor_aix = Math.floor(getRandomNumber(0, 2));
    let num_ticks;

    if (major_axis == 0 && minor_aix == 0) {
      this.cur_y = floor;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + avatarWidth) / astProjectileSpeed) || 1;

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = 0 - avatarWidth;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 0 && minor_aix == 1) {
      this.cur_y = ceiling;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + avatarWidth) / astProjectileSpeed) || 1;

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = windowHeight + avatarWidth;
      this.sign_of_switch = 'pos';
    }
    if (major_axis == 1 && minor_aix == 0) {
      this.cur_y = y;
      this.cur_x = left;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + avatarWidth) / astProjectileSpeed) || 1;

      this.x_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = 0 - avatarWidth;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 1 && minor_aix == 1) {
      this.cur_y = y;
      this.cur_x = right;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + avatarWidth) / astProjectileSpeed) || 1;

      this.x_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = windowWidth + avatarWidth;
      this.sign_of_switch = 'pos';
    }
    // show this Rain's initial position on screen
    this.id.css("top", this.cur_y);
    this.id.css("right", this.cur_x);
    // normalize the speed s.t. all Rains travel at the same speed
    let speed = Math.sqrt((this.x_dest) * (this.x_dest) + (this.y_dest) * (this.y_dest));
    this.x_dest = this.x_dest / speed;
    this.y_dest = this.y_dest / speed;
  }
}

class Fish{
  // constructs an Rain object
  constructor() {
    /*------------------------Public Member Variables------------------------*/
    // create a new Rain div and append it to DOM so it can be modified later
    let objectString = "<div id = 'p-" + currentFish + "' class = 'curfish' > <img src = './src/images/fish.png'/></div>";
    rain_section.append(objectString);
    // select id of this Rain
    this.id = $('#p-' + currentFish);
    currentFish++; // ensure each Rain has its own id
    // current x, y position of this Rain
    this.cur_x = 0; // number of pixels from right
    this.cur_y = 0; // number of pixels from top

    /*------------------------Private Member Variables------------------------*/
    // member variables for how to move the Rain
    this.x_dest = 0;
    this.y_dest = 0;
    // member variables indicating when the Rain has reached the boarder
    this.hide_axis = 'x';
    this.hide_after = 0;
    this.sign_of_switch = 'neg';
    // spawn an Rain at a random location on a random side of the board
    this.#spawnfish();
    //console.log('fish made')
  }

  // Requires: called by the user
  // Modifies:
  // Effects: return true if current Rain has reached its destination, i.e., it should now disappear
  //          return false otherwise
  hasReachedEnd() {
    if (this.hide_axis == 'x') {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_x > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_x < this.hide_after) {
          return true;
        }
      }
    }
    else {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_y > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_y < this.hide_after) {
          return true;
        }
      }
    }
    return false;
  }

  // Requires: called by the user
  // Modifies: cur_y, cur_x
  // Effects: move this Rain 1 unit in its designated direction
  updatePosition() {
    if(!gameOver){
    //console.log('updatePosition before');
    // ensures all rains travel at current level's speed
    this.cur_y += this.y_dest * astProjectileSpeed;
    this.cur_x += this.x_dest * astProjectileSpeed;
    // update rain's css position
    this.id.css('top', this.cur_y);
    this.id.css('right', this.cur_x);

    if(isColliding(this.id, $('#avatar'))){
      this.id.remove();
      if(!gameOver){
        $('#collectSound').get(0).play();
        }
      astProjectileSpeed += 0.5;
      console.log(astProjectileSpeed);
      level += 1;
      danger +=2;

      var dangerOutput = document.getElementById("danger_num");
       dangerOutput.innerHTML = danger; // Display the updated value of danger
      var levelOutput = document.getElementById("level_num");
       levelOutput.innerHTML = level; // Display the value of level
    }
  }
  }

  // Requires: this method should ONLY be called by the constructor
  // Modifies: cur_x, cur_y, x_dest, y_dest, num_ticks, hide_axis, hide_after, sign_of_switch
  // Effects: randomly determines an appropriate starting/ending location for this Rain
  //          all rains travel at the same speed
  #spawnfish() {
    // REMARK: YOU DO NOT NEED TO KNOW HOW THIS METHOD'S SOURCE CODE WORKS

    //These two lines generate a random point outside of border for rain to spawn
    let x = getRandomNumber(0, windowWidth);
    let y = getRandomNumber(0, windowHeight);
    let floor = windowHeight + avatarWidth;
    let ceiling = 0 - avatarWidth;
    let left = windowWidth + avatarWidth;
    let right = 0 - avatarWidth;

    //determining how rain moved across and then outside of screen, keeps track of end position mainly 
    let major_axis = Math.floor(getRandomNumber(0, 2));
    let minor_aix = Math.floor(getRandomNumber(0, 2));
    let num_ticks;

    if (major_axis == 0 && minor_aix == 0) {
      this.cur_y = floor;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + avatarWidth) / astProjectileSpeed) || 1;

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = 0 - avatarWidth;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 0 && minor_aix == 1) {
      this.cur_y = ceiling;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + avatarWidth) / astProjectileSpeed) || 1;

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = windowHeight + avatarWidth;
      this.sign_of_switch = 'pos';
    }
    if (major_axis == 1 && minor_aix == 0) {
      this.cur_y = y;
      this.cur_x = left;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + avatarWidth) / astProjectileSpeed) || 1;

      this.x_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = 0 - avatarWidth;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 1 && minor_aix == 1) {
      this.cur_y = y;
      this.cur_x = right;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + avatarWidth) / astProjectileSpeed) || 1;

      this.x_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = avatarWidth + windowWidth;
      this.sign_of_switch = 'pos';
    }
    //sets rains actual position
    // show this Rain's initial position on screen
    this.id.css("top", this.cur_y);
    this.id.css("right", this.cur_x);
    // normalize the speed s.t. all Rains travel at the same speed
    let speed = Math.sqrt((this.x_dest) * (this.x_dest) + (this.y_dest) * (this.y_dest));
    this.x_dest = this.x_dest / speed;
    this.y_dest = this.y_dest / speed;
  }
}
class Umbrella{
  // constructs an Rain object
  constructor() {
    /*------------------------Public Member Variables------------------------*/
    // create a new Rain div and append it to DOM so it can be modified later
    let objectString = "<div id = 's-" + currentUmbrella + "' class = 'curUmbrella' > <img src = './src/images/umbrella.png'/></div>";
    rain_section.append(objectString);
    // select id of this Rain
    this.id = $('#s-' + currentUmbrella);
    currentUmbrella++; // ensure each Rain has its own id
    // current x, y position of this Rain
    this.cur_x = 0; // number of pixels from right
    this.cur_y = 0; // number of pixels from top

    /*------------------------Private Member Variables------------------------*/
    // member variables for how to move the Rain
    this.x_dest = 0;
    this.y_dest = 0;
    // member variables indicating when the Rain has reached the boarder
    this.hide_axis = 'x';
    this.hide_after = 0;
    this.sign_of_switch = 'neg';
    // spawn an Rain at a random location on a random side of the board
    this.#spawnUmbrella();
    //console.log('fish made')
  }

  // Requires: called by the user
  // Modifies:
  // Effects: return true if current Rain has reached its destination, i.e., it should now disappear
  //          return false otherwise
  hasReachedEnd() {
    if (this.hide_axis == 'x') {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_x > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_x < this.hide_after) {
          return true;
        }
      }
    }
    else {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_y > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_y < this.hide_after) {
          return true;
        }
      }
    }
    return false;
  }

  // Requires: called by the user
  // Modifies: cur_y, cur_x
  // Effects: move this Rain 1 unit in its designated direction
  updatePosition() {

    //console.log('updatePosition before');
    // ensures all rains travel at current level's speed
    this.cur_y += this.y_dest * astProjectileSpeed;
    this.cur_x += this.x_dest * astProjectileSpeed;
    // update rain's css position
    this.id.css('top', this.cur_y);
    this.id.css('right', this.cur_x);

    if(isColliding(this.id, $('#avatar'))){
      $('#collectSound').get(0).play();
      umbrellaed = true;
      this.id.remove();
    }

  }

  // Requires: this method should ONLY be called by the constructor
  // Modifies: cur_x, cur_y, x_dest, y_dest, num_ticks, hide_axis, hide_after, sign_of_switch
  // Effects: randomly determines an appropriate starting/ending location for this Rain
  //          all rains travel at the same speed
  #spawnUmbrella() {
    // REMARK: YOU DO NOT NEED TO KNOW HOW THIS METHOD'S SOURCE CODE WORKS

    //These two lines generate a random point outside of border for rain to spawn
    let x = getRandomNumber(0, windowWidth);
    let y = getRandomNumber(0, windowHeight);
    let floor = windowHeight + avatarWidth;
    let ceiling = 0 - avatarWidth;
    let left = windowWidth + avatarWidth;
    let right = 0 - avatarWidth;

    //determining how rain moved across and then outside of screen, keeps track of end position mainly 
    let major_axis = Math.floor(getRandomNumber(0, 2));
    let minor_aix = Math.floor(getRandomNumber(0, 2));
    let num_ticks;

    if (major_axis == 0 && minor_aix == 0) {
      this.cur_y = floor;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + avatarWidth) / astProjectileSpeed) || 1;

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = 0 - avatarWidth;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 0 && minor_aix == 1) {
      this.cur_y = ceiling;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + avatarWidth) / astProjectileSpeed) || 1;

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = windowHeight + avatarWidth;
      this.sign_of_switch = 'pos';
    }
    if (major_axis == 1 && minor_aix == 0) {
      this.cur_y = y;
      this.cur_x = left;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + avatarWidth) / astProjectileSpeed) || 1;

      this.x_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = 0 - avatarWidth;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 1 && minor_aix == 1) {
      this.cur_y = y;
      this.cur_x = right;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + avatarWidth) / astProjectileSpeed) || 1;

      this.x_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = windowWidth + avatarWidth;
      this.sign_of_switch = 'pos';
    }
    //sets rains actual position
    // show this Rain's initial position on screen
    this.id.css("top", this.cur_y);
    this.id.css("right", this.cur_x);
    // normalize the speed s.t. all Rains travel at the same speed
    let speed = Math.sqrt((this.x_dest) * (this.x_dest) + (this.y_dest) * (this.y_dest));
    this.x_dest = this.x_dest / speed;
    this.y_dest = this.y_dest / speed;
  }
}


// Spawns an rain travelling from one border to another
function spawn() {
  console.log('spawn ast');
  if(!gameOver){
  let rain = new Rain();
  
  setTimeout(spawn_helper(rain), 0);
  // setTimeout(() => spawn_helper(rain), 0);
  }

}

function spawn_helper(rain) {
  let astermovement = setInterval(function () {
    // update Rain position on screen
    if(!gameOver){//if game is NOT over
    rain.updatePosition();
    // determine whether Rain has reached its end position
    if (rain.hasReachedEnd()) { // i.e. outside the game boarder
      rain.id.remove();
      //clearInterval(astermovement);
    }
  }
  else{
    rain.id.remove();

  }
  }, AST_OBJECT_REFRESH_RATE);
}
// function spawn_helper_fish(fish) {
//   // console.log('fish helper');
//    let fishmovement = setInterval(function () {
//      // update Rain position on screen
//      if(!gameOver){
//      fish.updatePosition();
//      // determine whether Rain has reached its end position
//      if (fish.hasReachedEnd()) { // i.e. outside the game boarder
//        fish.id.remove();
//        //clearInterval(fishmovement);
//      }
//    }
//    else{
//      fish.id.remove();
     
//    }
//    }, AST_OBJECT_REFRESH_RATE);
  
   
//    setTimeout(function (){
//      //console.log('fish timeout');
//      fish.id.remove();
//      //clearInterval(fishmovement);
//     }, 5000);
//  }

// // Spawns an fish every 15 sec for 5 sec after spawn
// function spawn_fish() {
//   console.log('spawn fish');
//   if(!gameOver){
//   let fish = new fish();
//   //console.log('spawn fish');
//   setTimeout(spawn_helper_fish(fish), 0);
//   // setTimeout(spawn_helper_fish(fish), 0);
//   // spawn_helper_fish(fish);
//   //console.log('spawn fish');
//   }
// }



// Spawns a sheild that disapears after 5 seconds
function spawn_Umbrella() {
  console.log('spawn umbrella');
  if(!gameOver){
  let umbrella = new Umbrella();
  setTimeout(spawn_helper_umbrella(umbrella), 0);

}
}

// Spawns a umbrella that disapears after 5 seconds
function spawn_helper_umbrella(umbrella) {
  //console.log('fish helper');
  let shemovement = setInterval(function () {
    // update Rain position on screen
    if(!gameOver){
    umbrella.updatePosition();
    // determine whether Rain has reached its end position
    if (umbrella.hasReachedEnd()) { // i.e. outside the game boarder
      umbrella.id.remove();
      //clearInterval(shemovement);
    }
  }
  else{
    umbrella.id.remove();
  }
  }, AST_OBJECT_REFRESH_RATE);

  
  setTimeout(function (){
    //console.log('fish timeout');
    umbrella.id.remove();
    //clearInterval(shemovement);
  }, 5000);
}

function spawn_fish() {
  console.log('spawn fish');
  if(!gameOver){
  let fish = new Fish();
  setTimeout(spawn_helper_fish(fish), 0);

}
}

// Spawns a umbrella that disapears after 5 seconds
function spawn_helper_fish(fish) {
  //console.log('fish helper');
  let fishmovement = setInterval(function () {
    // update Rain position on screen
    if(!gameOver){
    fish.updatePosition();
    // determine whether Rain has reached its end position
    if (fish.hasReachedEnd()) { // i.e. outside the game boarder
      fish.id.remove();
      //clearInterval(shemovement);
    }
  }
  else{
    fish.id.remove();
  }
  }, AST_OBJECT_REFRESH_RATE);

  
  setTimeout(function (){
    //console.log('fish timeout');
    fish.id.remove();
    //clearInterval(shemovement);
  }, 5000);
}

// Spawns an rain travelling from one border to another
function spawn() {
  let rain = new Rain();
  setTimeout(spawn_helper(rain), 0);
}

function spawn_helper(rain) {
  let astermovement = setInterval(function () {
    // update Rain position on screen
    rain.updatePosition();
    // determine whether Rain has reached its end position
    if (rain.hasReachedEnd()) { // i.e. outside the game boarder
      rain.id.remove();
      clearInterval(astermovement);
    }
  }, AST_OBJECT_REFRESH_RATE);
}

/* --------------------- Additional Utility Functions  --------------------- */
// Are two elements currently colliding?
function isColliding(o1, o2) {
  return isOrWillCollide(o1, o2, 0, 0);
}

// Will two elements collide soon?
// Input: Two elements, upcoming change in position for the moving element
function willCollide(o1, o2, o1_xChange, o1_yChange) {
  return isOrWillCollide(o1, o2, o1_xChange, o1_yChange);
}

// Are two elements colliding or will they collide soon?
// Input: Two elements, upcoming change in position for the moving element
// Use example: isOrWillCollide(paradeFloat2, person, FLOAT_SPEED, 0)
function isOrWillCollide(o1, o2, o1_xChange, o1_yChange) {
  const o1D = {
    'left': o1.offset().left + o1_xChange,
    'right': o1.offset().left + o1.width() + o1_xChange,
    'top': o1.offset().top + o1_yChange,
    'bottom': o1.offset().top + o1.height() + o1_yChange
  };
  const o2D = {
    'left': o2.offset().left,
    'right': o2.offset().left + o2.width(),
    'top': o2.offset().top,
    'bottom': o2.offset().top + o2.height()
  };
  // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (o1D.left < o2D.right &&
    o1D.right > o2D.left &&
    o1D.top < o2D.bottom &&
    o1D.bottom > o2D.top) {
    // collision detected!
    return true;
  }
  return false;
}

// Get random number between min and max integer
function getRandomNumber(min, max) {
  return (Math.random() * (max - min)) + min;
}