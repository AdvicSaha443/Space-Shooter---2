// intiliaze game state
var gameState = "start";

var spaceShip;
var asteroid;
var asteroidimg, spaceShipimg;
var explosionimg;
var spaceimg;
var bullet;
var monsterS;
var monsterSimg;
var monsterM;
var monsterMimg;
var monsterB;
var monsterBimg;
var sound;
var HPS = 20;
var HPM = 20;
var HPB = 10;
var score = 0;
var bulletUsed = 0;
var bulletLeft = 200;
var bulletGroup;
var monsterSGroup;
var monsterMGroup;
var monsterBGroup;
var asteroidGroup;
var box;
var boxGroup;
var bulletPower = 10;
var startButton;
var gameStartButton;
var startAgain;
var startAgain2;
var buttonright;
var buttonleft;
var bButton;

function preload() {
  asteroidimg = loadImage("img/ASTEROID.png");
  spaceShipimg = loadImage("img/spaceShip.png");
  monsterSimg = loadImage("img/spacemonster1.png");
  monsterMimg = loadImage("img/spacemonster2.png");
  monsterBimg = loadImage("img/spacemonster3.png");
  explosionimg = loadImage("img/explosion-.png");
  spaceimg = loadImage("img/space2.png");
  sound = loadSound("img/b.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  spaceShip = createSprite(width/2, height/2, 10, 10);
  spaceShip.addImage(spaceShipimg);
  spaceShip.scale = 0.5;

  bulletGroup = new Group();
  monsterSGroup = new Group();
  monsterMGroup = new Group();
  monsterBGroup = new Group();
  asteroidGroup = new Group();
  boxGroup = new Group();

  startButton = createButton("Start");
  startButton.position(width/2, height/2+200);

  bButton = createButton("BULLET");
  bButton.position(100, 900);

  console.log(windowWidth+","+windowHeight);

}

function draw() {
  background(spaceimg);

  fill(0);

  if (gameState === "start") {
    textSize(50);
    text("Space Shooter", 350, 100);
    spaceShip.addImage(spaceShipimg);
    bulletPower = 10;
    bulletUsed = 0;
    score = 0;
    HPS = 20;
    HPM = 20;
    HPB = 10;

    startButton.mousePressed(function(){
      gameStartButton = createButton("Start Game");
      gameStartButton.position(width/2, height/2+200);
      gameState = "instruction";
    })
  }

  if (gameState === "instruction") {
      startButton.hide();
      textSize(50);
      text("INSTRUCTION", 200, 90);
      textSize(20);
      text("1. USE YOUR FINGER TO MOVE TO MOVE", 200, 350);
      text("2. COLLECT BOXES ■ TO UPGRADE YOUR SPACESHIP", 200, 380);
      text("3. DESTROY ALL THE MONSTER TO WIN THE GAME", 200, 410);
      text("4. ASTEROID CAN'T BE DESTROY USING BULLETS", 200, 440);

      gameStartButton.mousePressed(function(){
        gameState = "playS";
        console.log("gameStart");
      })
  }

  if (gameState === "playS") {
  
    gameStartButton.hide();

    spawnMonsterS();
    spawnAsteroid();
    spawnBox();

    for (var i = 0; i<bulletGroup.length;i++) {

      if(bulletGroup.get(i).isTouching(monsterSGroup)) {
       HPS = HPS-bulletPower;
       bulletGroup.get(i).remove();
       score = score+5;
     }

    }

    if (monsterSGroup.isTouching(spaceShip)) {
      gameState = "end2";
      startAgain2 = createButton("PLAY AGAIN");
      startAgain2.position(width/2, height/2+200);
    }
  }

  if (gameState === "playM") {
    spawnMonsterM();
    spawnAsteroid();
    spawnBox();

    for (var i = 0; i<bulletGroup.length;i++) {

      if(bulletGroup.get(i).isTouching(monsterMGroup)) {
        HPM = HPM-bulletPower;
        bulletGroup.get(i).remove();
        score = score+10;
      }

    }  

    if (monsterMGroup.isTouching(spaceShip)) {
      gameState = "end2";
      startAgain2 = createButton("PLAY AGAIN");
      startAgain2.position(width/2, height/2+200);
    }
  }

  if (gameState === "playB") {
    spawnMonsterB();
    spawnAsteroid();
    spawnBox();

    for (var i = 0; i<bulletGroup.length;i++) {
      if (bulletGroup.get(i).isTouching(monsterBGroup)) {
        HPB = HPB-bulletPower;
        bulletGroup.get(i).remove();
        score = score+15;
      }
    }  

    if (monsterBGroup.isTouching(spaceShip)) {
      gameState = "end2";
      text("PRESS SPACE KEY TO PLAY AGAIN", 50, 400);
      startAgain2 = createButton("PLAY AGAIN");
      startAgain2.position(width/2, height/2+200);
    }

  }

  if (asteroidGroup.isTouching(spaceShip)) {
    gameState = "end2";
    asteroidGroup.destroyEach();
    startAgain2 = createButton("PLAY AGAIN");
    startAgain2.position(width/2, height/2+200);
  }

  if (gameState === "end") {
    textSize(50);
    text("YOU WIN!", 250, 300);
    text("TOTAL: "+ score, 250, 350);
    text("BULLET USED: "+bulletUsed, 250, 400);

    startAgain.mousePressed(function(){
      gameState = "start";
      startButton = createButton("Start");
      startButton.position(width/2, height/2+200);
      startAgain.hide();
    })
  }

  if (gameState === "end2") {
    text("YOU LOSE!", 250, 300);
    text("YOUR SCORE: "+score, 250, 350);
    text("BULLET USED: "+bulletUsed, 250, 400);
    spaceShip.addImage(explosionimg);
    startAgain2.mousePressed(function(){
      gameState = "start";
      startAgain2.hide();
      startButton = createButton("Start");
      startButton.position(width/2, height/2+200);
    })
    boxGroup.destroyEach();
    monsterSGroup.destroyEach();
    monsterMGroup.destroyEach();
    monsterBGroup.destroyEach();

  }

  if (keyDown("left")) {
    spaceShip.x-=10;
  }

  if (keyDown("right")) {
    spaceShip.x+=10;
  }

  if (HPS <= 0 && gameState === "playS") {
    monsterSGroup.destroyEach();
    gameState = "playM";
  }

  if (HPM <= 0 && gameState === "playM") {
    monsterMGroup.destroyEach();
    gameState = "playB";
  }

  if (HPB <= 0 && gameState === "playB") {
    monsterBGroup.destroyEach();
    startAgain = createButton("PLAY AGAIN");
    startAgain.position(width/2, height/2+200);
    gameState = "end";
  }

  if (boxGroup.isTouching(spaceShip)) {
    bulletPower = bulletPower+20;
    boxGroup.destroyEach();
  }

  console.log(bulletPower);
  console.log(HPM);
  console.log(gameState);

  keyPressed();
  
  drawSprites();

  fill(0);
  //text(mouseX+","+mouseY, 200, 100);
  textSize(30);
  text("SCORE: " + score, 50, 50);
  textSize(20);
  text("BULLET USED: "+bulletUsed, 150, 250);
  console.log(score);
}

function spawnAsteroid() {
  if (frameCount % 100 === 0) {
    asteroid = createSprite(random(10, width-10), 0, 10, 10);
    asteroid.velocityY = 10;
    asteroid.addImage(asteroidimg);
    asteroid.scale = 0.4;
    
    asteroid.lifetime = height/10;
    asteroidGroup.add(asteroid);
  }
}

function spawnMonsterS() {
  if(frameCount % 150 === 0) {
    monsterS = createSprite(random(50, width-50), 0, 50, 50);
    monsterS.velocityY = 5;
    monsterS.scale = 0.5;
    monsterS.addImage(monsterSimg);

    monsterS.lifetime = height/5;
    monsterSGroup.add(monsterS);
  }
}

function spawnMonsterM() {
  if(frameCount % 250 === 0) {
    monsterM = createSprite(random(50, width-50), 0, 60, 60);
    monsterM.velocityY = 5;
    monsterM.addImage(monsterMimg);

    monsterM.lifetime = height/5;
    monsterMGroup.add(monsterM);
  }
}

function spawnMonsterB() {
  if(frameCount % 500 === 0) {
    monsterB = createSprite(random(200, width-200), 0, 70, 70);
    monsterB.velocityY = 1.5;
    monsterB.addImage(monsterBimg);

    monsterB.lifetime = height/1.5;
    monsterBGroup.add(monsterB);
  }
}

function spawnBox() {
  if(frameCount % 200 === 0) {
    box = createSprite(random(10, width-10), 0, 10, 10);
    box.velocityY = 5;
    box.shapeColor = "black";

    box.lifetime = height/5;
    boxGroup.add(box);
  }
}

function keyPressed() {
  bButton.mousePressed(function(){
    bullet = createSprite(spaceShip.x, spaceShip.y-110, 5, 10);
    bullet.shapeColor = "black";
    bullet.velocityY = -10;
    bullet.lifetime = height/10;
    bulletUsed = bulletUsed+1;
    sound.play();

    bulletGroup.add(bullet);
  });
}
