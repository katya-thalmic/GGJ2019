const LEFT_KEY = "a";
const RIGHT_KEY = "d";
const UP_KEY = "w";
const DOWN_KEY = "s";

let input = {
    left: false,
    right: false,
    up: false,
    down: false,
};

function setKeyState(key, down) {
    if(key == LEFT_KEY) {
        input.left = down;
    } else if(key == RIGHT_KEY) {
        input.right = down;
    } else if(key == UP_KEY) {
        input.up = down;
    } else if(key == DOWN_KEY) {
        input.down = down;
    }
}

window.addEventListener("keydown", function(e) {
    setKeyState(e.key, true);
});

window.addEventListener("keyup", function(e) {
    setKeyState(e.key, false);
});
