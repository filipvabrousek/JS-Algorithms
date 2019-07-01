## Net
```js
const S = (x) => 1 / (1 + Math.exp(-x));

class Neuron {
    constructor(){
        this.weights = Array(2).fill(0).map(e => Math.random());
    }
    
    forward(inputs){
        var sum = 0;
        this.weights.forEach((el, i) => sum += this.weights[i] * inputs[i]);
        return S(sum);
    }
    
    backward(error){
        this.weights = this.weights.map(w => w * error);
    }
}

/*----------------------------------NET-------------------------------*/        
class Net {
    constructor(){
        this.layers = [new Neuron(), new Neuron(), new Neuron()];
    }
    
    forward(first){
        var s = 0;
        let r = this.layers.reverse().map(n => n.forward(first));
        return r;
    }
    
    learn(arr, expected){
        for (var i = 0; i < 1000; i++){
        var res = this.forward(arr);
      
        var diff = 0;
        res.forEach(el => diff += el - expected);
        this.layers.reverse().map(n => n.backward(diff));
        }
        
        const output = this.forward(arr);
        const ret = Math.max(...output);
        return ret;  
    }
}   

const net = new Net();
let res = net.learn([0, 1], 1); // and for [0, 0], 0
console.log(res);

// 30.6.2019 - 17:20 done for 1 !!! 
```
