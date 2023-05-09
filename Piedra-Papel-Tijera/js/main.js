let puntosUsuario=0;
let puntosPC=0;

const instrucciones = document.querySelector('.instrucciones');
const puntosJugador = document.querySelector('#puntosJugador');
const constenedorPuntosPC = document.querySelector('#puntosPC');
const contenedorGanastePunto = document.querySelector('#ganastePunto')
const resultado = document.querySelector('.resultado')
const eleccionJ = document.querySelector(".eleccion-jugador");
const eleccionCom = document.querySelector(".eleccion-computadora")
const btnReiniciar = document.querySelector(".reinicio")
const btnArma = document.querySelectorAll('.arma');
const elegirArmas = document.querySelector(".elegir-armas");

btnArma.forEach(boton => {
    boton.addEventListener('click',iniciarTurno);
});

function iniciarTurno(e){
    let eleccionPC = Math.floor(Math.random()*3);
    let eleccionUsu = e.currentTarget.id;
    

    if(eleccionPC === 0){
        eleccionPC = "piedra 🪨";
    }
    else if(eleccionPC === 1){
        eleccionPC = "papel 📄";
    }
    else{
        eleccionPC = "tijera ✂️";
    }

    if( eleccionUsu === "piedra 🪨" && eleccionPC === "tijera ✂️" ||
        eleccionUsu === "papel 📄" && eleccionPC === "piedra 🪨"  ||
        eleccionUsu === "tijera ✂️" && eleccionPC === "papel 📄" 
    ){
        ganaUsuario();
        
        console.log('gana usuario')
    }else if(eleccionUsu === "tijera ✂️" && eleccionPC === "piedra 🪨" ||
    eleccionUsu === "piedra 🪨" && eleccionPC === "papel 📄"  ||
    eleccionUsu === "papel 📄" && eleccionPC === "tijera ✂️"
    ){
        ganaPC();
        console.log('gana PC');
    }else {
        empate();
        console.log('empate');
    }

    resultado.classList.remove('disabled')
    eleccionJ.innerText = eleccionUsu;
    eleccionCom.innerText = eleccionPC;

    if(puntosUsuario === 5 || puntosPC === 5){
        if(puntosUsuario === 5){
            instrucciones.innerText = "🥳🥳 !GANASTE EL JUEGO! 🥳🥳"
        }
        if(puntosPC === 5){
            instrucciones.innerText = "😔😔 !PERDISTE EL JUEGO! 😔😔"
        }
        elegirArmas.classList.add("disabled");
        btnReiniciar.classList.remove("disabled")
        btnReiniciar.addEventListener("click",reiniciarJuego);
    }
    
    
}


function reiniciarJuego(){
    puntosUsuario = 0;
    puntosPC = 0;
    puntosJugador.innerText =  0;
    constenedorPuntosPC.innerText = 0;
    instrucciones.innerText = 'El primero en llegar a 5 puntos gana'
    btnReiniciar.classList.add("disabled")
    elegirArmas.classList.remove("disabled")
    resultado.classList.add("disabled")
}

function ganaUsuario(e){
    puntosUsuario++;
    puntosJugador.innerText =  puntosUsuario;
    contenedorGanastePunto.innerText = '!Ganaste un punto! 👌'
}

function ganaPC(){
    puntosPC++;
    constenedorPuntosPC.innerText = puntosPC;
    contenedorGanastePunto.innerText = '!La Computadora gano un punto! 🥲'
}

function empate(){
    contenedorGanastePunto.innerText = '!empate! 😦'
}




