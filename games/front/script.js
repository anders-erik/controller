

let counter = document.getElementById('counter')

let leftBtn = false;
let rightBtn = false;
let jumpBtn = false;

electronAPI.onButtonString((buttonString) => {
    // console.log("buttonString =", buttonString);
    leftBtn = buttonString[0] === 'a' ? false : true;
    rightBtn = buttonString[1] === 'a' ? false : true;
    jumpBtn = buttonString[2] === 'a' ? false : true;

    // document.getElementById('left').innerHTML = leftBtn ? 1 : 0;
    // document.getElementById('right').innerHTML = rightBtn ? 1 : 0;
    // document.getElementById('jump').innerHTML = jumpBtn ? 1 : 0;

    keys.left = leftBtn ? 1 : 0;
    keys.right = rightBtn ? 1 : 0;
    keys.space = jumpBtn ? 1 : 0;
})

electronAPI.onUpdateCounter((value) => {
    counter = document.getElementById('counter')
    const oldValue = Number(counter.innerText)
    const newValue = oldValue + value
    counter.innerText = newValue.toString()
    window.electronAPI.counterValue(newValue)
})





const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth-30;
canvas.height = window.innerHeight-30;

const gravity = 0.8;

let playing = true; // flag to pause gameplay

const player = {
    x: 100,
    y: canvas.height - 100,
    width: 40,
    height: 40,
    color: 'blue',
    vx: 0,
    vy: 0,
    speed: 5,
    jumpStrength: -15,
    onGround: false
};

const platforms = [
    { x: 50, y: canvas.height - 50, width: 200, height: 20 },
    { x: 300, y: canvas.height - 150, width: 150, height: 20 },
    { x: 600, y: canvas.height - 250, width: 200, height: 20 },
    { x: 300, y: canvas.height - 350, width: 200, height: 20 },
    { x: 0,   y: canvas.height - 450, width: 150, height: 20 },
    { x: 300, y: canvas.height - 550, width: 200, height: 20 }
];

const enemies = [
    {x: canvas.height*0/5, y: canvas.height*0/5, width: 35, height: 35 },
    {x: canvas.height*1/5, y: canvas.height*1/5, width: 35, height: 35 },
    {x: canvas.height*2/5, y: canvas.height*2/5, width: 35, height: 35 },
    {x: canvas.height*3/5, y: canvas.height*3/5, width: 35, height: 35 },
    {x: canvas.height*4/5, y: canvas.height*4/5, width: 35, height: 35 },
    {x: canvas.height*5/5, y: canvas.height*5/5, width: 35, height: 35 },
]

const keys = {
    left: false,
    right: false,
    space: false
};


function gameLoop() {
    if(!playing)
        gameRestartCheck();

    clearCanvas();
    handleInput();
    if(playing){
        updatePlayer();
        updateEnemies();
    }
    checkEnemyCollisions();
    drawPlayer();
    drawPlatforms();
    drawEnemies();
    requestAnimationFrame(gameLoop);
}

function gameRestartCheck(){
    if(keys.left && keys.right){
        document.getElementById("lost-div").style.display = "none"
        document.getElementById("won-div").style.display = "none"
        playing = true;
        // requestAnimationFrame(gameLoop);
        resetPlayer();
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function drawPlayer() {
    ctx.fillStyle = player.color;
    // ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillRect(canvas.width/2, canvas.height/2, player.width, player.height);
}

function drawPlatforms() {
    ctx.fillStyle = 'green';
    platforms.forEach(platform => {
        // ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        ctx.fillRect(platform.x+canvas.width/2-player.x, platform.y +canvas.height/2 - player.y, platform.width, platform.height);
    });
}

function drawEnemies() {
    ctx.fillStyle = 'red';
    enemies.forEach(enemy => {
        // ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        ctx.fillRect(enemy.x+canvas.width/2-player.x, enemy.y +canvas.height/2 - player.y, enemy.width, enemy.height);
        // ctx.ellipse(enemy.x+canvas.width/2-player.x, enemy.y +canvas.height/2 - player.y, enemy.width, enemy.height,0, 0, 2*Math.PI);
        
    });
}

function handleInput() {
    if (keys.left) player.vx = -player.speed;
    else if (keys.right) player.vx = player.speed;
    else player.vx = 0;

    if (keys.space && player.onGround) {
        player.vy = player.jumpStrength;
        player.onGround = false;
    }
}

function resetPlayer() {
    player.y = canvas.height - 100;
    player.x = 100;
    player.vy = 0;
    player.onGround = false;
    player.color = "blue";
}

function updateEnemies(){
    enemies.forEach(enemy => {
        enemy.x += 10;
        if(enemy.x > canvas.width)
            enemy.x = -canvas.width
    });
}
function checkEnemyCollisions(){
    enemies.forEach(enemy => {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            // resetPlayer();
            // console.log("LOST??");
            
            lost()
        }
        });
}

function updatePlayer() { 
    player.x += player.vx;
    player.y += player.vy;
    player.vy += gravity;

    // Fell down
    if (player.y + player.height > canvas.height + 500) {
        resetPlayer()
    }

    // won
    if (player.y < 0) {
        won()
    }

    platforms.forEach(platform => {
    if (
        player.x < platform.x + platform.width &&
        player.x + player.width > platform.x &&
        player.y + player.height < platform.y + 10 &&
        player.y + player.height + player.vy >= platform.y
    ) {
        player.y = platform.y - player.height;
        player.vy = 0;
        player.onGround = true;
    }
    });
}


function lost(){
    // cancelAnimationFrame();
    document.getElementById("lost-div").style.display = "flex";
    playing = false;
    
}

function won(){
    // cancelAnimationFrame();
    document.getElementById("won-div").style.display = "flex";
    playing = false;
    
}


window.addEventListener('keydown', e => {
    if (e.code === 'ArrowLeft') keys.left = true;
    if (e.code === 'ArrowRight') keys.right = true;
    if (e.code === 'Space') keys.space = true;
});

window.addEventListener('keyup', e => {
    if (e.code === 'ArrowLeft') keys.left = false;
    if (e.code === 'ArrowRight') keys.right = false;
    if (e.code === 'Space') keys.space = false;
});

gameLoop();