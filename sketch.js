var alto=screen.height-130
var ancho=screen.width

function preload(){ 
    gatoquieto=loadAnimation("recursos/c3.png")
    gatocaminar=loadAnimation("recursos/c3.png","recursos/c2.png","recursos/c3.png","recursos/c4.png")
    inicio=loadImage("recursos/inicio1.png")
    piso1=loadImage("recursos/piso 1.jpg")
    piso2=loadImage("recursos/piso 2.jpg" )
    zombi=loadAnimation("recursos/z2.png", "recursos/z3.png","recursos/z4.png","recursos/z5.png","recursos/z6.png","recursos/z7.png")
    zombicubeta=loadAnimation("recursos/zo1.png", "recursos/zo2.png","recursos/zo3.png","recursos/zo4.png","recursos/zo5.png","recursos/zo6.png")
    calavera=loadAnimation("recursos/ghost-jumping.png", "recursos/ghost-standing.png")
malosanimaciones=[zombi,zombicubeta,calavera]
batalla=loadSound("batalla.mp3")
menu=loadSound("menu.mp3")
}

function setup() {
    createCanvas(ancho, alto);
    inicio.resize(ancho,alto)
    fondo=createSprite(ancho/2,alto/2)
    fondo.addImage(inicio)
    piso1.resize(ancho,alto)
    fondo1=createSprite(ancho/2,alto/2)
    fondo1.addImage(piso1)
    gato=createSprite(ancho/2, alto-95)
    gato.addAnimation("gatoquieto", gatoquieto)
    gato.addAnimation("gatocaminar", gatocaminar)
    gato.scale=1.34
    batalla.play()
    batalla.setVolume(0.4)
    enemigos=createGroup()
  for(var i=0;i<random(3,15);i++){
    malo=createSprite(random(ancho*0.75, ancho*2),alto-95,50,50)
    malo.attractionPoint(2.35,gato.x,gato.y)
    switch(malosanimaciones[Math.round(random(0,2))]){
        case zombi:
            malo.addAnimation("caminar",zombi)
            malo.scale=3.3
            malo.mirrorX(-1)
            break
            case zombicubeta:
            malo.addAnimation("caminar",zombicubeta)
            malo.scale=3.3
            malo.mirrorX(-1)
            break
            case calavera:
            malo.addAnimation("caminar", calavera)
            malo.scale=0.6
            malo.attractionPoint(2.5,gato.x,gato.y)
            break
    }
   
   
    enemigos.add(malo)
  }
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
    if(keyDown(UP_ARROW)){
        gato.y-=6
        gato.changeAnimation("gatocaminar", gatocaminar)
        gato.mirrorX(1)
    }
    if(keyDown(DOWN_ARROW)){
        gato.y+=6
        gato.changeAnimation("gatocaminar", gatocaminar)
        gato.mirrorX(1)
    }  
    enemigos.forEach(malo=>{
        malo.friction=0.004
        malo.attractionPoint(0.1,gato.x,malo.y)
    }) 
}


