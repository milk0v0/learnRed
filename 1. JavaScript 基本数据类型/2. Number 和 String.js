let car = null;
console.log(car === null);

console.log(3.125e7);

console.log(0.1 + 0.2);

const str = 'This is the letter sigma: \u03a3.'
console.log(str.length);

console.log(`first line second line`.length);
console.log(`first line
            second line`.length);
console.log(`first line
            second line`);

let foo = { toString: () => 'World' };
console.log(`hello, ${foo}`); // Hello, World

{
    const a = 6;
    const b = 9;

    function simpleTag(strings, aValExpression, bValExpression, cValExpression) {
        console.log(strings);
        console.log(aValExpression);
        console.log(bValExpression);
        console.log(cValExpression);

        return 'foobar';
    }

    let untaggeResult = `${a} + ${b} = ${a + b}`; // '6 + 9 = 15'
    let taggedResult = simpleTag`${a} + ${b} = ${a + b}`; // foobar
    /*
    * log
    * ["", " + ", " = ", "", raw: Array(4)]
    * 6
    * 9
    * 15
    */
}

{
    function simpleTag(strings, ...expressions) {
        return `${strings[0]}${expressions.map((item, index) => `${item}${strings[index + 1]}`).join('')}`
    }
    let a = 6;
    let b = 9;
    
    let taggedResult = simpleTag`${a} + ${b} = ${a + b}`;
    console.log(taggedResult);
}

{
console.log(`\u00A9`); // ©
console.log(String.raw`\u00A9`); // \u00A9
console.log(`first line \nsecond line`);
/*
* first line 
* second line
*/
console.log(String.raw`first line \nsecond line`); // first line \nsecond line
console.log(String.raw`first line
second line`);
/*
* first line 
* second line
*/
}