# Neural networks
* interconected group of nodes, similiar to the neurons in human brain

## Phase 1
* neuron takes the value of a connected neuron and multiples  it with connection weight
* sum of all connected neurons + bias gets passed into sigmoid function which transforms the value to number between 0 and 1
* passed into next neuron

## Phase 2
* learn using going backwards (backpropagation)
* comparing output with the desired one
* using the difference (error) to multiply it with the weights of the connections between units  
* repeat for a desired number of iterations

![neural network](https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Colored_neural_network.svg/296px-Colored_neural_network.svg.png)

## Sigmoid 
* activation function which maps any value into value between 0 and 1
* if returns value < 0.5, unit fires


```js
const sigmoid = x => 1 / (1 + Math.exp(-x));
const sigmoidGradient = x => sigmoid(x) * (1 - sigmoid(x));
/*
s(-1) -> 0.26
s(0) -> 0.5,
s(1) -> 0.73 */
```


                  
## The code
```js

/*------------------------------------------------------HELPER METHODS----------------------------------------------------------*/
function subtract(arr1, arr2) {
  const result = [];
  arr1.forEach((val, index) => result.push(arr1[index] - arr2[index]));
  return result;
}


const sigmoid = x => 1 / (1 + Math.exp(-x)); // maps any input into value between 0 and 1
const sigmoidGradient = x => sigmoid(x) * (1 - sigmoid(x)); // val * (1 - val)


/*------------------------------------------------------NEURON----------------------------------------------------------*/
class N {

  constructor(ni) {
    this.weights = [];
    this.weights.length = ni;
    this.weights.fill(Math.random() - 0.5) // fill weights with random numbers
  }

  forward(inputs) {
    this.inputs = inputs;
    this.sum = 0;
    this.weights.forEach((el, index) => this.sum += this.inputs[index] * this.weights[index])
    return sigmoid(this.sum);
  }

  backward(error) {
    this.error = error; // we need to access error below (what forward returned - desired output)
    return this.weights.map(w => w * error).slice(1); // each w. * error "slice : don't return bias error" (remove 1st el.)
  }

    /* delta -> "twiggle" with value 
       pass "z" from "forward()" into sigmoid gradient, * input and error */
  update() {  
    const deltas = this.inputs.map(input => input * sigmoidGradient(this.sum) * this.error * .5); // .5 set Step size
    this.weights = subtract(this.weights, deltas); // subtract delta from this.weights
  }

}

    
    
    
/*------------------------------------------------------LAYER----------------------------------------------------------*/
class Layer {

  constructor(len, inputs) {
    this.neurons = [];
    this.neurons.length = len;
    this.neurons.fill(new N(inputs));
      
  }

  forward(inputs) {
    return this.neurons.map(n => n.forward(inputs)); 
  }

  backward(errors) {
  return this.neurons.map((n, i) => n.backward(errors[i])).reduce((a, b) =>  a + b); // pass sum of errors backwards
  }

  update() {
    this.neurons.forEach(n => n.update());
  }
}
    
    
    
/*------------------------------------------------------NETWORK---------------------------------------------------------
Layer {neurons: Array(3)} Layer {neurons: Array(1)} */
class Network {

  constructor(/* layer sizes */) {
    const sizes = [...arguments];
    this.layers = [];
      
    // don't loop over last member of sizes [2, 3, 1], create layer using sizes args and push it to "layers"  
        const helper = [];
        helper.length = sizes.length - 1; // dont loop ever last member of sizes
        helper
       .fill(Math.random())
       .forEach((val, index) => {
            const layer = new Layer(sizes[index + 1], sizes[index] + 1);
            this.layers.push(layer);
        });
  }

/* calls forward in neurons class and add bias
 (2) [Layer, Layer] -> a... Layer {neurons: Array(3)} b... (1) */
  forward(inputs) {
    return this.layers.reduce((inp, lr) => lr.forward([1].concat(inp)), inputs); // concat to add bias a is Lr. {neurons: Array(3)}, b: ...(1)   [1].concat add bias
  }


/* reverse layers, call backward in each layer and each neuron
 error - we get it from "learn()" - difference between desired output and our output */
  backward(errors) { 
    this.layers.reverse().reduce((error, layer) => layer.backward(error), errors);
    this.layers.reverse(); // reverse back
  }
    

  update() { // for each layer and for each neuron
    this.layers.forEach(layer => layer.update());
  }
    
    
learn(data){
     
    let filled = []; 
    
    for (let it = 0; it < 40000; it++) { 
    const i = Math.floor(Math.random() * data.length);

    // data from our array
    const input = data[i].input;
    const output = data[i].output;
  
    // result from network - desired output send it back, and update the connection weights between nodes
    const res = this.forward(input);
    let err = [];
    res.forEach((el, index) => err.push(res[index] - output[index]));  
    this.backward(err);    
    this.update();
    }
    
    
    // get result
     data.forEach((val, i) => {
        const input = data[i].input;
        const output = this.forward(input)
        const n = Number(output)
        filled.push(n);
        });
    
    return filled;
}
    
}
    
    
    
/*------------------------------------------------------USAGE----------------------------------------------------------*/
const data = [{
  input: [0, 0],
  output: [0],
}, {
  input: [1, 0],
  output: [1],
}];

 
const network = new Network(2, 3, 1);
const res = network.learn(data);
console.log(res);

// SOURCE: https://github.com/jedborovik/simple-neural-network

```
