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



