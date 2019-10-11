var tailleCercle = 80;
var positionX;
var positionY;
var positionX2;
var positionY2;
var posObstacleX;
var posObstacleY;
var changingX = [];
var changingY = [];
var distanceX;
var distanceY;
var distanceTotale;
var siTouche = 0;
var temps = 0;
var tempsPasse = 0;
var seconde = 0;
var estEnVie = true;
var play;
var resetGame = false;
var h_v = [];
let nbrObstacles;
var distanceX2;
var distanceY2;
var distanceTotale2;
var randX;
var randY;
var TestDistTotal;
var testDistX;
var testDistY;
var addOrNot = true;
var randHV;
var color_R = [];
var color_V = [];
var color_B = [];
var obstacleSpeed = [];
var speedUp = 0;
var lastSec = 0;
var levels;
var obstacleSize = [];
var gameWidth = 640 * 2;
var gameHeight = 480 * 2;
var gameOn = false;
let imgP1;
let imgP2;
let imgP3;
let imgP4;
var button2;
var button1;
var button3;
var power1 = false;
var power2 = false;
var power3 = false;
var randomArr = 0;
var lastSec2 = 0;
var levels2;
var superSize;
var testSuperSize;
var player_img;
var speedPower = 0;
var countPower3 = 0;
var testPower1 = false;
var player_img2;
var joueurs = [];
var distanceX_2;
var distanceY_2;
var distanceTotale_2;
var selectNbPlayer = true;
var slidPlayers;
var whichPlayer;
var buttonConfirm;
var playerNumber = 0;

function preload() {
  imgP1 = loadImage("assets/george.png");
  imgP2 = loadImage("assets/mirna.png");
  imgP3 = loadImage("assets/blip.png");
  imgP4 = loadImage("assets/george_p.png");
  player_img = loadImage("assets/mirna.png");
  player_img2 = loadImage("assets/mirna.png");
}

function setup() {
  createCanvas(gameWidth, gameHeight);
  background(50)
  superSize = 0;


  button2 = createButton('Choose this ball');
  button2.position(550,620);
  button2.size(200,90);
  button2.mouseClicked(player2);
  button2.hide();

  button3 = createButton('Choose this ball');
  button3.position(950,620);
  button3.size(200,90);
  button3.mouseClicked(player3);
  button3.hide();

  button1 = createButton('Choose this ball');
  button1.position(150,620);
  button1.size(200,90);
  button1.mouseClicked(player1);
  button1.hide();

  buttonConfirm = createButton('Confirm');
  buttonConfirm.position(gameWidth / 2 - 80, 600)
  buttonConfirm.mouseClicked(launchPlayerSelect);

  slidPlayers = createSlider(1,2,1);
  slidPlayers.position(gameWidth / 2 - 200,500);
  slidPlayers.style('width', '400px');
  slidPlayers.class('slider');

  posObstacleX = [];
  posObstacleY = [];
  nbrObstacles = 1;
  positionX = random(60, gameWidth - 100)
  positionY = random(50, gameHeight - 80)
  positionX2 = random(60, gameWidth - 100)
  positionY2 = random(50, gameHeight - 80)

  for (let i = 0; i < 50; i++) {
    color_R[i] = random(0, 255)
    color_V[i] = random(0, 255)
    color_B[i] = random(0, 255)
  }



  // posObstacleX[0] = random(15, gameWidth - 15);
  // posObstacleY[0] = random(15, gameHeight - 15);
  // changingX[0] = random([0,1]); 
  // changingY[0] = random([0,1]);
  // h_v[0] = random([0,1]);

}



function draw() {
  if (gameOn == true) {

    background(50);
    if (estEnVie == true) {
      resetGame = false;
      drawEllipse();
      tempsEcoule();
      nextLevel();

      for (let i = 0; i < nbrObstacles; i++) {
        LanceObsctacle(i);
        testDistance(i);
      }
      changeFill();
      powers();
    } else {
      endGame();
      resetGame = true;
    }

  }
  else if (selectNbPlayer == false) {
    selectPlayer();

  }
  else {
    selectNumberPlayer();
  }

}

function addObstacle() {
  randHV = random([0, 1]);
  testSuperSize = Math.trunc(random(0,30))
  console.log(testSuperSize);
  if (testSuperSize == 3) {
    superSize = random(2,4);
  }
  else {
    superSize = 1;
  }



  if (randHV == 0) {
    randX = random([15, gameWidth - 15]);
    randY = (random(15, gameHeight - 15));
    console.log("random X = " + randX)
    console.log("random Y = " + randY)
    console.log("----------------------------");
    h_v.push(1);
  } else {
    randX = random(15, gameWidth - 15);
    randY = random([15, gameHeight - 15]);
    console.log("random X = " + randX)
    console.log("random Y = " + randY)
    console.log("----------------------------");
    h_v.push(0);
  }

  obstacleSpeed.push(Math.trunc(random(1, 3)))
  obstacleSize.push(Math.trunc(random(20, 60)* superSize))
  posObstacleX.push(randX);
  posObstacleY.push(randY);
  changingX.push(random([0, 1]));
  changingY.push(random([0, 1]));

  nbrObstacles++;


}

function LanceObsctacle(i) {

  if (h_v[i] == 1) {
    if (posObstacleX[i] < (gameWidth - 10) && changingX[i] == 0) {
      posObstacleX[i] += obstacleSpeed[i] + speedUp;
    }

    if (posObstacleX[i] >= (gameWidth - 10)) {
      changingX[i] = 1;
    }

    if (posObstacleX[i] > 10 && changingX[i] == 1) {
      posObstacleX[i] -= obstacleSpeed[i] + speedUp;
    }

    if (posObstacleX[i] <= 10) {
      changingX[i] = 0;
    }
    fill(color_R[i], color_V[i], color_B[i]);
    ellipse(posObstacleX[i], posObstacleY[i], obstacleSize[i], obstacleSize[i]);
  }


  if (h_v[i] == 0) {
    if (posObstacleY[i] < (gameHeight - 10) && changingY[i] == 0) {
      posObstacleY[i] += obstacleSpeed[i] + speedUp;
    }

    if (posObstacleY[i] >= (gameHeight - 10)) {
      changingY[i] = 1;
    }

    if (posObstacleY[i] > 10 && changingY[i] == 1) {
      posObstacleY[i] -= obstacleSpeed[i] + speedUp;
    }

    if (posObstacleY[i] <= 10) {
      changingY[i] = 0;
    }
    fill(color_R[i], color_V[i], color_B[i]);
    ellipse(posObstacleX[i], posObstacleY[i], obstacleSize[i], obstacleSize[i]);

  }



}

function testDistance(i) {
  distanceX = Math.pow(positionX - posObstacleX[i], 2);
  distanceY = Math.pow(positionY - posObstacleY[i], 2);
  distanceTotale = Math.sqrt(distanceX + distanceY);

  distanceX_2 = Math.pow(positionX2 - posObstacleX[i], 2);
  distanceY_2 = Math.pow(positionY2 - posObstacleY[i], 2);
  distanceTotale_2 = Math.sqrt(distanceX_2 + distanceY_2);

  if (distanceTotale < (tailleCercle / 2) + (obstacleSize[i] / 2)) {
    siTouche = 1;
    estEnVie = false;
  } else {
    siTouche = 0;
  }

  if (distanceTotale_2 < (tailleCercle / 2) + (obstacleSize[i] / 2)) {
    siTouche = 1;
    estEnVie = false;
  } else {
    siTouche = 0;
  }

}

function endGame() {
  noStroke();
  fill(255);
  textSize(40);
  text("Your score = " + seconde, 166, 100);
  text("click to start a new game", 70, 430);
  nbrObstacles = 0;
  posObstacleX = [];
  posObstacleY = [];
  changingX = [];
  changingY = [];
  h_v = [];
  color_R = [];
  color_V = [];
  color_B = [];
  speedUp = 0;
  lastSec = 0;
  randomArr = 0;
  power1 = true;
  levels = 0;
  levels2 = 0;
  lastSec = 0;
  lastSec2 = 0;
  for (let i = 0; i < 50; i++) {
    color_R[i] = random(0, 255)
    color_V[i] = random(0, 255)
    color_B[i] = random(0, 255)
  }
}

function drawEllipse() {

  if (keyIsDown(LEFT_ARROW)) {
    positionX = positionX - (5 + speedPower);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    positionX += (5 + speedPower);
  }

  if (keyIsDown(UP_ARROW)) {
    positionY -= (5 + speedPower);
  }

  if (keyIsDown(DOWN_ARROW)) {
    positionY += (5 + speedPower);
  }

  // ------------

  if (keyIsDown(81)) {
    positionX2 = positionX2 - (5 + speedPower);
    console.log("Pos X2 :"+ positionX2);
  }

  if (keyIsDown(68)) {
    positionX2 = positionX2 + (5 + speedPower);
    console.log("Pos X2 :"+positionX2);
  }

  if (keyIsDown(90)) {
    positionY2 -= (5 + speedPower);
    console.log("Pos Y2 :"+positionY2);
  }

  if (keyIsDown(83)) {
    positionY2 += (5 + speedPower);
    console.log("Pos Y2 :"+positionY2);
  }


  background(50);
  stroke(173, 36, 36);
  strokeWeight(0);
  siHorsDeLEcran();


}


function siHorsDeLEcran() {
  if (positionX > gameWidth - 40) {
    positionX = gameWidth - 40;
    stroke(173, 36, 36);
    strokeWeight(10);
    line(gameWidth - 4, 0, gameWidth - 4, gameHeight);
  }

  if (positionX < 40) {
    positionX = 40;
    stroke(173, 36, 36);
    strokeWeight(10);
    line(4, 0, 4, gameHeight);
  }

  if (positionY > gameHeight - 40) {
    positionY = gameHeight - 40;
    stroke(173, 36, 36);
    strokeWeight(10);
    line(0, gameHeight - 4, gameWidth, gameHeight - 4);
  }

  if (positionY < 40) {
    positionY = 40;
    stroke(173, 36, 36);
    strokeWeight(10);
    line(0, 4, gameWidth, 0);
  }

}


function tempsEcoule() {
  temps = millis();
  fill(255);
  textSize(40);
  text(seconde, gameWidth / 2, 460);


  if (temps >= tempsPasse + 1000) {
    seconde = seconde + 1;
    tempsPasse = millis();
    addObstacle();
  }
}

function mouseClicked() {
  if (resetGame == true) {
    seconde = 0;
    estEnVie = true;
    positionX = random(60, gameHeight - 100)
    positionY = random(50, gameHeight - 80)
    positionX2 = random(60, gameHeight - 100)
    positionY2 = random(50, gameHeight - 80)
  }
}


function changeFill() {
  if (siTouche == 0) {
    fill(180);
  } else {
    fill(173, 36, 36);
  }
  push();
  translate(-tailleCercle / 2, -tailleCercle / 2);
  image(player_img, positionX, positionY, tailleCercle, tailleCercle);
  pop();


  if (playerNumber == 2) {
    push();
    translate(-tailleCercle / 2, -tailleCercle / 2);
    image(player_img2, positionX2, positionY2, tailleCercle, tailleCercle);
    pop();

  }
  if (siTouche == 0) {
    fill(248, 137, 21);
  } else {
    fill(173, 36, 36);
  }
}

function nextLevel() {
  levels = seconde - lastSec;
  levels2 = seconde - lastSec2;
  if (levels > 4) {
    lastSec = seconde;
    speedUp = speedUp + 1;
    console.log("salut 1");
  }
  if (levels2 > 14) {
    power1 = true;
    lastSec2 = seconde;
  }
}


function selectNumberPlayer() {

  if (slidPlayers.value() == 1) {
    whichPlayer = "One player"
  }
  else {
    whichPlayer = "Two players"
  }

  background(50);
  textSize(60);
  text(whichPlayer, 485, 420);
}

function selectPlayer() {
  button1.show();
  button2.show();
  button3.show();
  background(50);
  rect(gameWidth / 16, gameHeight / 16, gameWidth / 4, (gameHeight - gameHeight / 8) , 20);
  rect((gameWidth / 16) * 6, gameHeight / 16, gameWidth / 4, (gameHeight - gameHeight / 8) , 20);
  rect((gameWidth / 16) * 11, gameHeight / 16, gameWidth / 4, (gameHeight - gameHeight / 8) , 20);
  image(imgP1, gameWidth / 10,200,220,220);
  image(imgP2, gameWidth / 2.4, 200, 220, 220);
  image(imgP3, gameWidth / 1.37, 200, 220, 220);
}

function player1() {
  power1 = true;
  console.log(power1)
  gameOn = true;
  button1.hide();
  button2.hide();
  button3.hide();
  player_img = loadImage("assets/george_p.png");
  player_img2 = loadImage("assets/george_p.png");
  testPower1 = true;
}

function player2() {
  power2 = true;
  console.log("player2")
  gameOn = true;
  button1.hide();
  button2.hide();
  button3.hide();
}

function player3() {
  power3 = true;
  console.log("player3")
  gameOn = true;
  button1.hide();
  button2.hide();
  button3.hide();
}


function powers() {
  if (keyIsDown(CONTROL)) {

    if(power1 == true) {
      console.log(posObstacleX);
      for (i=0; i<5; i++) {
        randomArr = Math.trunc(random(0,posObstacleX.length));
        posObstacleX.splice(randomArr,1);
        posObstacleY.splice(randomArr,1);
        nbrObstacles = posObstacleY.length;
        // change color wite same random
        color_R.splice(randomArr,1);
        color_V.splice(randomArr,1);
        color_B.splice(randomArr,1);
        console.log(posObstacleX);

        obstacleSpeed.splice(randomArr,1);
        obstacleSize.splice(randomArr,1);
        changingX.splice(randomArr,1);
        changingY.splice(randomArr,1);
        h_v.splice(randomArr,1);
      
      }
      power1 = false;
    }

    else if (power3 == true) {
      countPower3 = seconde;
      if ((countPower3 - seconde) > 10) {
        console.log("power3");
        countPower3 = seconde;
      }

    }
        
  }

  if (power2 == true && keyIsDown(CONTROL)) {
      speedPower = 4;
  }
  else {
    speedPower = 0;
  }
}

function launchPlayerSelect() {
  selectNbPlayer = false;
  buttonConfirm.hide();
  slidPlayers.hide();
  playerNumber = slidPlayers.value();
  console.log(playerNumber);
}