// collision detection between two rectangle
var rect1 = { x: 5, y: 5, width: 50, height: 50 };
var rect2 = { x: 20, y: 10, width: 10, height: 10 };

const checkCollisionBetweenRects = (rect1, rect2) => {
    if(rect1.x > rect2.x + rect2.width ||
       rect1.x + rect1.width < rect2.x ||
       rect1.y > rect2.y + rect2.height ||
       rect2.y + rect2.height < rect2.y
    ){
        return 'no collision';
    } else {
        return 'collision detected';
    }
}
// collision detection between two rectangle

// collision detection between two circles
var circle1 = {x: 200, y: 200, radius: 100};
var circle2 = { x: 350, y: 200, radius: 50 };

const checkCollisionBetweenCircles = (circle1, circle2) => {
    let dx = circle2.x - circle1.x;
    let dy = circle2.y - circle1.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let sumOfRadius = circle1.radius + circle2.radius;

    if(distance < sumOfRadius){
        return 'circle collide';
    } else if (distance === sumOfRadius){
        return 'circles are touching';
    } else if (distance > sumOfRadius){
        return 'no collision';
    }
}
// collision detection between two circles