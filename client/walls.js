let walls = [];
let wallImage01 = null;
let wallImage02 = null;
let wallImage03 = null;
let sideWall01 = null;
let sideWall02 = null;
let sideWall03 = null;

function initWalls() {
    loadImage("assets/wall01.png", function(image) {
        wallImage01 = image;
    });
    loadImage("assets/wall02.png", function(image) {
        wallImage02 = image;
    });
    loadImage("assets/wall03.png", function(image) {
        wallImage03 = image;
    });
    loadImage("assets/sidewall01.png", function(image) {
        sideWall01 = image;
    });
    loadImage("assets/sidewall02.png", function(image) {
        sideWall02 = image;
    });
    loadImage("assets/sidewall02.png", function(image) {
        sideWall03 = image;
    });
}

function createWall(x, y, direction, life) {
    let wall = {
        x: x,
        y: y,
        direction: direction,
        life: 3,
        rect: {
            x: 0,
            y: 0,
            w: 32,
            h: 32
        }
    }

    if(host) {
        socket.emit("create wall", x, y, direction, life);
    }

    walls.push(wall);

    return wall;
}

function removeWall(index) {
    walls.splice(index, 1);
}

function setWallLife(index, life) {
    walls[index].life = life;
    if (walls[index].life === 0) {
        removeWall(index);
    }

    if(host) {
        socket.emit("set wall life", index, life)
    }
}

function drawWalls(cam) {
    for(let i = 0; i < walls.length; ++i) {
        let wall = walls[i];
        if (wall.life == 3){
            if (wall.direction == DIR_UP || wall.direction == DIR_DOWN){
                ctx.drawImage(wallImage01, wall.x - cam.x, wall.y - cam.y);
            } else if (wall.direction == DIR_LEFT || wall.direction == DIR_RIGHT){
                ctx.drawImage(sideWall01, wall.x - cam.x, wall.y - cam.y);
            }
        }
        else if (wall.life == 2 ){
            if (wall.direction == DIR_UP || wall.direction == DIR_DOWN){
                ctx.drawImage(wallImage02, wall.x - cam.x, wall.y - cam.y);
            } else if (wall.direction == DIR_LEFT || wall.direction == DIR_RIGHT){
                ctx.drawImage(sideWall02, wall.x - cam.x, wall.y - cam.y);
            }
        }
        else if (wall.life == 1 ){
            if (wall.direction == DIR_UP || wall.direction == DIR_DOWN){
                ctx.drawImage(wallImage03, wall.x - cam.x, wall.y - cam.y);
            } else if (wall.direction == DIR_LEFT || wall.direction == DIR_RIGHT){
                ctx.drawImage(sideWall03, wall.x - cam.x, wall.y - cam.y);
            }
        }
    }
}

