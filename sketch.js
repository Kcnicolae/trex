var trex, trex_running;
var edges;
var ground, groundimage1;
var ground2;
var cloud, cloudimage1;
var cactus;
var c1,c2,c3,c4,c5,c6;
var score;
var cloudgroup, cactusgroup;
var gamestate="play";
var trex_collided;
var gameover;
var ur_bad;
var resetbutton;
var restart;
var bouncy;
var urBad2;
var urNotThatBad;

function preload(){
  resetbutton=
    loadImage("restart.png")
  gameover=
    loadImage("gameOver.png")
trex_collided = 
  loadAnimation("trex_collided.png");
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimage1 = 
loadImage("ground2.png");
  cloudimage1 = 
loadImage("cloud.png");
  c1 = 
loadImage("obstacle1.png");
  c2 = 
loadImage("obstacle2.png");
  c3 = 
loadImage("obstacle3.png");
  c4 = 
loadImage("obstacle4.png");
  c5 = 
loadImage("obstacle5.png");
  c6 = 
loadImage("obstacle6.png");
  
  bouncy = 
    loadSound("jump.mp3");
  urBad2 = 
    loadSound("die.mp3");
  urNotThatBad = 
    loadSound("checkPoint.mp3");
}

function setup(){
  createCanvas(600,200);
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5;
  trex.addAnimation("dead",trex_collided)
  score=0;
  //trex.debug=true;
  trex.setCollider("circle",0,0,40)
  
  ground2 = createSprite(200,191,400,5)
  ground2.visible=false;
  
  ground = createSprite(200,180,400,5);
  
  ground.addImage(groundimage1);
  
  cloudgroup=createGroup();
  cactusgroup=createGroup();
    
  ur_bad = createSprite(300,100,50,10);
  ur_bad.addImage(gameover);
  ur_bad.scale=0.75;
  reset = createSprite(300,140,50,10);
  reset.addImage(resetbutton);
  reset.scale=0.5
}

function draw(){
  background("lightyellow");

  text("score:"+score,510,50);
 
  
  if(gamestate==="play"){
    //ground move
    ground.velocityX=-8
    ur_bad.visible=false;
      reset.visible=false;
    //score counter
     score=score+Math.round(getFrameRate()/60);
    //jumper
   if(keyDown("space") && trex.y>160){
   trex.velocityY = -10;
   bouncy.play();
  }
    //reset ground
 if(ground.x<0){
   ground.x = 1000;
  }
      //adding gravity
  trex.velocityY = trex.velocityY + 0.55;
  //make clouds
    spawnClouds();
  //make cacti
  spawnCactus();
    
    if(score%100===0){
      urNotThatBad.play();
    }
    
    //detecting collision of cacti and dino boy
  if(trex.isTouching(cactusgroup)){
    gamestate="over";
    trex.velocityY=0;
    //trex.velocityY=-8;
    urBad2.play();
  }
  }
  if(gamestate==="over"){
    ground.velocityX=0;
   //make trex look dead
    trex.changeAnimation("dead",trex_collided);
    //make cacti stop
    cactusgroup.setVelocityXEach(0);
    //make clouds stop
    cloudgroup.setVelocityXEach(0);
    cloudgroup.setLifetimeEach(-1);
    cactusgroup.setLifetimeEach(-1);
  
      ur_bad.visible=true;
      reset.visible=true;
    
    if(mousePressedOver(reset)){
      gamestate="play";
      cloudgroup.destroyEach();
      cactusgroup.destroyEach();
      score=0;
      trex.changeAnimation("running",trex_running);
    }
  }
  
  trex.collide(ground2)
  
  drawSprites();
}

function spawnCactus(){
  
  if(frameCount % 70 === 0){
    cactus = createSprite(700,160,10,50);
  cactus.velocityX=-8+(score/-100)*3;
    cactus.scale=0.6;
    cactus.lifetime=350;
    var cheese = Math.round(random(1,6));
    switch(cheese){
      case 1:cactus.addImage(c1)
        break;
        case 2:cactus.addImage(c2)
        break;
        case 3:cactus.addImage(c3)
        break;
        case 4:cactus.addImage(c4)
        break;
        case 5:cactus.addImage(c5)
        break;
        case 6:cactus.addImage(c6)
        break;
        default:break;
    }
    cactusgroup.add(cactus);
  }
   
}

function spawnClouds(){
  //console.log(frameCount);
 
  if(frameCount % 100 === 0){
      cloud = createSprite(600,100,40,10);
    cloud.scale=0.75;
    cloud.addImage(cloudimage1);
  cloud.y=Math.round(random(10,75));
  cloud.velocityX=-3
  cloud.lifetime=340;
    cloudgroup.add(cloud);
     console.log(cloud.depth);
      trex.depth=cloud.depth+100;
  }
 
  
  
}
