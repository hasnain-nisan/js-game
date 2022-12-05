const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);
let gameFrame = 0;

class Enemy {
  constructor({x, y}) {
    this.image = new Image();
    this.image.src = "../enemies/enemy4.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 213;
    this.spriteHeight = 213;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    // this.x = Math.random() * (CANVAS_WIDTH - this.width);
    // this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.x = x;
    this.y = y;
    this.newX = Math.random() * (CANVAS_WIDTH - this.width);
    this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.interval = Math.floor(Math.random() * 200 + 50);
  }
  movement() {
    if (this.x + this.width < 0) this.x = CANVAS_WIDTH;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  update(newX, newY) {
    if (gameFrame % this.interval === 0) {
      this.newX = Math.random() * (CANVAS_WIDTH - this.width);
      this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
    }
    // if(newX && newY){
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx/20 ;
        this.y -= dy/20 ;
        
    // }
  }
  draw({x, y}) {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      x,
      y,
      this.width,
      this.height
    );
  }
}

let enemy = null;

// function animate({x, y}) {
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     // enemy.update();
//     enemy.draw({ x: 7, y: 7 });
//     gameFrame++;
//     requestAnimationFrame(animate);
// }

// animate({x: 7, y: 7})

canvas.addEventListener("click", (event) => {
    console.log('asa');
    enemy = new Enemy({x: event.offsetX, y: event.offsetY});
    enemy.draw({x: event.offsetX, y: event.offsetY});
    let position = localStorage.getItem("position");
    if(!position){
        localStorage.setItem(
          "position",
          JSON.stringify({ x: event.offsetX, y: event.offsetY })
        );
    } else {
        localStorage.setItem(
          "newPosition",
          JSON.stringify({ x: event.offsetX, y: event.offsetY })
        );
    }
});

setInterval(() => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = JSON.parse(localStorage.getItem('position'));
    let newPosition = JSON.parse(localStorage.getItem("newPosition"));
    let dx = position.x - newPosition.x;
    let dy = position.y - newPosition.y;
    let x = dx / 20;
    let y = dy / 20;
    localStorage.setItem(
      "position",
      JSON.stringify({ x: x, y: y })
    );
    if(enemy){
        // enemy.update(newPosition.x, newPosition.y)
        if(!newPosition) {
            enemy.draw({ x: position.x, y: position.y })
        } else {
             enemy.draw({ x: position.x, y: position.y });
        }
        enemy.movement();
        gameFrame++;
    }
}, 10)
