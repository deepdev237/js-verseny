scale = 10
trs= []

scale = scale + 1
for (let i = 1; i < scale; i++) {
    let tds = []
    for (let index = 1; index < scale; index++) {
        tds.push('<td>' + i + '</td>')
    }
    for (let x = 0; x < tds.length; x++) {
        for (let a = 1; a < i; a++) {
            tds[i] = '<td><p style="color: red;">' + a + '</p></td>'
        } 
    }
    
    trs.push(tds)
}

/////////////////

/*
for (let i = 1; i < trs.length; i++) {
    console.log(trs[i][0])
    for (let x = 0; x < trs[i].length; x++) {
        const element = trs[i][x];
        trs[i][x] = '<td><p style="color: red;">' + 0 + '</p></td>'
    }
}
*/

trs.forEach(element => {
    $('table tbody').append('<tr>' + element + '</tr>');
});

