var alto = screen.height - 130
var ancho = screen.width
var ataque = 0
var estado = "play"
var saltando = false
var nivel = 0

var firebaseConfig = {
    apiKey: "AIzaSyCgqxH1wAC4__RGw6t3_yJxwGKMNBGfFZs",
    authDomain: "cat-adventure-stats.firebaseapp.com",
    databaseURL: "https://cat-adventure-stats-default-rtdb.firebaseio.com",
    projectId: "cat-adventure-stats",
    storageBucket: "cat-adventure-stats.appspot.com",
    messagingSenderId: "659403843140",
    appId: "1:659403843140:web:961897a82faaf0e0e5be11"
};


firebase.initializeApp(firebaseConfig);
function preload() {
    gatoquieto = loadAnimation("recursos/c3.png")
    gatocaminar = loadAnimation("recursos/c3.png", "recursos/c2.png", "recursos/c3.png", "recursos/c4.png")
    inicio = loadImage("recursos/inicio1.png")
    piso1 = loadImage("recursos/piso 1.jpg")
    piso2 = loadImage("recursos/piso 2.jpg")
    ecenarios = [piso1, piso2]
    zombi = loadAnimation("recursos/z2.png", "recursos/z3.png", "recursos/z4.png", "recursos/z5.png", "recursos/z6.png", "recursos/z7.png")
    zombicubeta = loadAnimation("recursos/zo1.png", "recursos/zo2.png", "recursos/zo3.png", "recursos/zo4.png", "recursos/zo5.png", "recursos/zo6.png")
    calavera = loadAnimation("recursos/ghost-jumping.png", "recursos/ghost-standing.png")
    angel = loadAnimation("recursos/ga1.png", "recursos/ga2.png", "recursos/ga3.png")
    ddode = loadAnimation("recursos/dd1.png", "recursos/dd2.png", "recursos/dd3.png")
    osocamina = loadAnimation("recursos/oso_0.png", "recursos/oso_1.png", "recursos/oso_2.png", "recursos/oso_3.png", "recursos/oso_4.png", "recursos/oso_5.png")
    osoataca = loadAnimation("recursos/oso_a1.png", "recursos/oso_a2.png", "recursos/oso_a3.png")
    futbolz = loadAnimation("recursos/zf_0.png", "recursos/zf_1.png", "recursos/zf_2.png", "recursos/zf_3.png", "recursos/zf_4.png", "recursos/zf_5.png", "recursos/zf_6.png", "recursos/zf_7.png")
    discoZ = loadAnimation("recursos/zd_0.png", "recursos/zd_1.png", "recursos/zd_2.png", "recursos/zd_3.png", "recursos/zd_4.png", "recursos/zd_5.png")
    zombi40 = loadAnimation("recursos/zombistein_0.png","recursos/zombistein_1.png","recursos/zombistein_2.png","recursos/zombistein_3.png","recursos/zombistein_4.png","recursos/zombistein_5.png","recursos/zombistein_6.png","recursos/zombistein_7.png")
    malosanimaciones = [zombi, zombicubeta, calavera, angel, ddode]
    batalla = loadSound("batalla.mp3")
    menu = loadSound("menu.mp3")
    osomusica = loadSound("osomusica1.mp3")
    futmusica = loadSound("futzom1.mp3")
    discomusica = loadSound("dancezombie1.mp3")
    zombistainsong = loadSound("zombie40.mp3")
    gatoataca = loadAnimation("recursos/ca1.png", "recursos/ca2.png", "recursos/ca3.png", "recursos/ca4.png")
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
    gato.vida = 13
    menu.play()
    menu.setVolume(0.4)
    suelo = createSprite(ancho / 2, alto - 35, ancho, 10)
    suelo.visible = false
    bordes = createEdgeSprites()
    enemigos = createGroup()
    jefes = createGroup()
    repisas = createGroup()
    for (let numrepisa = 0; numrepisa < 16; numrepisa++) {
        repisa = createSprite(90 * numrepisa, 5, 50, 20)
        repisa.addImage(repisaimg)
        repisas.add(repisa)
    }
    flecha = createSprite(ancho - 250, alto / 2)
    flecha.addImage(flechaimg)
    flecha.scale = 0.45
}

function draw() {
    background(200);
    drawSprites();
    fill("black")
    rect(25, 25, 286, 25)
    fill("red")
    rect(25, 25, gato.vida * 22, 25)
   
    if (gato.isTouching(bordes[1]) && enemigos.length == 0) {
        fondo.velocityY = 12
        fondo1.velocityY = 12
        nivel++
        if (nivel % 10 != 0) {
            menu.stop()
            osomusica.stop()
            futmusica.stop()
            discomusica.stop()
            zombistainsong.stop()
            batalla.setVolume(0.4)
            document.getElementById("instrucciones").style.display = "none"
            document.getElementById("instrucciones2").style.display = "none"
            document.getElementById("titulo").style.display = "none"
            document.getElementById("stats").style.display = "none"
        }
        gato.visible = false
        gato.x = 20
        flecha.visible = false
        repisas.forEach(element => {
            element.velocityY = 12
        });

    }
    if (enemigos.length == 0) {
        flecha.visible = true
    }
    else {
        flecha.visible = false
    }
    if (fondo.y >= alto + alto / 2) {
        fondo.velocityY = 0
        fondo1.velocityY = 0
        fondo.y = -alto / 2
        fondo1.y = alto / 2
        gato.vida += 2
        if (gato.vida > 13) {
            gato.vida = 13
        }
        gato.visible = true
        if (nivel % 10 == 0) {
            crearjefe()
        }
        else {
            crearmalos()
        }

        repisas.forEach(element => {
            element.velocityY = 0
            element.y = 5
        });
        fondo.addImage(random(ecenarios))
    }
    if (fondo1.y >= alto + alto / 2) {
        fondo.velocityY = 0
        fondo1.velocityY = 0
        fondo1.y = -alto / 2
        fondo.y = alto / 2
        gato.vida += 2
        if (gato.vida > 13) {
            gato.vida = 13
        }
        gato.visible = true
        if (nivel % 10 == 0) {
            crearjefe()
        }
        else {
            crearmalos()
        }
        repisas.forEach(element => {
            element.velocityY = 0
            element.y = 5
        });
        fondo1.addImage(random(ecenarios))
    }
    gato.collide(bordes)
    gato.collide(suelo, tocarsuelo)
    if (keyDown(RIGHT_ARROW) && gato.getAnimationLabel() != "gatoataca") {
        gato.x += 6
        gato.changeAnimation("gatocaminar", gatocaminar)
        gato.mirrorX(-1)
    }
    if (keyDown(LEFT_ARROW) && gato.getAnimationLabel() != "gatoataca") {
        gato.x -= 6
        gato.changeAnimation("gatocaminar", gatocaminar)
        gato.mirrorX(1)

    }
    if (keyWentUp(UP_ARROW) && !saltando) {
        gato.velocityY = -17
        saltando = true
        gato.changeAnimation("gatocaminar", gatocaminar)
        gato.mirrorX(1)
    }
    gato.velocityY += 0.7
    if (keyWentUp(77) && gato.getAnimationLabel() != "gatoataca") {
        gato.changeAnimation("gatoataca", gatoataca)
        gato.animation.looping = false
        gato.animation.changeFrame(0)

    }
    if (gato.getAnimationLabel() == "gatoataca" && gato.animation.getFrame() == gato.animation.getLastFrame()) {
        gato.changeAnimation("gatoquieto", gatoquieto)
        gato.animation.looping = true


    }

    if (keyWentUp("UP_ARROW") || keyWentUp("DOWN_ARROW") || keyWentUp("LEFT_ARROW") || keyWentUp("RIGHT_ARROW")) {
        gato.changeAnimation("gatoquieto", gatoquieto)

    }
    if (frameCount % 55 == 0) {

        enemigos.forEach(malo => {
            perseguir(gato, malo)

        })
        jefes.forEach(jefe => {
            perseguir(gato, jefe)

        })
    }
    gato.overlap(enemigos, quitarvida)
    gato.overlap(jefes, quitarvida)
    musica()

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
function quitarvida(gato, enemigo) {
    if (gato.getAnimationLabel() == "gatoataca") {
        enemigo.vida -= 1.5
        if (enemigo.vida <= 0) {
            enemigo.destroy()
        }

    }
    else {
        gato.vida -= 0.07
    }
    if (gato.vida <= 0) {
        gato.remove()
        gato.vida = 0.000000001
        estado = "perdiste"
        batalla.stop()
        menu.stop()
        osomusica.stop()
        futmusica.stop()
        discomusica.stop()
        defeat.play()
        defeat.setVolume(0.4)

        document.getElementById("derrota").style.display = "block"
    }
}
function tocarsuelo(gato, suelo) {
    saltando = false
}
function crearmalos() {
    horda = random(3, 11)
    for (var i = 0; i < horda; i++) {
        malo = createSprite(random(ancho * 0.75, ancho * 2.5), alto - 95, 50, 50)


        switch (random(malosanimaciones)) {
            case zombi:
                malo.addAnimation("caminar", zombi)
                malo.scale = 3.3
                malo.mirrorX(-1)
                malo.vida = 10
                break
            case zombicubeta:
                malo.addAnimation("caminar", zombicubeta)
                malo.scale = 3.3
                malo.mirrorX(-1)
                malo.vida = 20
                break
            case calavera:
                malo.addAnimation("caminar", calavera)
                malo.scale = 0.6
                malo.vida = 6
                break
            case angel:
                malo.addAnimation("caminar", angel)
                malo.scale = 1.7
                malo.vida = 1
                break
            case ddode:
                malo.addAnimation("caminar", ddode)
                malo.scale = 1.7
                malo.vida = 10
                break
        }



        enemigos.add(malo)
    }
}
function listaenemigos(gato, bordes) {

}
function guardar() {
    nickname = document.getElementById("nickname").value
    firebase.database().ref().child("nivel").update({ [nickname]: nivel })
    document.getElementById("derrota").style.display = "none"
    location.reload()
}
function crearjefe() {
    switch (nivel) {
        case 10:
            oso = createSprite(ancho - 10, alto - 210)
            oso.addAnimation("caminar", osocamina)
            oso.addAnimation("ataca", osoataca)
            oso.scale = 2.3
            oso.mirrorX(-1)
            oso.vida = 400
            batalla.stop()
            jefes.add(oso)
            osomusica.setVolume(1.2)
            break
        case 20:
            futzom = createSprite(ancho - 10, alto - 100)
            futzom.addAnimation("caminar", futbolz)
            futzom.scale = 1.3
            futzom.vida = 250
            futzom.mirrorX(1)
            batalla.stop()
            osomusica.stop()
            futmusica.setVolume(0.7)
            jefes.add(futzom)
            break
        case 30:
            zombidis = createSprite(ancho - 10, alto - 100)
            zombidis.addAnimation("caminar", discoZ)
            zombidis.scale = 1.3
            zombidis.vida = 200
            batalla.stop()
            discomusica.setVolume(0.7)
            jefes.add(zombidis)
            break
        case 40:
            zombistein = createSprite(ancho + 2350, alto - 250)
            zombistein.addAnimation("caminar", zombi40)
            zombistein.scale = 2.5
            zombistein.vida = 450
            batalla.stop()
            jefes.add(zombistein)
            zombistainsong.setVolume(1.2)


    }
}
function marcador() {
    firebase.database().ref("nivel").orderByValue().limitToLast(5).on('value', function (registros) {
        registros.forEach(function (jugador) {
            console.log(jugador.key + " : " + jugador.val());
            document.getElementById("stats").innerHTML += "<h3>" + jugador.key + " : " + jugador.val() + "</h3>"
        });
    });
}
function reiniciar() {
    location.reload()
}
function musica() {
    if(estado=="play"){

    
    switch (nivel) {
        case 0:
            if (!menu.isPlaying()) {
                menu.play()
            }
            break;
        case 10:
            if (!osomusica.isPlaying()) {
                osomusica.play()
            }
            break;
        case 20:
            if (!futmusica.isPlaying()) {
                futmusica.play()
            }
            break;
        case 30:
            if (!discomusica.isPlaying()) {
                discomusica.play()
            }
            break;
        case 40:
            if (!zombistainsong.isPlaying()) {
                zombistainsong.play()
            }
            break;

        default:
            if (!batalla.isPlaying()) {
                batalla.play()
            }
            break;
    }
    }
    else{
        batalla.stop()
        osomusica.stop()
        futmusica.stop()
        discomusica.stop()
        zombistainsong.stop()
    }
}