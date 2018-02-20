function arrayAdd(array1, array2) {
  const l1 = array1.length;
  const l2 = array2.length;
  if (l1 !== l2) {
    throw Error('Can\'t add arrays of length '+l1 +' and '+l2);
  }

  const result = [];
  for (let i = 0; i < l1; i++) {
    result.push(array1[i] + array2[i]);
  }
  return result;
}

function arraySubtract(array1, array2) {
  const l1 = array1.length;
  const l2 = array2.length;
  if (l1 !== l2) {
    throw Error('Can\'t subtract arrays of length '+l1 +' and '+l2);
  }

  const result = [];
  for (let i = 0; i < l1; i++) {
    result.push(array1[i] - array2[i]);
  }
  return result;
}

function arrayMultiply(array1, array2) {
  const l1 = array1.length;
  const l2 = array2.length;
  if (l1 !== l2) {
    throw Error('Can\'t multiply arrays of length '+l1 +' and '+l2);
  }

  let result = 0;
  for (let i = 0; i < l1; i++) {
    result += array1[i] * array2[i];
  }
  return result;
}

function sigmoid(z) {
  return 1 / (1 + Math.exp(z * -1));
}

function sigmoidGradient(z) {
  return sigmoid(z) * (1 - sigmoid(z));
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
    return this.neurons.map(neuron => neuron.forward(inputs));
  }

  backward(errors) {
    var backErrors = this.neurons.map((neuron, i) =>
      neuron.backward(errors[i])
    );
    return backErrors.reduce(arrayAdd);
  }

  updateWeights() {
    this.neurons.forEach(neuron => neuron.updateWeights());
  }
}
    
    
    
    

/*------------------------------------------------------NEURON----------------------------------------------------------*/
class Neuron {
// numberofinputs
  constructor(n) {
    this.weights = [];
    this.weights.length = n;
    this.weights.fill(Math.random() - 0.5)
  }

 
  forward(inputs) {
    this.inputs = inputs;
    this.z = arrayMultiply(inputs, this.weights);
    return sigmoid(this.z);
  }

  backward(error) {
    this.error = error;
    var backErrors = this.weights.map(w => w * error);

    // Don't return bias error.
    return backErrors.slice(1);
  }

  updateWeights() {
    const deltas = this.inputs.map(input =>
      input * sigmoidGradient(this.z) * this.error * .5// STEP_SIZE
    );
    this.weights = arraySubtract(this.weights, deltas);
  }

}
    
    
    
    
/*------------------------------------------------------NETWORK----------------------------------------------------------*/
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

for (let iter = 0; iter < 40000; iter++) {
  const i = Math.floor(Math.random() * data.length);

  const input = data[i].input;
  const output = data[i].output;

  const h = network.forward(input);
  const error = arraySubtract(h, output);

  network.backward(error);
  network.updateWeights();
}

for (let i = 0; i < data.length; i++) {
  const input = data[i].input;
  const output = network.forward(input); //h ?
  console.log( input, output[0]);
}

    
    
/*
https://github.com/jedborovik/simple-neural-network
*/
