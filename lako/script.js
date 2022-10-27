//Key detection
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
function onKeyDown(event) {setKeys(true, event.keyCode)}
function onKeyUp(event) {setKeys(false, event.keyCode)}

function setKeys(toggle, keyCode) {
    for (const key in PlayerControls) {
        if (PlayerControls[key].key === keyCode) {
            PlayerControls[key].toggle = toggle;
            break;
        }
    }
}

//Player Variables
var PlayerPosition = {x: 656, y: 400}
const playerSize = {x: 10, y: 10}
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
const playerStep = 1
var playerSpeed = 1

//Walls, Windows, Doors
const wallWidth = 5
const windowWidth = 2
const FloorPlan = {
    "outer-top" : [
        {type: 'wall', from: [10, 10], to: [600, 10]},
        {type: 'window', from: [600, 10], to: [700, 10]},
        {type: 'wall', from: [700, 10], to: [1335, 10]}
    ],
    "outer-left" : [
        {type: 'wall', from: [10, 10], to: [10, 300]},
        {type: 'window', from: [10, 300], to: [10, 400]},
        {type: 'wall', from: [10, 400], to: [10, 890]}
    ],
    "outer-bottom" : [
        {type: 'wall', from: [10, 890], to: [1335, 890]}
    ],
    "outer-right" : [
        {type: 'wall', from: [1335, 10], to: [1335, 400]},
        {type: 'window', from: [1335, 400], to: [1335, 500]},
        {type: 'wall', from: [1335, 500], to: [1335, 890]}
    ],
    "middle-wall" : [
        {type: 'wall', from: [710, 10], to: [710, 400]},
        {type: 'door', from: [710, 400], to: [710, 500]},
        {type: 'wall', from: [710, 500], to: [710, 890]},
    ]
}

function isPosOutsideOfCanvas(pos) {
    let canvas = document.getElementById("canvas");
    if (pos.x < 0 || pos.x > (canvas.width - 10) || pos.y < 0 || pos.y > (canvas.height - 10)) {
        return true;
    } else {
        return false;
    }
}

function main() {
    window.requestAnimationFrame(main);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //Drawing Player
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(PlayerPosition.x, PlayerPosition.y, playerSize.x, playerSize.y);

    //Handling Player Movement
    let newPosition = {x: PlayerPosition.x, y: PlayerPosition.y}

    if (PlayerControls["shift"].toggle == true) {
        playerSpeed = 2;
    } else if (PlayerControls["space"].toggle == true) {
        playerSpeed = 0.5;
    } else {
        playerSpeed = 1;
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

    if (!isPosOutsideOfCanvas(newPosition)) {
        PlayerPosition = newPosition;
        console.log(PlayerPosition)
    }

    //Drawing Walls, Windows, Doors
    for (const wall in FloorPlan) {
        const steps = FloorPlan[wall];
        steps.forEach(step => {
            ctx.beginPath(); // Start a new path
            
            if (step.type == "wall") {
                ctx.lineWidth = wallWidth;
            } else if (step.type == "window") {
                ctx.lineWidth = windowWidth;
            }
            
            if (step.type == "door") {
                
            } else {
                ctx.moveTo(step.from[0], step.from[1]);
                ctx.lineTo(step.to[0], step.to[1]);
                ctx.stroke(); // Render the path
            }
        });
    }
}
window.requestAnimationFrame(main);
