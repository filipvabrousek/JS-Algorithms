const random = () => (Math.random() * 2) - 1;

const sigmoid = value => 1 / (1 + Math.exp((-1 * value) / 1));



class Brain {
  constructor(settings) {
    this.layers = [];
  }


  /*-----------------------------------------------------------------------------------------------------------*/
  init(inputs, outputs) {

    let inpSize = inputs.length;
    let outpSize = outputs.length;

    let layersSize = 3;
    let hiddenSize = 1;

    if (inpSize > outpSize) {
      hiddenSize = inpSize;
      layersSize = Math.max(inpSize - outpSize, 3);
    } else {
      hiddenSize = outpSize;
      layersSize = Math.max(outpSize - inpSize, 3);
    }

    this.layers = new Array(layersSize).fill(0).map((layer, l) => {

      let prev = hiddenSize;
      let size = hiddenSize;


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



      // each neuron has value and weights
      return new Array(size).fill(0).map(_ => ({
        value: random(),
        weights: new Array(prev).fill(0).map(val => random())
      }))

    });
  }

  /*-----------------------------------------------------------------------------------------------------------
  1 - feed forward for hidden layers + output layer (slice -> new Array)
  */

  compute(inputs) {

    let layers = this.layers;
    layers[0].forEach((neuron, n) => neuron.value = inputs[n]);

    // 1
    layers.slice(1).forEach((layer, l) => {

      let prev = layers[layers.indexOf(layer) - 1];

      layer.forEach(neuron => {
        let values = prev.map((pr, p) => pr.value * neuron.weights[p]);
        let sum = values.reduce((a, b) => a + b, 0);

        neuron.value = sigmoid(sum);
      });

    });

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
