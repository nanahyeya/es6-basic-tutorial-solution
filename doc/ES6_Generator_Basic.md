### 1. Generator
* 다양한 곳에서 Iterator를 사용할 수 있지만 아마도 Iterator를 가장 효율적으로 사용하는 방식이 바로 Generator일 것이다.   
* Generator는 Iterator를 사용하여 실행을 제어하는 함수이며 Generator는 Iterator를 발생시키는 함수로도 사용됩니다.   
* 일반적인 함수는 호출하고 나면 제어권을 함수에게 빼앗긴다. 함수가 종료될 때까지 해당 함수를 핸들링 할 수 없다.   

* Generator 함수를 이용하면 함수의 실행을 조절할 수 있다. 일시정지 하거나 다시 시작 하거나 하는 등 함수의 실행을 제어할 수 있다. 마치 파이프 라인 같이 단계가 나뉘어 진다고 보면 된다.   

Generator 함수는 일반 함수와는 두가지 다른 점이 있다.   
* 첫째 function 키워드 뒤에 *를 붙여준다. 
* 둘째 return 외에도 yield를 사용할 수 있다.

**간단한 카운트 다운 Generator 함수**
```js
//countDown 함수는 제너레이터 함수 
function* countDown() {
  yield 5;
  yield 4;
  yield 3;
  yield 2;
  yield 1;
}
//it은 제너레이터 오브젝트
const it = countDown();
```
**console.log를 찍어보면 아래와 같은 결과가 나온다.**
```js
console.log(it.next()); // { value: 5, done: false }
console.log(it.next()); // { value: 4, done: false }
console.log(it.next()); // { value: 3, done: false }
console.log(it.next()); // { value: 2, done: false }
console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: undefined, done: true }
```
함수의 실행이 순차적으로 진행되었다. next를 호출하지 않으면 실행 중간에 멈추게 된다.   

**Generator 오브젝트가 가지고 있는 3가지 메서드와 yield 키워드**
##### yield
yield는 제너레이터를 멈추거나 다시 실행하는데 사용된다.   
제너레이터 함수에서는 yield 키워드가 있을 때 까지 실행되므로 yield 이전에 있는 구문들의 실행을 멈출수는 없다.   
```js
function* catchMe() {
  console.log("You can't catch me");
  console.log("I'm working");
  console.log("Can you catch me?");

  yield "I catch you";

  console.log("I'm not working");
}

const it = catchMe();
it.next();
```
console을 확인해 보면 yield 키워드가 위치한 이전까지 실행된 것을 확인할 수 있다.   

yield 이외에도 yield* 키워드도 있는데, yield를 일괄 처리 해준다.   
```js
function* generateAll() {
  yield* ["Call", "Me"];
}

const it = generateAll();

console.log(it.next()); // { value: 'Call', done: false }
console.log(it.next()); // { value: 'Me', done: false }
```
##### next(value) 함수
Iterator에서 활용된 next()를 Generator에서도 동일한 개념으로 사용할 수 있다. 다른 점은 next를 통해 값을 Generator로 전달할 수 있다는 점이다.   
```js
function *myGen() {
console.log("1. code before first yield");
    const x = yield 1;       // x = 10
console.log("3. code before the second yield" + x);
    const y = yield (x + 1); // y = 20
console.log("5. code before the third yield" + y);
    const z = yield (y + 2); // z = 30
console.log("7. code before return" + z);
    return x + y + z;
}

const myItr = myGen();
console.log('2. ' + myItr.next().value);   // {value:1, done:false}
console.log('4. ' + myItr.next(10).value); // {value:11, done:false}
console.log('6. ' + myItr.next(20).value); // {value:22, done:false}
console.log('8. ' + myItr.next(30).value); // {value:60, done:true}
```

해당 함수를 실행하면 아래와 같이 출력된다.   
```js
"1. code before first yield"
"2. 1"
"3. code before the second yield10"
"4. 11"
"5. code before the third yield20"
"6. 22"
"7. code before return30"
"8. 60"
```
next()를 호출할 때 인수로 값을 지정하면 yield 키워드가 있는 대입문에 값이 할당되는 것을 볼 수 있다.   
이런 식으로 제너레이터와 호출자는 서로 제어권 뿐만 아니라 데이터까지 주고 받을 수 있다.   

##### return
yield 문은 return을 사용하지 않으면 Generator를 끝내지 않는다.   
return을 사용 할 경우 yield 문이 남아 있더라도 Generator를 종료하고 값을 반환 한다는 뜻이다.  

```js
function* finish() {
  const a = yield;
  const b = yield a;
  const c = yield b;
  return c;
}

const it = finish();

console.log(it.next());
console.log(it.next(10));
console.log(it.return(30));
console.log(it.next(20));
```

해당 함수를 실행하면 아래와 같이 출력된다.
```js
{ value: undefined, done: false }
{ value: 10, done: false }
{ value: 30, done: true }
{ value: undefined, done: true }
```

만약 return 메서드를 활용하지 않고 next를 사용할 경우는 아래와 같은 결과가 나온다.   
```js
console.log(it.next()); // { value: undefined, done: false }
console.log(it.next(10)); // { value: 10, done: false }
console.log(it.next(30)); // { value: 30, done: false }
console.log(it.next(20)); // { value: 20, done: false }
```
##### throw
throw는 return과 마찬가지로 실행 즉시 종료 시키며 다른 점은 Error를 발생시킨다는 점이다.   
```js
function* warning() {
  try {
    yield 10;
    yield 20;
    yield 30;
  } catch (error) {
    console.error(error);
  }
}

const it = warning();

console.log(it.next()); // { value: 10, done: false }
console.log(it.throw("Whoops.."));
// Whoops..
console.log(it.next()); // { value: undefined, done: true }
console.log(it.next()); // { value: undefined, done: true }
```
제너레이터를 사용할때 try...catch문으로 에러를 잘 핸들링 하는 것이 중요하다.   

##### generator examples
* **일련의 비동기 작업을 순서대로 수행하기**
```js
function *orderCoffee(phoneNumber) {
  const id = getId(phoneNumber);
  yield id;
  const name = getName(id);
  yield name;
  const email = getEmail(name);
  yield email;
  return order(name, "coffee");
}

function getId(phoneNumber) { return "AA0123"; }
function getName(id) { return "홍길동"; }
function getEmail(name) { return "gildong@aa.com"; }
function order(name, drink) { return `${name}님, ${drink} 나왔습니다.` }

function run(foo) {
  const iterator = foo("010-1234-5678");
  const id = iterator.next();
  console.log(`ID : ${id.value}`);
  const name = iterator.next();
  console.log(`Name : ${name.value}`);
  const email = iterator.next();
  console.log(`Email : ${email.value}`);
  const order = iterator.next();
  console.log(`Order : ${order.value}`);
}
run(orderCoffee);
```

* **next()를 호출하는 패턴을 단순화하기**
```js
function run(foo, phoneNumber) {
  const task = foo(phoneNumber);
  let result = task.next();
  console.log(result.value);
  function step() {
    if ( !result.done ) {
    result = task.next(result.value);
    console.log(result.value);
    step();
  }
  }
  step();
}

run(orderCoffee, "010-1234-5678")
```
