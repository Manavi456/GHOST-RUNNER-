PLAY = 1;
END = 2;
gameState = PLAY;

var ghost, ghost_Standing;

var playground, playgroundImg;

var door, doorImg, doorGroup;

var climber, climberImg, climberGroup;

var score ;

var gameOver, gameOverImg;


function preload(){
  
  ghost_Standing = loadImage("ghost-standing.png");
  
  playgroundImg = loadImage("tower.png");
  
  doorImg = loadImage("door.png");
  
  climberImg = loadImage("climber.png");
  
  gameOverImg = loadImage("gameOver.png");

}

function setup(){
     createCanvas(400, 400)
  
  playground = createSprite(200, 200, 400, 400);
  playground.addImage( playgroundImg);
  playground.velocityY = 4;
  playground.scale = 0.6;

  ghost = createSprite(100, 350, 20, 20);
  ghost.addImage( ghost_Standing);
  ghost.scale = 0.3;
  
  ghost.setCollider("circle", 0, 0, radius = 140);
  
  ghost.debug = true
  
  score = 0;

  gameOver = createSprite(200, 200, 20, 20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.6;
  gameOver.visible = false;
  
   doorGroup = new Group();
   climberGroup = new Group();
  
  
}
function draw(){
 background("black");
  
  if(gameState===PLAY){
    
     if( playground.y > 350 ){
          playground.y = 200}
     
     if(keyDown("space")){
          ghost.velocityY = -12;
      
      }else(ghost.velocityY = 0);
    
    
      if(keyDown("right")) {
              ghost.velocityX = 7;
       
      }else if(keyDown("left")){
                ghost.velocityX = -7;
        
      }else(ghost.velocityX = 0);
    
    
    if(doorGroup.isTouching(ghost)|| climberGroup.isTouching(ghost)){
      gameState = END;
    }
  
    spawnDoors();
      
  }
    
     if(gameState===END){
      
       gameOver.visible = true ;
      
       score = 0;
       playground.velocityY = 0;
        
       doorGroup.setVelocityYEach(0);
       climberGroup.setVelocityYEach(0);
      
       doorGroup.setLifetimeEach(-1);
       climberGroup.setLifetimeEach(-1);
    
    }
  
  drawSprites();
  
  textSize(20);
  fill("white");
  text("Score = " + score , 300, 25) 
  score = score + Math.round(getFrameRate()/60);
}

function spawnDoors(){
  if(frameCount%60===0){
      door = createSprite(150, 5, 20, 20);
      door.addImage(doorImg);
      door.scale = 0.6;
      door.velocityY = 4;
      door.x = Math.round(random(180, 300 ));
      door.lifetime = 200;
    
      climber = createSprite(150, 5, 20, 20);
      climber.addImage(climberImg);
      climber.scale = 0.6;
      climber.velocityY = 4;
      climber.x = door.x;
      climber.lifetime = 200;
    
    doorGroup.add(door);
    
    climberGroup.add(climber);
  }
 
}






