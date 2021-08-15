var player,playerImg1,playerImg2;
var bgImg;
var wall1,wall2;
var zombie,zombieImg;
var bullet,bulletImg;
var heart1,heart1Img;
var heart2,heart2Img;
var heart3,heart3Img;
var zombieGroup;
var bulletGroup;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var life = 3;

function preload(){
  playerImg1 = loadImage("assets/shooter_2.png");
  playerImg2 = loadImage("assets/shooter_3.png");
  bgImg = loadImage("assets/bg.jpeg");
  zombieImg = loadImage("assets/zombie.png");
  bulletImg = loadImage("assets/bulletImg.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  zombieGroup = new Group();
  bulletGroup = new Group();
  
  player = createSprite(windowWidth/2-150, windowHeight/2, 50, 50);
  player.addImage(playerImg1);
  player.scale = 0.3;
  player.setCollider("rectangle",0,0,200,460);

  wall1 = createSprite(windowWidth/2,windowHeight,windowWidth,30);
  wall1.visible = false;
  wall2 = createSprite(windowWidth/2,0,windowWidth,30);
  wall2.visible = false;

  heart1 = createSprite(windowWidth-100,50);
  heart1.addImage("heart1Image",heart1Img);
  heart1.scale = 0.2;
  heart1.visible = false;

  heart2 = createSprite(windowWidth-100,50);
  heart2.addImage("heart2Image",heart2Img);
  heart2.scale = 0.2;
  heart2.visible = false;

  heart3 = createSprite(windowWidth-100,50);
  heart3.addImage("heart3Image",heart3Img);
  heart3.scale = 0.2;
}

function draw() {
  background(bgImg);

  if(gameState===PLAY){
    if(keyDown("UP_ARROW")){
      player.y = player.y-10;
    }
    if(keyDown("DOWN_ARROW")){
      player.y = player.y+10;
    }
    if(keyWentDown("space")){
      player.addImage(playerImg2);
      bullet = createSprite(200,400,30,10);
      bullet.addImage("bulletImage",bulletImg);
      bullet.scale = 0.3;
      bullet.x = player.x+50;
      bullet.y = player.y-26;
      bullet.velocityX = 6;
      bullet.lifetime = 300;
      bullet.setCollider("rectangle",0,0,100,60);
      bulletGroup.add(bullet);
    }
      else if(keyWentUp("space")){
        player.addImage(playerImg1);
      }
      if(zombieGroup.isTouching(bulletGroup)){
        for(var i=0;i<zombieGroup.length;i++){
          if(zombieGroup[i].isTouching(bulletGroup)){
            zombieGroup[i].destroy();
            bulletGroup.destroyEach();
          }
        }
      }
      
      if(frameCount%90===0){
        zombie = createSprite(windowWidth,random(100,500));
        zombie.addImage("zombieImage",zombieImg);
        zombie.velocityX = -9;
        zombie.scale = 0.17;
        zombie.lifetime = 1000;
        zombie.setCollider("rectangle",50,0,300,1000);
        zombieGroup.add(zombie);
      }
      
      if(life===3){
        heart3.visible = true;
        heart2.visible = false;
        heart1.visible = false;
        if(zombieGroup.isTouching(player)){
          player.y = windowHeight/2;
          zombieGroup.destroyEach();
          life = 2;
        }
      }
      if(life===2){
        heart3.visible = false;
        heart2.visible = true;
        heart1.visible = false;
        if(zombieGroup.isTouching(player)){
          player.y = windowHeight/2;
          zombieGroup.destroyEach();
          life = 1;
        }
      }
      if(life===1){
        heart3.visible = false;
        heart2.visible = false;
        heart1.visible = true;
        if(zombieGroup.isTouching(player)){
          player.y = windowHeight/2;
          zombieGroup.destroyEach();
          gameState = END;
        }
      }
    }
    if(gameState===END){
      heart1.visible = false;
      player.destroy();
      textSize(50);
      fill("white");
      text("Game Ended",600,300);
    }

  
  
  
  
    
  
  

  
  var edges = createEdgeSprites();
  player.collide(wall1);
  player.collide(wall2);
  drawSprites();
}
