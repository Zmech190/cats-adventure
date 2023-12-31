var alto = screen.height - 130
var ancho = screen.width
var ataque=0
var estado="play"
var saltando= false
var nivel=0

function preload() {
    gatoquieto = loadAnimation("recursos/c3.png")
    gatocaminar = loadAnimation("recursos/c3.png", "recursos/c2.png", "recursos/c3.png", "recursos/c4.png")
    inicio = loadImage("recursos/inicio1.png")
    piso1 = loadImage("recursos/piso 1.jpg")
    piso2 = loadImage("recursos/piso 2.jpg")
    ecenarios=[piso1,piso2]
    zombi = loadAnimation("recursos/z2.png", "recursos/z3.png", "recursos/z4.png", "recursos/z5.png", "recursos/z6.png", "recursos/z7.png")
    zombicubeta = loadAnimation("recursos/zo1.png", "recursos/zo2.png", "recursos/zo3.png", "recursos/zo4.png", "recursos/zo5.png", "recursos/zo6.png")
    calavera = loadAnimation("recursos/ghost-jumping.png", "recursos/ghost-standing.png")
    malosanimaciones = [zombi, zombicubeta, calavera]
    batalla = loadSound("batalla.mp3")
    menu = loadSound("menu.mp3")
    gatoataca = loadAnimation("recursos/ca1.png","recursos/ca2.png","recursos/ca3.png","recursos/ca4.png")
    defeat = loadSound("defeat.mp3")
    repisaimg = loadImage("recursos/climber.png")
    flechaimg = loadImage("recursos/flecha.png")
}

function setup() {
    createCanvas(ancho, alto);
    inicio.resize(ancho, alto)
    fondo = createSprite(ancho / 2, alto / 2)
    fondo.addImage(inicio)
    piso1.resize(ancho, alto)
    piso2.resize(ancho, alto)
    fondo1 = createSprite(ancho / 2, -alto / 2)
    fondo1.addImage(piso1)
    gato = createSprite(ancho / 2, alto - 95)
    gato.addAnimation("gatoquieto", gatoquieto)
    gato.addAnimation("gatocaminar", gatocaminar)
    gato.addAnimation("gatoataca", gatoataca)
    gato.scale = 1.34
    gato.vida=10
    menu.play()
    menu.setVolume(0.4)
    suelo=createSprite(ancho/2,alto - 35,ancho,10)
    suelo.visible=false
    bordes=createEdgeSprites()
    enemigos = createGroup()
    repisas=createGroup()
   for (let numrepisa = 0; numrepisa < 16; numrepisa++) {
    repisa = createSprite(90*numrepisa,5,50,20)
    repisa.addImage(repisaimg)
    repisas.add(repisa)
   }
   flecha=createSprite(ancho-250,alto/2)
   flecha.addImage(flechaimg)
   flecha.scale=0.45
}

function draw() {
    background(200);
    drawSprites();
    fill("black")
    rect(25,25,220,25)
    fill("red")
    rect(25,25,gato.vida*22,25)
   if(gato.isTouching(bordes[1])){
    fondo.velocityY=12
    fondo1.velocityY=12
    nivel++
    if(nivel==1){
        menu.stop()
        batalla.play()
        batalla.setVolume(0.4)
        document.getElementById("instrucciones").style.display="none"
    }
    gato.x=ancho/2
    flecha.visible=false
    repisas.forEach(element => {
        element.velocityY=12
    });
    
   }
   if(enemigos.length==0){
    flecha.visible=true
   }
   else{
    flecha.visible=false
   }
   if(fondo.y>=alto+alto/2){
    fondo.velocityY=0
    fondo1.velocityY=0
    fondo.y=-alto/2
    fondo1.y=alto/2
    crearmalos()
    repisas.forEach(element => {
        element.velocityY=0
        element.y=5
    });
    fondo.addImage(random(ecenarios))
   }
   if(fondo1.y>=alto+alto/2){
    fondo.velocityY=0
    fondo1.velocityY=0
    fondo1.y=-alto/2
    fondo.y=alto/2
    crearmalos()
    repisas.forEach(element => {
        element.velocityY=0
        element.y=5
    });
    fondo1.addImage(random(ecenarios))
   }
    gato.collide(bordes)
    gato.collide(suelo,tocarsuelo)
    if (keyDown(RIGHT_ARROW)&&gato.getAnimationLabel() !="gatoataca") {
        gato.x += 6
        gato.changeAnimation("gatocaminar", gatocaminar)
        gato.mirrorX(-1)
    }
    if (keyDown(LEFT_ARROW)&&gato.getAnimationLabel() !="gatoataca") {
        gato.x -= 6
        gato.changeAnimation("gatocaminar", gatocaminar)
        gato.mirrorX(1)

    }
    if (keyWentUp(UP_ARROW)&&!saltando) {
        gato.velocityY =-17
        saltando=true
        gato.changeAnimation("gatocaminar", gatocaminar)
        gato.mirrorX(1)
    }
    gato.velocityY += 0.7
    if (keyWentUp(77)){
        gato.changeAnimation("gatoataca", gatoataca)
        gato.animation.looping=false
        gato.animation.changeFrame(0)
        
    }
    if (gato.getAnimationLabel()=="gatoataca"&&gato.animation.getFrame()==gato.animation.getLastFrame()){
        gato.changeAnimation("gatoquieto", gatoquieto)
        gato.animation.looping=true
        
    }
   
    if (keyWentUp("UP_ARROW")||keyWentUp("DOWN_ARROW")||keyWentUp("LEFT_ARROW")||keyWentUp("RIGHT_ARROW")){
        gato.changeAnimation("gatoquieto", gatoquieto)
        
    }
    if (frameCount % 55 == 0) {

        enemigos.forEach(malo => {
            perseguir(gato, malo)
            
        })

    }
    gato.overlap(enemigos,quitarvida)
    if(estado=="perdiste"){
        fill("black")
        rect(300,0,ancho-600,alto)
        fill("white")
        textSize(90)
        text("perdiste",ancho/2-textWidth("perdiste")/2,alto/2)
    }
    if(nivel==0){
        textSize(90)
        fill("white")
        text("cat \nadventure",ancho/2-210,alto/2-100)
    }
}
function perseguir(p1, p2) {
    if (p2.x < p1.x) {
        p2.mirrorX(1)
        p2.velocityX = random(2, 4.7)
    }
    if (p2.x > p1.x) {
        p2.mirrorX(-1)
        p2.velocityX = random(-2, -4.7)
    }
}
function quitarvida(gato,enemigo){
    if(gato.getAnimationLabel()=="gatoataca"){
        enemigo.vida-=2
        if(enemigo.vida<=0){
            enemigo.destroy()
        }

    }
    else{
        gato.vida-=0.1
    }
    if(gato.vida<=0){
        gato.remove()
        gato.vida=0.00001
        estado="perdiste"
        batalla.stop()
        menu.stop()
        defeat.play()
        defeat.setVolume(0.4)

    }
}
function tocarsuelo(gato,suelo){
    saltando=false
}
function crearmalos(){
    horda=random(4,16)
    for (var i = 0; i < horda; i++) {
        malo = createSprite(random(ancho * 0.75, ancho * 2.5), alto - 95, 50, 50)
        
        
        switch (malosanimaciones[Math.round(random(0, 2))]) {
            case zombi:
                malo.addAnimation("caminar", zombi)
                malo.scale = 3.3
                malo.mirrorX(-1)
                malo.vida=6
                break
            case zombicubeta:
                malo.addAnimation("caminar", zombicubeta)
                malo.scale = 3.3
                malo.mirrorX(-1)
                malo.vida=15
                break
            case calavera:
                malo.addAnimation("caminar", calavera)
                malo.scale = 0.6
                malo.vida=4
                break
        }

        

        enemigos.add(malo)
    }
}
function listaenemigos(gato,bordes){

}