var alto=screen.height-130
var ancho=screen.width

function preload(){ 
    gatoquieto=loadAnimation("c3.png")
    gatocaminar=loadAnimation("c3.png","c2.png","c3.png","c4.png")
    
}

function setup() {
    createCanvas(ancho, alto);
    gato=createSprite(ancho/2, alto-95)
    gato.addAnimation("gatoquieto", gatoquieto)
    gato.addAnimation("gatocaminar", gatocaminar)
    gato.scale=0.9
}

function draw() {
    background(200);
    drawSprites();
    if(keyDown(RIGHT_ARROW)){
        gato.x+=6
        gato.changeAnimation("gatocaminar", gatocaminar)
        gato.mirrorX(-1)  
    }
    if(keyDown(LEFT_ARROW)){
        gato.x-=6
        gato.changeAnimation("gatocaminar", gatocaminar)
        gato.mirrorX(1)  
    }
}

