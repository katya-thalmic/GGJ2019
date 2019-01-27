const BULLET_MOVE_SPEED = 10;

let bullets = [];
let bulletImageLeft = null;
let bulletImageRight = null;
let bulletImageUp = null;
let bulletImageDown = null;

function initBullets() {
    loadImage("assets/bullet_left.png", function(image) {
        bulletImageLeft = image;
    });
    loadImage("assets/bullet_right.png", function(image) {
        bulletImageRight = image;
    });
    loadImage("assets/bullet_up.png", function(image) {
        bulletImageUp = image;
    });
    loadImage("assets/bullet_down.png", function(image) {
        bulletImageDown = image;
    });
}

function createBullet(x, y, direction) {
    let bullet = {
        x: x,
        y: y,
        direction: direction,
        life: 120
    }

    if(host) {
        socket.emit("create bullet", x, y, direction);
    }

    bullets.push(bullet);

    return bullet;
}

function removeBullet(index) {
    bullets.splice(index, 1);

    if(host) {
        socket.emit("remove bullet", index);
    }
}

function handleBulletState(index, x, y) {
    bullets[index].x += (x - bullets[index].x) * 0.4;
    bullets[index].y += (y - bullets[index].y) * 0.4;
}

function updateBullets() {
    for(let i = 0; i < bullets.length; ++i) {
        if (bullets[i].life == 0){
            removeBullet(i);
        } else {
            if (bullets[i].direction == DIR_LEFT) {
                bullets[i].x -= BULLET_MOVE_SPEED;
            }
            else if (bullets[i].direction == DIR_RIGHT) {
                bullets[i].x += BULLET_MOVE_SPEED;
            }
            else if (bullets[i].direction == DIR_UP) {
                bullets[i].y -= BULLET_MOVE_SPEED;
            }
            else if (bullets[i].direction == DIR_DOWN) {
                bullets[i].y += BULLET_MOVE_SPEED;
            }

            bullets[i].life -=1;
        }
    }
}

function drawBullets(cam) {
    for(let i = 0; i < bullets.length; ++i) {
        let bullet = bullets[i];
        if (bullet.direction === DIR_UP) {
            ctx.drawImage(bulletImageUp, bullet.x - cam.x, bullet.y - cam.y);
        } else if (bullet.direction === DIR_DOWN) {
            ctx.drawImage(bulletImageDown, bullet.x - cam.x, bullet.y - cam.y);
        } else if (bullet.direction === DIR_LEFT) {
            ctx.drawImage(bulletImageLeft, bullet.x - cam.x, bullet.y - cam.y);
        } else if (bullet.direction === DIR_RIGHT) {
            ctx.drawImage(bulletImageRight, bullet.x - cam.x, bullet.y - cam.y);
        } else {
            throw "Couldn't match bullet to direction";
        }
    }
}

function sendBullets() {
    for(let i = 0; i < bullets.length; ++i) {
        socket.emit("bullet state", i, bullets[i].x, bullets[i].y);
    }
}
