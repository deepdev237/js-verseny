var scale = 10
let scale_ids = []

for (let i = 0; i < scale; i++) {
    let ids = []
    for (let x = 0; x < scale; x++) {
        let id = i + '-' + x
        ids.push(id)
    }
    scale_ids.push(ids)
}

console.log(scale_ids)

scale_ids.forEach(ids => {
    let tr = []
    ids.forEach(id => {
        tr.push('<td id="' + id + '"><div class="disk"></div></td>')
    });
    $('table tbody').append('<tr>' + tr + '</tr>');
});

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

ResetBoard()