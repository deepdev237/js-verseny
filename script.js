scale = 10
let scale_ids = []

for (let i = 0; i < (scale + 1); i++) {
    let ids = []
    for (let x = 0; x < (scale + 1); x++) {
        let id = i + '-' + x
        ids.push(id)
    }
    scale_ids.push(ids)
}

console.log(scale_ids)

scale_ids.forEach(ids => {
    let tr = []
    ids.forEach(id => {
        tr.push('<td class="cell" id="' + id + '"></td>')
    });
    $('table tbody').append('<tr>' + tr + '</tr>');
});