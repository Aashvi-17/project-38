var pixelCount=6;
var score=0;
var pixels=[];
var coronaGroup;
var play=1;
var end=0;
var gameState=play;
var booster=0;

function preload(){
girlImg=loadImage("girl3.png");
bgImg=loadImage("bg.PNG");
healthImg=loadImage("health.png");
pixelImg=loadImage("pixel.PNG");
corona1Img=loadImage("corona1.png");
corona2Img=loadImage("corona2.png");
groundImage=loadImage("ground2.png");
maskImg=loadImage("mask.png");
saniImg=loadImage("sanitizer.png");
reloadImg=loadImage("reload.png");
bgS=loadSound("running.mp3");
}

function setup(){
createCanvas(displayWidth,550);

//bg = createSprite(200,380,400,20);
//bg.addImage("bg",bgImg);
//bg.x = bg.width /2;
//bg.velocityX = -(6 + 3*score/100);
//bg.scale=4;
coronaGroup=new Group();
maskGroup=new Group();
sanitizerGroup=new Group();

girl=createSprite(100,310,50,50);
girl.addImage(girlImg);
girl.scale=0.8;

reload=createSprite(displayWidth/2,310,50,50);
reload.addImage(reloadImg);
reload.scale=0.3;
reload.visible=false;

health=createSprite(1020,70,40,40);
health.addImage(healthImg);

pixel1=createSprite(985,70,20,20);
pixel1.addImage(pixelImg);
pixel1.scale=0.5555

pixel2=createSprite(1005,70,20,20);
pixel2.addImage(pixelImg);
pixel2.scale=0.5

pixel3=createSprite(1025,70,20,20);
pixel3.addImage(pixelImg);
pixel3.scale=0.5

pixel4=createSprite(1045,70,20,20);
pixel4.addImage(pixelImg);
pixel4.scale=0.5

pixel5=createSprite(1065,70,20,20);
pixel5.addImage(pixelImg);
pixel5.scale=0.5

pixel6=createSprite(1085,70,20,20);
pixel6.addImage(pixelImg);
pixel6.scale=0.5;
pixels=[pixel1,pixel2,pixel3,pixel4,pixel5,pixel6];

invisibleGround = createSprite(200,400,400,10);
invisibleGround.visible = false;


  ground = createSprite(200,380,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
 
}

function draw(){
    background("darkgreen");
   image(bgImg,0,-displayHeight*4,displayWidth,displayHeight*5);
    fill("white");
    stroke("white");
    textSize(20)
    text("Score: "+ score, 1200,50);
 bgS.play();

    if(gameState===play){
        score = score + Math.round(getFrameRate()/60);
        ground.velocityX = -(6 + 3*score/100);
        //console.log(girl.y);
       
        if(keyDown("space") && girl.y>=50) {
            girl.velocityY = -12;
        }
        girl.velocityY = girl.velocityY + 0.8
        if (ground.x < 0){
            ground.x = ground.width/2;
        }
       // if (bg.x < 0){
       //     bg.x = bg.width/2;
        //}
        girl.collide(invisibleGround);
        
        coronaf();
        maskf();
        sanitizerf();
        
        if(coronaGroup.isTouching(girl)){
            coronaGroup.destroyEach();
            if(booster>0){
                booster--;
            }
            else{
                pixelCount--;
            }
           
            
        }

        if(maskGroup.isTouching(girl)|| sanitizerGroup.isTouching(girl)){
            if(maskGroup.isTouching(girl)){
                maskGroup.destroyEach();
            }
            else{
                sanitizerGroup.destroyEach();
            }
            pixelCount++;

            if(pixelCount>6){
                pixelCount=6;
                booster++;
               
            }
              
            
        }
        if(booster>0){
            fill("white")
            text("Booster = "+booster,1100,100)
        }
        
        for(var i=0;i<6;i++){
            if(i<pixelCount)
            pixels[i].visible=true;
            else{
                pixels[i].visible=false;
            }
        }
        if(pixelCount===0){
            gameState=end;
        }
    }

    if(gameState===end){
        ground.velocityX=0;
        //bg.velocityX=0;
        coronaGroup.velocityX=0;
        maskGroup.velocityX=0;
        //reload.visible=true
        fill("white");
    stroke("white");
    textSize(40)
    text("GAME OVER",displayWidth/3,250);
    }
     
    if(mousePressedOver(reload)){
        gameState=play
        score=0;
        
    }



    fill("white");
    stroke("white");
    textSize(20)
    text("Health",1000,50);

    
    drawSprites();
}

function coronaf(){
    if(frameCount%100===0){
       var corona=createSprite(displayWidth,300,50,50);
      // console.log(girl.x);
       corona.velocityX = -(15 + 3*score/100);
       //console.log(corona.x);

       corona.y = Math.round(random(250,300));
    //generate random obstacles

    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: corona.addImage(corona1Img);
              break;
      case 2: corona.addImage(corona2Img);
              break;
      default: break;
    }
    corona.scale = 0.2;
   
    corona.lifetime = 300;
     

   coronaGroup.add(corona);
    }
}


function maskf(){
    if(frameCount%250===0){
       var mask=createSprite(displayWidth,300,50,50);
      // console.log(girl.x);
       mask.velocityX = -(15 + 3*score/100);
      // console.log(mask.x);
       mask.addImage(maskImg);
       mask.y = Math.round(random(250,300));
       mask.scale = 0.2;
       mask.lifetime = 300;
       maskGroup.add(mask);
      
    }
   
    }


    function sanitizerf(){
        if(frameCount%380===0){
           var sani=createSprite(displayWidth,300,50,50);
           sani.velocityX = -(15 + 3*score/100);
           console.log(sani.x);
           sani.addImage(saniImg);
           sani.y = Math.round(random(250,300));
           sani.scale = 0.5;
           sani.lifetime = 300;
           sanitizerGroup.add(sani);
        }
       
        }
    
