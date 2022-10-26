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
var PlayerPosition = {x: 656, y: 400}
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
    "shift" : {
        "key" : 16,
        "toggle" : false,
    },
    "space" : {
        "key" : 32,
        "toggle" : false,
    }
}
const playerStep = 2
var playerSpeed = 1

//Walls
const Walls = {
    "outer" : {
        "wall" : {
            "from" : [10, 10],
            "to" : [600, 10]
        },
        
        "window" : {
            "from" : [600, 10],
            "to" : [700, 10]
        },
        
        "wall" : {
            "from" : [700, 10],
            "to" : [1200, 10]
        },
        
    }
}

function isOutsideOfCanvas(pos) {
    let canvas = document.getElementById("canvas");
    if (pos.x < 0 || pos.x > (canvas.width - 100) || pos.y < 0 || pos.y > (canvas.height - 100)) {
        return true;
    } else {
        return false;
    }
}

function main() {
    window.requestAnimationFrame(main);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(PlayerPosition.x, PlayerPosition.y, 100, 100);

    for (const key in Walls) {
        if (Object.hasOwnProperty.call(Walls, key)) {
            const step = Walls[key];
            for (const key in step) {
                if (Object.hasOwnProperty.call(step, key)) {
                    const steps = step[key];
                    if (key == "wall") {
                        ctx.lineWidth = 2
                    } else if (key == "window"){
                        ctx.lineWidth = 1
                    }
                    ctx.beginPath(); // Start a new path
                    ctx.moveTo(steps.from[0], steps.from[1]); // Move the pen to (30, 50)
                    ctx.lineTo(steps.to[0], steps.to[1]); // Draw a line to (150, 100)
                    ctx.stroke(); // Render the path
                }
            }
            
        }
    }

    let newPosition = {x: PlayerPosition.x, y: PlayerPosition.y}

    if (PlayerControls["shift"].toggle == true) {
        playerSpeed = 2
    } else if (PlayerControls["space"].toggle == true) {
        playerSpeed = 0.5
    } else {
        playerSpeed = 1
    }

    if (PlayerControls["w"].toggle == true) {
        newPosition.y -= (playerStep * playerSpeed);
    }
    if (PlayerControls["a"].toggle == true) {
        newPosition.x -= (playerStep * playerSpeed);
    }
    if (PlayerControls["s"].toggle == true) {
        newPosition.y += (playerStep * playerSpeed);
    }
    if (PlayerControls["d"].toggle == true) {
        newPosition.x += (playerStep * playerSpeed);
    }

    if (!isOutsideOfCanvas(newPosition)) {
        PlayerPosition = newPosition
        console.log(PlayerPosition)
    }
}
window.requestAnimationFrame(main);
