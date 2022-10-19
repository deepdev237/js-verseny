const startingColor = "black"
const directions = ["leftup", "left", "leftdown", "up", "down", "rightup", "right", "rightdown"]
const colors = {
    ["white"]: "Fehér",
    ["black"]: "Fekete"
}
whitePlayerName = "Player0"
blackPlayerName = "Player1"
playingAs = startingColor
scale = 8
scale_ids = []
corner_ids = []
isGameRunning = false
Time = '00:00'
TimerInterval = null

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}  

function DrawBoard() {
    $('table tbody').empty();
    scale_ids = []
    corner_ids = []
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
        corner_ids.push({ leftcorner, rightcorner })
        scale_ids.push(ids)
    }

    scale_ids.forEach(ids => {
        let tr = []
        ids.forEach(id => {
            tr.push('<td id="' + id + '"><div class="disk"></div></td>')
        });
        $('table tbody').append('<tr>' + tr + '</tr>');
    });

    $(".content table tbody tr td").on("click", function() {
        if ($(this).children('div').hasClass("clickable")) {
            let id = this.id

            EraseClickables()

            SetDiskOnID(id, playingAs)
            directions.forEach(direction => {
                let trapped_ids = canTrap(direction, id)

                if (trapped_ids != null) {
                    EraseClickables()
                    trapped_ids.forEach(id => {
                        let set = SetDiskOnID(id, playingAs, true)
                        while (!set || set == null) {
                            sleep(1000)
                        }
                    });
                }
            });

            playingAs = oppositeColor(playingAs)
            let lep = $('#' +  playingAs + '_username').html()
            $("#currentColor").text('Most lép: ' + lep + '(' + colors[playingAs] + ')')

            RefreshClickableSquares()
            
            //checking for game over
            var clickables = $(".clickable").map(function() { return this.innerHTML; }).get();
            if (clickables.length == 0) {
                calculateWinner()
            }
        }
    });
}

function calculateWinner() {
    let whitePoints = 0
    let blackPoints = 0
    let winner = "err"
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
        winner = "white"
    } else {
        winner = "black"
    }
    $('#winner').html(colors[winner])
    $('#game_time').html(Time)
    $('#black_player').html(blackPlayerName + '(' + colors["black"] + ')')
    $('#black_point').html(blackPoints)
    $('#white_point').html(whitePoints)
    $('#white_player').html(whitePlayerName + '(' + colors["white"] + ')')
    clearInterval(TimerInterval)
    $('.game_over').show();
}

function GetDiskOnID(id) {
    return $('td#' + id + ' div.disk');
}

function DoAnimOnID(id) {
    let disk = GetDiskOnID(id)
    $(disk).toggleClass("turn-effect");
    setTimeout(function() {
        $(disk).removeClass("turn-effect");
    }, 300);
}

function SetDiskOnID(id, color, doAnim) {
    let disk = GetDiskOnID(id)
    if (color === "white") {
        $(disk).removeClass("black");
        if ($(disk).hasClass("clickable")) {
            $(disk).removeClass("clickable");
        }
        if (doAnim) {
            let disk = GetDiskOnID(id)
            $(disk).toggleClass("turn-effect");
            setTimeout(function() {
                $(disk).removeClass("turn-effect");
            }, 300);
        }
        $(disk).toggleClass(color);
    } else if (color === "black") {
        $(disk).removeClass("white");
        if ($(disk).hasClass("clickable")) {
            $(disk).removeClass("clickable");
        }
        if (doAnim) {
            let disk = GetDiskOnID(id)
            $(disk).toggleClass("turn-effect");
            setTimeout(function() {
                $(disk).removeClass("turn-effect");
            }, 300);
        }
        $(disk).toggleClass(color);
    }
    return 'done';
}

function ResetDiskOnID(id) {
    let disk = GetDiskOnID(id)
    $(disk).removeClass("black");
    $(disk).removeClass("white");
    $(disk).removeClass("clickable");
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

function EraseClickables() {
    scale_ids.forEach(ids => {
        ids.forEach(id => {
            let disk = GetDiskOnID(id)
            $(disk).removeClass("clickable");
        })
    })
}

function RefreshClickableSquares() {
    scale_ids.forEach(ids => {
        ids.forEach(id => {
            let disk = GetDiskOnID(id)
            let shouldBeClickable = false
            
            if ((($(disk).hasClass("white")) || ($(disk).hasClass("black"))) === false) { //ha nincs korong a cellán
                directions.forEach(direction => {
                    let checkingID = GetIDInDirection(direction, id)

                    if (checkingID != null) {
                        let trapped_ids = canTrap(direction, id)

                        if (trapped_ids != null && trapped_ids.length > 0) { //ha tud közbezárni
                            let checkingDisk = GetDiskOnID(checkingID)
                            let hasColor = $(checkingDisk).hasClass(playingAs) || $(checkingDisk).hasClass(oppositeColor(playingAs))
                            if (hasColor) {
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
    let gotSameColor = false;
    let opposite_color = oppositeColor(playingAs)
    let trapped_ids = []
    let checkingID = GetIDInDirection(direction, startingID)
    let checkingDisk = GetDiskOnID(checkingID)
    let emptyInTheWay = false

    while (!gotSameColor || checkingDisk === null) {
        let isEmpty = $(checkingDisk).hasClass(playingAs) == false && $(checkingDisk).hasClass(opposite_color) == false && $(checkingDisk).hasClass("clickable") == false
        if (isEmpty) {
            emptyInTheWay = true
            break
        }
        if ($(checkingDisk).hasClass(playingAs)) {
            gotSameColor = true;
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
    if (gotSameColor) {
        if (trapped_ids.length > 0 && !emptyInTheWay) {
            return trapped_ids;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

function GameTimer() {
    let minute = parseInt(Time.split(':')[0])
    let second = parseInt(Time.split(':')[1])

    if (second == 60) {
        minute += 1
        second = 0
    } else {
        second += 1
    }

    minute = String(minute)
    second = String(second)
    if (minute.length < 2) {
        minute = '0' + minute
    }
    if (second.length < 2) {
        second = '0' + second
    }

    Time = minute + ':' + second
    $("#GameTime").text('Játékidő: ' + Time)
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
    startingIDs.push({ "id": (halfID - 1) + '-' + halfID, "color": "black" })
    startingIDs.push({ "id": halfID + '-' + (halfID - 1), "color": "black" })
    startingIDs.push({ "id": (halfID - 1) + '-' + (halfID - 1), "color": "white" })
    startingIDs.push({ "id": halfID + '-' + halfID, "color": "white" })
    startingIDs.forEach(element => {
        SetDiskOnID(element.id, element.color)
    });
}

function StartOrStopGame() {
    if (isGameRunning) {
        EraseBoard()
        isGameRunning = false
        clearInterval(TimerInterval)
        Time = '00:00'
        playingAs = startingColor
        $("#start").text('Start Game')
        $("#GameTime").text('Játékidő:' + Time)

        let lep = $('#' +  playingAs + '_username').html()
        $("#currentColor").text('Most lép: ' + lep + '(' + colors[playingAs] + ')')
    } else {
        DrawBoard()
        ResetBoard()
        RefreshClickableSquares()
        isGameRunning = true
        TimerInterval = setInterval(GameTimer, 1000);
        $("#start").text('Stop Game')
        $("#GameTime").text('Játékidő:' + Time)
        let lep = $('#' +  playingAs + '_username').html()
        $("#currentColor").text('Most lép: ' + lep + '(' + colors[playingAs] + ')')
    }
}

function setScale(element) {
    let num = $(element).text().split('x')[0]
    scale = parseInt(num);
}

$("#newgame").on("click", function() {
    $(".game_over").hide();
    StartOrStopGame()
    StartOrStopGame()
})

$("#start").on("click", function() {
    StartOrStopGame()
});

//inputos nevek

$("#edit_playerone").on("click", function() {
    if ($('#black_username').is(":hidden")) {
        $('#black_username').show();
        $('#black_username-input').hide();
    } else {
        $('#black_username').hide();
        $('#black_username-input').show();
    }
    blackPlayerName = $('#black_username-input').val()
    $('#black_username').html(blackPlayerName)
});

$("#edit_playertwo").on("click", function() {
    if ($('#white_username').is(":hidden")) {
        $('#white_username').show();
        $('#white_username-input').hide();
    } else {
        $('#white_username').hide();
        $('#white_username-input').show();
    }
    whitePlayerName = $('#white_username-input').val()
    $('#white_username').html(whitePlayerName)
});

DrawBoard()
