scale = 10
trs= []



/*
halfScale = (scale / 2) + 1
scale = scale + 1
console.log(scale)
console.log(halfScale)
for (let i = 1; i < scale; i++) {
    let tds = []

    let inner = i - halfScale
    console.log(inner)
    for (let i2 = 1; i2 < halfScale; i2++) {
        /*
        if (i == 1 || i == scale) {
            tds.push('<td><p>' + 1 + '</p></td>')
        } else {
            tds.push('<td><p>' + i2 + '</p></td>')
        }
        */
        //tds.push('<td><p>' + i + '</p></td>')
    //}
    //for (let i2 = halfScale - 1; i2 >= 1; i2--) {
        /*
        if (i == 1 || i == scale) {
            tds.push('<td><p>' + 1 + '</p></td>')
        } else {
            tds.push('<td><p>' + i2 + '</p></td>')
        }
        */
        /*
        tds.push('<td><p>' + i + '</p></td>')
    }

    trs.push(tds)
}
*/

/*
let numbers = []
for (let i = 0; i < (scale + 1); i++) {
    if (i > 0) {
        let number = ''
        let numbertoadd = 0

        if (i < 2 || i == (scale + 1)) {
            numbertoadd = 1
        } else if (i > 2){
            numbertoadd = i - 1
        } else {
            numbertoadd = i
        }

        for (let x = 1; x < (scale + 1); x++) {
            number = number + '' + numbertoadd + ''
        }

        console.log(number)
    }
}
*/

trs.forEach(element => {
    console.log(element)
    $('table tbody').append('<tr>' + element + '</tr>');
});

