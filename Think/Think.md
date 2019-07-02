## Think.js
Version 2.0

### Neural Net

```js
const net = new Net();
let res = net.learn([0, 1], 1); // [0, 0], 0
console.log(res);
```

### K-Means
```js
let data = [[162,41]...];
let means = Think.means("canvas", data, 3);
means.cluster();
```


### Linear regression
```js
let data = [[162,41]...];
let r = Think.regression("canvas", data);
r.plot();
```

Source: https://github.com/filipvabrousek/Algorithms/blob/master/Think/Net-1-7-19-v2.js
