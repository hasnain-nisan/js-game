const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = './shadow_dog.png'
const spriteWidth = 575;
const spriteHeight = 523;
let playerState = 'idle';
let gameFrame = 0;
const staggerFrame = 4;

const spriteAnimations = [];
const animationStates = [
  {
    name: "idle",
    frmaes: 7,
  },
  {
    name: "jump",
    frmaes: 7,
  },
  {
    name: "fall",
    frmaes: 7,
  },
  {
    name: "run",
    frmaes: 9,
  },
  {
    name: "dizzy",
    frmaes: 11,
  },
  {
    name: "sit",
    frmaes: 5,
  },
  {
    name: "roll",
    frmaes: 7,
  },
  {
    name: "bite",
    frmaes: 7,
  },
  {
    name: "ko",
    frmaes: 12,
  },
  {
    name: "hit",
    frmaes: 4,
  },
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frmaes; j++) {
        const positionX = j * spriteWidth;
        const positionY = index * spriteHeight;
        frames.loc.push({
            x: positionX,
            y: positionY
        })
    }
    spriteAnimations[state.name] = frames;
})

function animate() {
    ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);
    let position =
      Math.floor(gameFrame / staggerFrame) %
      spriteAnimations[playerState].loc.length;
    frameX = spriteWidth * position;
    frameY = spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(
      playerImage,
      frameX,
      frameY,
      spriteWidth,
      spriteHeight,
      0,
      0,
      CANVAS_HEIGHT,
      CANVAS_WIDTH
    );

    
    gameFrame++;

    requestAnimationFrame(animate);
}

animate()

const changePlayerState = (val) => {
    playerState = val;
}

console.log(ctx);