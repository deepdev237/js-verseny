scale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
trs= []

for (let i = 0; i < scale.length; i++) {
    const number = scale[i]
    let lastNumber = 0
    if (scale[i - 1]) {
        lastNumber = scale[i - 1]
    } else {
        lastNumber = number
    }
    
    
    let num = ''

    let tds = []

    let same_num = scale.length - i
    let even_same_num = same_num
    console.log('same_num: ' + same_num)

    let Issame_numOdd = Boolean(even_same_num % 2)
    if (number != 5) {
        if (Issame_numOdd) {
            even_same_num = even_same_num
        }
    }
    let nums = []
    //num = num + lastNumber.toString()
    if (Issame_numOdd) {
        if (even_same_num < scale.length) {
            //console.log('number: ' + number)
            //console.log('even_same_num: ' + even_same_num)
            for (let x = 0; x < number; x++) {
                if (scale[x] != scale.length) {
                    nums.push(scale[x])
                } else {
                    break
                }
                
            }
            
            /*
            let firstNums = 0
            for (let x = 0; x < ((number / 2) + 1); x++) {
                console.log(scale[x])
                num = num + scale[x].toString()
                firstNums = firstNums + 1
            }
            for (let x = 1; x < (same_num - firstNums); x++) {
                console.log(number)
                num = num + number.toString()
            }
            for (let x = ((number / 2) - 1); x > 0; x--) {
                console.log(scale[x])
                num = num + scale[x].toString()
            }
            */
            console.log('number: ' + number)
            console.log('even_same_num: ' + even_same_num)
        } else {
            console.log('number: ' + number)
            console.log('even_same_num: ' + even_same_num)
        }
    } else {
        for (let x = 0; x < even_same_num; x++) {
            nums.push(number)
        }
        console.log('number: ' + number)
        console.log('even_same_num: ' + even_same_num)
        /*
        for (let x = 1; x < number; x++) {
            console.log(x)
            num = num + number.toString()   
        }
        */
    }

    for (let x = 0; x < same_num; x++) {
        num = num + number.toString()
    }

    console.log(nums)

    /*
    if (even_same_num < scale.length && !Issame_numOdd) {
        for (let x = (number / 2); x > 0; x--) {
            console.log(x)
            num = num + number.toString()
        }
    }
    */
    
    //num = num + lastNumber.toString()

    //console.log(num)
}

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

