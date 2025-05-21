### 1. Iterator
Iterator는 자바스크립트 뿐만 아니라 다른 언어에도 있는 개념으로 일종의 루프를 생각하면 이해하기 쉽다.   
Array는 대표적인 Iterable 객체로서 Iterator를 사용 할 수 있다.   
Iterator는 단순히 루프를 순회하는 것이 아니라 현재 어디를 순회하고 있는지 알 수 있다.   

```js
const numbers = [1, 2, 3]; // 배열 생성
const it = numbers.values() // 이터레이터 생성
```
values 메서드를 사용하여 Iterator를 생성하였다.  
next를 사용 할 때 마다 그 다음 값으로 넘어 가며 모든 값을 순회하고 나면 done이 true로 나오며 끝난다.   
한번 끝난 Iterator는 다시 돌아 가지 않으며 value가 undefined로 리턴 한다.   
이 때문에 for-of 루프가 가능한 것이며 일반 오브젝트가 루프를 순회 할 수 없는 이유이기도 하다.   
오브젝트를 for-of로 루프를 순회하려고 하면 `obj is not iterable` 에러가 나온다.    
```js
const myObj = { a: 1, b: 2 };

for (item of myObj) {
  console.log(item);
}

// TypeError: myObj is not iterable
```

for~of문을 구현해 보면 아래와 같다.   
```js
const numbers = [1, 2, 3];

const values = numbers.values();
let item = values.next();

while(!item.done) {
  console.log(item.value);
  item = values.next();
}

for (let val of numbers) {
  console.log(val);
}
```

while문과 for-of 문은 동일한 동작을 한다.   
Iterable Object란 반복 가능한 오브젝트를 의미하여, Iterator란 이러한 반복을 정의한 규약이라고 할 수 있다.   
이 두가지를 포함한 개념을 이터레이션 프로토콜 이라 한다.   
Iterator란 프로토콜의 하나이므로 일반 오브젝트에 Iterator 프로토콜을 적용하면 Iterable 한 오브젝트로 만들 수 있다.      
이때 사용되는 것이 `Symbol.iterator`이다.   
Iterable 오브젝트로 만들려면 `Symbol.iterator`와 `value, done`이 포함된 오브젝트를 반환하는 `next 메서드`를 가진   
객체를 반환하면 된다.   

일반 Array와 Iterable 오브젝트를 비교해 보자.   

```js
const arr = [1, 2, 3];
const iterableObj = arr[Symbol.iterator]();
```
arr에는 일반적인 배열을 할당 하였고 iterableObj에는 Symbol.iterator를 호출하여 Iterator 오브젝트를 생성 하였다.   
arr은 `Array`이며 arr의 prototype은 `[[Prototype]]: Array(0)`   
iterableObj는 `Array Iterator`라는 이터레이터 오브젝트이다.   
iterableObj의 prototype은 `[[Prototype]]: Array Iterator`   

**Iterable 오브젝트로 만들어서 랭킹을 기록하는 Class**   
마라톤 대회에서 우승한 사람들의 순서를 Rank Class에 저장 하도록 만들었다.   
Rank Object 를 순회 하면서 순위를 보고 싶은데 Object는 루프를 순회 할 수 없어서 순위를 찍을 수가 없다.   
Array에 다시 집어넣거나 값에 직접 접근해야 할까? 이럴 때 활용 할 수 있는 것이 Iterator 프로토콜이다.   
우선 Symbol.iterrator 메서드를 추가하고 { value, done }을 리턴하는 next 메서드를 리턴하도록 만들면 된다.   

**Rank 클래스 선언**
```js
class Rank {
  constructor() {
    this.ranking = [];
  }

  add(winner) {
    const rank = this.ranking.length + 1;
    this.ranking.push({ winner, rank });
  }

  [Symbol.iterator]() {
    return this.ranking.values();
  }
}
```
**Rank 객체 생성**   
```js
const marathonRanking = new Rank();

marathonRanking.add("John");
marathonRanking.add("Lion");
marathonRanking.add("Gill");
marathonRanking.add("Muzi");

for (let ranking of marathonRanking) {
  console.log(`${ranking.rank}st winner is ${ranking.winner}`);
}
```
출력해보면 순서대로 순회하며 우승자를 찍어준다.   
```js
1st winner is John
2st winner is Lion
3st winner is Gill
4st winner is Muzi
```

**Rank 클래스 선언( values 메서드 포함 )**
```js
class Rank {
  constructor() {
    this.ranking = [];
  }

  add(winner) {
    const rank = this.ranking.length + 1;
    this.ranking.push({ winner, rank });
  }

  [Symbol.iterator]() {
    return this.ranking.values();
  }

  values() {
    return this.ranking.values();
  }
};

const marathonRanking = new Rank();

marathonRanking.add("John");
marathonRanking.add("Lion");
marathonRanking.add("Gill");
marathonRanking.add("Muzi");

const iterator = marathonRanking.values();
let rankObj = iterator.next();

while(!rankObj.done) {
  console.log(rankObj);
  const { winner, rank } = rankObj.value;
  console.log(`이름 = ${winner} 순위 = ${rank}`)
  rankObj = iterator.next();
}
```

로그를 저장하고 순서대로 보거나 재귀를 활용하는 등의 순회하는 데이터를 다룰때 Iterator는 유용하게 사용할 수 있다.   

### 2. Iterable Object
아래는 기본적인 Iterable 객체/타입들이다.   
1. Array
2. Set
3. Map - 원소들을 key/value 쌍으로 탐색한다.
4. DOM NodeList - Node객체들을 탐색한다.
5. primitive string - 각 유니코드 별로 탐색한다.   

Array(typed array 포함), Set, Map의 아래 메서드들은 Iterator를 반환한다.   
1. entries - key,value쌍 [key, value]
2. keys
3. values
이 메서드들에서 리턴되는 객체는 Iterable이면서 Iterator이다.   
Array에서 key는 인덱스들을 나타내며, Set에서는 key,value가 둘 다 value로 같다.   

#### 2.1 Iterable Consumers
다음 문법들은 Iterable을 사용한다.

**for-of loop**
```js
for (const value of someIterable) {
    // ...
}
```
**spread Operator**
```js
// Iterable의 모든 value들이 arr에 추가된다.
let arr = [firstElem, ...someIterable, lastElem];

// Iterable의 모든 value들이 arguments에 추가된다. 
someFunction(firstArg, ...someIterable, lastArg){};
```
**Positional Destructing**
```js
// Iterable의 첫 3개 값들이 저장된다.
let [a, b, c] = someIterable;
```

### 3. Making any object iterable
```js
const userNamesGroupedByLocation = {
  'Seoul': [
    '둘리',
    '길동',
    '야옹이',
  ],
  'Busan': [
    '순이',
    '똘이',
    '바둑이',
  ],
  'NewYork': [
    'Sonja',
    'Iwan',
    'Tanja',
  ],
};
console.log(userNamesGroupedByLocation);

const cityKeys = Object.keys(userNamesGroupedByLocation);
console.log(cityKeys);  //["Seoul", "Busan", "NewYork"]
console.log(userNamesGroupedByLocation[cityKeys[0]]); //["둘리", "길동", "야옹이"]
console.log(userNamesGroupedByLocation[cityKeys[0]][0]); //"둘리"

```
**Level1**
```js
userNamesGroupedByLocation[Symbol.iterator] = function() {
  return {
    next: () => {
      return {
        done: true,
        value: 'hi',
      };
    },
  };
};

const iterator = userNamesGroupedByLocation[Symbol.iterator]();
console.log(iterator.next().value); //hi
```

**Level2**
```js
userNamesGroupedByLocation[Symbol.iterator] = function() {
  const cityKeys = Object.keys(this);
  let cityIndex = 0;
  let userIndex = 0;

  return {
    next: () => {
      const users = this[cityKeys[cityIndex]];
      const user = users[userIndex];

      return {
        done: false,
        value: user,        
      };
    },
  };  
};

for (let name of userNamesGroupedByLocation) {
  console.log('name' + " = " + name);
};
```

**Level3**
```js
userNamesGroupedByLocation[Symbol.iterator] = function() {
  const cityKeys = Object.keys(this);
  let cityIndex = 0;
  let userIndex = 0;

  return {
    next: () => {
      const users = this[cityKeys[cityIndex]];
      const user = users[userIndex];

      const isLastUser = userIndex >= users.length - 1;
      if (isLastUser) {
        // Reset user index
        userIndex = 0;
        // Jump to next city
        cityIndex++
      } else {
        userIndex++;
      }
      
      return {
        done: false,
        value: user,        
      };
    },
  };  
};

for (let name of userNamesGroupedByLocation) {
  console.log('name' + " = " + name);
};
```

**Level4**
```js
userNamesGroupedByLocation[Symbol.iterator] = function() {
  const cityKeys = Object.keys(this);
  let cityIndex = 0;
  let userIndex = 0;

  return {
    next: () => {
      // We already iterated over all cities
      if (cityIndex > cityKeys.length - 1) {
        return {
          value: undefined,
          done: true,
        };
      }

      const users = this[cityKeys[cityIndex]];
      const user = users[userIndex];

      const isLastUser = userIndex >= users.length - 1;

      userIndex++;
      if (isLastUser) {
        // Reset user index
        userIndex = 0;
        // Jump to next city
        cityIndex++
      }

      return {
        done: false,
        value: user,        
      };
    },
  };
};

for (let name of userNamesGroupedByLocation) {
  console.log('name' + " = " + name);
};
```