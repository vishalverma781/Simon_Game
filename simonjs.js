let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

//sound.....
let endSound = document.querySelector(".endSound");
let gameOverSound = function () {
    endSound.play();
}
let btnsSound = document.querySelector(".btnSound")
let btnSound = function () {
    btnsSound.play();
}
let sbtnSound = document.querySelector(".sbtnSound")
let startbtnSound = function () {
    sbtnSound.play();
}

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game is started");
        started = true;

        levelUp();
    }
});

//Start game.....
let startbtn = document.querySelector(".start"); 
startbtn.addEventListener("click",function(){        
    if(started == false){
        console.log("game is started");
        started = true;   
        startbtn.innerText = "End"; 
        startbtn.style.backgroundColor = "red"   
        levelUp();
        startbtnSound();
               
    }else{
        startbtn.style.backgroundColor = "blue"   
        startbtn.innerText = "Start";
        startbtnSound();
        reset()
    }
});

//button flash function.....
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },250);
    btnSound();
    
}

//userflash function.....
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    },250)
    
}

// levelUp function.....
function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() *4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq)
    gameFlash(randomBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000)
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press Start Button To Start`;
        gameOverSound();
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn")
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

//function reset.....
function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    startbtn.innerText = "Start"
}