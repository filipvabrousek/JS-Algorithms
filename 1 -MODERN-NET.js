// Mean squared error
function mse(errors) {
  const sum = errors.reduce((sum, i) => sum + i * i, 0);
  return sum / errors.length
}

const rand = () => Math.random() * 0.4 - 0.2; // Random weight between -0.2 and 0.2
const sum = arr => arr.reduce((prev, cur) => prev + cur, 0); // sum all elements in the array

/*whatever the x is it gets converted into range between 0 and 1*/
const sigmoid = x => 1 / (1 + Math.exp(Math.E, x)); //  y = 1 / (1 + e^x); x is passed in



/*----------------------------------------------------------NEURON----------------------------------------------------------
1 - fill - in weights array with random numbers
2 - multiply each weight with corresponding input
3 - add bias to the sum, pass the value to the sigmoid function and save returned value in "this.lastOutput"
*/
class Neuron {
  constructor(ni) { // num inputs
    this.weights = new Array(ni) // array of 19 random weights
    this.bias = rand()

// 1
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = rand()
    }   
  }

  process(inputs) {
    this.lastInputs = inputs;
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
for each neuron call its procces method with inputs passed
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

// call "proccess" (calls "proccess" for each neuron)  for each layer 
  process(inputs) {
    let outputs;
    this.layers.forEach(layer => {
      outputs = layer.process(inputs) 
      inputs = outputs
    });
    return outputs
  }


/* if "ni" is NULL, get "number of inputs" (length of array) from prev layer, create new one and push it to "layers" usd in usage*/
  addLayer(numNeurons, ni) {
    if (ni == null) {
      const previousLayer = this.layers[this.layers.length - 1];
      ni = previousLayer.neurons.length
    }

    const layer = new Layer(numNeurons, ni);
    this.layers.push(layer)
  }

    
    
/*----------------------------------------------------------------------------------------------------------------*/
  train(examples) {
    const outputLayer = this.layers[this.layers.length - 1]; // get top layer

      //------------------------------------------------------------------ biggest LOOP through training itterations
      for (let it = 0; it < this.iters; it++) { // we want to get n. of "its" down in the code
          
          /*                                         ----- NESTED 1 "e"
          train([ [zero, [0,0]] ...]) looping through ex. arr. */
      for (let e = 0; e < examples.length; e++) {
        const inputs = examples[e][0]; // get 1st member of nested array (the pattern)
        const targets = examples[e][1]; // get 2nd member of nested array
        const outputs = this.process(inputs); // pass 1st member of nested array to procces f. in "network" class (-> neuron class)

        /*                                                      -----NESTED 2 "i"
        get information about how wrong the prediction was, get each neuron from the output layer*/
        for (let i = 0; i < outputLayer.neurons.length; i++) {
          const neuron = outputLayer.neurons[i];
          neuron.error = targets[i] - outputs[i] // get diff "2nd member of nested array - neurons guess (proccess f.)"
          neuron.errors = neuron.errors || [] //  keep track of the error of each examples to determine when to stop training.r
          neuron.errors[e] = neuron.error
          neuron.delta = neuron.lastOutput * (1 - neuron.lastOutput) * neuron.error // delta: (value returned from sigm. * (1 - that value) * error)
        }

        /*                                                              -----NESTED 3 "l" */
        for (let l = this.layers.length - 2; l >= 0; l--) {
            /*                                                                     ---NESTED 4 "j"
            use the sum function on multiplied weigth with delta */
          for (let j = 0; j < this.layers[l].neurons.length; j++) {
          let NJ = this.layers[l].neurons[j]
          NJ.error = sum(this.layers[l + 1].neurons.map(n => n.weights[j] * n.delta)) 
          NJ.delta = NJ.lastOutput * (1 - NJ.lastOutput) * NJ.error

            //                                                                          ---NESTED 5 "i"
          for (let i = 0; i < this.layers[l + 1].neurons.length; i++) {
            let NI = this.layers[l + 1].neurons[i]
            //                                                                               ---NESTED 6 "w"
            for (let w = 0; w < NI.weights.length; w++) { 
                NI.weights[w] += this.learningRate * NI.lastInputs[w] * NI.delta
            } 
            NI.bias += this.learningRate * NI.delta // use delta
          } 
        } 
      }
      }

      // Compute the mean squared error using "mse" for all examples.
      const error = mse(outputLayer.neurons.reduce((errors, n) => errors.concat(n.errors), []));
      
      if (it % 10000 === 0) { console.log({ iteration: it, mse: error }) }
      if (error <= this.errorThreshold) {return} // if error is acceptable, stop the training
      
    }

  }
}
    
    
    
    

// Stop training when mean squared error of all output neurons reach this threshold
Network.prototype.errorThreshold = 0.00001
// Number of iterations on each training
Network.prototype.iters = 500000
// Rate at which the network learns in each iteration
Network.prototype.learningRate = 0.3


    
    
    
    
/*----------------------------------------------------------USAGE----------------------------------------------------------*/
const network = new Network();
network.addLayer(10, 20) // Hidden layer, 10 neurons, 20 inputs (members of the array)
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

