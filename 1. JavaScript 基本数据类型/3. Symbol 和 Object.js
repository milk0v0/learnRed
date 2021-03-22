{
    let sym = Symbol();
    console.log(typeof sym); // symbol

    let genericSymbol = Symbol();
    let otherGenericSymbol = Symbol();
    let fooSymbol = Symbol('foo');
    let otherFooSymbol = Symbol('foo');

    console.log(genericSymbol == otherGenericSymbol); // false
    console.log(fooSymbol == otherFooSymbol); // false

    console.log(genericSymbol); // Symbol()
    console.log(fooSymbol); // Symbol(foo)
}

{
    let myBoolean = new Boolean();
    console.log(typeof myBoolean); // object

    let myString = new String();
    console.log(typeof myString); // object

    let myNumber = new Number();
    console.log(typeof myNumber); // object

    let mySymbol = Symbol();
    let myWrappedSymbol = Object(mySymbol);
    console.log(typeof myWrappedSymbol); // object
}

{
    let fooGlobalSymbol = Symbol.for('foo'); // -> 创建新符号
    console.log(typeof fooGlobalSymbol); // Symbol
    let otherFooGlobalSymbol = Symbol.for('foo'); // 重用已有符号

    console.log(fooGlobalSymbol === otherFooGlobalSymbol); // true

    // 即使采用相同的符号描述，在全局注册表中定义的符号跟使用 Symbol() 定义的符号也并不相同
    let localSymbol = Symbol('foo');
    console.log(fooGlobalSymbol == localSymbol); // false

    // 全局注册表中的符号必须使用字符串键来创建，因此作为参数传给 Symbol.for() 的任何值都会被转换为字符串。同时，键月ibei用作符号描述
    let emptyGlobalSymbol = Symbol.for();
    console.log(emptyGlobalSymbol); // Symbol(undefined)
}

{
    let s = Symbol.for('foo');
    console.log(Symbol.keyFor(s)); // foo

    let s2 = Symbol('bar');
    console.log(Symbol.keyFor(s2)); // undefined

    // console.log(Symbol.keyFor('symbol')); // TypeError: symbol is not a symbol
}