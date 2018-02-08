   

// Mean squared error
function mse(errors) {
  const sum = errors.reduce((sum, i) => sum + i * i, 0);
  return sum / errors.length
}

const rand = () => Math.random() * 0.4 - 0.2; // Random weight between -0.2 and 0.2
const sum = arr => arr.reduce((prev, cur) => prev + cur, 0); // sum all elements in the array
const sigmoid = x => 1 / (1 + Math.E ** -x)




/*----------------------------------------------------------NEURON----------------------------------------------------------
1 - fill - in weights array with random numbers
2 - multiply each weight with corresponding input, 
3 - add bias to the sum, pass the value to the sigmoid function and save returned value in "this.lastOutput"
*/
class Neuron {
  constructor(ni) { // num inputs
    this.weights = new Array(ni)
    this.bias = rand()

// 1
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = rand()
    }
  }

  process(inputs) {
    this.lastInputs = inputs
    let sum = 0;
    // 2
    for (let i = 0; i < inputs.length; i++) {
      sum += inputs[i] * this.weights[i]
    }
    // 3
    sum += this.bias;
    return this.lastOutput = sigmoid(sum)
  }
}
    
    

    
/*----------------------------------------------------------LAYER----------------------------------------------------------
fill - in neuron array using neuron class
for each neuron call procces function with inputs passed
*/
class Layer {
  constructor(numNeurons, ni) {
    this.neurons = new Array(numNeurons)

    for (let i = 0; i < this.neurons.length; i++) {
      this.neurons[i] = new Neuron(ni)
    }
  }

  process(inputs) {
    return this.neurons.map(neuron => neuron.process(inputs))
  }
}
    
    
    
    
    
    
    
    
/*----------------------------------------------------------NETWORK----------------------------------------------------------*/
class Network {
  constructor() {
    this.layers = []
  }

// call "proccess" for each layer 
  process(inputs) {
    let outputs;
    this.layers.forEach(layer => {
      outputs = layer.process(inputs) // recursive call
      inputs = outputs
    });
    return outputs
  }


// get "number of inputs" from prev layer, create new one and push it to "layers"
  addLayer(numNeurons, ni) {
    if (ni == null) {
      const previousLayer = this.layers[this.layers.length - 1];
      ni = previousLayer.neurons.length
    }

    const layer = new Layer(numNeurons, ni);
    this.layers.push(layer)
  }

    
    
    
    

  train(examples) {
    const outputLayer = this.layers[this.layers.length - 1];

      //--------------------------------------------- biggest loop
      for (let it = 0; it < this.trainingIterations; it++) {
      
          //--------------------------------------------- NESTED 1
      for (let e = 0; e < examples.length; e++) {
        const inputs = examples[e][0];
        const targets = examples[e][1];

        const outputs = this.process(inputs);

        //--------------------------------------------- NESTED 2
        for (var i = 0; i < outputLayer.neurons.length; i++) {
          const neuron = outputLayer.neurons[i];

          neuron.error = targets[i] - outputs[i]

          // Keep track of the error of each examples to determine when to stop training.
          neuron.errors = neuron.errors || []
          neuron.errors[e] = neuron.error

          neuron.delta = neuron.lastOutput * (1 - neuron.lastOutput) * neuron.error
        }

          //--------------------------------------------- NESTED 3
        for (let l = this.layers.length - 2; l >= 0; l--) {
            //--------------------------------------------- NESTED 4
          for (var j = 0; j < this.layers[l].neurons.length; j++) {
          var neuronJ = this.layers[l].neurons[j]

          neuronJ.error = sum(this.layers[l + 1].neurons.map(n => n.weights[j] * n.delta)) //
          neuronJ.delta = neuronJ.lastOutput * (1 - neuronJ.lastOutput) * neuronJ.error

            //--------------------------------------------- NESTED 5
          for (var i = 0; i < this.layers[l + 1].neurons.length; i++) {
            var neuronI = this.layers[l + 1].neurons[i]

            //--------------------------------------------- NESTED 6
            for (var w = 0; w < neuronI.weights.length; w++) {
              neuronI.weights[w] += this.learningRate * neuronI.lastInputs[w] * neuronI.delta
            }
            neuronI.bias += this.learningRate * neuronI.delta
          }
        }
      }
      }

      // Compute the mean squared error for all examples.
      const error = mse(outputLayer.neurons.reduce((errors, n) => errors.concat(n.errors), []));

      if (it % 10000 === 0) {
        console.log({ iteration: it, mse: error })
      }

      if (error <= this.errorThreshold) {
        return
      }
      
    }

  }
}
    
    
    
    

// Stop training when mean squared error of all output neurons reach this threshold
Network.prototype.errorThreshold = 0.00001

// Number of iterations on each training
Network.prototype.trainingIterations = 500000

// Rate at which the network learns in each iteration
Network.prototype.learningRate = 0.3


    
    
    
    
/*----------------------------------------------------------USAGE----------------------------------------------------------*/
const network = new Network();

network.addLayer(10, 20) // Hidden layer, 10 neurons, 20 inputs
network.addLayer(2)      // Output layer, 2 neurons

// Our character "images". Imagine `1`s as black pixels.
const zero = [
  0, 1, 1, 0,
  1, 0, 0, 1,
  1, 0, 0, 1,
  1, 0, 0, 1,
  0, 1, 1, 0
];

const one = [
  0, 0, 1, 0,
  0, 0, 1, 0,
  0, 0, 1, 0,
  0, 0, 1, 0,
  0, 0, 1, 0
];

const two = [
  0, 1, 1, 0,
  1, 0, 0, 1,
  0, 0, 1, 0,
  0, 1, 0, 0,
  1, 1, 1, 1
];

const three = [
  1, 1, 1, 1,
  0, 0, 0, 1,
  0, 1, 1, 1,
  0, 0, 0, 1,
  1, 1, 1, 1
];

network.train([
  // Training examples
  // inputs   outputs
  [  zero,    [0, 0]  ],
  [  one,     [0, 1]  ],
  [  two,     [1, 0]  ],
  [  three,   [1, 1]  ],
])


// Querying the network (recognized, even if pixels in left corners aren't zero)
const outputs = network.process([
  1, 1, 1, 1,
  1, 0, 0, 1,
  1, 0, 0, 1,
  1, 0, 0, 1,
  1, 1, 1, 0
]); // outputs === [~0, ~0]

// Convert the output to binary (base 2) and then to decimal (base 10).
const binary  = outputs.map(v => Math.round(v)).join("");
const decimal = parseInt(binary, 2);

console.log("Recognized", decimal, outputs);
    
// SOURCE:  https://github.com/greatcodeclub/neural/blob/master/lib/neural.js
