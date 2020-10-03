"use strict"

const fs = require(`fs`);
// The fs.readFile() method is used to read files on your computer.
// var yourModule = require( "your_module_name" ); //.js file extension is optional
function main () { 
    
    var file = fs.readFileSync(0, 'utf-8'); // read entire file
    let removeEscChars = file.replace(/(?:\\[rn]|[\r\n]+)+/g, " ");
    var splitInput = removeEscChars.split(" ");
    var noSpaces = splitInput.filter( (z) => z.trim().length > 0);

    try {
        var nums = noSpaces.map( (element) => { 
           if (element % parseInt(element) === 0) { // it is an actual integer if the % results in '0'
               if (element > (Math.pow(2,32)-1) || element < -(Math.pow(2,32))) { // if int32 but either too small/big
                   throw "NanInt32";
               } else { // if valid integer
                   return parseInt(element);
               }
           } else { // invalid integer
               throw "NaN";
           }

        }); 
        var odds = nums.filter( (o) => o % 2 != 0);
        var evens = nums.filter( (e) => e % 2 == 0);
        var halvedEvens = evens.map( (h) => h / 2);
        var final = odds.concat(halvedEvens);
        const noDuplicates = final.filter( (item, index, final) => {return final.indexOf(item) == index} );
        const sum = noDuplicates.reduce( (total, n) => total += n);

        console.log(sum);
    } catch (err) {
        console.log("*** " + err);
    }
    
}

main ()