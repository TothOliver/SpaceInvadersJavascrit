//JAVASCRIPT
/* globals window document alert*/

var canvas;
var ctx;
var event;
var game = true;

var score = 0;
var n = 4000;

var x = 350;
var y = 675;
var ey = -35;
var ex = 0;
var right = true;
var speed = 0.4;

var bullets = [];
var bullet;

var aliens = [];
var a = {
    x: 70,
    y: 70,
    r: 30
};
var aRow = 10;
var aColumn = 4;

var player = {
    x: x,
    y: 700,
    r: 25
};

function init() {
    canvas = document.getElementById("myGame");
    ctx = canvas.getContext('2d');
    canvas.addEventListener("mousemove", function() {
        moveX(event, canvas);
    });
    
    canvas.addEventListener("click", function(){
        addBullet();
    });
    spawnAliens();
  
}
window.addEventListener("load", init);
window.requestAnimationFrame(draw);


function draw(){
    if(canvas.getContext){
        ctx.clearRect(0,0,750,750);

        for(var k=0; k<bullets.length; k++){
            bullets[k].y -= 8;
            ctx.fillStyle = "#fff";
            ctx.rect(bullets[k].x, bullets[k].y, bullets[k].w, bullets[k].h);
            ctx.fill();
            if(bullets[k].y <= 0){
                bullets.shift();
            }
        }
        
        ctx.fillStyle = "#9D1C8E";
        ctx.beginPath();
        ctx.arc(x, player.y, player.r, 0, Math.PI * 2);
        ctx.fill();
        
        for(var i = 0; i<aliens.length; i++){
            ctx.fillStyle = "#1c9d2b";
            ctx.beginPath();
            ctx.arc(aliens[i].x + ex, aliens[i].y + ey, aliens[i].r, 0, Math.PI * 2);
            ctx.fill();
        }

    }
    moveEnenmies();
    collision();
    checkAliens();
    gameOver();
    var scoreBoard = document.getElementById("score");
    scoreBoard.innerHTML = "Score: " + score;
    window.requestAnimationFrame(draw);
}

function moveX(event, canvas){
    var rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
}

function addBullet(){
    bullet = {
        x: x,
        y: y,
        w: 5,
        h: 15
    };
    bullets.push(bullet);
}

function moveEnenmies(){
    if(ex <= 20 && right == true){
        ex += speed;
    }if(ex >= 20){
        right = false;
        ey += 5;
    }
    if(ex >= -40 && right == false){
        ex-=speed;
    }if (ex <= -40){
        right = true;
        ey += 5;
    }
}

function collision(){
    var index;
    var collide = false;
    for(var i = 0; i<aliens.length; i++){
        for(var j = 0; j<bullets.length; j++){
            if(bullets[j].y >= aliens[i].y + ey -30 && bullets[j].y <= aliens[i].y + ey + 30 && bullets[j].x >= aliens[i].x +ex - 30 && bullets[j].x <= aliens[i].x + ex + 30){
                bullets.shift();
                index = i;
                collide = true;
            }
        }
    } 
    if(collide){
        aliens.splice(index, 1);
        score += 100;            
        collide = false;
    }
}

function spawnAliens(){
    if(game){
        for(var i = 1; i <= aRow; i++){
            for(var j = 1; j <= aColumn; j++){
                a = {
                    x: 70*i,
                    y: 70*j,
                    r: 30
                };               
                aliens.push(a);
            } 
        }
    }
}

function checkAliens(){
    if(score == n){
        ey = 0;
        speed+=0.2;
        spawnAliens();  
        
        score += 1000;
        n = score + 4000;
    }
}

function gameOver(){
    for(var i = 0; i<aliens.length; i++){
        if(aliens[i].y + ey >= 700){
            alert("Game Over, refresh to start over"); 
            game = false;
            aliens.splice(0, aliens.length);
        }
    }
}
