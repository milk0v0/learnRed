## 关于 Symbol

+ Symbol（符号）是 ES6 新增的数据类型。符号是原始值，且符号的实例时唯一的、不可变的。符号的用途时确保对象属性使用唯一标识符，不会发生属性冲突危险。
+ 符号就是用来创建唯一记号，进而用作非字符串形式的对象属性。
+ 在我的理解里，Symbol 很像一个工厂函数。但实际上他只是一个基本数据类型。



### 符号的基本用法

+ 符号需要使用 `Symbol()` 函数初始化。因为符号本身时原始类型，所以 typeof 返回的是 Symbol
+ 调用 `Symbol()` 函数时，也可以传入一个字符串参数作为对符号的描述，将来可以通过这个字符串来调试代码。但是，这个字符串参数与符号定义或标识完全物馆。这也是它们发挥作用的关键。

```javascript
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
```

+ `Symbol()` 不能与 new 关键字一起作为构造函数使用。这样做是为了避免创建符号包装对象
+ 如果确实像使用符号包装对象，可以借用 `Object()` 函数

```javascript
let myBoolean = new Boolean();
console.log(typeof myBoolean); // object

let myString = new String();
console.log(typeof myString); // object

let myNumber = new Number();
console.log(typeof myNumber); // object

let mySymbol = Symbol();
let myWrappedSymbol = Object(mySymbol);
console.log(typeof myWrappedSymbol); // object
```



### 使用全局符号注册表

+ `Symbol.for()`
+ 如果运行时的不同部分需要共享和重用符号实例，那么可以用一个字符串作为键，再全局符号注册表中创建并重用符号。
+ `Symbol.for()` 对每个字符串键都执行幂等操作。第一次使用某个字符串作为键调用时，他会检查全局运行时注册表，发现不存在对应的符号，鱼事就会生成一个新符号实例并添加到注册表中。后续使用相同字符串的调用同样回检查注册表，发现存在与该字符串对应的符号，就会返回该符号实例

```javascript
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
```

+ 我们可以使用 `Symbol.keyFor()` 来查询全局注册表，这个方法接收符号，返回该全局符号对应的字符串键。如果查询的不是全局符号，则会返回 undefied。如果查询的类型不是 Symbol 则会抛出错误。

```javascript
let s = Symbol.for('foo');
console.log(Symbol.keyFor(s)); // foo

let s2 = Symbol('bar');
console.log(Symbol.keyFor(s2)); // undefined

console.log(Symbol.keyFor('symbol')); // TypeError: symbol is not a symbol
```



### 使用符号作为属性

+ 凡是可以使用字符串或者数值作为属性的地方，都可以使用符号。包括了对象字面量属性和 `Object.defineProperty()` / `Object.defineProperties()` 定义的属性。对象字面量只能在计算属性语法中使用符号作为属性。

```javascript
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
```

+ 类似于 `Object.getOwnPropertyNames()` 返回对象实例的常规属性数组，`Object.getOwnPropertySymbols` 返回对象实例的符号属性数组。这两个方法的返回值彼此互斥。
+ `Object.getOwnPropertyDescriptors` 会返回同时包含常规和符号属性描述符的对象。`Reflect.ownKeys()` 回返回两种类型的键。

```javascript
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
```

+ 因为符号的属性是堆内存中符号的一个引用，所以直接创建并用作属性的符号不会丢失。但是，如果没有显式的保存对这些属性的引用，那么必须遍历对象的所有符号属性才能找到响应的符号属性。

```javascript
let o = {
    [Symbol('foo')]: 'foo val',
    [Symbol('bar')]: 'bar val'
}
console.log(o); // {Symbol(foo): "foo val", Symbol(bar): "bar val"}

let barSymbol = Object.getOwnPropertySymbols(o).find(symbol => symbol.toString().match(/bar/));
console.log(barSymbol); // Symbol(bar)
```



### 常用内置符号

+ ES6 也引入了一批常用内置符号（well-known symbol），用于暴露语言内部行为，开发者可以直接访问、重写或模拟这些行为。这些内置符号都以 Symbol 工厂函数字符串属性的形式存在。
+ 这些内置符号最重要的用途直以是重新定义它们，从而改变原生结构的行为
+ 比如， `for-of` 循环会再相关对象上使用 `Symbol.iterator` 属性，那么就可以通过再自定义对象上重新定义 `Symbol.iterator` 的值，来改变 `for-of` 在迭代该对象时的行为。
+ 这些内置符号也没有什么特别之处，它们就时全局函数 Symbol 的普通字符串属性，只想一个符号的实例。所以内置符号属性都是不可写、不可枚举、不可配置的。



### Symbol.asyncIterator

...省略（47.5）



### Symobl.hasInstance

+ 根据 ECMA 规范，这个符号作为一个属性表示“一个方法，该方法决定一个构造器对象是否认可一个对象是他的实例。由 `instanceof` 操作符使用”。`instanceof` 操作符可以用来确定一个对象实例的原型连上是否有原型。
+ 在 ES6 中， `instanceof` 操作符会使用 `Symbol.hasInstance` 函数来确定关系。以 `Symbol.hasInstance` 为键的函数会执行同样的操作，只是操作数对调了一下

```javascript
function Foo() { }
class Bar { }
let foo = new Foo();
let bar = new Bar();

console.log(foo instanceof Foo); // true
console.log(bar instanceof Bar); // true

console.log(Foo[Symbol.hasInstance](foo)); // true
console.log(Bar[Symbol.hasInstance](bar)); // true
```

+ 这个属性定义在 `Function` 的原型上，因此默认在所有函数和类上都可以调用。由于 `instanceof` 操作符会在原型链上寻找这个属性定义，就跟在原型链上寻找其他属性一样，因此可以在继承的类上通过静态方法重新定义这个函数。

```javascript
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
```

