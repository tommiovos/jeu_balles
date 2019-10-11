var tailleCercle = 80;
var positionX;
var positionY;
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
var obstacleSize = 70;
var gameWidth = 640 * 2;
var gameHeight = 480 * 2;
var gameOn = false;
let imgP1;
let imgP2;
let imgP3;
var button2;
var button1;
var button3;
var power1 = false;
var power2 = false;
var power3 = false;

function preload() {
  imgP1 = loadImage("assets/george.png");
  imgP2 = loadImage("assets/mirna.png");
  imgP3 = loadImage("assets/blip.png");
}

function setup() {
  createCanvas(gameWidth, gameHeight);
  background(50)


  button2 = createButton('Choose this ball');
  button2.position(550,620);
  button2.size(200,90);
  button2.mouseClicked(player2);

  button3 = createButton('Choose this ball');
  button3.position(950,620);
  button3.size(200,90);
  button3.mouseClicked(player3);

  button1 = createButton('Choose this ball');
  button1.position(150,620);
  button1.size(200,90);
  button1.mouseClicked(player1);


  posObstacleX = [];
  posObstacleY = [];
  nbrObstacles = 1;
  positionX = random(60, gameWidth - 100)
  positionY = random(50, gameHeight - 80)

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
  else {
    selectPlayer();

  }

}

function addObstacle() {
  randHV = random([0, 1]);



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
    ellipse(posObstacleX[i], posObstacleY[i], obstacleSize, obstacleSize);
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
    ellipse(posObstacleX[i], posObstacleY[i], obstacleSize, obstacleSize);

  }



}

function testDistance(i) {
  distanceX = Math.pow(positionX - posObstacleX[i], 2);
  distanceY = Math.pow(positionY - posObstacleY[i], 2);
  distanceTotale = Math.sqrt(distanceX + distanceY);

  if (distanceTotale < (tailleCercle / 2) + (obstacleSize / 2)) {
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
  for (let i = 0; i < 50; i++) {
    color_R[i] = random(0, 255)
    color_V[i] = random(0, 255)
    color_B[i] = random(0, 255)
  }
}

function drawEllipse() {

  if (keyIsDown(LEFT_ARROW)) {
    positionX = positionX - 5;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    positionX += 5;
  }

  if (keyIsDown(UP_ARROW)) {
    positionY -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    positionY += 5;
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
    line(636, 0, 636, gameHeight);
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
    line(0, 476, gameWidth, 476);
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
  }
}


function changeFill() {
  if (siTouche == 0) {
    fill(180);
  } else {
    fill(173, 36, 36);
  }

  ellipse(positionX, positionY, tailleCercle, tailleCercle);
  if (siTouche == 0) {
    fill(248, 137, 21);
  } else {
    fill(173, 36, 36);
  }
}

function nextLevel() {
  levels = seconde - lastSec;
  if (levels > 4) {
    lastSec = seconde;
    speedUp = speedUp + 1;
    console.log("salut 1");
  }
}

function selectPlayer() {
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
  console.log("player1")
  gameOn = true;
  button1.hide();
  button2.hide();
  button3.hide();
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
  if (keyIsDown == CONTROL) {

    if(power1 == true) {
      random([0,posObstacleX.length])
    }

    else if (power2 == true) {

    }

    else if (power3 == true) {

    }
        
  }
}