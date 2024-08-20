let currentMoleTile;
let CurrentPlantTile;
let score = 0;
let gameover = false;

const gameoverSound = new Audio("./assets/sound-effects/game-over-arcade.mp3");
const punch = new Audio("./assets/sound-effects/punch.wav");
const hightScore = new Audio("./assets/sound-effects/arcade-hight-score.wav");

// Preload audio files
gameoverSound.preload = "auto";
punch.preload = "auto";
hightScore.preload = "auto";


// Make game harder every each 100 points
let n = 1;
function updateSpeed(){
    if(score/100 == n){
        n++;
        hightScore.play();

    }
}

window.onload = function() {
    setGame();
}

function setGame() {
    for(let i=0; i < 9; i++){
        let tile = document.createElement("div");
        tile.id =  i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById('board').appendChild(tile);
    }
    setInterval(setMole, 800);
    setInterval(setPlant, 1200);
}

function getRandomTile(){
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}


function setMole(){
    if(gameover){
        return;
    }
    if(currentMoleTile){
        currentMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./assets/monty-mole.png";
    let num = getRandomTile();
    if(currentMoleTile && CurrentPlantTile.id == num){
        return;
    }
    currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole);
}

function setPlant(){
    if(gameover){
        return;
    }
    if(CurrentPlantTile){
        CurrentPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./assets/piranha-plant.png";
    
    let num = getRandomTile();
    if(currentMoleTile && currentMoleTile.id == num){
        return;
    }
    CurrentPlantTile = document.getElementById(num);
    CurrentPlantTile.appendChild(plant);
}

function selectTile(){
    if(gameover){
        return;
    }
    if(this == currentMoleTile){
        punch.play();
        score += 10;
        updateSpeed();
        currentMoleTile.innerHTML = "";
        document.getElementById('score').innerText = score.toString();
    } else if(this == CurrentPlantTile){
        gameoverSound.play();
        document.getElementById('score').innerText = "Game Over!";
        gameover = true;
        
        let button = document.createElement("button");
        button.innerText = "Play Again";
        button.addEventListener("click", restartGame);
        document.getElementById('score').appendChild(button);
    }
}

function restartGame(){
    gameover = false;
    score = 0;
    document.getElementById('score').innerText = score.toString();
    document.getElementById('board').innerHTML = "";
    setGame();
}