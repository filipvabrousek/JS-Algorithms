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
class Network {
	constructor(ni, no, hidden, density) {

		this.ni = ni;
		this.no = no;
		this.hidden = hidden;
		this.density = density;

		this.bias = -1.0;
		this.activationResponse = 1.0;
		this.layers = [];

		this.createNetwork();
	}

	

	createNetwork() {

        if (this.hidden > 0) {
			
            // first hidden l.
			const first = new Layer(this.density, this.ni);
			this.layers.push(first);

			for (let i = 0; i < this.hidden - 1; i++) {
				const newHiddenLayer = new Layer(this.density, this.density);
				this.layers.push(newHiddenLayer);
			}

			// output layers
			var outputLayer = new Layer(this.no, this.density);
			this.layers.push(outputLayer);
            
        } else {
			// output layers
			var outputLayer = new Layer(this.no, this.ni);
			this.layers.push(outputLayer);
		}
	}

    
    
    
	update(inputs) {

		let outputs = [];
		let cw = 0; 
        
		// number of inputs is incorrect (rem. 0)
        inputs.length != this.ni ? outputs : 0;
		let inputLayer = true;
        
        
        // LOOP -------------------------------------------------------------- through hidden layers, get one at index
	 for (let i = 0; i < this.hidden + 1; i++) {
            const specificLayer = this.layers[i];

            // there is no input layer merge inputs and outputs
            if (!inputLayer) {
				inputs = [];
				inputs = inputs.concat(outputs);
			} else {
				inputLayer = false;
			}

            outputs = [];
            cw = 0;

            
            for (const neuron of specificLayer.neurons) {
                let totalInput = 0;
                // For each weight...
                for (let k = 0; k < neuron.ni - 1; ++k) {
					totalInput += neuron.weights[k] * inputs[cw];
					cw++;
				}
                
                // Add in the bias (final weight) and store outputs
                totalInput += neuron.weights[neuron.weights.length - 1] * this.bias;
                outputs.push(this.sigmoid(totalInput, this.activationResponse));
                cw = 0;
            } 
            
            
        } //------------------------------------------------------------------------------

		return outputs;
	}

	
        // starter function
	sigmoid(totalInput, activationResponse) {
		return (1 / (1 + Math.exp(-totalInput / activationResponse)));
	}
}
    









/*------------------------------------------------- NEURON -----------------------------------------------------
use number of inputs and add a random weight to  "weigths" array
(because we want to start with some connections and compare them to the desired output)
*/

class N {
    constructor(ni){
        this.weights = [];
        this.ni = ni;
        
        for (let i = 0; i < ni; i++){
            const newWeigth = -1 + (Math.random() * 2);
            this.weights.push(newWeigth);
        }
    }
}


    
    

/*----------------------------------------------- NEURON LAYER ---------------------------------------------------
(density of neurons per hidden layer, number of inputs,)
use "N" class to push neuron into the "neurons" array layer
*/

class Layer {
    constructor(density, ni) {
		this.neurons = [];

		for (let i = 0; i < density; i++) {
			const newN = new N(ni);
			this.neurons.push(newN);
		}
	}
}



// Usage:
const network = new Network(2, 2, 2, 6);
const inputs = [0.12, 0.24];
const outputs = network.update(inputs);

console.log(outputs);

```
* Source: https://github.com/DivineOmega/simple-neural-network-js  
* https://hackernoon.com/neural-networks-from-scratch-for-javascript-linguists-part1-the-perceptron-632a4d1fbad2






