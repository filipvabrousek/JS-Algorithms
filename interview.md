```js

const num = [2, 8, 3, 9];

function sort(a) {
	let swapped;
	
	
	do {
		swapped = false;
		
		for (let i = 0; i < a.length - 1; i++) {
			if (a[1] > a[i + 1]) {
				const temp = a[i];
				a[i] = a[i + 1];
				a[i + 1] = temp;
				swapped = true;
			}
		}
		
	} while (swapped)
}


sort(num);
console.log(num);  // [2, 3, 8, 9]

```









```js
function mix(arr){
    let res = [];
    
    const permute = (arr, m = []) => {
   
        if (arr.length === 0){
            res.push(m);
        }
           
            for (let i = 0; i < arr.length; i++){
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next));
            }
    }
    
    permute(arr);
    return res;
}

let arr = [1, 2, 3];
let r = mix(arr);

console.log(`There are ${r.length} combinations`);
console.log(r);


```

```js

function fib(n){
   if(n <= 1){
       return n;
   } else {
       return fib(n-1) + fib(n-2);
   }
    
}

let f = fib(12);
// 144
```
```js


function reverse(str){
    return str.split(' ').reverse().join(' ').split('').reverse().join('');
}

let e = reverse("I love you !");
// I evol uoy !
```

```js
function isPalindrome(str){
    str = str.toLowerCase();
    return str == str.split('').reverse().join('');
}

let s = isPalindrome("lol");
// true
```
