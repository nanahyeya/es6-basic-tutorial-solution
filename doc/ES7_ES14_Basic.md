## 1. ES7(2016)
#### 1) Array.prototype.includes() 
[mdn: includes() function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)   
배열 내에 값이 있는지 없는지 확인   
값이 있으면 true, 없으면 false 를 반환   
```js
console.log([1, 2, 3].includes(2)); //true
console.log([1, 2, 3].includes(4)); //false

console.log([1, 2, NaN].includes(NaN)); //true

console.log([1, 2, -0].includes(+0)); //true
console.log([1, 2, +0].includes(-0)); //true

console.log(["a", "b", "c"].includes("a")); //true
console.log(["a", "b", "c"].includes("a", 1)); //false
```

#### 2) Exponentiation Operator(제곱연산자)
```js
let cubed = 2 ** 3;
// same as: 2 * 2 * 2
console.log(cubed); //8

let a = 2;
a **= 2;
// same as: a = a * a;
console.log(a); //4

let b = 3;
b **= 3;
// same as: b = b * b * b;
console.log(b); //27
```
## 2. ES8(2017)
#### 1) Async & Await
ES2017에서 async 와 await의 추가로 Promise Chaining을 마치 동기적인 코드를 작성하듯이 비동기 로직을 쓸 수 있게 되었다.   
[mdn: async function](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)   
[mdn: await function](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/await)   

**using Promise Chaining**
```js
function printMyInfo(userId) {
  fetch(`https://api.github.com/users/${userId}`)
    .then((res) => res.json())
    .then((res) => console.log(res));
}
printMyInfo(id);
```
**using async await**
함수 앞에 async라는 키워드와 응답을 기다리는 부분에 await이라는 키워드를 사용하여 마치 동기적인 코드를 작성 하듯이 쓸 수 있게 되었다.   
```js
async function printMyInfo(userId) {
  let response = await fetch(`https://api.github.com/users/${userId}`);
  response = await response.json();
  console.log(response);
}
printMyInfo(id);
```
#### 2) Object.values / Object.entries
values 매소드는 객체 내 모든 value 값들을 배열 형태로 반환   
entries 메소드는 객체 내 key,value를 묶어서 배열 형태로 반환   
[mdn: Object.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)   
[mdn: Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)   

```js
const person = {
  name: "Dooly",
  age: 18,
  class: 4,
};

console.log(Object.values(person)); //["Dooly", 18, 4] 
console.log(Object.entries(person));//[["name", "Dooly"], ["age", 18], ["class", 4]] 
```
#### 3) String Padding
문자열에 여백 or 문자를 추가할 수 있는 메소드 padStart , padEnd   
[mdn: String.prototype.padStart()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)   
[mdn: String.prototype.padEnd()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)   

```js
let name = 'Hello';
let targetLength = 7;
let padString = ' ';

console.log(name.padStart(targetLength, padString)); // 앞
console.log(name.padEnd(targetLength, padString)); // 뒤
//targetLength : 목표 문자열 길이, 현재 문자열의 길이보다 작다면 값 그대로 반환
//padString: 현재 문자열에 채워넣을 다른 문자열. 기본값은 ""
//return 값 : 바뀐 문자열

console.log('abc'.padStart(10));         // "       abc"
console.log('abc'.padStart(10, "foo"));  // "foofoofabc"
console.log('abc'.padStart(6,"123465")); // "123abc"
console.log('abc'.padStart(8, "0"));     // "00000abc"
console.log('abc'.padStart(1));          // "abc"

console.log('abc'.padEnd(10));          // "abc       "
console.log('abc'.padEnd(10, "foo"));   // "abcfoofoof"
console.log('abc'.padEnd(6, "123456")); // "abc123"
console.log('abc'.padEnd(1));           // "abc"
```
#### 4) Object.getOwnPropertyDescriptors
기존에 존재하던 Object.getOwnPropertyDescriptor에 s가 붙음   
기존 Object.getOwnPropertyDescriptor는 객체와 속성명을 인자로 받아서 해당 속성의 속성 설명자를 반환   
Object.getOwnPropertyDescriptors는 객체만 인자로 받아 해당 객체 내 자신의 모든 속성 설명자를 반환한다   
모든 프로퍼티의 디스크립터인 value, writable, enumerable, configurable 을 반환한다.

[mdn : getOwnPropertyDescriptors()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors)
```js
const person = {
  name: "Dooly",
  age: 18,
  class: 4,
};
console.log(Object.getOwnPropertyDescriptor(person,"name"));
/*
[object Object] {
  configurable: true,
  enumerable: true,
  value: "Dooly",
  writable: true
}
*/
console.log(Object.getOwnPropertyDescriptors(person));
/*
[object Object] {
  age: [object Object] {
    configurable: true,
    enumerable: true,
    value: 18,
    writable: true
  },
  class: [object Object] {
    configurable: true,
    enumerable: true,
    value: 4,
    writable: true
  },
  name: [object Object] {
    configurable: true,
    enumerable: true,
    value: "Dooly",
    writable: true
  }
}
*/
```
#### 4) Trailing commas(final commas)
javascript는 초기 부터 배열에 final commas가 허용 되었다. ES8부터는 함수의 매개변수에도 허용 되었다.   
(단 JSON에서는 허용되지 않음)   
final commas를 쓰면 새로운 엘리먼트, 매개변수, 속성을 추가할 때 유용하고 수정 없이 복사해서 쓸 수 있음   
이 외에도 버전 관리 이력이 간단하고 코드 편집이 더 편해진다는 장점이 있습니다.   
```js
//Array
var arr = [1,2,3,];

//Object
var object = {
  foo: "bar",
  baz: "qwerty",
  age: 42,
};
//function parameter, argument
//아래 묶인 코드는 모두 유효하며 서로 같음
function f(p) {}
function f(p,) {}

f(p);
f(p,);

Math.max(10, 20);
Math.max(10, 20,);
```
## 3. ES9(2018) 
#### 1) Rest/Spread Properties(객체 리터럴에서의 전개)
객체 리터럴에서도 전개 구문이 가능해 졌다. 전개구문이란 배열이나 문자열과 같은 iterable(반복 가능)한 Object를 전개하는 것이다.   
배열에서 사용되던 rest/spread 문법이 객체에서도 사용 가능하게 되었다.   
[mdn : Spread Syntax(...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)   

```js
const num =[1,2,3]
console.log(...num) //1 2 3

//함수 호출에서의 전개
function myFunction(x, y, z) {}
var args = [0, 1, 2];
myFunction(...args);

//객체 리터럴에서의 전개(ES9 추가)
var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };

var clonedObj = { ...obj1 };
// Object { foo: "bar", x: 42 }

var mergedObj = { ...obj1, ...obj2 };
// Object { foo: "baz", x: 42, y: 13 }
```
#### 2) Promise.prototype.finally
promise에 finally과 추가 되었다. 기존엔 then 과 catch만 있었으나 finally는 성공 여부에 관계없이 promise 객체를 반환함.   
[mdn : Promise.prototype.finally()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)   

```js
let isLoading = true;

fetch(myRequest).then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.includes("application/json")) {
      return response.json();
    }
    throw new TypeError("Oops, we haven't got JSON!");
  })
  .then(function(json) { /* process your JSON further */ })
  .catch(function(error) { console.log(error); })
  .finally(function() { isLoading = false; });
```

## 4. ES10(2019)
#### 1) Optional catch binding
try,catch 구문을 쓸 때 원래 catch의 매개변수가 꼭 있어야 했지만 ES10 부터 선택적으로 바뀜   
[mdn: try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

```js
try {
  doSomethingThatMightThrow();
} catch (exception) {
  //     ^^^^^^^^^
  // We must name the binding, even if we don’t use it!
  handleException();
}
//ES10
try {
  doSomethingThatMightThrow();
} catch { // → No binding!
  handleException();
}
```
#### 2) Symbol.prototype.description
이전에 Symbol의 내용을 보려면 아래와 같이 작성하였다.   
[mdn: Symbol.prototype.description](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/description)   

```js
const symbol = Symbol('foo');
console.log(symbol.toString()); //"Symbol(foo)"
console.log(symbol.toString().slice(7, -1)); //"foo"
```
Symbol.prototype.description 사용
```js
const symbol = Symbol('foo');
console.log(symbol.description); //"foo"
```
#### 3) Object.fromEntries()
ES8에서 도입된 Object.entries와 호환 되는 메소드이다. entries를 통해 만들어진 배열을 인자로 받아 다시 객체로 만들어 준다.   
[mdn: Object.fromEntries()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)   

```js
const person = {
  name: "Dooly",
  age: 18,
  class: 4,
};
const entries = Object.entries(person);
console.log(entries);  
//[["name", "Dooly"], ["age", 18], ["class", 4]]

const fromEntries = Object.fromEntries(entries);
console.log(fromEntries);
/*
[object Object] {
  age: 18,
  class: 4,
  name: "Dooly"
}
*/
```
#### 4) String.prototype.trimStart()/trimEnd()
문자열의 앞, 뒤 공백을 제거해 준다.   
trimStart는 trimLeft로, trimEnd는 trimRight라는 별칭으로 쓸 수 있음.   
[mdn : String.prototype.trimStart()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart)   
[mdn : String.prototype.trimEnd()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd)   

```js
const greeting = '   Hello world!   ';
console.log(greeting.trimStart());
// expected output: "Hello world!   ";
console.log(greeting.trimEnd());
// expected output: '   Hello world!';
```
#### 5) Array.prototype.flat()
flat() 메서드는 모든 하위 배열 요소를 지정한 깊이까지 재귀적으로 이어붙인 새로운 배열을 생성합니다.   
[mdn : flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

```js
const arr1 = [1, 2, [3, 4]];
console.log(arr1.flat());
// [1, 2, 3, 4]

const arr2 = [1, 2, [3, 4, [5, 6]]];
console.log(arr2.flat());
// [1, 2, 3, 4, [5, 6]]

const arr3 = [1, 2, [3, 4, [5, 6]]];
console.log(arr3.flat(2));
//flat(depth) [1, 2, 3, 4, 5, 6]

const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
console.log(arr4.flat(Infinity));
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const arr5 = [1, 2, , 4, 5];
console.log(arr5.flat());
// [1, 2, 4, 5]
```
#### 6) Array.prototype.flatMap()
flatMap()은 flat와 Map 함수를 합친 것이다. 먼저 배열의 각 엘리먼트에 map 수행 한 후에 flat을 수행한다.   
[mdn : flatMap()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)   

```js
let arr1 = [1, 2, 3, 4];

//map() vs flatMa()
console.log(arr1.map(x => [x * 2]));
// [[2], [4], [6], [8]]

console.log(arr1.flatMap(x => [x * 2]));
// [2, 4, 6, 8]

console.log(arr1.map(x => [[x * 2]]));
//[[[2]], [[4]], [[6]], [[8]]]

// 한 레벨만 평탄화됨
console.log(arr1.flatMap(x => [[x * 2]]));
// [[2], [4], [6], [8]]

const arr1 = ["it's Sunny in", "", "California"];

let result1 = arr1.map((x) => x.split(" "));
console.log(result1);
// [["it's","Sunny","in"],[""],["California"]]

let result2 = arr1.flatMap((x) => x.split(" "));
console.log(result2);
// ["it's","Sunny","in", "", "California"]
```
## 5. ES11(2020)
#### 1) Optional Chaining
참조를 할 때 값이 있는 지 없는 지 검증할 때 Optional chaining을 쓰면 참조가 null or undefined일 때 에러 대신 undefined를 반환해 준다.   
[mdn: Optional chaining (?.)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)   

**default**
```js
//default
const person = {
  name: "Dooly",
  age: 18,
  class:4,
  personality:{
      habit:"sports"
  }
};

const person2= {
    name:"Dooly",
    age:18,
    class:4
}

function printClass(person){
    console.log(person.personality.habit)
}
printClass(person); //sports
printClass(person2); //error
```

**Optional Chaining**
```js
//Optional Chaining
const person = {
  name: "Dooly",
  age: 18,
  class:4,
  personality:{
      habit:"sports"
  }
};

const person2= {
    name:"Dooly",
    age:18,
    class:4
}

function printClass(person){
    console.log(person?.personality?.habit)
}
printClass(person); //sports
printClass(person2); //undefined
```
#### 2) Nullish Coalescing Operator
주로 기본값을 할당할 떄 || 연산자를 활용했음  그러나 0,' ' 같은 값들이 들어갈 때 의도대로 작동하지 않을 수 있음   
[mdn: nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
```js
const name =""
const userName = name || 'Guest';
console.log(userName); //Guest

const num = 0;
const message = num || 'undefined';
console.log(message); //undefined
```
nullish coalescing operator를 이용하면 값이 null 이나 undefined인 경우에만 기본 값을 할당해 줄 수 있다.   
or 연산자 보다는 Nullish coalescing Operator를 사용하자.   
```js
const name =""
const userName = name ?? 'Guest';
console.log(userName); // ""

const num = 0;
const message = num ?? 'undefined';
console.log(message); // 0

const email = undefined
const emailValue = email ?? 'aa@bb.com';
console.log(emailValue); // "aa@bb.com"

const addr = null
const addrValue = addr ?? 'Korea';
console.log(addrValue); // "Korea"
```

#### 3) globalThis
기존에는 js 실행환경에 따라서 global 객체에 접근하는 방법이 달랐음   
브라우저에서는 window, self, frame 사용, Node에서는 global, Web Worker(Web Worker는 script 실행을 메인 쓰레드가 아니라 백그라운드 쓰레드에서 실행할 수 있도록 해주는 기술 입니다.)에서는 self를 통해서 접근 했었음.     
globalThis를 이용하면 모든 환경에서 접근 가능하다.   
[mdn: globalThis](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/globalThis)   

```js
// 브라우저 실행 환경 기준
 globalThis === window // true
```

## 6. ES12(2021)
#### 1) String.prototype.replaceAll()
기존에 있던 replace에서 추가된 것으로 문자열에서 바꿀 문자를 모두 찾아 새로운 문자로 바꿔준다.  
[mdn: String.prototype.replaceAll()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)   

Before
```js
//RegExp(pattern, flags?) flags의 'g' 는 문자열 전체를 확인한다.
let str = 'hotdog dog'.replace(new RegExp('dog','g'), 'cat');
console.log(str) //output: hotcat cat
```   
After
```js
let str = 'hotdog dog'.replaceAll('dog', 'cat');
console.log(str) //output: hotcat cat
```
#### 2) Promise.any()
여러개의 promise 중에서 하나라도 resolve 되면 resolve 되어진다.   
[mdn : Promise.any()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)   

```js
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value)); //"quick"
```
#### 3) Logical assignment operators
(??, &&,||) 도 a += 2 처럼 할당 연산자 사용 가능하다.   
[mdn: Logical OR assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment)   

```js
expr1 ||= expr2 // expr1 || expr2
expr1 &&= expr2 // expr1 && expr2
expr1 ??= expr2 // expr1 ?? expr2

const a = { duration: 0, title: '' };

a.duration ||= 10;
console.log(a.duration);
// Expected output: 10

a.title ||= 'title is empty.';
console.log(a.title);
// Expected output: "title is empty"
```
#### 4) Separators for numeric literals
이제 큰 숫자 구분을 _를 사용 할 수 있다.
```js
const number = 1_000_000;
const money = 1_000_000.123_456;
const octal = 0o123_123;
```
#### 5) Private class methods
private 메서드 및 속성을 생성할 수 있습니다. 식별자로 해시(#)를 붙여야 합니다.
```js
class Auth {
  #getToken() {
   return "12345678";
  }
  isAuth() {
   return this.#getToken();
  }
}
const auth = new Auth();
auth.getToken(); //output: auth.getToken is not a function
auth.isAuth(); //output: 12345678
```

```js
class Auth {
   get #getToken() {
    return localStorage.getItem('token');
   }
   set #setToken(token) {
    localStorage.setItem('token', token);
   }
   set login(token) {
    this.#setToken = token;
   }
   get isAuth() {
    return this.#getToken;
   }
}
let token = '12345678';
const auth = new Auth();
auth.login = token;
auth.isAuth; //output: 12345678
```

## 7. ES13(2022)
#### 1) Class Field Declarations
* Before ES13
```js
class Car {
  constructor() {
    this.color = 'blue';
    this.age = 2;
  }
}

const car = new Car();
console.log(car.color); // blue
console.log(car.age); // 2
```

* ES13
```js
class Car {
  color = 'blue';
  age = 2;
}

const car = new Car();
console.log(car.color); // blue
console.log(car.age); // 2
```

#### 2) Private Methods and Fields
```js
class Person {
  #firstName = 'Joseph';
  #lastName = 'Stevens';

  get name() {
    return `${this.#firstName} ${this.#lastName}`;
  }
}

const person = new Person();
console.log(person.name);

// SyntaxError: Private field '#firstName' must be
// declared in an enclosing class
console.log(person.#firstName);
console.log(person.#lastName);
```

#### 3) Static Class Fields and Static Private Methods
```js
class Person {
  static #count = 0;

  static getCount() {
    return this.#count;
  }

  constructor() {
    this.constructor.#incrementCount();
  }

  static #incrementCount() {
    this.#count++;
  }
}

const person1 = new Person();
const person2 = new Person();

console.log(Person.getCount()); // 2
```

#### 4) Class static Block
```js
class Vehicle {
  static defaultColor = 'blue';
}

class Car extends Vehicle {
  static colors = [];

  static {
    this.colors.push(super.defaultColor, 'red');
  }

  static {
    this.colors.push('green');
  }
}

console.log(Car.colors); // [ 'blue', 'red', 'green' ]
```

#### 5) at() Method for Indexing
```js
const arr = ['a', 'b', 'c', 'd'];

// 1st element from the end
console.log(arr[arr.length - 1]); // d

// 2nd element from the end
console.log(arr[arr.length - 2]); // c

const str = 'Coding Beauty';
console.log(str.at(-1)); // y
console.log(str.at(-2)); // t

const typedArray = new Uint8Array([16, 32, 48, 64]);
console.log(typedArray.at(-1)); // 64
console.log(typedArray.at(-2)); // 48
```

## 8. ES14(2023)
#### 1) Object.groupBy
하나의 배열을 조건에 따라 여러 개의 배열로 나누고 싶은 경우 groupBy메소드를 사용하면 쉽게 그룹을 나눌 수 있다.   
객체를 포함하고 있는 배열을 분류하는(categorize) 특정 키를 반환하는 함수를 전달해 줍니다.

* Before ES14
```js
const fruits = [
  { name: 'apple', quantity: 10 },
  { name: 'banana', quantity: 20 },
  { name: 'cherry', quantity: 10 }
];

const groupedByQuantity = {};
fruits.forEach(fruit => {
  const key = fruit.quantity;
  if (!groupedByQuantity[key]) {
    groupedByQuantity[key] = [];
  }
  groupedByQuantity[key].push(fruit);
});
console.log(groupedByQuantity)
```

결과 출력
```js
{
  '10': [{ name: 'apple', quantity: 10 }, { name: 'cherry', quantity: 10 }],
  '20': [{ name: 'banana', quantity: 20 }]
}
```

* ES14
```js
const groupedByQuantity = Object.groupBy(fruits, fruit => fruit.quantity);
console.log(groupedByQuantity);
```

#### 2) Temporal API
Temporal API는 기존의 Date 객체보다 더욱 강력한 날짜 및 시간 처리를 제공합니다.

* Before ES14
```js
const date = new Date('2024-10-30');
console.log(date.getFullYear()); // 2024
console.log(date.getMonth() + 1); // 10 (월은 0부터 시작)
console.log(date.getDate()); // 30
```

* ES14
```js
const date = Temporal.PlainDate.from('2024-10-30');
console.log(date.year); // 2024
console.log(date.month); // 10
console.log(date.day); // 30
```

#### 3) Array.toReversed(), Array.toSorted(), Array.toSliced(),   Array.with()
toSpliced()메서드는 원본 배열을 변경하면서 요소를 삭제하는 splice() 메소드 대신 원본 배열을 변경하지 않고 요소가 삭제된 복사된 배열을 얻을 수 있습니다.   
toSorted() 메서드는 원본 배열을 변경하면서 정렬하는 sort() 메소드 대신 원본 배열을 변경하지 않고 정렬이 가능합니다.   
toReserved() 메소드는 원본 배열을 변경하지 않고 배열을 뒤집을 수 있습니다.   

* toReversed()
```js
const months = ['January', 'February', 'March', 'April', 'May'];

// 이전 방법
const reversedMonths = months.reverse();
console.log(months); 
// ['May', 'April', 'March', 'February', 'January']; // 원래 배열이 변경됨

console.log(reversedMonths); 
// ['May', 'April', 'March', 'February', 'January'];

// toReversed() 사용
const reversedMonths = months.toReversed();
console.log(months); 
// ['January', 'February', 'March', 'April', 'May']; // 원래 배열은 변경되지 않음

console.log(reversedMonths);
 // ['May', 'April', 'March', 'February', 'January'];
```

* toSorted()
```js
const prime = [13, 7, 17, 2];

// 이전 방법
const sortPrime = prime.sort();
console.log(prime); // [2, 7, 13, 17]; // 원래 배열이 변경됨
console.log(sortPrime); // [2, 7, 13, 17];

// toSorted() 사용
const sortPrime = prime.toSorted();
console.log(prime); // [13, 7, 17, 2]; // 원래 배열은 변경되지 않음
console.log(sortPrime); // [2, 7, 13, 17];
```

* toSorted()
```js
const numbers = [1, 2, 3, 4, 5, 6];

// 이전 방법
const spliceNumbers = numbers.splice(4, 1);
console.log(numbers); // [1, 2, 3, 4, 6]; // 원래 배열이 변경됨
console.log(spliceNumbers); // [1, 2, 3, 4, 6];

// toSpliced() 사용
const sortPrime = prime.toSorted(4, 1);
console.log(prime); // [1, 2, 3, 4, 5, 6]; // 원래 배열은 변경되지 않음
console.log(sortPrime); // [1, 2, 3, 4, 6];
```

* with()
```js
const usernames = ['user1', 'user2', 'user3'];

// 이전 방법
usernames[1] = 'newUser';
console.log(usernames); // ['user1', 'newUser', 'user3']

// with() 사용
const updatedUsernames = usernames.with(1, 'newUser');
console.log(usernames); // ['user1', 'user2', 'user3'] // 원래 배열은 변경되지 않음
console.log(updatedUsernames); // ['user1', 'newUser', 'user3']
```


