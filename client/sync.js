let host = false;

let socket = io("ws://localhost:8080");

socket.on("host", function() {
    host = true;
});

socket.on("set player id", function(id) {
    // Declared in players.js
    myPlayerID = id;
});

socket.on("player joined", function(id) {
    console.log("Hello " + id);
    createPlayer(id, 300, 300);
});

socket.on("player input", handleInput);

socket.on("player state", handlePlayerState);

socket.on("create bullet", createBullet);
socket.on("remove bullet", removeBullet);

socket.on("bullet state", handleBulletState);

socket.on("set item quantity", setItemQuantity);
socket.on("set selected item", setSelectedItem);

socket.on("player left", function(id) {
    removePlayer(id);
    console.log("Goodbye " + id);
});