/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);
const numberOfEnemies = 50;
const enimies = [];
let gameFrame = 0;

// const enemyImage = new Image();
// enemyImage.src = '../enemies/enemy1.png'

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "../enemies/enemy2.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (CANVAS_WIDTH - this.width);
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 7;
  }
  update() {
    // this.x += Math.random() * 5 - 2.5;
    // this.y += Math.random() * 5 - 2.5;
    this.x -= this.speed;
    this.y += this.curve * Math.cos(this.angle)
    this.angle += this.angleSpeed;
    if(this.x + this.width < 0) this.x = CANVAS_WIDTH
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let i = 0; i < numberOfEnemies; i++) {
  let enemy = new Enemy();
  enimies.push(enemy);
}

console.log(enimies);

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enimies.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
