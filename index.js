const cvs = /** @type {HTMLCanvasElement} */ (document.getElementById("snake"));
const ctx = cvs.getContext("2d");

let box = 32;

const ground = new Image();
ground.src="images/ground.png";

/*ground.onload = function(){
    ctx.drawImage(ground,0,0);   
}
*/
const foodPic = new Image();
foodPic.src="images/food.png";

/*foodPic.onload = function(){
    ctx.drawImage(foodPic,0,0);   
}*/

const dead= new Audio();
dead.src="  Audio/dead.mp3";
const eat= new Audio();
eat.src="  Audio/eat.mp3";
const move= new Audio();
move.src="  Audio/move.mp3";

let snake=[];
snake[0]={
    x: 9*box ,
    y: 10*box
};

let food={
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box
}

let score =0, d;
let highscore = localStorage.getItem("highscore");

document.addEventListener("keydown", direction);
function direction(event){
    move.play();

    if(event.keyCode==37 && d!="RIGHT"){
        d="LEFT";
    }
    else if(event.keyCode==38 && d!="DOWN"){
        d="UP";
    }
    else if(event.keyCode==39 && d!="LEFT"){
        d="RIGHT";
    }
    else if(event.keyCode==40 && d!="UP"){
        d="DOWN";
    }
}

function collision(newHead, snake){
    for(let i=0;i<snake.length ;i++){
        if(snake[i].x == newHead.x && snake[i].y == newHead.y)
            return true;
    }
    return false;
}


function draw(){
    ctx.drawImage(ground, 0, 0);

    for(let i=0;i<snake.length;i++){ 

    ctx.fillStyle=(i==0)?"green":"white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle="red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodPic, food.x, food.y);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if(headX==food.x && headY==food.y){ 
        eat.play();
        score++;
        food={
            x: Math.floor(Math.random()*17+1) * box,
            y: Math.floor(Math.random()*15+3) * box
        }        
    }
    else{ 
    snake.pop();
    }

    if(d=="LEFT"){
        headX-=box;
    }
    else if(d=="RIGHT"){
        headX+=box;
    }
    else if(d=="UP"){
        headY-=box;
    }
    else if(d=="DOWN"){
        headY+=box;
    }

    let newHead={
        x: headX,
        y: headY
    }

    if(headX<box || headX>(17*box) || headY<(3*box) || headY>(17*box) || collision(newHead, snake))
    {
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);

    ctx.fillStyle="white";
    ctx.font="40px Oswald";
    ctx.fillText(score, 3*box, 1.6*box);
    ctx.fillText("MaxScore: "+highscore, 12*box, 1.6*box);

    if(highscore !== null){
        if (score > highscore) {
            localStorage.setItem("highscore", score);      
        }
    }
    else{
        localStorage.setItem("highscore", score);
    }

}


let game = setInterval(draw,200);