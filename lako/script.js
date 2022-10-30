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
var PlayerPosition = {x: 500, y: 400}
const playerSize = {x: 50, y: 50}
//make PlayerControls object
const PlayerControls = {
    w: {key: 87, toggle: false},
    a: {key: 65, toggle: false},
    s: {key: 83, toggle: false},
    d: {key: 68, toggle: false},
    space: {key: 32, toggle: false},
    shift: {key: 16, toggle: false}
}
const playerStep = 1
var playerSpeed = 1

//Walls, Windows, Doors
const wallWidth = 5
const windowWidth = 2
var FloorPlan = {
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
    if (pos.x < 0 || pos.x > canvas.width - playerSize.x || pos.y < 0 || pos.y > canvas.height - playerSize.y) {
        return true;
    }
    return false;
}

function main() {
    //Main loop
    window.requestAnimationFrame(main); //Request next frame
    var canvas = document.getElementById("canvas"); //Get canvas
    var ctx = canvas.getContext("2d"); //2d context for drawing

    //Drawing Player
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(PlayerPosition.x, PlayerPosition.y, playerSize.x, playerSize.y);

    //Handling Player Movement
    let isPosInsideOfWall = false; //will be checked below in the for loop
    let newPosition = {x: PlayerPosition.x, y: PlayerPosition.y}

    // if shift is pressed, playerSpeed is 2, else if space is pressed, playerSpeed is 0.5, else playerSpeed is 1
    playerSpeed = PlayerControls["shift"].toggle == true ? 2 : PlayerControls["space"].toggle == true ? 0.5 : 1;

    //Movement
    if (PlayerControls["w"].toggle == true) { //Up
        newPosition.y -= playerStep * playerSpeed;
    }
    if (PlayerControls["a"].toggle == true) { //Left
        newPosition.x -= playerStep * playerSpeed;
    }
    if (PlayerControls["s"].toggle == true) { //Down
        newPosition.y += playerStep * playerSpeed;
    }
    if (PlayerControls["d"].toggle == true) { //Right
        newPosition.x += playerStep * playerSpeed;
    }

    //Drawing Walls, Windows, Doors and checking if NewPosition is inside of a wall
    for (const wall in FloorPlan) {
        const steps = FloorPlan[wall];
        steps.forEach(step => {
            ctx.beginPath(); // Start a new path
            
            if (step.type == "wall") {
                ctx.lineWidth = wallWidth;
                ctx.strokeStyle = "black";
            } else if (step.type == "window") {
                ctx.lineWidth = windowWidth;
                ctx.strokeStyle = "white";
            }
            
            if (step.type == "door") {
                ctx.strokeStyle = "white";
                ctx.lineWidth = windowWidth;
                //ctx.fillStyle = "white"; 
                ctx.fillRect(step.from[0], step.from[1], step.to[0] - step.from[0], step.to[1] - step.from[1]);
                
                ctx.moveTo(step.from[0], step.from[1]);
                ctx.lineTo(step.to[0], step.to[1] - 10);
            } else {
                // Draw
                ctx.moveTo(step.from[0], step.from[1]);
                ctx.lineTo(step.to[0], step.to[1]);
                ctx.stroke(); // Render the path

                //checking if NewPosition is inside of wall
                if (newPosition.x + playerSize.x > step.from[0] && newPosition.x < step.to[0] && newPosition.y + playerSize.y > step.from[1] && newPosition.y < step.to[1]) {
                    isPosInsideOfWall = true;
                }
            }
        });
    }

    //if the new position is not outside of the canvas and not in a wall, then update the player position
    if (!isPosOutsideOfCanvas(newPosition) && isPosInsideOfWall == false) { 
        PlayerPosition = newPosition;
        console.log(PlayerPosition) //for debugging
    }
}
window.requestAnimationFrame(main); //Start the main loop

