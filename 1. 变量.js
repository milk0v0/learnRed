function test() {
    // b 会变成全局作用域
    var a = b = 1;
    console.log(b);
    // b 是 test 的局部作用域
    var a = 1, b = 2;
    // 以上两条都写时，b由上至下执行，b为局部
    console.log(b);
    {
        // let\const 声明也可用，缩写
        let c = 1,
            d = 1;
        let c1 = c2 = 5
        console.log(d);
    }
    // console.log(d);
    const e = 123,
        f = 456
    // f = 852
}
test()
console.log(c2);
// console.log(b);

// 总结：let 和 const 的变量声明规则跟 var 一致，作用域不同

var abc = 23;
let cba = 54;
console.log(window['abc']);
console.log(window['cba']); // undefined

{
    try {
        if (typeof meiyou) {
            let meiyou // 将锁死在 {} 内
        }
        let meiyou = 8;
    } catch (err) {
        console.log(err); // Cannot access 'meiyou' before initialization
    }
    // console.log(typeof meiyou);
}

// for (const index = 0; index < 7; index++) {
//     console.log(index);
// }
