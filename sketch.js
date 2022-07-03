var boy,boyImg;
var car,carImg;
var bg,backgroundImg
var carsGroup;
var gameState="play";
var score=0;

function preload(){
 boyImg=loadAnimation("b0.png","b1.png","b2.png","b3.png","b4.png","b5.png","b6.png","b7.png","b8.png","b9.png","b10.png","b11.png")
 backgroundImg=loadImage("background.png")
 carImg=loadImage("car.png")   
 boyHit=loadAnimation("b3.png")
 
}

function setup(){
    createCanvas(600,400)
    bg=createSprite(300,200,600,400)
    bg.addImage("background",backgroundImg)
    bg.scale=0.4

    boy=createSprite(100,340)
    boy.addAnimation("boy",boyImg)
    boy.debug=true;
    boy.addAnimation("boyHit",boyHit)
    boy.scale=0.2

   ground=createSprite(300,350,600,20)
  ground.visible=false
    carsGroup=new Group()

} 

function draw(){
background(6)
textSize(30);

if(gameState==="play"){
  boy.changeAnimation("boy")
  score+=Math.round(getFrameRate()/60);
bg.velocityX=-3
if (bg.x<=250){
    bg.x=bg.width/6
}

if(keyDown("space")&&boy.y>100){
    boy.velocityY = -10;
  }
  
  boy.velocityY = boy.velocityY + 0.5;
if(carsGroup.isTouching(boy)){
  gameState="end"
}

spawnCars()
}
if(gameState==="end"){
  carsGroup.setLifetimeEach(-1);
  carsGroup.setVelocityXEach(0)
  bg.velocityX=0;
  boy.velocityX=0;
  boy.changeAnimation("boy")

}

boy.collide(ground)
drawSprites()
text("Score:"+score,400,50)

}

function spawnCars(){
  if (frameCount%200===0){
    car =createSprite(800,320)
    car.debug=true;
    car.setCollider("circle",0,0,50)
    car.addImage(carImg)
    car.velocityX-=(3+score/100);
    car.lifetime=400
    carsGroup.add(car)
  }
}