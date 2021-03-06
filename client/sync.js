let socket;

function registerSocketCallbacks() {
    socket.on("host", function () {
        host = true;
        console.log("I AM ALMIGHTY HOST");
    });

    socket.on("unhost", function () {
        host = false;
        console.log("I HAVE BEEN DETHRONED FROM HOSTITUDE");
    });

    socket.on("set player id", function (id) {
        // Declared in players.js
        myPlayerID = id;

        if (host) {
            initHost();
        }
    });

socket.on("player joined", function (id, isProtector) {
    console.log("Hello " + id);
    let spawnPoint = getSpawnPoint(isProtector);
    createPlayer(id, spawnPoint.x, spawnPoint.y, isProtector);
    if (host && id != myPlayerID) {
        sendSnapshot();
    }
});

socket.on("player input", handleInput);

    socket.on("player state", handlePlayerState);

    socket.on("create bullet", createBullet);
    socket.on("remove bullet", removeBullet);

    socket.on("bullet state", handleBulletState);

    socket.on("set item quantity", setItemQuantity);
    socket.on("set wall life", setWallLife);
    socket.on("create wall", createWall);
    socket.on("set selected item", setSelectedItem);

    socket.on("create resource", createResource);
    socket.on("set resource life", setResourceLife);

    socket.on("create bomb", createBomb);
    socket.on("remove bomb", removeBomb);

    socket.on("create explosion", createExplosion);

    socket.on("create item", createItem);
    socket.on("remove item", removeItem);

    socket.on("create punch", createPunch);

    socket.on("set hearth life", setHearthLife);
    socket.on("set hearth magic wood", setHearthMagicWood);

    socket.on("set player role", function(id, isProtector, first) {
        for(let i = 0; i < players.length; ++i) {
            if(players[i].id == id) {
                players[i].isProtector = isProtector;

                let newPos = getSpawnPoint(players[i].isProtector, first);

                players[i].x = newPos.x;
                players[i].y = newPos.y;
            }
        }
    });

    socket.on("player left", function (id) {
        removePlayer(id);
        console.log("Goodbye " + id);
    });
}

function sendSnapshot() {
    socket.emit("snapshot", {
        bullets: bullets,
        walls: walls,
        resources: resources,
        bombs: bombs,
        items: items,
        hearthLife: HEARTH.life,
        hearthMagicWood: HEARTH.magicWood
    });
}
