const random = () => (Math.random() * 2) - 1;

const sigmoid = value => 1 / (1 + Math.exp((-1 * value) / 1));


class Brain {
  constructor(settings) {
    this.layers = [];
  }


  /*-----------------------------------------------------------------------------------------------------------
  inputs is input array [1, 0]
  outputs is output array [1]
  
  1 - get size of the arrays
  2 - if inputs have more members than outputs (which is the case), set hiddenSize to inputSize
  3 - set layerSize to Math.max(1, 3) -> 3 else set Hidden size to output size
  4 - set layers to new Array with size of 3 and map its value with function (layer, l)
  5 - work with layers
  6 - return neuron with value and weight
  */
    
  init(inputs, outputs) {

      // 1
    let inpSize = inputs.length;
    let outpSize = outputs.length;

    let layersSize = 3;
    let hiddenSize = 1;

    // 2 
    if (inpSize > outpSize) {
      hiddenSize = inpSize;
    // 3
      layersSize = Math.max(inpSize - outpSize, 3);
    } else {
      hiddenSize = outpSize;
      layersSize = Math.max(outpSize - inpSize, 3);
    }

    // 4
    this.layers = new Array(layersSize).fill(0).map((layer, l) => {

      let prev = hiddenSize;
      let size = hiddenSize;

        // 5
      // if there is input layer
      if (l === 0) {
        prev = 0;
        size = inpSize;
      }

      // first hidden layer
      else if (l === 1) {
        prev = inpSize;
      }

      // output layer
      else if (l === layersSize - 1) {
        size = outpSize;
      }


        // 6
      return new Array(size).fill(0).map(_ => ({
        value: random(),
        weights: new Array(prev).fill(0).map(val => random())
      }))

    });
  }

  /*-----------------------------------------------------------------------------------------------------------
  array [1, 0] is passed
  1 - feed forward for hidden layers + output layer (slice -> new Array)
  2 - array of objects with values and weights
  3 - for each memeber in arary perform calcualtions
  5 - map values
  */

  compute(inputs) {

    let layers = this.layers;
    layers[0].forEach((neuron, n) => neuron.value = inputs[n]);

    // 1
    layers.slice(1).forEach((layer, l) => {

        // 2
      let prev = layers[layers.indexOf(layer) - 1];

        // 3
      layer.forEach(neuron => {
        let values = prev.map((pr, p) => pr.value * neuron.weights[p]);
        let sum = values.reduce((a, b) => a + b, 0);

        neuron.value = sigmoid(sum);
      });

    });

    // 5
    return layers[layers.length - 1].map(neuron => neuron.value);
  }
}



let brain = new Brain();
let data = {
  inputs: [1, 0],
  outputs: [1]
};

brain.init(data.inputs, data.outputs);
let outputs = brain.compute(data.inputs);

console.log(`computed: ${outputs}`);
console.log(`expected: ${data.outputs}`);
