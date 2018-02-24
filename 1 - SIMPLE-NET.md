# Neural networks
* interconected group of nodes, similiar to the neurons in human brain

## Phase 1
* input -> hidden units -> outputs (feedforward network)
* each unit receives input from the unit to its left, inputs are multiplied by the weight of the connections they travle along
* every unit adds the total sum
* if this sum is bigger than the treshold, the ubit fires and triggers units on the right

## Phase 2
* learn using going backwards (backpropagation)
* comparing output desired one
* using the difference to modify weight of the connections between units  

![neural network](https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Colored_neural_network.svg/296px-Colored_neural_network.svg.png)

## Simgoid 
* activation function which maps any value into value between 0 and 1
* if returns value < 0.5, unit fires


```js
const sigmoid = x => 1 / (1 + Math.exp(-x)); // maps any input into value between 0 and 1
const sigmoidGradient = x => sigmoid(x) * (1 - sigmoid(x));
/*
s(-1) -> 0.26
s(0) -> 0.5,
s(-1) -> 0.73 */
```


                  
## The code
```js
/*------------------------------------------------------HELPER METHODS----------------------------------------------------------*/
function add(arr1, arr2) {  
  const result = [];
  arr1.forEach((val, index) => result.push(arr1[index] + arr2[index]));
  return result;
}

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


const sigmoid = z => 1 / (1 + Math.exp(z * -1)); // maps any input into value between 0 and 1
const sigmoidGradient = z =>  sigmoid(z) * (1 - sigmoid(z));



/*------------------------------------------------------NEURON----------------------------------------------------------*/
class Neuron {

  constructor(ni) {
    this.weights = [];
    this.weights.length = ni;
    this.weights.fill(Math.random() - 0.5) // fill weights with random numbers
  }

  forward(inputs) {
    this.inputs = inputs; // we need to access "inputs" later
    this.z = multiply(inputs, this.weights); // each input * corresponding weight
    return sigmoid(this.z);
  }

  backward(error) {
    this.error = error; // we need to access error later
    let back = this.weights.map(w => w * error); // each w. * error
    return back.slice(1);  // Don't return bias error.
  }

    // pass "z" from "forward()" into sigmoid gradient, * input and error
  updateWeights() {
    const deltas = this.inputs.map(input => input * sigmoidGradient(this.z) * this.error * .5); // Step size
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
 // get sum of errors and pass it backwards
  return this.neurons.map((n, i) => n.backward(errors[i])).reduce(add);
  }

  updateWeights() {
    this.neurons.forEach(n => n.updateWeights());
  }
}
    
    
    
/*------------------------------------------------------NETWORK---------------------------------------------------------
Layer {neurons: Array(3)} Layer {neurons: Array(1)}
*/
class Network {

  constructor(/* layer sizes */) {
    const sizes = [...arguments];
    this.layers = [];
      
    // dont take into account last member of sizes, create layer using sizes args and push it to "layers"  
    for (let i = 0; i < sizes.length-1; i++) {
      const layer = new Layer(sizes[i+1], sizes[i]+1); // (2) [Layer, Layer] -> Layer {neurons: Array(3)} and ...(1)
      this.layers.push(layer);
    }

  }

/* calls forward in neurons class, each input * corresponding weight -> sum passed into sigmoid
 (2) [Layer, Layer] -> Layer {neurons: Array(3)} and 1 -> [n, n, n] -> N {weights, input, z, error} */
  forward(inputs) { // [0, 1] etc.
    return this.layers.reduce((input, layer) => {
      input = [1].concat(input); // input: (4) [1, 0.005, 0.004, 0.99] (3) [1, 0, 0] (add bias to it)
      return layer.forward(input);
    }, inputs); // initial value arg. passed in: "input: [0, 0]..."
  }


// reverse layers, call backward in each layer and each neuron
  backward(errors) { // error - we get it from "learn()" difference between desired output and our output
    this.layers.reverse().reduce((error, layer) => {
      return layer.backward(error);
    }, errors)
      
    this.layers.reverse(); // reverse back.
  }

    
  updateWeights() { // for each layer and for each neuron
    this.layers.forEach(layer => layer.updateWeights());
  }
    
    
learn(data){
    for (let it = 0; it < 40000; it++) {
    const i = Math.floor(Math.random() * data.length);

    // data from our array
    const input = data[i].input;
    const output = data[i].output;

    // result from network - desired output
    const h = this.forward(input);
    const error = subtract(h, output);

    // send error back and update the weights between nodes
    this.backward(error);
    this.updateWeights();
}
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
network.learn(data); // wrong results without this
    
for (let i = 0; i < data.length; i++) {
  const input = data[i].input;
  const output = network.forward(input); // h ?
  console.log(input, output);
}

    
    

// SOURCE: https://github.com/jedborovik/simple-neural-network

```
