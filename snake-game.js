// let eat = new Audio("eating.mp3");
// let eat2 = new Audio("eating2.mp3");
// let over = new Audio("gameOver.mp3");
// const pianoMusic = new Audio("pianoMusic.mp3");
// pianoMusic.play();

function eating() {

    // eat2.play();
};
function GameOver() {
    // over.play();
}

let myshapeSlider = document.getElementById("shapeSlider");
let myRange1 = document.getElementById("Range1");
let myRadius = myshapeSlider.value;

myRange1.textContent = myshapeSlider.value;
myshapeSlider.oninput = function () {
    myRange1.textContent = this.value;
    myRadius = myshapeSlider.value;
    changeMyRect();
    // console.log(myRadius);
};
let myshapeSlider2 = document.getElementById("shapeSlider2");
let myRange2 = document.getElementById("Range2");
let framerate = 100 - (myshapeSlider2.value * 10);

myRange2.textContent = myshapeSlider2.value;
myshapeSlider2.oninput = function () {
    myRange2.textContent = this.value;
    framerate = 100 - (this.value * 10);
};

let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

// let secondWidth = document.getElementById("Second").width;
// let secondHeight = document.getElementById("Second").height;

// console.log(secondWidth);
// console.log(secondHeight);

canvas.width = Math.floor(Math.floor(window.innerWidth * 0.78) / 25) * 25;
canvas.height = Math.floor(Math.floor(window.innerHeight * 0.99) / 25) * 25;

let secondWidth = (window.innerWidth * 0.8) - canvas.width;
let secondHeight = (window.innerHeight) - canvas.height;

// canvas.style.marginLeft = (secondWidth) / 2 + "px";
canvas.style.marginRight = (secondWidth) / 2 + "px";
// canvas.style.marginTop = (secondHeight) / 2 + "px";
// canvas.style.marginBottom = (secondHeight) / 2 + "px";

document.getElementById("First").style.paddingLeft = (secondWidth) / 4 + "px";
document.getElementById("First").style.paddingRight = (secondWidth) / 6 + "px";
// document.getElementById("First").style.paddingTop = (secondHeight) / 2 - 1 + "px";

document.getElementById("FirstOuterBox").style.height = canvas.height + "px";

// document.getElementById("mybody").style.width = window.innerWidth + "px";
// document.getElementById("mybody").style.height = window.innerHeight + "px";
// document.getElementById("MYGAME").style.marginTop = window.innerHeight / 6 - canvas.height / 6 + "px";
// document.getElementById("reset").style.width = (window.innerWidth) * 0.1 + "px";
// document.getElementById("reset").style.height = (window.innerHeight) * 0.06 + "px";

let headColor = "#333D79FF";

// let headColor = "rgb(0, 83, 150)";
// let headColor = "#0B4B59";
// let headColor = "#00203FFF";
// let bodyColor = "rgb(191,215,236)";
// let bodyColor = "#D5F2ED";
// let bodyColor = "#9CC3D5FF";
// let bodyColor = "#ADEFD1FF";
let bodyColor = "#FCF6F5FF";
let foodColor = "red";
let score = 0;
let Myarray = [];
let Velocityx = 0;
let Velocityy = 0;

class Myrect {
    constructor(x, y, color, Velocityx, Velocityy) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.Velocityx = Velocityx;
        this.Velocityy = Velocityy;
    }

    draw() {
        context.beginPath();
        context.roundRect(this.x, this.y, 25, 25, [myRadius, myRadius, myRadius, myRadius]);
        context.fillStyle = this.color;
        context.fill();
        // context.strokeStyle = "#333D79FF";
        context.strokeStyle = "black";
        context.stroke();
        context.closePath();
    };
};
let interval;

addEventListener("keydown", (event) => {

    let key = event.keyCode;
    let up = 38;
    let down = 40;
    let left = 37;
    let right = 39;

    if (Velocityy == 0 && Velocityx != 0) {
        if (up == key) {
            Velocityy = -Math.abs(Velocityx);
            Velocityx = 0;
        }
        if (down == key) {
            Velocityy = Math.abs(Velocityx);
            Velocityx = 0;
        }
    }
    else if (Velocityx == 0 && Velocityy != 0) {
        if (left == key) {
            Velocityx = -Math.abs(Velocityy);
            Velocityy = 0;
        }
        if (right == key) {
            Velocityx = Math.abs(Velocityy);
            Velocityy = 0;
        }
    }
    else if (Velocityx == 0 && Velocityy == 0) {
        if (right == key) {
            Velocityx = 25;
            Velocityy = 0;
        }
        if (up == key) {
            Velocityy = -25;
            Velocityx = 0;
        }
        if (down == key) {
            Velocityy = 25;
            Velocityx = 0;
        }
        interval = setInterval(Gamestart, framerate);
    }
});


Myarray.push(new Myrect(50, 25, headColor, Velocityx, Velocityy));
Myarray.push(new Myrect(25, 25, bodyColor, Velocityx, Velocityy));
Myarray.push(new Myrect(0, 25, bodyColor, Velocityx, Velocityy));

Myarray[0].draw();
Myarray[1].draw();
Myarray[2].draw();

let x = 0;
let y = 0;
function generatefood() {

    x = Math.floor(Math.floor(Math.random() * (canvas.width - 25)) / 25) * 25;
    y = Math.floor(Math.floor(Math.random() * (canvas.height - 25)) / 25) * 25;

    for (let i = 0; i < Myarray.length; i++) {
        if (Myarray[i].x == x && Myarray[i].y == y) {
            x = Math.floor(Math.floor(Math.random() * (canvas.width - 25)) / 25) * 25;
            y = Math.floor(Math.floor(Math.random() * (canvas.height - 25)) / 25) * 25;

            i = 0;
        }
    }

}
generatefood();
let foodArray = [];
foodArray.push(new Myrect(x, y, foodColor, 0, 0));
foodArray[0].draw();

function collide() {
    for (let i = 1; i < Myarray.length; i++) {
        if (Myarray[0].x == Myarray[i].x && Myarray[0].y == Myarray[i].y) {
            return true;
        }
    }
    return false;
}

let getreset = document.getElementById("reset");
getreset.addEventListener("click", getStartedByClicking);
addEventListener('keydown', (event) => {
    // console.log(event);
    if (event.key == "Enter") {
        getStartedByClicking();
    }
});

function getStartedByClicking() {
    clearInterval(interval);

    // transform: translate(0px, 5px);

    document.getElementById("reset").style.transform = "translate(0px, 5px)";
    document.getElementById("reset").style.visibility = "hidden";
    while (Myarray.length > 0)
        Myarray.pop();
    Myarray.push(new Myrect(50, 25, headColor, Velocityx, Velocityy));
    Myarray.push(new Myrect(25, 25, bodyColor, Velocityx, Velocityy));
    Myarray.push(new Myrect(0, 25, bodyColor, Velocityx, Velocityy));

    context.clearRect(0, 0, canvas.width, canvas.height);
    Myarray[0].draw();
    Myarray[1].draw();
    Myarray[2].draw();

    score = 0;
    document.getElementById("score").textContent = score;
    generatefood();
    foodArray.pop();
    foodArray.push(new Myrect(x, y, foodColor, 0, 0));
    foodArray[0].draw();

    Velocityx = 0;
    Velocityy = 0;
};

// getreset.addEventListener("click", function () {
//     clearInterval(interval);

//     document.getElementById("reset").style.visibility = "hidden";
//     while (Myarray.length > 0)
//         Myarray.pop();
//     Myarray.push(new Myrect(50, 25, headColor, Velocityx, Velocityy));
//     Myarray.push(new Myrect(25, 25, bodyColor, Velocityx, Velocityy));
//     Myarray.push(new Myrect(0, 25, bodyColor, Velocityx, Velocityy));

//     context.clearRect(0, 0, canvas.width, canvas.height);
//     Myarray[0].draw();
//     Myarray[1].draw();
//     Myarray[2].draw();

//     score = 0;
//     document.getElementById("score").textContent = score;
//     generatefood();
//     foodArray.pop();
//     foodArray.push(new Myrect(x, y, foodColor, 0, 0));
//     foodArray[0].draw();

//     Velocityx = 0;
//     Velocityy = 0;


// });

context.font = "60px cursive";
let gameoverstring = "game over";
let gameoverstringWidth = context.measureText(gameoverstring).width;

function gameover() {

    clearInterval(interval);
    context.fillStyle = "deeppink";
    context.fillText("game over", canvas.width / 2 - gameoverstringWidth / 2, canvas.height / 2);
    document.getElementById("reset").style.visibility = "visible";
    GameOver();
};
function Gamestart() {

    Myarray[0].color = bodyColor;
    Myarray.unshift(new Myrect(Myarray[0].x + Velocityx, Myarray[0].y + Velocityy, bodyColor, Velocityx, Velocityy));
    Myarray[0].color = headColor;

    if (collide()) {
        gameover();
        clearInterval(interval);
        return;
    }

    if (Myarray[0].x == foodArray[0].x && Myarray[0].y == foodArray[0].y) {
        generatefood();
        foodArray.pop();
        foodArray.push(new Myrect(x, y, foodColor, 0, 0));
        score++;
        document.getElementById("score").textContent = score;
        eating();
    }
    else {
        Myarray.pop();
    }

    if (Myarray[0].y == -25 && Velocityy < 0) {
        gameover();
        clearInterval(interval);
        return;
    }
    if (Myarray[0].x == canvas.width && Velocityx > 0) {
        gameover();
        clearInterval(interval);
        return;
    }
    if (Myarray[0].y == canvas.height && Velocityy > 0) {
        gameover();
        clearInterval(interval);
        return;
    }
    if (Myarray[0].x == -25 && Velocityx < 0) {
        gameover();
        clearInterval(interval);
        return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    foodArray[0].draw();
    Myarray.forEach(element => {
        element.draw();
    });

};

