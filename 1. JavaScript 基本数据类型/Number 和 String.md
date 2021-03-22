## 关于 Number

### 进制问题

1. 直接书写为十进制

2. 八进制前缀为 `0`，然后是 0~7；
   - 如070 -> 56，而 070.5 则会报错；
   - 0 后面数字 >= 8 时会重新当成十进制处理；
   - 八进制面两在严格模式无效，js引擎 会抛出语法错误
   
3. 十六进制前缀为 `0x`，然后是十六进制数字（0~9 和 A~F），字母不区分大小写；0xA -> 10

4. 因为储存 浮点值 使用的内存空间是存储 整数值 的两倍，所以 ECMA 总会想把值转换成整数
   
   - 如 1. -> 1；10.0 -> 10
   



### 浮点问题

+ 对于非常的或非常小的数值，浮点值 可以用科学计数法来表示

   - 用于表示一个应该乘以 10 的给定次幂的数值
   - ECMA 要求一个数值（整数或浮点）后跟一个大写或小写的字母 e，在加上要乘 10 的多少次幂
   - 例如：3.125e7 -> 31250000；3e-17 -> 0.000 000 000 000 000 03
   - 默认情况下，ECMA 会将小数点后至少包含 6个0 的浮点 转换成科学计数法
   - 浮点值得精确度最高可达 17 位小数，但在算数计算中远不如整数精确。因此永远不要测试某个特定的浮点值。

```javascript
// 使用 IEEE 754 数值，其他使用相同格式的语言也会有此问题
if (0.1 + 0.2 === 0.3) { // false -> 0.30000000000000004
    // so don't do that
}

console.log((1 + 2) * 0.1 === 3 * 0.1); // √
```

   

### 值的范围

1. 因内存的限制，ECMA 并不支持世界上所有的数值。
2. 最小值保存在 `Number.MIN_VALUE` 中，最大值保存在 `Number.MAX_VALUE` 中
3. min 大多为 5e-324；max 大多为 1.797 693 134 862 315 7e+308
4. 如果超出可表示范围，那么这个值会自动转换成一个特殊的值 `Infinity` 或 `-Infinity`
5. 如计算返回  `Infinity` 或 `-Infinity` ，则该值不能再进一步用于任何计算。这时因为 `Infinity` 没有可用于计算的数值表示形式
6. 要确定一个值是否有限大，可使用 `isFinite` 函数
7. 使用 `Number.POSITIVE_INFINITY` 和 `Number.NEGATIVE_INFINITY`可获取正、负 `Infinity`



### NaN

1. Not A Number，并非报错
2. 所有使用 NaN 进行计算操作始终返回 NaN
3. NaN 不等于包括 NaN 在内的任何值
4. `isNaN` 函数可用于判断 是否为 NaN
5. `isNaN` 可用于测试对象。此时会先调用 对象的 `valueOf()` 确定返回的值是否可以转换为数值。如果不能，再调用 `toString()` 方法并测试返回值
6. 如 `isNaN` 内不是数字，测试得出传参遵循 `Number()` 转换

```javascript
[-|+]0/[-|+]0 // NaN
5/0 // Infinity
5/-0 // -Infinity
NaN == NaN // false
isNaN(' ') // false
isNaN({}) // true
isNaN('string') // true
```



### 数值转换

1. `Number()`

    ```javascript
    Number(true) // 1
    Number(false) // 0
    Number(null) // 0
    Number(undefined) // NaN
    Number('1') // 1
    Number(0xA) // 10
    Number('string') // NaN
    Number({}) // NaN 会先调用 对象的 valueOf() 确定返回的值是否可以转换为数值。如果转换结果是 NaN，则调用 toString() 再转换
    ```

2. `parseInt()`

    - 考虑到 `Number()` 转换字符串有点反常规，通常再需要得到整数时可以有限使用 `parseInt()`
    - `parseInt()` 接收第二个参数，用于指定底数（进制）
    - 第二参数如不传，则 `parseInt()` 会自己决定如何解析，为了避免错误，建议始终传给他第二参数

    ```javascript
    parseInt('A') // NaN
    parseInt(0xA) // 10
    parseInt('0xA') // 10
    parseInt('A', 16) // 10
    ```

3. `parseFloat()`

    - 字符串只解析十进制值，十六进制始终为 0，无第二参数

    ```javascript
    parseFloat(0xA) // 10
    parseFloat('0xA') // 0
    parseFloat(070) // 56
    parseFloat('070') // 70
    ```

4. 隐式转换 -> +'10' // 10



## 关于string

### 字符字面量

1. 字符字面量 - 字符串数据类型包含一些字符字面量，用于表示非打印字符或有其他用途的字符

| 字面量 | 含义                                                         |
| ------ | ------------------------------------------------------------ |
| \n     | 换行                                                         |
| \t     | 制表                                                         |
| \b     | 退格                                                         |
| \r     | 回车                                                         |
| \f     | 换页                                                         |
| \\\    | 反斜杠（\）                                                  |
| \\'    | 单引号（'），在字符串以单引号标识时使用，例如'He said, \\'hey.\\'' |
| \\"    | 双引号（"），在字符串以双引号标识时使用，例如"He said, \\"hey.\\"" |
| \\`    | 与'"一致，md打不出来                                         |
| \xnn   | 以十六进制编码 nn 表示的字符（其中 n 时十六进制数字 0~F），例如 \x41 表示 "A" |
| \unnn  | 以十六进制编码 nnn 表示的 Unicode 字符（其中 n 时十六进制数字 0~F），例如 \03a3 表示 "Σ" |

2. 这些字符字面量可以出现在字符串中的任意位置，切可以作为单个字符被解释

```javascript
const str = 'This is the letter sigma: \u03a3.';
str.length // 28
```

3. `string.length` 可获取字符串长度 - 如果字符串包含双字节字符，那么 length 返回的值可能不是准确的字符数 - 即返回的是我们看到的长度



### useless but Interesting

+ ECMA 中的字符串是不可变的，以但创建，他们的值就不能变了。如修改某个变量的字符串值，必须先销毁原始的字符串，然后将包含新值的另一个字符串保存到该变量

```javascript
let lang = 'Java';
lang = lang + 'Script';
// 整个过程会先分配一个足够容纳 10 个字符的空间，然后填上 'Java' 和 'Script'。然后销毁原来的字符串。这些处理都在后台发生。
```



### 转换字符串

1. `toString()`

   - 几乎所有的值都有 `toString` 方法
   - null、undefined 没有 `toString` 方法
   - `toString()` 可接收一个底数（进制）作为参数 - 例如：let num = 10; num.toString(2) // '1010'

2. `String()`

   - 如果不确定一个值是不是 null 或 undefined，可以通过 `String()` 转换

   ```javascript
   String(null) // 'null'
   String(undefined) // 'undefined'
   ```

3. 隐式转换 - '' + 1 // '1'



### 模板自变量`注意点

```javascript
`first line second line`.length // 22
`first line
            second line`.length // 34
`
first line`[0] === '\n' // true
console.log(`first line
            second line`);
/* first line
            second line*/
```

+ 模板字面量不是字符串，而是一种特殊的 JavaScript 句法表达式，只不过求值后得到的是字符串。
+ 所有通过字符串插值都会使用 `toString()` 强制转型为字符串，如果嵌套的模板字符无需转义

```javascript
let foo = { toString: () => 'World' };
console.log(`hello, ${foo}`); // Hello, World
```



### <span id="tagFunction">模板字面量标签函数</span>

+ 模板字面量支持定义标签函数（tag function），通过标签函数可以自定义插值行为。

```javascript
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
```

+ 对于有 n 个插值的模板字面量，传给标签函数的表达式参数个数始终是 n，而传给标签函数的第一个参数所包含的字符串个数则始终是 n + 1。我们如果要像拼接起来作为默认返回字符串，可以这么做

```javascript
function simpleTag(strings, ...expressions) {
    return `${strings[0]}${expressions.map((item, index) => `${item}${strings[index + 1]}`).join('')}`
}
let a = 6;
let b = 9;

let taggedResult = simpleTag`${a} + ${b} = ${a + b}`; // 6 + 9 = 15
```



### 原始字符串

+ 使用模板字面量可以直接获取原始模板字面量内容（如换行符或 Unicode 字符），而不是被转换后的字符表示。
+ 我们可以使用默认的 String.raw 标签函数
+ 但是此方法对于实际的换行是不起作用的，它们不会被转成转义序列的形式
+ 我们也可以通过[标签函数](#tagFunction)的第一个参数，即字符串数组的 `.raw` 属性取得每个字符的原始内容 

```javascript
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
```
