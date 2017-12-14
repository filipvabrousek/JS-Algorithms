## Simple Neural network

```js

/*
-------------------------------------------------NEURAL NETWORK-----------------------------------------------------
its constructor contains
numInputs
numOutputs
numHiddenLayers
numNeuronsPerHiddenLayer


*/
class NeuralNetwork {
	constructor(numInputs, numOutputs, numHiddenLayers, numNeuronsPerHiddenLayer) {

		this.numInputs = numInputs;
		this.numOutputs = numOutputs;
		this.numHiddenLayers = numHiddenLayers;
		this.numNeuronsPerHiddenLayer = numNeuronsPerHiddenLayer;

		this.bias = -1.0;
		this.activationResponse = 1.0;
		this.neuronLayers = [];

		this.createNetwork();
	}

	
	
	
/*-------------------------------------------- 1 --------------------------------------------------
1.1 - create the first hidden layer and push (add to end) it to "neuronLayers"
1.2 - create output layers
1.3 - if we do not have any hidden layers create output layer 
*/
	createNetwork() {

        if (this.numHiddenLayers > 0) {
			
            // 1.1
			const first = new NeuronLayer(this.numNeuronsPerHiddenLayer, this.numInputs);
			this.neuronLayers.push(first);

			for (let i = 0; i < this.numHiddenLayers - 1; ++i) {
				const newHiddenLayer = new NeuronLayer(this.numNeuronsPerHiddenLayer, this.numNeuronsPerHiddenLayer);
				this.neuronLayers.push(newHiddenLayer);
			}

			// 1.2
			var outputLayer = new NeuronLayer(this.numOutputs, this.numNeuronsPerHiddenLayer);
			this.neuronLayers.push(outputLayer);
            
        } else {
			// 1.3
			var outputLayer = new NeuronLayer(this.numOutputs, this.numInputs);
			this.neuronLayers.push(outputLayer);
		}
	}

	
	
	
	
/*-------------------------------------------- 2 -------------------------------------------------- 
UPDATE INPUTS
2.1 - If the number of inputs supplied is incorrect...
2.2 - loop through all the layers, get one neuro layer from neuroLayers at index  
- add outputs to inputs (by concat)

2.3 - For each neuron sum the (inputs * corresponding weights).
Throw the total at our sigmoid function to get the output.

2.4 -  we can store the outputs from each layer as we generate them.
the combined activation is first filtered through the sigmoid function

*/
	update(inputs) {

		let outputs = [];
		let cWeight = 0;

		// 2.1
		if (inputs.length != this.numInputs) {
			return outputs; // Return empty outputs
		}

		// 2.2
		let inputLayer = true;
		for (let i = 0; i < this.numHiddenLayers + 1; ++i) {
            const neuronLayer = this.neuronLayers[i];

            if (!inputLayer) {
				inputs = [];
				inputs = inputs.concat(outputs);
			} else {
				inputLayer = false;
			}

            outputs = [];
            cWeight = 0;

            // 2.3
            for (const neuron of neuronLayer.neurons) {
                let totalInput = 0;

                // For each weight...
                for (let k = 0; k < neuron.numInputs - 1; ++k) {
					
                    // Multiply it with the input.
					totalInput += neuron.weights[k] *
						inputs[cWeight];

					cWeight++;
				}


                // Add in the bias (final weight)
                totalInput += neuron.weights[neuron.weights.length - 1] * this.bias;

                
            //2.4
                outputs.push(this.sigmoid(totalInput, this.activationResponse));

                cWeight = 0;
            }
        }

		return outputs;
	}


	
/*-------------------------------------------- 3 -------------------------------------------------- 
SIGMOID - starter function (totalInput, activationResponse)
*/
    
    
	sigmoid(totalInput, activationResponse) {
		return (1 / (1 + Math.exp(-totalInput / activationResponse)));
	}



/*-------------------------------------------- 3 -------------------------------------------------- 
GET WEIGHTS
*/
	getWeights() {
		const weights = [];

		//for each layer
		for (let i = 0; i < this.numHiddenLayers + 1; ++i) {

			//for each neuron
			for (let j = 0; j < this.neuronLayers[i].neurons.length; ++j) {
				//for each weight
				for (let k = 0; k < this.neuronLayers[i].neurons[j].numInputs; ++k) {
					weights.push(this.neuronLayers[i].neurons[j].weights[k]);
				}
			}
		}

		return weights;
	}

    
/*-------------------------------------------- 3 -------------------------------------------------- 
SET WEIGHTS
loop through layers
*/

	setWeights(weights) {
		let cWeight = 0;

		//for each layer
		for (let i = 0; i < this.numHiddenLayers + 1; ++i) {

			//for each neuron
			for (let j = 0; j < this.neuronLayers[i].neurons.length; ++j) {
				//for each weight
				for (let k = 0; k < this.neuronLayers[i].neurons[j].numInputs; ++k) {
					this.neuronLayers[i].neurons[j].weights[k] = weights[cWeight++];
				}
			}
		}
	}
}









/*------------------------------------------------- NEURON -----------------------------------------------------*/
class Neuron {
	constructor(numInputs) {
		this.weights = [];
		this.numInputs = numInputs;

		for (let i = 0; i < numInputs + 1; ++i) {
			const newWeight = -1 + (Math.random() * 2);
			this.weights.push(newWeight);
		}
	}
}








/*----------------------------------------------- NEURON LAYER ---------------------------------------------------
use neuron class to push neuron into the "neurons" array layer
*/
class NeuronLayer {
	constructor(numNeuronsPerHiddenLayer, numInputs) {
		this.neurons = [];

		for (let i = 0; i < numNeuronsPerHiddenLayer; ++i) {
			const newNeuron = new Neuron(numInputs);
			this.neurons.push(newNeuron);
		}
	}
}






// Usage:
const network = new NeuralNetwork(2, 2, 2, 6);
const inputs = [0.12, 0.24];
const outputs = network.update(inputs);

console.log(outputs);




/*
var weights = network.getWeights();

var newWeights = [];
for (var i=0; i < weights.length; i++) {
    newWeights.push(weights[i] * 0.5); 
}

network.setWeights(newWeights);
*/

// SOURCE: https://github.com/DivineOmega/simple-neural-network-js

   
// https://hackernoon.com/neural-networks-from-scratch-for-javascript-linguists-part1-the-perceptron-632a4d1fbad2
```
Source: https://github.com/DivineOmega/simple-neural-network-js
