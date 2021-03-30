var ground, groundImg;
var monkey, monkeyImg1;
var stone, stoneImg, stoneGroup;
var hunter, hunterImg,hunterGroup;
var restart, gameOver;
var score = 0;

var gameState = "level1";

var invisibleGround;

function preload(){
 
  groundImg = loadImage("jungle.jpg");
  monkeyImg = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_8.png");
  monkeyImg = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png");
  stoneImg = loadImage("stone.png");
  hunterImg = loadImage("hunter_1.png");

}

function setup(){
  createCanvas(1500,500);

  
ground = createSprite(0,0, 2750 ,10)
ground.addImage(groundImg)
ground.scale = 3
ground.velocityX = -5;
ground.x = ground.width/2

monkey = createSprite(700,420,50,50);
monkey.addAnimation("monkeyImg", monkeyImg);
monkey.scale = 0.15;

invisibleGround = createSprite(750,480, 1500, 10);
invisibleGround.visible = false;

stoneGroup = new Group();
hunterGroup = new Group();

restart = createSprite(750,250,100,100);
restart.shapeColor = "red";
restart.visible = false;



}

function draw(){
background(0)

score = Math.round(frameCount/50);


if(gameState === "level1"){
  spawnObstacles();

  if(score > 5){
    gameState = "level2"
  }

  if(stoneGroup.isTouching(monkey)){
    gameState = "end";
  }
  
}

if(gameState === "end"){
  ground.velocityX = 0;
  stoneGroup.setVelocityXEach(0);
  hunterGroup.setVelocityXEach(0);
  restart.visible = true;
  score = 0;

}

if(gameState === "level2"){
  //spawnObstacles();
  spawnHunter();
  if(stoneGroup.isTouching(monkey)|| hunterGroup.isTouching(monkey)){
    gameState = "end";
  }

}

  if(ground.x < 0){
    ground.x = ground.width/2 
  }


  if(keyDown("space") && monkey.y > 360){
     monkey.velocityY = -15;
  }

  monkey.velocityY = monkey.velocityY + 0.9;
  monkey.collide(invisibleGround);


  drawSprites();
  
  text("SCORE :" + score,250,250);

}


function spawnObstacles(){
if(frameCount%50 === 0 ){
  var stone = createSprite(1500,480,10,10)
  stone.velocityX = -10;
  stone.addImage(stoneImg);
  stone.scale = 0.15;
  stoneGroup.add(stone);
  
}

}

function spawnHunter(){
  if(frameCount%200 === 0){
    var hunter = createSprite(1500,480,10,10);
    hunter.velocityX = -10;
    hunter.addImage(hunterImg);
    hunterGroup.add(hunter);
    hunter.scale = 0.5;
    hunter.debug = true;
    hunter.setCollider("rectangle",0,0,250,300)
  }
}