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

                  
```js
/*------------------------------------------------------HELPER METHODS----------------------------------------------------------*/
function arrayAdd(arr1, arr2) {  
  const result = [];
  arr1.forEach((val, index) => result.push(arr1[index] + arr2[index]));
  return result;
}

function arraySubtract(arr1, arr2) {
  const result = [];
  arr1.forEach((val, index) => result.push(arr1[index] - arr2[index]));
  return result;
}


function arrayMultiply(arr1, arr2) {
  let result = 0;
  arr1.forEach((val, index) => result += arr1[index] * arr2[index]);
  return result;
}


const sigmoid = z => 1 / (1 + Math.exp(z * -1));
const sigmoidGradient = z =>  sigmoid(z) * (1 - sigmoid(z));



/*------------------------------------------------------NEURON----------------------------------------------------------*/
class Neuron {

  constructor(ni) {
    this.weights = [];
    this.weights.length = ni;
    this.weights.fill(Math.random() - 0.5) // fill weights woth random numbers
  }

  forward(inputs) {
    this.inputs = inputs;
    this.z = arrayMultiply(inputs, this.weights); // each input * corresponding weight
    return sigmoid(this.z);
  }

  backward(error) {
    this.error = error;
    var backErrors = this.weights.map(w => w * error);
    return backErrors.slice(1);  // Don't return bias error.
  }

    // pass "z" from "forward()" into sigmoid gradient, * input and error
    // and substract delta from this.weights
  updateWeights() {
    const deltas = this.inputs.map(input => input * sigmoidGradient(this.z) * this.error * .5); // Step size
    this.weights = arraySubtract(this.weights, deltas);
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
    return this.neurons.map(n => n.forward(inputs)); // call forward in "Neuron" class
  }

  backward(errors) {
  return this.neurons.map((n, i) => n.backward(errors[i])).reduce(arrayAdd);
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
      
    for (let i = 0; i < sizes.length-1; i++) {
      const layer = new Layer(sizes[i+1], sizes[i]+1);
      this.layers.push(layer);
    }

  }

  forward(inputs) {
    return this.layers.reduce((input, layer) => {
      input = [1].concat(input); // Add bias
      return layer.forward(input);
    }, inputs);
  }


  backward(errors) {
    this.layers.reverse().reduce((error, layer) => {
      return layer.backward(error);
    }, errors)

    // `reverse` is in place, so reverse back.
    this.layers.reverse();
  }

  updateWeights() {
    this.layers.forEach(layer => layer.updateWeights());
  }
    
    
learn(data){
    for (let it = 0; it < 40000; it++) {
    const i = Math.floor(Math.random() * data.length);

    const input = data[i].input;
    const output = data[i].output;

    const h = this.forward(input);
    const error = arraySubtract(h, output);

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

    
    
/*
SOURCE: https://github.com/jedborovik/simple-neural-network
*/
```js
