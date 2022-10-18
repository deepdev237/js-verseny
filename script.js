var scale = 8
let scale_ids = []
let corner_ids = []
var playingAs = "white"

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

console.log(corner_ids)
console.log(scale_ids)

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
    } else if (color === "black") {
        $(disk).removeClass("white");
        $(disk).toggleClass(color);
    }
}

function ResetDiskOnID(id) {
    let disk = GetDiskOnID(id)
    $(disk).removeClass("black");
    $(disk).removeClass("remove");
}

function ResetBoard() {
    scale_ids.forEach(ids => {
        ids.forEach(id => {
            ResetDiskOnID(id)
        });
    });
    let halfID = (scale / 2)
    let startingIDs = []
    startingIDs.push({"id" : (halfID - 1) + '-' + halfID, "color" : "white"})
    startingIDs.push({"id" : halfID + '-' + (halfID - 1), "color" : "white"})
    startingIDs.push({"id" : (halfID - 1) + '-' + (halfID - 1), "color" : "black"})
    startingIDs.push({"id" : halfID + '-' + halfID, "color" : "black"})
    startingIDs.forEach(element => {
        SetDiskOnID(element.id, element.color)
    });
}

const directions = ["left", "right", "up", "down", "leftup", "leftdown", "rightup", "rightdown"]

function GetDiskToThe(direction, id) {
    let column = parseInt(id.split("-")[0])
    let row = parseInt(id.split("-")[1])
    if (direction === "left") {
        row = row - 1
    } else if (direction === "right") {
        row = row + 1
    } else if (direction === "up") {
        column = column - 1
    } else if (direction === "down") {
        column = column + 1
    } else if (direction === "leftup") {
        column = column - 1
        row = row - 1
    } else if (direction === "leftdown") {
        column = column + 1
        row = row - 1
    } else if (direction === "rightup") {
        column = column - 1
        row = row + 1
    } else if (direction === "rightdown") {
        column = column - 1
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

function TryToTrap(direction, startingID) {
    let gotSameColor = false;
    let opposite_color = oppositeColor(playingAs)
    let trapped_ids = []
    let checkingID = GetDiskToThe(direction, startingID)
    console.log(checkingID)
    let checkingDisk = GetDiskOnID(checkingID)
    while (!gotSameColor || checkingDisk === null) {
        if ($(checkingDisk).hasClass(playingAs)) {
            gotSameColor = true;
        } else if ($(checkingDisk).hasClass(opposite_color)) {
            trapped_ids.push(checkingID)
        }
        console.log(direction)
        checkingID = GetDiskToThe(direction, checkingID)
        if (checkingID != null) {
            checkingDisk = GetDiskOnID(checkingID)
        } else {
            break;
        }
    }
    if (gotSameColor) {
        if (trapped_ids.length > 0) {
            SetDiskOnID(startingID, playingAs)
            trapped_ids.forEach(id => {
                SetDiskOnID(id, playingAs)
            });
        } else {
            //couldn't trap
        }
    }
}

$("td").on("click", function () {
    let id = this.id
    directions.forEach(direction => {
        TryToTrap(direction, id)
    });
    playingAs = oppositeColor(playingAs)
});

ResetBoard()