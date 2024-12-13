console.log("YELLO")

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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gravity = 0.8;
    const player = {
      x: 100,
      y: canvas.height - 100,
      width: 50,
      height: 50,
      color: 'red',
      dx: 0,
      dy: 0,
      speed: 5,
      jumpStrength: -15,
      onGround: false
    };

    const platforms = [
      { x: 50, y: canvas.height - 50, width: 200, height: 20 },
      { x: 300, y: canvas.height - 150, width: 150, height: 20 },
      { x: 600, y: canvas.height - 250, width: 200, height: 20 }
    ];

    const keys = {
      left: false,
      right: false,
      space: false
    };

    function drawPlayer() {
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function drawPlatforms() {
      ctx.fillStyle = 'green';
      platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      });
    }

    function handleInput() {
      if (keys.left) player.dx = -player.speed;
      else if (keys.right) player.dx = player.speed;
      else player.dx = 0;

      if (keys.space && player.onGround) {
        player.dy = player.jumpStrength;
        player.onGround = false;
      }
    }

    function updatePlayer() {
      player.x += player.dx;
      player.y += player.dy;
      player.dy += gravity;

      if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
        player.onGround = true;
      }

      platforms.forEach(platform => {
        if (
          player.x < platform.x + platform.width &&
          player.x + player.width > platform.x &&
          player.y + player.height < platform.y + 10 &&
          player.y + player.height + player.dy >= platform.y
        ) {
          player.y = platform.y - player.height;
          player.dy = 0;
          player.onGround = true;
        }
      });
    }

    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function gameLoop() {
      clearCanvas();
      handleInput();
      updatePlayer();
      drawPlayer();
      drawPlatforms();
      requestAnimationFrame(gameLoop);
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