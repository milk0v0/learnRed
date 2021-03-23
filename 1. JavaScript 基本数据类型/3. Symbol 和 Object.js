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

{
    let s1 = Symbol('foo'),
        s2 = Symbol('bar'),
        s3 = Symbol('baz'),
        s4 = Symbol('qux');
    let o = {
        [s1]: 'foo val'
    }
    console.log(o); // {Symbol(foo): "foo val"}

    Object.defineProperty(o, s2, { value: 'bar val' });
    console.log(o); // {Symbol(foo): "foo val", Symbol(bar): "bar val"}

    Object.defineProperties(o, {
        [s3]: { value: 'baz val' },
        [s4]: { value: 'qux val' }
    });
    console.log(o); // {Symbol(foo): "foo val", Symbol(bar): "bar val", Symbol(baz): "baz val", Symbol(qux): "qux val"}
}

{
    let s1 = Symbol('foo'),
        s2 = Symbol('bar');
    let o = {
        [s1]: 'foo val',
        [s2]: 'bar val',
        baz: 'baz val',
        qux: 'qux val'
    }

    console.log(Object.getOwnPropertySymbols(o)); // [Symbol(foo), Symbol(bar)]
    console.log(Object.getOwnPropertyNames(o)); // ["baz", "qux"]

    console.log(Object.getOwnPropertyDescriptors(o)); // {baz: {configurable: true, enumerable: true, value: "baz val", writable: true}, qux: {…}, Symbol(foo): {…}, Symbol(bar): {…}}
    console.log(Reflect.ownKeys(o)); // ["baz", "qux", Symbol(foo), Symbol(bar)]
}

{
    let o = {
        [Symbol('foo')]: 'foo val',
        [Symbol('bar')]: 'bar val'
    }
    console.log(o); // {Symbol(foo): "foo val", Symbol(bar): "bar val"}

    let barSymbol = Object.getOwnPropertySymbols(o).find(symbol => symbol.toString().match(/bar/));
    console.log(barSymbol); // Symbol(bar)
}

{
    function Foo() { }
    class Bar { }
    let foo = new Foo();
    let bar = new Bar();

    console.log(foo instanceof Foo); // true
    console.log(bar instanceof Bar); // true

    console.log(Foo[Symbol.hasInstance](foo)); // true
    console.log(Bar[Symbol.hasInstance](bar)); // true
}

{
    class Bar { }
    class Baz extends Bar {
        static [Symbol.hasInstance]() {
            return false;
        }
    }

    let b = new Baz();
    console.log(b instanceof Bar); // true
    console.log(Bar[Symbol.hasInstance](b)); // true
    
    console.log(b instanceof Baz); // false
    console.log(Baz[Symbol.hasInstance](b)); // false
}