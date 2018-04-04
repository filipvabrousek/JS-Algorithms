class N{
    constructor(ni){
        this.weights = [];
        this.weights.length = ni;
        this.weights.fill(Math.random() - 0.5);
       // this.weights.push(1);
    }
    
    forward(inputs){
        this.inputs = inputs;
        this.sum = 0;
        this.weights.forEach((el, i) => this.sum + inputs[i] * this.weights[i]);
        return this.sigmoid(this.sum);
    }
    
    
    backward(error){
         this.weights.map(w => w * error).slice(1); // slice 1 ? return ?
    }
    
    sigmoid(x){
        return 1 / ( 1 + Math.exp(-x));
    }
    
    
    
     /* adjusting weights: make adjustment proportional to the size of error "sigmoidGradient" ensures the we adjust just a little bit
    pass "this.sum" from "forward()" into sigmoidGradient,
    input (0 = no adjustment or 1) * sigmoidGradient * error -> creates "deltas array" 
    adjust weights by substracting deltas*/
  update() {
    const deltas = this.inputs.map(input => input *  this.sigmoid(this.x) * (1 - this.sigmoid(this.sum)) * this.error);
    this.diff = [];
    this.weights.forEach((el, index) => this.diff.push(this.weights[index] - deltas[index]));
    this.weights = this.diff;
  }
}
    
 
    
class Layer{
    constructor(len, inputs){
        this.neurons = [];
        this.neurons.length = len;
        this.neurons.fill(new N(inputs));
    }
    
    forward(inputs){
        return this.neurons.map(n => n.forward(inputs));
    }
    
      backward(errors) {
        return this.neurons.map((n, i) => n.backward(errors[i])).reduce((a, b) => a + b); // pass each error backwards and get weighted sum
  }

  update() {
    this.neurons.forEach(n => n.update());
  }
}
    

    
let layers = [new Layer(3, 3), new Layer(1, 4)];

    
    function learn(data){
    let filled = [];
        
    for (let it = 0; it < 40000; it++){
     
    const i = Math.floor(Math.random() * data.length);
        
    const input = data[i].input;
    const output = data[i].output;
        
    const res = layers.reduce((inp, lr) => lr.forward([1].concat(inp)), input); 
    let err = [];
    res.forEach((el, i) => err.push(res[i] - output[i]));
    
    layers.reverse().reduce((error, layer) => layer.backward(err), err);
    layers.reverse(); // reverse back
    
    layers.forEach(layer => layer.update());
        
        
        
    data.forEach((val, i) => {
        const input = data[i].input;
        const output = layers.reduce((inp, lr) => lr.forward([1].concat(inp)), input); 
        const n = Number(output);
        filled.push(n);
    });
        
    return filled;
    }
        
    
    }
    
    
const data = [{
  input: [0, 0],
  output: [0],
}, {
  input: [1, 0],
  output: [1],
}];
    
    
let res = learn(data);
console.log(res);
