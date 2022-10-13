scale = 10
trs= []

halfScale = (scale / 2) + 1
scale = scale + 1
for (let i = 1; i < scale; i++) {
    let tds = []

    for (let i2 = 1; i2 < halfScale; i2++) {
        tds.push('<td><p>' + i2 + '</p></td>')
    }
    for (let i2 = halfScale - 1; i2 >= 1; i2--) {
        tds.push('<td><p>' + i2 + '</p></td>')
    }

    trs.push(tds)
}

trs.forEach(element => {
    console.log(element)
    $('table tbody').append('<tr>' + element + '</tr>');
});

