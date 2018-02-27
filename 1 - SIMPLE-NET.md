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


function multiply(arr1, arr2) {
  let result = 0;
  arr1.forEach((val, index) => result += arr1[index] * arr2[index]);
  return result;
}

const sigmoid = x => 1 / (1 + Math.exp(-x)); // maps any input into value between 0 and 1
const sigmoidGradient = x => sigmoid(x) * (1 - sigmoid(x)); // val * (1 - val)


/*------------------------------------------------------NEURON----------------------------------------------------------*/
class Neuron {

  constructor(ni) {
    this.weights = [];
    this.weights.length = ni;
    this.weights.fill(Math.random() - 0.5) // fill weights with random numbers
  }

  forward(inputs) {
    this.inputs = inputs; // we need to access "inputs" below
    this.z = multiply(inputs, this.weights); // each input * weight
    return sigmoid(this.z);
  }

  backward(error) {
    this.error = error; // we need to access error below (what forward returned - desired output)
    return this.weights.map(w => w * error).slice(1); // each w. * error "slice : don't return bias error" (remove 1st el.)
  }

    // pass "z" from "forward()" into sigmoid gradient, * input and error
  updateWeights() {
    const deltas = this.inputs.map(input => input * sigmoidGradient(this.z) * this.error * .5); // .5 set Step size
    this.weights = subtract(this.weights, deltas); // subtract delta from this.weights
  }

}

    
    
    
/*------------------------------------------------------LAYER----------------------------------------------------------*/
class Layer {

  constructor(size, inputs) {
    this.neurons = [];
    
    for (let i = 0; i < size; i++) {
      this.neurons.push(new Neuron(inputs)); 
    } 
      
  }

  forward(inputs) {
    return this.neurons.map(n => n.forward(inputs)); 
  }

  backward(errors) {
  return this.neurons.map((n, i) => n.backward(errors[i])).reduce((a, b) =>  a + b); // pass sum of errors backwards
  }

  updateWeights() {
    this.neurons.forEach(n => n.updateWeights());
  }
}
    
    
    
/*------------------------------------------------------NETWORK---------------------------------------------------------
Layer {neurons: Array(3)} Layer {neurons: Array(1)} */
class Network {

  constructor(/* layer sizes */) {
    const sizes = [...arguments];
    this.layers = [];
      
    // don't loop over last member of sizes [2, 3, 1], create layer using sizes args and push it to "layers"  
    for (let i = 0; i < sizes.length-1; i++) {
      const layer = new Layer(sizes[i+1], sizes[i]+1); // (2) [Layer, Layer] -> Layer {neurons: Array(3)} and ...(1)
      this.layers.push(layer);
    }
      
  }

/* calls forward in neurons class and add bias
 (2) [Layer, Layer] -> a... Layer {neurons: Array(3)} b... (1) */
  forward(inputs) {
    return this.layers.reduce((inp, lr) => lr.forward([1].concat(inp)), inputs); // concat to add bias a is Lr. {neurons: Array(3)}, b: ...(1)   [1].concat add bias
  }
    


/* reverse layers, call backward in each layer and each neuron
 error - we get it from "learn()" - difference between desired output and our output */
  backward(errors) { 
    this.layers.reverse().reduce((error, layer) => layer.backward(0), errors);
    this.layers.reverse(); // reverse back
  }

    
  updateWeights() { // for each layer and for each neuron
    this.layers.forEach(layer => layer.updateWeights());
  }
    
    
learn(data){
     
    let filled = []; // result array
    
    for (let it = 0; it < 40000; it++) { 
    const i = Math.floor(Math.random() * data.length);

    // data from our array
    const input = data[i].input;
    const output = data[i].output;
  
    // result from network - desired output send it back, and update the connection weights between nodes
    const res = this.forward(input);
    const error = subtract(res, output);
    this.backward(error);
    this.updateWeights();
    }
    

    // get result
    data.forEach((val, i) => {
    const input = data[i].input;
    const output = this.forward(input);
    filled.push(output);
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
}, {
  input: [0, 1],
  output: [1],
}, {
  input: [1, 1],
  output: [0],
}];

 
const network = new Network(2, 3, 1);

const res = network.learn(data);
console.log(res);

// SOURCE: https://github.com/jedborovik/simple-neural-network



```
