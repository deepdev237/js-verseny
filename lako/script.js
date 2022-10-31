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
    ],
    "top-right room" : [
        {type: 'wall', from: [710, 400], to: [900, 400]},
        {type: 'door', from: [900, 400], to: [1000, 400]},
        {type: 'wall', from: [1000, 400], to: [1335, 400]},
    ],

}

//Sensors
var Sensors = {
    "motion" : {
        location : {x: 1310, y: 25},
        range : 600,
        fov : 90,
        triggered : false
    },
    "door" : {},
    "sound" : {}
}

function distanceBetweenPoints(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
}

//https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
function intersects(a,b,c,d,p,q,r,s) {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;

        let isIntersecting = (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);

        if (isIntersecting) {
            var x = a + (lambda * (c - a));
            var y = b + (lambda * (d - b));
            return {x: x, y: y};
        } else {
            return isIntersecting;
        }
    }
};

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
                ctx.strokeStyle = "cyan";
            }
            
            if (step.type == "door") {
                //Draw Door
                ctx.strokeStyle = "white";
                ctx.lineWidth = windowWidth;

                if (step.from[0] == step.to[0]) {
                    //vertical
                    let lineStart = {x: step.from[0], y: step.from[1]} //Door start
                    let lineEnd = {x: lineStart.x - 100, y: lineStart.y} //Line ends 100px to the left of the start
                    ctx.moveTo(lineStart.x, lineStart.y);
                    ctx.lineTo(lineEnd.x, lineEnd.y);

                    let arcEnd = {x: step.to[0], y: step.to[1]}
                    
                    //arc starts from lineEnd to the end of the door
                    ctx.bezierCurveTo(lineEnd.x - 10, lineEnd.y, arcEnd.x - 75, arcEnd.y, arcEnd.x, arcEnd.y);
                    ctx.stroke(); // Render the path
                } else {
                    //horizontal
                    let lineStart = {x: step.from[0], y: step.from[1]} //Door start
                    let lineEnd = {x: lineStart.x, y: lineStart.y - 100} //Line ends 100px above the start
                    ctx.moveTo(lineStart.x, lineStart.y);
                    ctx.lineTo(lineEnd.x, lineEnd.y);

                    let arcEnd = {x: step.to[0], y: step.to[1]}

                    //arc starts from lineEnd to the end of the door
                    ctx.bezierCurveTo(lineEnd.x, lineEnd.y - 10, arcEnd.x, arcEnd.y - 75, arcEnd.x, arcEnd.y);
                    ctx.stroke(); // Render the path
                }
            } else {
                // Draw Wall or Window
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

    //loop through sensors
    for (const sensor in Sensors) {
        const sensorData = Sensors[sensor];
        const sensorPos = sensorData.location;
        
        if (sensor == "motion") {
            let rayrange = sensorData.range; //length of ray

            //shoot ray from sensorPos to the player
            ray = {x: sensorPos.x, y: sensorPos.y};
            //rayangle taking into account the player's position and size and the sensor's position
            let rayAngle = Math.atan2(PlayerPosition.y + playerSize.y / 2 - sensorPos.y, PlayerPosition.x + playerSize.x / 2 - sensorPos.x);
            let rayEnd = {x: ray.x + rayrange * Math.cos(rayAngle), y: ray.y + rayrange * Math.sin(rayAngle)};

            //get a line from top left to bottom right of the player
            let playerLine = {x1: PlayerPosition.x, y1: PlayerPosition.y, x2: PlayerPosition.x + playerSize.x, y2: PlayerPosition.y + playerSize.y};

            //get ray intersection with the playerline using intersects function
            let playerIntersection = intersects(ray.x, ray.y, rayEnd.x, rayEnd.y, playerLine.x1, playerLine.y1, playerLine.x2, playerLine.y2);
            //get distance between sensor and playerintersection
            let playerIntersectionDistance = Math.sqrt(Math.pow(sensorPos.x - playerIntersection.x, 2) + Math.pow(sensorPos.y - playerIntersection.y, 2));

            if (playerIntersection) {
                //if there is an intersection, draw a circle at the intersection point
                ctx.beginPath();
                ctx.arc(playerIntersection.x, playerIntersection.y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = "red";
                ctx.fill();

                //get closest wall intersection to sensor that is not door
                let closestWallIntersection = {x: 0, y: 0, distance: Infinity};
                for (const wall in FloorPlan) {
                    const steps = FloorPlan[wall];
                    steps.forEach(step => {
                        if (step.type != "door") {
                            let wallIntersection = intersects(ray.x, ray.y, rayEnd.x, rayEnd.y, step.from[0], step.from[1], step.to[0], step.to[1]);
                            if (wallIntersection) {
                                let wallIntersectionDistance = Math.sqrt(Math.pow(sensorPos.x - wallIntersection.x, 2) + Math.pow(sensorPos.y - wallIntersection.y, 2));
                                if (wallIntersectionDistance < closestWallIntersection.distance) {
                                    closestWallIntersection = {x: wallIntersection.x, y: wallIntersection.y, distance: wallIntersectionDistance};
                                }
                            }
                        }
                    });
                }

                //if playerintersection is closer than closestwallintersection to the sensor set sensorData.triggered to true
                if (closestWallIntersection.distance > playerIntersectionDistance) {
                    sensorData.triggered = true;
                } else {
                    sensorData.triggered = false;
                }
            } else {
                sensorData.triggered = false;
            }

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = sensorData.triggered ? "green" : "red";
            ctx.moveTo(sensorData.location.x, sensorData.location.y);
            ctx.lineTo(newPosition.x + playerSize.x / 2, newPosition.y + playerSize.y / 2);
            ctx.stroke(); // Render the path
        }
    }

    //if the new position is not outside of the canvas and not in a wall, then update the player position
    if (!isPosOutsideOfCanvas(newPosition) && isPosInsideOfWall == false) { 
        PlayerPosition = newPosition;
        //console.log(PlayerPosition) //for debugging
    }
}
window.requestAnimationFrame(main); //Start the main loop
