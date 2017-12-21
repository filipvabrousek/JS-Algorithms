# ML in JS
1) Supervised learning
* classification - prediciting value in the form of categories
* regression -  predict the outcome of the given sample (output is in the form of real values)

2) Unsupervised learning
* Association - probability of co-occurance of items
* Clustering - object in one cluster are simmiliar
* Dimensional Reduction - reducing the information, just the important are persisted

3) Reinforcement learning - maximizing the reward



## Simple Neural network

```js
/*
-------------------------------------------------NEURAL NETWORK-----------------------------------------------------
its constructor contains
ni - number of inputs
no - number of outputs
hidden - number of hidden layers
density - neurons per hidden layer
*/
    
class NeuralNetwork {
	constructor(ni, no, hidden, density) {

		this.ni = ni;
		this.no = no;
		this.hidden = hidden;
		this.density = density;

		this.bias = -1.0;
		this.activationResponse = 1.0;
		this.neuronLayers = [];

		this.createNetwork();
	}

	
	
	
/*-------------------------------------------- 1 --------------------------------------------------
1.1 - create the first hidden layer with desnity and number of inputs and push (add to end) it to "neuronLayers"
- create hidden layers based on "hidden" size
1.2 - create output layers
1.3 - if we do not have any hidden layers create output layer 
*/
	createNetwork() {

        if (this.hidden > 0) {
			
            // 1.1
			const first = new NeuronLayer(this.density, this.ni);
			this.neuronLayers.push(first);

			for (let i = 0; i < this.hidden - 1; ++i) {
				const newHiddenLayer = new NeuronLayer(this.density, this.density);
				this.neuronLayers.push(newHiddenLayer);
			}

			// 1.2
			var outputLayer = new NeuronLayer(this.no, this.density);
			this.neuronLayers.push(outputLayer);
            
        } else {
			// 1.3
			var outputLayer = new NeuronLayer(this.no, this.ni);
			this.neuronLayers.push(outputLayer);
		}
	}

	
	
	
	
/*-------------------------------------------- 2 -------------------------------------------------- 
UPDATE INPUTS
2.1 - If the number of inputs supplied is incorrect...
2.2 - loop through all the hidden, get one layer from "neuroLayers" array at index  
- add outputs to inputs (by concat)

2.3 - For each neuron sum the (inputs * corresponding weights).
Throw the total at our sigmoid function to get the output.

2.4 -  store outputs from each layer  
*/
	update(inputs) {

		let outputs = [];
		let cWeight = 0;

		// 2.1
		if (inputs.length != this.ni) {
			return outputs; // Return empty outputs
		}

		// 2.2
		let inputLayer = true;
		for (let i = 0; i < this.hidden + 1; ++i) {
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
                for (let k = 0; k < neuron.ni - 1; ++k) {
					
                    // Multiply it with the input.
					totalInput += neuron.weights[k] * inputs[cWeight];
					cWeight++;
				}


                // Add in the bias (final weight)
                totalInput += neuron.weights[neuron.weights.length - 1] * this.bias;

                //2.4
                outputs.push(this.sigmoid(totalInput, this.activationResponse));
                cWeight = 0;
            } // end of the loop 
            
            
        }

		return outputs;
	}

	
/*-------------------------------------------- 3 -------------------------------------------------- 
SIGMOID - starter function (totalInput, activationResponse)
*/
	sigmoid(totalInput, activationResponse) {
		return (1 / (1 + Math.exp(-totalInput / activationResponse)));
	}
}
    



/*------------------------------------------------- NEURON -----------------------------------------------------
use number of inputs and add a random weight to  "weigths" array
(because we want to start with some connections and compare them to the desired output)
*/


class Neuron {
    constructor(ni){
        this.weights = [];
        this.ni = ni;
        
        for (let i = 0; i < ni; ++i){
            const newWeigth = -1 + (Math.random() * 2);
            this.weights.push(newWeigth);
        }
    }
}



    
    

/*----------------------------------------------- NEURON LAYER ---------------------------------------------------
(density of neurons per hidden layer, number of inputs,)
use "Neuron" class to push neuron into the "neurons" array layer
*/
class NeuronLayer {
    constructor(density, ni) {
		this.neurons = [];

		for (let i = 0; i < density; ++i) {
			const newNeuron = new Neuron(ni);
			this.neurons.push(newNeuron);
		}
	}
}






// Usage:
const network = new NeuralNetwork(2, 2, 2, 6);
const inputs = [0.12, 0.24];
const outputs = network.update(inputs);

console.log(outputs);

```
Source: https://github.com/DivineOmega/simple-neural-network-js









## Not required
```



	getWeights() {
		const weights = [];

		//for each layer
		for (let i = 0; i < this.hidden + 1; ++i) {

			//for each neuron
			for (let j = 0; j < this.neuronLayers[i].neurons.length; ++j) {
				//for each weight
				for (let k = 0; k < this.neuronLayers[i].neurons[j].ni; ++k) {
					weights.push(this.neuronLayers[i].neurons[j].weights[k]);
				}
			}
		}

		return weights;
	}

    

SET WEIGHTS
looping through a nested structure


	setWeights(weights) {
		let cWeight = 0;

		//for each layer
		for (let i = 0; i < this.hidden + 1; ++i) {

			//for each neuron
			for (let j = 0; j < this.neuronLayers[i].neurons.length; ++j) {
				//for each weight
				for (let k = 0; k < this.neuronLayers[i].neurons[j].ni; ++k) {
					this.neuronLayers[i].neurons[j].weights[k] = weights[cWeight++];
				}
			}
		}
	}
}



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


