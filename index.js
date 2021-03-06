var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;
var x = canvas.width/2;
var y = canvas.height/2;
var boxX = canvas.width/2;
var boxY = canvas.height - 3*canvas.height/32;
var boxW = 3*canvas.width/32;
var boxH = 3*canvas.height/32;
var count = 0;
var play = true;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "p"){
        rightPressed = false;
        leftPressed = false;
        upPressed = false;
        downPressed = false;
        play = !play;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
}

function drawEnarc(){
    ctx.beginPath();
    var img = new Image();
    var img1 = new Image();
    var img2 = new Image();
    img.src = "images/CraneBase.png";
    img1.src = "images/CraneArm.png";
    img2.src = "images/CraneBox.png";
    ctx.drawImage(img, canvas.width - 2*canvas.width/8, 0, canvas.width/8, canvas.height);
    ctx.drawImage(img1, 0, 0, canvas.width, canvas.height/8);
    ctx.drawImage(img2, canvas.width - 5*canvas.width/16, canvas.height/8, 3*canvas.width/16, 100)
    ctx.closePath();
}

function drawArm(){
    ctx.beginPath();
    ctx.rect(x, 3*canvas.height/32, canvas.width/64, y);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    if(rightPressed && x < canvas.width - 3*canvas.width/8) {
        x += 2;
    }
    else if(leftPressed && x > canvas.width/16) {
        if(y < 5*canvas.height/8 - boxH || x > 3*canvas.width/16 + boxW/2){
            x -= 2;
        }
    }
    else if(upPressed && y > canvas.height/8){
        y -= 2;
    }
    else if(downPressed && y < canvas.height - 3*boxH/2){
        if(y < 5*canvas.height/8 - boxH - 2 || x > 3*canvas.width/16 + boxW/2){
            y += 2;
        }
    }
}

function drawPlatform(){
    ctx.beginPath();
    var imgSite = new Image();
    imgSite.src = "images/Site.png";
    ctx.drawImage(imgSite, 0, 5*canvas.height/8, 3*canvas.width/16, 3*canvas.height/8);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.closePath();
}

function drawBox(){
    ctx.beginPath();
    var imgBox = new Image();
    imgBox.src = "images/Box.png";
    ctx.drawImage(imgBox, boxX, boxY, boxW, boxH);
    ctx.fillStyle = "brown";
    ctx.fill();
    ctx.closePath();
    if(x < boxX + boxW && x > boxX && y > boxY - 5*boxY/64){
        boxX = x - boxW/2 + canvas.width/128;
        boxY = y;
    }
    if(boxX < canvas.width/32 + boxW/2 && boxY == 5*canvas.height/8 - boxH-2){
        boxX = canvas.width/2;
        boxY = canvas.height - 3*canvas.height/32;
        count += 1;
    }
}

function autoPlay(){
    rightPressed = false;
    leftPressed = false;
    upPressed = false;
    downPressed = false;
    if(boxX != x - boxW/2 + canvas.width/128 && boxY != y){
        if(x <= boxX + boxW/3){
            rightPressed = true;
        }
        else if(x >= boxX + 2*boxW/3){
            leftPressed = true;
        }
        else if(y < boxY){
            downPressed = true;
        }
    }
    else{
        if(y > 5*canvas.height/8 - boxH - 2){
            upPressed = true;
        }
        else if(x > 3*canvas.width/32){
            leftPressed = true;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawEnarc();
    drawArm();
    drawPlatform();
    drawBox();
    ctx.font = '48px serif';
    ctx.fillText('Boxes Delivered: ' + count.toString(), canvas.width/64, 3*canvas.height/16);
    if(play){
        autoPlay();
    }
}

var interval = setInterval(draw, 10);