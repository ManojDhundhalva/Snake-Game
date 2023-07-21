let canvas1 = document.getElementById("designShape");
let context1 = canvas1.getContext("2d");
changeMyRect();
function changeMyRect() {
    context1.clearRect(0, 0, canvas1.width, canvas1.height);
    context1.beginPath();
    context1.roundRect(window.innerWidth / 17, canvas1.height / 5, 100, 100, [myRadius * 4, myRadius * 4, myRadius * 4, myRadius * 4]);
    // context1.fillStyle = "#B388EB";
    context1.fillStyle = "#333D79FF";
    // context1.fillStyle = "#FCF6F5FF";
    // context1.fillStyle = "#8ABAD3FF";
    context1.fill();
    context1.stroke();
    context1.closePath();
};

document.getElementById("reset").style.top = window.innerHeight / 2 + 5 + "px";
// document.getElementById("reset").style.left = window.innerWidth / 2 + (window.innerWidth / 12) - (window.innerWidth / 100) + "px";
document.getElementById("reset").style.left = window.innerWidth * 0.92 / 5 + canvas.width / 2 + "px";