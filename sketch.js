var alto = screen.height - 130
var ataquesorpresa = 0
var ataquetimer = 0
var ancho = screen.width
var ataque = 0
var estado = "play"
var saltando = false
var nivel = 0
var monedero = 0
var listasombreros = ["./recursos/Tophat.png","./recursos/traffic-cone.png", "./recursos/Tegorra(1).png"]
var listastatuajes = []
var listaaccesorios = ["./recursos/Nat.png"]
var listacara = []
var listavestidor = []
var accesorios = []

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
    gatoquieto = loadAnimation("./recursos/c3.png")
    gatocaminar = loadAnimation("./recursos/c3.png", "./recursos/c2.png", "./recursos/c3.png", "./recursos/c4.png")
    inicio = loadImage("./recursos/inicio1.png")
    piso1 = loadImage("./recursos/piso 1.jpg")
    piso2 = loadImage("./recursos/piso 2.jpg")
    tiendita = loadImage("./recursos/tienda.jpg")
    ecenarios = [piso1, piso2]
    zombi = loadAnimation("./recursos/z2.png", "./recursos/z3.png", "./recursos/z4.png", "./recursos/z5.png", "./recursos/z6.png", "./recursos/z7.png")
    zombicubeta = loadAnimation("./recursos/zo1.png", "./recursos/zo2.png", "./recursos/zo3.png", "./recursos/zo4.png", "./recursos/zo5.png", "./recursos/zo6.png")
    calavera = loadAnimation("./recursos/ghost-jumping.png", "./recursos/ghost-standing.png")
    angel = loadAnimation("./recursos/ga1.png", "./recursos/ga2.png", "./recursos/ga3.png")
    ddode = loadAnimation("./recursos/dd1.png", "./recursos/dd2.png", "./recursos/dd3.png")
    Lucar = loadImage("./recursos/vendedor.png")
    minilucar = loadImage("./recursos/vendedor2.png")
    osocamina = loadAnimation("./recursos/oso_0.png", "./recursos/oso_1.png", "./recursos/oso_2.png", "./recursos/oso_3.png", "./recursos/oso_4.png", "./recursos/oso_5.png")
    osoataca = loadAnimation("./recursos/oso_a1.png", "./recursos/oso_a2.png", "./recursos/oso_a3.png")
    futbolz = loadAnimation("./recursos/zf_0.png", "./recursos/zf_1.png", "./recursos/zf_2.png", "./recursos/zf_3.png", "./recursos/zf_4.png", "./recursos/zf_5.png", "./recursos/zf_6.png", "./recursos/zf_7.png")
    discoZ = loadAnimation("./recursos/zd_0.png", "./recursos/zd_1.png", "./recursos/zd_2.png", "./recursos/zd_3.png", "./recursos/zd_4.png", "./recursos/zd_5.png")
    zombi40 = loadAnimation("./recursos/zombistein_0.png","./recursos/zombistein_1.png","./recursos/zombistein_2.png","./recursos/zombistein_3.png","./recursos/zombistein_4.png","./recursos/zombistein_5.png","./recursos/zombistein_6.png","./recursos/zombistein_7.png")
    suplente = loadAnimation("./recursos/suplente_0.png","./recursos/suplente_1.png","./recursos/suplente_2.png","./recursos/suplente_3.png")
    pistdisc = loadImage("./recursos/pista disco px.png")
    luzdis = loadImage("./recursos/luz pixeleada c.png")
    boladis = loadAnimation("./recursos/boladis_0.png","./recursos/boladis_1.png")
    bolsa = loadImage("./recursos/bolsa.png")
    spincoin = loadAnimation("./recursos/spincoin0.png","./recursos/spincoin1.png","./recursos/spincoin2.png","./recursos/spincoin3.png")
    malosanimaciones = [zombi, zombicubeta, calavera, angel, ddode]
    batalla = loadSound("./batalla.mp3")
    menu = loadSound("./menu.mp3")
    osomusica = loadSound("./osomusica1.mp3")
    futmusica = loadSound("./futzom1.mp3")
    tiendamusica = loadSound("./tienda.mp3")
    discomusica = loadSound("./dancezombie1.mp3")
    zombistainsong = loadSound("./zombie40.mp3")
    gatoataca = loadAnimation("./recursos/ca1.png", "./recursos/ca2.png", "./recursos/ca3.png", "./recursos/ca4.png")
    defeat = loadSound("./defeat.mp3")
    repisaimg = loadImage("./recursos/climber.png")
    flechaimg = loadImage("./recursos/flecha.png")
    sombrero = loadImage("./recursos/Tophat.png")
    gorra = loadImage("./recursos/Tegorra.png");
    pistola = loadImage("./recursos/Nat.png");
    cono = loadImage("./recursos/traffic-cone.png");
    fireinthehole = loadImage("./recursos/fire.png");
    calaca = loadImage("./recursos/calaca.png");
    guitarra = loadImage("./recursos/guitar.png");
    soprendido = loadImage("./recursos/;0.png");
    noselaverda = loadImage("./recursos/pistolaroja.png");
    cara_vencedora = loadImage("./recursos/caraxdd.png");
    ojos_malvados = loadImage("./recursos/malo.png");
    espada_tatuaje = loadImage("./recursos/espada_tatuaje.png");
}

function setup() {
    createCanvas(ancho, alto);
    inicio.resize(ancho, alto)
    tienda = createSprite (ancho / 2, alto * 1.5)
    tiendita.resize(ancho, alto)
    tienda.addImage(tiendita)
    tienda.abierto = false
    fondo = createSprite(ancho / 2, alto / 2)
    fondo.addImage(inicio)
    piso1.resize(ancho, alto)
    piso2.resize(ancho, alto)
    fondo1 = createSprite(ancho / 2, -alto / 2)
    fondo1.addImage(piso1)
    vendedor1 = createSprite(ancho * 0.8, alto*0.7)
    vendedor1.addImage("vendedor1",Lucar)
    vendedor1.addImage("vendedor2",minilucar)
    vendedor1.visible = false
    gato = createSprite(ancho / 2, alto - 95)
    gato.addAnimation("gatoquieto", gatoquieto)
    gato.addAnimation("gatocaminar", gatocaminar)
    gato.addAnimation("gatoataca", gatoataca)
    gato.scale = 1.34
    gato.vida = 13
    cartera=createSprite(ancho*0.8,50)
    cartera.addImage(bolsa)
    cartera.scale = 0.04
    menu.play()
    menu.setVolume(0.4)
    suelo = createSprite(ancho / 2, alto * 0.9 , ancho, 10)
    suelo.visible = false
    bordes = createEdgeSprites()
    enemigos = createGroup()
    jefes = createGroup()
    repisas = createGroup()
    repisasdisco = createGroup()
    ahorro = createGroup()
    disco = createGroup()
    grupodeaccesorios=createGroup()
    declararAccesorios()
    for (let numrepisa = 0; numrepisa < (width / 90); numrepisa++) {
        repisa = createSprite(90 * numrepisa, 5, 50, 20)
        repisa.addImage(repisaimg)
        repisas.add(repisa)
    }
    flecha = createSprite(ancho - 250, alto / 2)
    flecha.addImage(flechaimg)
    flecha.scale = 0.45
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)){
        document.getElementById("celular").style.display="block"
    }
    else {
        document.getElementById("celular").style.display="none"
    }
}

function draw() {
    background(200);
    drawSprites();
    fill("black")
    rect(25, 25, 286, 25)
    fill("red")
    rect(25, 25, gato.vida * 22, 25)
    fill("866c1d")
    textSize(34)
    textStyle(BOLD);
    text(monedero,ancho*0.85,45)
    if (gato.isTouching(bordes[0]) && nivel==0 ) {
        fondo.velocityY = -12
        tienda.velocityY = -12
        nivel--
        
        menu.stop()
        osomusica.stop()
        futmusica.stop()
        discomusica.stop()
        zombistainsong.stop()
        batalla.stop()
        tiendamusica.play()
        tiendamusica.setVolume(0.4)
        document.getElementById("instrucciones").style.display = "none"
        document.getElementById("instrucciones2").style.display = "none"
        document.getElementById("titulo").style.display = "none"
        document.getElementById("stats").style.display = "none"
        gato.visible = false
        gato.x = 20
        flecha.visible = true
        repisas.forEach(element => {
            element.y = height;
            element.velocityY = -12
        });

    }
    if (gato.isTouching(bordes[1]) && enemigos.length == 0 && jefes.length == 0) {
        if(nivel == -1){
            fondo.velocityY = 12
            tienda.velocityY = 12
            vendedor1.visible = false;
            menu.play()
            console.log("deberia verse el menú")
            nivel = 0
        }else{
            fondo.velocityY = 12
            fondo1.velocityY = 12
            nivel++
        }
        if (nivel % 10 != 0) {
            menu.stop()
            tiendamusica.stop()
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
    if (enemigos.length == 0 && jefes.length == 0) {
            flecha.visible = true
    }
    else if (enemigos.length == 0 && jefes.length != 0 && jefes[0].tipo=="zombidis"){
        jefes[0].y=alto-95
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
    if (nivel == -1 && fondo.y<=-alto/2 && tienda.abierto == false){
        tienda.abierto=true
        document.getElementById("productos").style.display = "block"
        if(round(random(0,1))===1){
            vendedor1.changeImage("vendedor1")
            vendedor1.scale = 0.55
            vendedor1.y = alto*0.7
            vendedor1.mirrorX(1)
        }
        else {
            vendedor1.changeImage("vendedor2")
            vendedor1.scale = 0.20
            vendedor1.y = alto*0.75
            vendedor1.mirrorX(-1)
        }
        vendedor1.visible = true;
        fondo.velocityY=0
        tienda.velocityY=0
        gato.visible = true
        repisas.forEach(element => {
            element.velocityY = 0
            element.y = 5
        });
    }
    if (nivel == 0 && tienda.y >= alto * 1.5){
        tienda.abierto = false
        document.getElementById("productos").style.display = "none"
        vendedor1.visible = false;
        fondo.velocityY=0
        tienda.velocityY=0
        gato.visible = true
        document.getElementById("instrucciones").style.display = "block"
        document.getElementById("instrucciones2").style.display = "block"
        document.getElementById("titulo").style.display = "block"
        document.getElementById("stats").style.display = "block"
        tiendamusica.stop()
        repisas.forEach(element => {
            element.velocityY = 0
            element.y = 5
        });
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
           if(jefe.tipo!="zombidis"||jefe.y>alto*0.2){
            perseguir(gato, jefe)
            ataqueespecial(jefe)

           } else{
            jefe.bounceOff(repisasdisco,discmirror)
           }
            
        })
    }
    jefes.forEach(jefe=>{
        if(jefe.tipo=="zombidis"){
            jefe.bounceOff(repisasdisco,discmirror)
        }
        if(jefe.guardarfr+33==frameCount){
            switch(jefe.tipo){
                case "oso":
                    jefe.changeAnimation("caminar")
                    jefe.y=alto-210
                    break
                case "futzom":
                    jefe.invensible=false
                    console.log("no es invencible")
                    perseguir(gato,jefe)
                    break
                case "zombidis":
                    jefe.x=ancho/2
                    jefe.y=alto*0.2
                    crearsuplentes()
            }
            
        }
    })
    grupodeaccesorios.forEach(accesorio => {
        if(accesorio.visible){
            accesorio.y = gato.y + accesorio.yajuste
            accesorio.depth = accesorio.profundidad
            if(gato.mirrorX() == -1){
                accesorio.x = gato.x + accesorio.xajuste
                accesorio.rotation = accesorio.giro
                accesorio.mirrorX(1)
            }else{
                accesorio.x = gato.x - accesorio.xajuste
                accesorio.rotation = - accesorio.giro
                accesorio.mirrorX(-1)
            }
        }
    });
    gato.overlap(enemigos, quitarvida)
    gato.overlap(jefes, quitarvida)
    gato.overlap(ahorro,recolectar)
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
    if (gato.getAnimationLabel() == "gatoataca"&&enemigo.invensible==false) {
        enemigo.vida -= 1.5
        
        if (enemigo.vida <= 0) {
            loot=round(random(0,1))
            if (loot===1){
                banco = (enemigo.tipo === undefined) ? round(random(1,6)) : banco = round(random(25,30));
               for (let index = 0; index < banco; index++) {
                catcoin=createSprite(enemigo.x+random(-10,10),enemigo.y+random(20,45))
                catcoin.addAnimation("spin", spincoin)
                catcoin.scale=0.09
                ahorro.add(catcoin)
               } 
            }
            enemigo.destroy()
            if(enemigo.tipo=="zombidis"){
                disco.destroyEach()
            }
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
        guardarscore()
        document.getElementById("derrota").style.display = "block"
    }
}
function tocarsuelo(gato, suelo) {
    saltando = false
}
function crearmalos() {
    horda = random(3, 11)
    for (var i = 0; i < horda; i++) {
        malo = createSprite(random(ancho * 0.75, ancho * 2.5), alto * 0.8, 50, 50)
        malo.invensible=false

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
function guardarnombre() {
    nickname = document.getElementById("nickname").value
    localStorage.setItem("nickname", nickname);
    document.getElementById("inicio").style.display = "none"
    firebase.database().ref("jugadores/"+nickname).once("value",(datos)=>{
        if (datos.exists()){
            monedero = datos.val()["catcoin"]
            accesorios = datos.val()["accesorios"] ? Object.keys(datos.val()["accesorios"]) : []
            console.log(accesorios);
            if(datos.val()["usar_sombreros"]){
                equipar(datos.val()["usar_sombreros"])
            }
            if(datos.val()["usar_accesorios"]){
                equipar(datos.val()["usar_accesorios"])
            }
            if(datos.val()["usar_tatuajes"]){
                equipar(datos.val()["usar_tatuajes"])
            }
            if(datos.val()["usar_caras"]){
                equipar(datos.val()["usar_caras"])
            }
        }else{
            firebase.database().ref("jugadores/"+nickname).set({
                catcoin: 0
            })
            monedero = 0;
            accesorios = [];
        }
        llenarTienda()
    })
}
function guardarscore() {
    nickname = localStorage.getItem("nickname");
    firebase.database().ref().child("nivel").update({ [nickname]: nivel })
    document.getElementById("inicio").style.display = "none"
    nickname = localStorage.getItem("nickname");
    firebase.database().ref("jugadores/"+nickname).update({
        catcoin: monedero
    })
}
function crearjefe() {
    switch (nivel) {
        case 10:
            oso = createSprite(ancho - 10, alto * 0.85)
            oso.addAnimation("caminar", osocamina)
            oso.addAnimation("ataca", osoataca)
            oso.scale = 2.3
            oso.mirrorX(-1)
            oso.vida = 500
            batalla.stop()
            oso.invensible=false
            oso.tipo="oso"
            jefes.add(oso)
            osomusica.setVolume(1.2)
            break
        case 20:
            futzom = createSprite(ancho - 10, alto * 0.8)
            futzom.addAnimation("caminar", futbolz)
            futzom.scale = 1.3
            futzom.vida = 185
            futzom.mirrorX(1)
            batalla.stop()
            osomusica.stop()
            futmusica.setVolume(0.7)
            futzom.invensible=false
            futzom.tipo="futzom"
            jefes.add(futzom)
            break
        case 30:
            zombidis = createSprite(ancho/2, alto * 0.8)
            zombidis.addAnimation("caminar", discoZ)
            zombidis.scale = 1.3
            zombidis.vida = 300
            batalla.stop()
            discomusica.setVolume(0.7)
            zombidis.invensible=false
            zombidis.tipo="zombidis"
            crearsuplentes()
            repisa_nivel30 = createSprite((ancho*0.43), alto*0.35)
            repisa_nivel30.depth=10
            repisa_nivel30.scale=2
            repisa_nivel30.addImage(pistdisc)
            disco.add(repisa_nivel30)
            repisa_nivel30=createSprite(ancho*0.3,alto*0.3,10,50)
            repisa_nivel30.addImage(luzdis)
            repisa_nivel30.scale=0.2
            repisa_nivel30.mirrorX(-1)
            repisasdisco.add(repisa_nivel30)
            disco.add(repisa_nivel30)
            repisa_nivel30=createSprite(ancho*0.3+90*4,alto*0.3,10,50)
            repisa_nivel30.addImage(luzdis)
            repisa_nivel30.scale=0.2
            repisasdisco.add(repisa_nivel30)
            disco.add(repisa_nivel30)
            boladisco=createSprite(ancho/2-30,alto*0.1)
            boladisco.depth=10
            boladisco.addAnimation("disco",boladis)
            boladisco.scale=0.3
            zombidis.velocityX=5
            disco.add(boladisco)
            jefes.add(zombidis)
            break
        case 40:
            zombistein = createSprite(ancho + 2350, alto - 250)
            zombistein.addAnimation("caminar", zombi40)
            zombistein.scale = 2.5
            zombistein.vida = 600
            batalla.stop()
            zombistein.invensible=false
            zombistein.tipo="zombistein"
            jefes.add(zombistein)
            zombistainsong.setVolume(1.2)
            break
        


    }
    ataquesorpresa=int(random(1,2))
    ataquetimer=0
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
        case -1:
            if (!tiendamusica.isPlaying()) {
                tiendamusica.play()
            }
            break;
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
        menu.stop()
        tiendamusica.stop()
        batalla.stop()
        osomusica.stop()
        futmusica.stop()
        discomusica.stop()
        zombistainsong.stop()
    }
}
function ataqueespecial(jefe){
    ataquetimer++
    if(ataquetimer==ataquesorpresa){
        switch(jefe.tipo){
            case "oso":
                jefe.changeAnimation("ataca")
                
                jefe.y=alto-270
                break
            case "futzom":
                if(jefe.velocityX>0){
                    jefe.velocityX=16
                }
                else{
                    jefe.velocityX=-16
                }
                jefe.invensible=true
        }
        jefe.guardarfr=frameCount
        ataquesorpresa=int(random(2,4))
        console.log("ataque hecho")
        ataquetimer=0
    }
}
function crearsuplentes() {
    horda = random(4, 8)
    for (var i = 0; i < horda; i++) {
        malo = createSprite(random(ancho * 0.2, ancho-10), alto - 95, 50, 50)
        malo.invensible=false
        malo.addAnimation("caminar", suplente)
        malo.scale = 1.5
        malo.vida = 12
        enemigos.add(malo)
    }
}
function discmirror(zombidis,repisa){
    if(zombidis.velocityX>0){
        zombidis.mirrorX(1)
    }
    else{
        zombidis.mirrorX(-1)
    }
}
function derecha() {
    if (gato.getAnimationLabel() != "gatoataca") {
        gato.x += 6
        gato.changeAnimation("gatocaminar", gatocaminar)
        gato.mirrorX(-1)
    }
}
function izquierda(){
if (gato.getAnimationLabel() != "gatoataca") {
    gato.x -= 6
    gato.changeAnimation("gatocaminar", gatocaminar)
    gato.mirrorX(1)

}
}
function arriba() {
   if (!saltando) {
        gato.velocityY = -17
        saltando = true
        gato.changeAnimation("gatocaminar", gatocaminar)
        gato.mirrorX(1)
    } 
}

function atack() {
    if (gato.getAnimationLabel() != "gatoataca") {
        gato.changeAnimation("gatoataca", gatoataca)
        gato.animation.looping = false
        gato.animation.changeFrame(0)

    }
}
class Item{
    constructor(){
        this.nombre = "";
        this.imagen = "";
        this.precio = 0;
        this.mensaje = "";
        this.ajusteX = 0;
        this.ajusteY = 0;
    }
}
//{nombre:"",precio:0,imagen:"",mensaje:"",categoria:"",escala:"1",x:0,y:0,giro:0,profundidad:6},
listadeitems =[
    {nombre:"sombrero",precio:60,imagen:"./recursos/Tophat.png",mensaje:": este sombrero le pertenecio a un ex lider de una mafia .... no sabemos como llego aqui",categoria:"sombreros",escala:"1.04",x:0,y:-50,giro:0,profundidad:4},
    {nombre:"gorra",precio:150,imagen:"./recursos/Tegorra.png",mensaje:": algo muy FATAL",categoria:"sombreros",escala:"0.25",x:0,y:-30,giro:-10,profundidad:6},
    {nombre:"pistola",precio:100,imagen:"./recursos/Nat.png",mensaje:": es solo una simple pistola de airsoft, ¿porque te emocionas al verla?",categoria:"accesorios",escala:"0.2",x:-50,y:35,giro:90,profundidad:6},
    {nombre:"cono",precio:30,imagen:"./recursos/traffic-cone.png",mensaje:": este es un simple cono de trafico, supestamente le pertenecia a un asesino sereal pero ...... ¿porque te asustas amigo es solo un rumor?",categoria:"sombreros",escala:"0.3",x:-20,y:-48,giro:-20,profundidad:6},
    {nombre:"fireinthehole",precio:333,imagen:"./recursos/fire.png",mensaje:"FIRE IN THE HOLE  🗣🗣🔥🔥🔥",categoria:"caras",escala:"0.3",x:0,y:0,giro:0,profundidad:6},
    {nombre:"calaca",precio:50,imagen:"./recursos/calaca.png",mensaje:": este es el simbolo de una organizacion militar ",categoria:"tatuajes",escala:"0.14",x:20,y:22,giro:35,profundidad:6},
    {nombre:"guitarra",precio:120,imagen:"./recursos/guitar.png",mensaje:": Se dice que el alma de su dueño original sigue atrapada dentro de esta… es bonita pero no sabes tocar guitarra….y ni siquiera tienes pulgares así que no la puedes usar",categoria:"accesorios",escala:"1",x:0,y:0,giro:0,profundidad:6},
    {nombre:"soprendido",precio:20,imagen:"./recursos/;0.png",mensaje:": no puede ser :0",categoria:"caras",escala:"1",x:0,y:0,giro:0,profundidad:6},
    {nombre:"cara_vencedora",precio:500,imagen:"./recursos/caraxdd.png",mensaje:": bye bye",categoria:"caras",escala:"1",x:0,y:0,giro:0,profundidad:6},
    {nombre:"ojos_malvados",precio:1000,imagen:"./recursos/malo.png",mensaje:": al ponerte estos ojos sientes una presencia malvada recorriendio por tu espalda",categoria:"caras",escala:"1",x:0,y:0,giro:0,profundidad:6},
    {nombre:"espada_tatuaje",precio:350,imagen:"./recursos/espada_tatuaje.png",mensaje:": El tatuaje esta chido ............ ¿!LO VAS A COMPRAR O NO¡?",categoria:"tatuajes",escala:"1",x:0,y:0,giro:0,profundidad:6},
    {nombre:"noselaverda",precio:500,imagen:"./recursos/pistolaroja.png",mensaje:"no se la verda, deje pregunto que poner",categoria:"accesorios",escala:"0.1",x:-44,y:10,giro:270,profundidad:6},
    //{nombre:"",precio:0,imagen:"",mensaje:"",categoria:"",escala:"1",x:0,y:0,giro:0,profundidad:6},
    //{nombre:"",precio:0,imagen:"",mensaje:"",categoria:"",escala:"1",x:0,y:0,giro:0,profundidad:6},
]
function llenarTienda() {
    espacios_ocupados = 0
    for (let index2 = 0; index2 < listadeitems.length; index2++) {
        const itemdisponible = listadeitems[index2];
        if(espacios_ocupados < 7 && !accesorios.includes(itemdisponible.nombre)){
            document.getElementById("producto" + (espacios_ocupados + 1)).src = itemdisponible.imagen
            document.getElementById("producto" + (espacios_ocupados + 1)).addEventListener("click", () => {
                comprar(itemdisponible.nombre)
            });
            espacios_ocupados++
        }
    }
}
function comprar(eleccion){
    item = listadeitems.find(producto => producto.nombre === eleccion)
    if(item !== undefined){
        Swal.fire({
            title: "Estas seguro de esta compra?",
            text: "Compraras:"+item.nombre+" por "+item.precio+" catcoins"+item.mensaje ,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            imageUrl: item.imagen,
            icon: "info",
            confirmButtonText: "Si, comprar"
        }).then((result) => {
            if (result.isConfirmed) {
                if (monedero >= item.precio) {
                    monedero = monedero - item.precio
                    firebase.database().ref("jugadores/"+nickname+"/accesorios/").update({
                        [item.nombre]:1
                    })
                    firebase.database().ref("jugadores/"+nickname).update({
                        catcoin: monedero
                    })
                    Swal.fire({
                        title: "Comprado",
                        text: "Pruebatelo en el vestidor",
                        icon: "success"
                    });
                }else{
                    Swal.fire({
                        title: "Sin catcoins",
                        text: "No tienes suficientes catcoins",
                        icon: "error"
                    });
                }
            }
        });
    }
}
function recolectar(gato,catcoin){
    catcoin.destroy()
    monedero++
}
function mostrarvestidor() {
    document.getElementById("vestidor").style.display="block"
}
function ocultarvestidor() {
    document.getElementById("vestidor").style.display="none"
    document.getElementById("categorias").style.display="flex"
    document.getElementById("objetos").style.display="none"
    document.getElementById("vestidor").style.backgroundImage="url(./recursos/purplewall.jpg)"
    vestidor = []
    for (let index = 1; index < 7; index++) {
        document.getElementById("tarjeta"+index).style.backgroundImage="url()"
        
    }
}
function elegircategoria(categoria) {
    document.getElementById("categorias").style.display="none"
    document.getElementById("objetos").style.display="flex"
    document.getElementById("vestidor").style.backgroundImage="url(./recursos/purplewall.png)"
    vestidor = listadeitems.filter(producto => producto.categoria === categoria && accesorios.includes(producto.nombre))
    cambiarImagenTarjeta("tarjeta1",vestidor[0]);
    currimg = 0;
    contador = 1;
    currdeg = 0;
    carousel.style.transform = "rotateY("+currdeg+"deg)";
    cambiarImagenTarjeta("tarjeta" + contador,vestidor[currimg]);
}
var carousel = document.getElementById("carousel");
var currdeg = 0;
var currimg = 0;
var contador = 1;
function cambiar(direccion){
    if(direccion == "siguiente"){
      currdeg-=60;
      currimg++;
      contador++;
      if(contador >= 7){
          contador = 1;
          if(currimg >= vestidor.length){
            curimg = 0;
          }
      }
    }
    if(direccion == "atras"){
        currdeg+=60;
        currimg--;
        contador--;
        if(currimg < 0){
            currimg = vestidor.length - 1
        }
        if(contador < 1){
            contador = 6
        }
    }
    carousel.style.transform = "rotateY("+currdeg+"deg)";
    if (vestidor[currimg]){
        cambiarImagenTarjeta("tarjeta" + contador,vestidor[currimg]);
       
    }
}
function cambiarImagenTarjeta(id,producto){
    if(producto){
        document.getElementById("seleccionar").value=producto.nombre;
        document.getElementById("quitar").value=producto.nombre;
        document.getElementById(id).style.backgroundImage = "url("+producto.imagen+")"
        document.getElementById(id).style.backgroundRepeat = "no-repeat";
        document.getElementById(id).style.backgroundSize = "contain";
        document.getElementById("seleccionar").style.visibility = "visible"
        document.getElementById("quitar").style.visibility = "visible"
    }
    else{
        document.getElementById("seleccionar").style.visibility = "hidden"
        document.getElementById("quitar").style.visibility = "hidden"

    }
}

function seleccionar(){
    probar=document.getElementById("seleccionar").value
    console.log(probar);
    ItemAs=listadeitems.find(Item=>Item.nombre===probar)
    eval("usar_"+ItemAs.categoria).addImage(eval(ItemAs.nombre))
    eval("usar_"+ItemAs.categoria).visible=true
    eval("usar_"+ItemAs.categoria).scale = ItemAs.escala
    eval("usar_"+ItemAs.categoria).nombre = ItemAs.nombre
    eval("usar_"+ItemAs.categoria).xajuste = ItemAs.x
    eval("usar_"+ItemAs.categoria).yajuste = ItemAs.y
    eval("usar_"+ItemAs.categoria).giro = ItemAs.giro
    eval("usar_"+ItemAs.categoria).profundidad = ItemAs.profundidad
    firebase.database().ref("jugadores/"+nickname).update({
        ["usar_" + ItemAs.categoria]:ItemAs.nombre
    })
}
function equipar(objeto) {
    ItemAs=listadeitems.find(Item=>Item.nombre===objeto)
    eval("usar_"+ItemAs.categoria).addImage(eval(ItemAs.nombre))
    eval("usar_"+ItemAs.categoria).visible=true
    eval("usar_"+ItemAs.categoria).scale = ItemAs.escala
    eval("usar_"+ItemAs.categoria).nombre = ItemAs.nombre
    eval("usar_"+ItemAs.categoria).xajuste = ItemAs.x
    eval("usar_"+ItemAs.categoria).yajuste = ItemAs.y
    eval("usar_"+ItemAs.categoria).giro = ItemAs.giro
    eval("usar_"+ItemAs.categoria).profundidad = ItemAs.profundidad
}
//index = listaaccesorios.findIndex(x => x.nombre ==="sombrero")
function declararAccesorios(){
    usar_sombreros=createSprite(gato.x,gato.y)
    usar_sombreros.visible=false
    usar_sombreros.nombre=""
    usar_sombreros.xajuste=0
    usar_sombreros.yajuste=0
    usar_sombreros.giro=0
    usar_sombreros.profundidad=0
    grupodeaccesorios.add(usar_sombreros)
    usar_accesorios=createSprite(gato.x,gato.y)
    usar_accesorios.visible=false
    usar_accesorios.nombre=""
    usar_accesorios.xajuste=0
    usar_accesorios.yajuste=0
    usar_accesorios.giro=0
    usar_accesorios.profundidad=0
    grupodeaccesorios.add(usar_accesorios)
    usar_tatuajes=createSprite(gato.x,gato.y)
    usar_tatuajes.visible=false
    usar_tatuajes.nombre=""
    usar_tatuajes.xajuste=0
    usar_tatuajes.yajuste=0
    usar_tatuajes.giro=0
    usar_tatuajes.profundidad=0
    grupodeaccesorios.add(usar_tatuajes)
    usar_caras=createSprite(gato.x,gato.y)
    usar_caras.visible=false
    usar_caras.nombre=""
    usar_caras.xajuste=0
    usar_caras.yajuste=0
    usar_caras.giro=0
    usar_caras.profundidad=0
    grupodeaccesorios.add(usar_caras)
}
function quitar(){
    probar=document.getElementById("quitar").value
    ItemAs=listadeitems.find(Item=>Item.nombre===probar)
    eval("usar_"+ItemAs.categoria).visible=false
    firebase.database().ref("jugadores/"+nickname).update({
        ["usar_" + ItemAs.categoria]:null
    })
}