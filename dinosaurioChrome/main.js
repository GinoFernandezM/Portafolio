let time = new Date();
let deltaTime =  0;

let groundY = 22;
let groundX = 0;
let velY = 0;
let gravity = 2500;
let impulse = 900;
let dinoPosX = 42;
let dinoPosY = groundY;
let velEsc =   1280/3;
let gameVel = 1;
let score = 0;
let stop = false;
let jumping = false;


var container;
var ground;
var textScore;
var dino;
var gameOver;


let timeObstacle = 2;
let timeObstacleMin = 0.7;
let timeObstacleMax = 1.8;
let obstaclePosY = 16;
let obstacle = []; 

if(document.readyState === "complete" || document.readyState === "interactive"){
    setTimeout(Init, 1);
}else{
    document.addEventListener("DOMContentLoaded", Init); 
}

function Init(){
    time = new Date();
    Start();
    Loop();
}

function Loop(){
    deltaTime = (new Date() - time)/1000;
    time = new Date();
    Update();
    requestAnimationFrame(Loop);
}

function Start(){
    container = document.querySelector(".container");
    ground = document.querySelector(".ground");
    textScore = document.querySelector(".score");
    dino = document.querySelector(".dino");
    document.addEventListener('keydown',handleKeydown)
    gameOver = document.querySelector(".gameOver");
}

function handleKeydown(e){
    if(e.keyCode == 32){
        jump();
    }
}

function jump(){
    if(dinoPosY === groundY){
        jumping = true;
        velY = impulse;
        dino.classList.remove("dinoRun");
    }
}

function Update(){

    if(stop) {
        return;
    }
    moveGround();
    moveDino();
    createObs();
    moveObs();
    isColision();

    velY -= gravity * deltaTime;
}

function moveGround(){
    groundX += calDesp();
    ground.style.left = -(groundX % container.clientWidth) + "px";

}

function calDesp(){
    return velEsc * deltaTime * gameVel;
}

function moveDino(){
    dinoPosY += velY * deltaTime;
    if( dinoPosY < groundY){
        touchGround();
    }   
    dino.style.bottom = dinoPosY+"px" 
}

function touchGround(){
    dinoPosY = groundY;
    velY = 0;
    if(jumping){
        dino.classList.add("dinoRun");
    }
    jumping = false;
}

function createObs(){
    timeObstacle -= deltaTime;
    if(timeObstacle <= 0 ){
        createPlant();
    }
}

function createPlant(){
    let plant = document.createElement("div");
    container.appendChild(plant);
    plant.classList.add("cactus");
    plant.posX = container.clientWidth;
    plant.style.left = container.clientWidth+"px";

    obstacle.push(plant);
    timeObstacle = timeObstacleMin + Math.random() * (timeObstacleMax-timeObstacleMin) / gameVel;
}

function moveObs(){
    for(let i = obstacle.length -1; i>0; i--){
        if(obstacle[i].posX < -obstacle[i].clientWidth){
            obstacle[i].parentNode.removeChild(obstacle[i]);
            obstacle.splice(i,1);
            addScore();
        }else{
            obstacle[i].posX -= calDesp();
            obstacle[i].style.left = obstacle[i].posX+"px";
        }
    }
}

function addScore(){
    score++;
    textScore.innerText = score;    
}

function isColision(){
    for(let i=0; i<obstacle.length;i++){
        if(obstacle[i].posX > dinoPosX + dino.clientWidth){
            //break;
            
        }else{
            if(trueColision(dino, obstacle[i], 10, 30, 15, 20)){
                console.log("siii")
                gameOverf();
                //location.reload();
            }
        }
    }
}

function trueColision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();

    return !(
        ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
        (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
        (aRect.left + paddingLeft > (bRect.left + bRect.width))
    ); 
}


function gameOverf(){
    dash();
    gameOver.style.display = "block";  
}

function dash(){
    dino.classList.remove("dinoRun");
    dino.classList.add("dinoDash");
    stop = true;
}