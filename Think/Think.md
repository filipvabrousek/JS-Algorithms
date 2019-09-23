## Think.js
Version 2.0

### Neural Net

```js
const net = th.net(7);
let res = net.predict([0, 1], 1); // [0, 0], 0 -> 0.16666 (only 3 layers)
console.log(res);
```

### K-Means
```js
let data = [[162,41]...];
let means = th.means("canvas", data, 3);
means.cluster();
```


### Linear regression
```js
let data = [[162,41]...];
let r = th.regression("canvas", data);
r.plot();
```

Source: https://github.com/filipvabrousek/Algorithms/blob/master/Think/Think-3-7-19.js


## Shaper module
* coming soon
