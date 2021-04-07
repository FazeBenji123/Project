var Captianamerica, Captianamerica_running
var Redskull, RedskullImage
var background, backgroundImage
var Shield, ShieldImage
var ground, Invisibleground
var score
var ironman,ironmanImage
var gameoverImage, restartImage;
var PLAY = 1;
var END = 0;;
var gameState = PLAY;

function preload() {
  Captianamerica_running = loadAnimation("captian_america.png");
  RedskullImage = loadImage("RedSkull.png");
  backgroundImage = loadImage("tower.jpeg");
  ShieldImage = loadImage("shield.png");
  ironmanImage= loadImage("ironman.png");
  gameoverImage=loadImage("gameover.png");
  restartImage=loadImage("restart.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  gameover = createSprite(300,100);
  gameover.addImage(gameoverImage);
  
  restart = createSprite(300,140);
  restart.addImage(restartImage);
  gameover.scale = 0.5;
  restart.scale = 0.5;
  background1 = createSprite(width / 2 + 700, height / 2 + 200);
  background1.addImage(backgroundImage);
  background1.scale = 6.0;
  Captianamerica = createSprite(200, 520, 80, 400);
  Captianamerica.addAnimation("moving", Captianamerica_running);
  Captianamerica.scale = 0.6;
  background1.velocityX = -5;
  InvisibleGround = createSprite(width / 2, height, width, 20);
  InvisibleGround.visible = false;
  RedskullGroup = new Group();
  ShieldGroup = new Group();
  ironmanGroup= new Group();
  score = 0;
  RedskullGroup= createGroup();
  ShieldGroup= createGroup();
ironmanGroup= createGroup();
}
function spawnRedskull() {
  if (frameCount % 150 == 0) {
    
    Redskull = createSprite(width, height - 50, 10, 10);
    Redskull.addImage(RedskullImage);
    Redskull.scale = 0.40;
    Redskull.velocityX = -5;
    RedskullGroup.add(Redskull);
    
  }

}

function spawnironman(){
  if(frameCount % 100==0){
    ironman = createSprite(width, height - 50, 10, 10);
    var rand = Math.round(random(1,2));
if(rand==1){
  ironman.addImage(ironmanImage);
}    
else{
  ironman.addImage(RedskullImage);
}
    ironman.scale = 0.35;
    ironman.velocityX = -8;
    ironmanGroup.add(ironman);
  
  }
  
}

function spawnSheilds() {
  if (frameCount % 100 == 0) {
    
    Shield = createSprite(400, 1000, 10, 10);
    Shield.y = Math.round(random(height / 2 - 100, height / 2 + 100));
    Shield.addImage(ShieldImage);
    Shield.scale = 0.15;
    Shield.velocityX = -7;
    ShieldGroup.add(Shield);

  }

}

function draw() {
  background("black");
  if (background1.x < 0) {
    background1.x = background1.width / 2;
  }
   
  if(gameState === PLAY){

    gameover.visible = false;
    restart.visible = false;
  }
  if(ironmanGroup.isTouching(Captianamerica)){
    gameState = END;
  }
  Captianamerica.collide(InvisibleGround);
  //spawnRedskull();
  spawnSheilds();
  spawnironman();
  Captianamerica.velocityY = Captianamerica.velocityY + 0.8
  if (Captianamerica.isTouching(ShieldGroup)) {
    ShieldGroup.destroyEach();
    score = score + 1;
  }
  if (keyDown("space") && Captianamerica.y > height - 200) {
    Captianamerica.velocityY = -29;
}

  Captianamerica.velocityY = Captianamerica.velocityY + 0.8
  drawSprites();
  textSize(25);
  fill("black");
  text("Score: " + score, 500, 40);
}