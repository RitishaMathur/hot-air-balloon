var database,position
var balloon

function preload(){
  backgroundImg=loadImage("image/background.png")
  balloon=loadAnimation("image/Balloon1.png","image/Balloon2.png","image/Balloon3.png")
  
}


function setup() {
  createCanvas(1200,500);
 database=firebase.database()
  balloon1=createSprite(200,300,10,10)
  balloon1.addAnimation("balloons",balloon)
  balloon1.scale=0.5;
  var balloonPosition=database.ref('balloon/position')
    balloonPosition.on("value",readposition,showError)


 
}


function draw() {
  background(backgroundImg);
  textSize(25)
  text("Press arrow key to move",10,40); 
  balloon1.display(); 
  
  if(keyDown(LEFT_ARROW)){
    updateposition(-10,0)
  }
  else if(keyDown(RIGHT_ARROW)){
    updateposition(10,0)
  }
  else if(keyDown(UP_ARROW)){
    updateposition(0,-10)
    balloon1.scale=balloon1.scale-0.005
  }
  else if(keyDown(DOWN_ARROW)){
    updateposition(0,10)
    balloon1.scale=balloon1.scale+0.005
  }
 
  
  
  drawSprites();
}
function readposition(data){
  position=data.val()
  console.log(position)
  balloon1.x=position.x,
  balloon1.y=position.y
}

function showError(){
  console.log("there was an error")
}
 function updateposition(x,y){
 database.ref("balloon/position").set({x:position.x+x,y:position.y+y})

}