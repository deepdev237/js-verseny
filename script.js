scale = 10
trs= []

scale = scale + 1
for (let i = 1; i < scale; i++) {
    let tds = []
    for (let index = 1; index < scale; index++) {
        console.log(index)
        tds.push('<td>' + i + '</td>')
    }
    //i = scale - i
    $('table tbody').append('<tr>' + tds + '</tr>');
}

/////////////////

for (let i = 2; i < tds.length; i++) {
    const element = tds[i];
    console.log(tds)
}

tds.forEach(element => {
    $('table tbody').append('<tr>' + element + '</tr>');
});

