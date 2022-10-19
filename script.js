const startingColor = "black"
const directions = ["leftup", "left", "leftdown", "up", "down", "rightup", "right", "rightdown"]
var playingAs = startingColor
var scale = 10
var scale_ids = []
var corner_ids = []
var isGameRunning = false
var GameTime = '00:00'

for (let i = 0; i < scale; i++) {
    let ids = []
    for (let x = 0; x < scale; x++) {
        let id = i + '-' + x
        ids.push(id)
    }
    let leftcorner = parseInt(ids[i].split('-')[0])
    let rightcorner = parseInt(ids[(ids.length - 1 - i)].split('-')[1])
    if (i == (scale / 2)) {
        rightcorner = parseInt(ids[(ids.length - i)].split('-')[1])
    }
    corner_ids.push({leftcorner, rightcorner})
    scale_ids.push(ids)
}

scale_ids.forEach(ids => {
    let tr = []
    ids.forEach(id => {
        tr.push('<td id="' + id + '"><div class="disk"></div></td>')
    });
    $('table tbody').append('<tr>' + tr + '</tr>');
});

/* Pontozás - félig működik
for (let x = 0; x < (scale / 2); x++) {
    let point = x + 1
    let leftcorner = corner_ids[x].leftcorner
    let rightcorner = corner_ids[x].rightcorner
    
    for (let i = 0; i < (leftcorner); i++) {
        //console.log(i)
        let disk = GetDiskOnID(leftcorner + '-' + i)
        $(disk).html('<p>' + (i + 1) + '</p>')
    }
    
    for (let i = leftcorner; i < (rightcorner + 1); i++) {
        //console.log(i)
        let disk = GetDiskOnID(leftcorner + '-' + i)
        $(disk).html('<p>' + point + '</p>')
    }
    
    for (let i = scale; i >= (rightcorner + 1); i--) {
        let disk = GetDiskOnID(leftcorner + '-' + i)
        $(disk).html('<p>' + x + '</p>')
    }
} //
for (let x = (scale / 2); x >= 0; x--) {
    let point = x + 1
    let leftcorner = corner_ids[x].leftcorner
    let rightcorner = corner_ids[x].rightcorner
    
    for (let i = 0; i < (leftcorner); i++) {
        //console.log(i)
        let disk = GetDiskOnID(leftcorner + '-' + i)
        $(disk).html('<p>' + (i + 1) + '</p>')
    }
    
    for (let i = leftcorner; i < (rightcorner + 1); i++) {
        //console.log(i)
        let disk = GetDiskOnID(leftcorner + '-' + i)
        $(disk).html('<p>' + point + '</p>')
    }
    
    for (let i = scale; i >= (rightcorner + 1); i--) {
        console.log(i)
        let disk = GetDiskOnID(leftcorner + '-' + i)
        $(disk).html('<p>' + x + '</p>')
    }
}
*/

function GetDiskOnID(id) {
    return $('td#' + id + ' div.disk');
}

function SetDiskOnID(id, color) {
    let disk = GetDiskOnID(id)
    if (color === "white") {
        $(disk).removeClass("black");
        $(disk).toggleClass(color);
        if ($(disk).hasClass("clickable")) {
            $(disk).removeClass("clickable");
        }
    } else if (color === "black") {
        $(disk).removeClass("white");
        $(disk).toggleClass(color);
        if ($(disk).hasClass("clickable")) {
            $(disk).removeClass("clickable");
        }
    }
}

function ResetDiskOnID(id) {
    let disk = GetDiskOnID(id)
    $(disk).removeClass("black");
    $(disk).removeClass("white");
    $(disk).removeClass("clickable");
}

function EraseBoard() {
    scale_ids.forEach(ids => {
        ids.forEach(id => {
            ResetDiskOnID(id)
        });
    });
}

function ResetBoard() {
    EraseBoard()
    let halfID = (scale / 2)
    let startingIDs = []
    startingIDs.push({"id" : (halfID - 1) + '-' + halfID, "color" : "black"})
    startingIDs.push({"id" : halfID + '-' + (halfID - 1), "color" : "black"})
    startingIDs.push({"id" : (halfID - 1) + '-' + (halfID - 1), "color" : "white"})
    startingIDs.push({"id" : halfID + '-' + halfID, "color" : "white"})
    startingIDs.forEach(element => {
        SetDiskOnID(element.id, element.color)
    });
}

function GetIDInDirection(direction, id) {
    let column = parseInt(id.split("-")[0])
    let row = parseInt(id.split("-")[1])
    
    if (direction === "leftup") {
        column = column - 1
        row = row - 1
    } else if (direction === "left") {
        row = row - 1
    } else if (direction === "leftdown") {
        column = column + 1
        row = row - 1
    } else if (direction === "up") {
        column = column - 1
    } else if (direction === "down") {
        column = column + 1
    } else if (direction === "rightup") {
        column = column - 1
        row = row + 1
    } else if (direction === "right") {
        row = row + 1
    } else if (direction === "rightdown") {
        column = column + 1
        row = row + 1
    }
    
    if ((row < 0 || row > (scale - 1)) || (column < 0 || column > (scale - 1))) { // if id is outside of the board
        return null;
    } else {
        return column + '-' + row;
    }
}

function oppositeColor(color) {
    if (color == "white") {
        return "black";
    } else if (color == "black") {
        return "white";
    } else {
        return null;
    }
}

function checkForGameOver() {
    var clickables = $(".clickable").map(function() {
        return this.innerHTML;
    }).get();
    if (clickables.length == 0) {
        $('.valami').show();
    }
}

function calculateWinner() {
    let whitePoints = 0
    let blackPoints = 0
    scale_ids.forEach(ids => {
        ids.forEach(id => {
            let disk = GetDiskOnID(id)
            
            if ($(disk).hasClass("white")) {
                whitePoints += 1
            } else if ($(disk).hasClass("black")) {
                blackPoints += 1
            }
        });
    });
    if (whitePoints > blackPoints) {
        //winner is white
    } else {
        //winner is black
    }
}

function RefreshClickableSquares() {
    scale_ids.forEach(ids => {
        ids.forEach(id => {
            let disk = GetDiskOnID(id)

            if ((($(disk).hasClass("white")) || ($(disk).hasClass("black"))) === false) { //ha nincs korong a cellán
                let shouldBeClickable = false

                directions.forEach(direction => {
                    let checkingID = GetIDInDirection(direction, id)

                    if (checkingID != null) {
                        let trapped_ids = canTrap(direction, id)

                        if (trapped_ids != null && trapped_ids.length > 0) { //ha tud közbezárni
                            let checkingDisk = GetDiskOnID(checkingID)

                            if ($(checkingDisk).hasClass(playingAs) || $(checkingDisk).hasClass(oppositeColor(playingAs))) {
                                shouldBeClickable = true
                            }
                        }
                    }
                });

                if (shouldBeClickable && $(disk).hasClass("clickable") === false) {
                    $(disk).addClass("clickable")
                } else {
                    $(disk).removeClass("clickable");
                }
            }
        });
    });
}

function canTrap(direction, startingID) {
    let gotSameColorOrClickable = false;
    let opposite_color = oppositeColor(playingAs)
    let trapped_ids = []
    let checkingID = GetIDInDirection(direction, startingID)
    let checkingDisk = GetDiskOnID(checkingID)

    while (!gotSameColorOrClickable || checkingDisk === null) {
        if ($(checkingDisk).hasClass(playingAs)) {
            gotSameColorOrClickable = true;
        } else if ($(checkingDisk).hasClass(opposite_color) && $(checkingDisk).hasClass("clickable") == false) {
            trapped_ids.push(checkingID)
        }
        if (checkingID != null) {
            checkingID = GetIDInDirection(direction, checkingID)
            if (checkingID != null) {
                checkingDisk = GetDiskOnID(checkingID)
            } else {
                break;
            }
        } else {
            break;
        }
    }
    if (gotSameColorOrClickable) {
        if (trapped_ids.length > 0) {
            return trapped_ids;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

$("td").on("click", function () {
    if ($(this).children('div').hasClass("clickable")) {
        let id = this.id
        SetDiskOnID(id, playingAs)
        directions.forEach(direction => {
            let trapped_ids = canTrap(direction, id)
            if (trapped_ids != null) {
                trapped_ids.forEach(id => {
                    SetDiskOnID(id, playingAs)
                });
            }
        });
        playingAs = oppositeColor(playingAs)
        $("#currentColor").text('Most lép:' + playingAs)
        RefreshClickableSquares()
        checkForGameOver()
    }
});

$("#start").on("click", function () {
    StartOrStopGame()
});

function GameTimer() {
    if (isGameRunning) {
        let minute = parseInt(GameTime.split(':')[0])
        let second = parseInt(GameTime.split(':')[1])
        if (second == 60) {
            minute += 1
            second = 0
        } else {
            second += 1
        }
        GameTime = minute + ':' + second
        $("#GameTime").text('Játékidő:' + GameTime)
    }
}

setInterval(GameTimer, 1000);

function StartOrStopGame() {
    if (isGameRunning) {
        EraseBoard()
        isGameRunning = false
        GameTime = '00:00'
        playingAs = startingColor
        $("#start").text('Start Game')
        $("#GameTime").text('Játékidő:' + GameTime)
        $("#currentColor").text('Most lép:' + playingAs)
    } else {
        ResetBoard()
        RefreshClickableSquares()
        isGameRunning = true
        $("#start").text('Stop Game')
        $("#GameTime").text('Játékidő:' + GameTime)
        $("#currentColor").text('Most lép:' + playingAs)
    }
}