window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
function onKeyDown(event) {setKeys(true, event.keyCode)}
function onKeyUp(event) {setKeys(false, event.keyCode)}

function setKeys(toggle, keyCode) {
    for (const key in PlayerControls) {
        if (Object.hasOwnProperty.call(PlayerControls, key)) {
            const data = PlayerControls[key];
            if (data.key === keyCode) {
                PlayerControls[key].toggle = toggle;
                break;
            }
        }
    }
}

//Player Variables
var PlayerPosition = {x: 10, y: 10}
const PlayerControls = {
    "w" : {
        "key" : 87,
        "toggle" : false,
    },
    "a" : {
        "key" : 65,
        "toggle" : false,
    },
    "s" : {
        "key" : 83,
        "toggle" : false,
    },
    "d" : {
        "key" : 68,
        "toggle" : false,
    },
    "shift" : { //todo
        "key" : 0,
        "toggle" : false,
    }
}

function isOutsideOfCanvas(pos) { //todo
    return false;
}

function main() {
    window.requestAnimationFrame(main);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(PlayerPosition.x, PlayerPosition.y, 100, 100);

    let newPosition = {x: PlayerPosition.x, y: PlayerPosition.y}

    if (PlayerControls["w"].toggle == true) {
        newPosition.y--;
    }
    if (PlayerControls["a"].toggle == true) {
        newPosition.x--;
    }
    if (PlayerControls["s"].toggle == true) {
        newPosition.y += 1;
    }
    if (PlayerControls["d"].toggle == true) {
        newPosition.x += 1;
    }

    if (!isOutsideOfCanvas(newPosition)) {
        PlayerPosition = newPosition
    }
}
window.requestAnimationFrame(main);
