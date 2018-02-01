/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
	class Network {
		constructor(ni, no, hidden, density) {

			this.ni = ni; // number of inputs
			this.no = no;
			this.hidden = hidden;
			this.density = density;

			this.bias = -1.0;
			this.AR = 1.0; // activation response when will the next unit fire
			this.layers = [];

			this.init(); // create our network
		}



		init() {

			if (this.hidden > 0) {

				// first hidden l., we define those arguments in the "Network constructor"
				const first = new Layer(this.density, this.ni);
				this.layers.push(first);

				for (let i = 0; i < this.hidden - 1; i++) {
					const newHiddenLayer = new Layer(this.density, this.density);
					this.layers.push(newHiddenLayer);
				}

				// output layers
				var outputLayer = new Layer(this.no, this.density);
				this.layers.push(outputLayer);
		}
        } 



		update(inputs) {

			let outputs = [];
			let cw = 0; // connection weight
			// number of inputs is incorrect, so return outputs
			inputs.length != this.ni ? outputs : 0;
			let inputLayer = true;

			// LOOP -------------------------------------------------------------- through each hidden layer...
			for (let i = 0; i < this.hidden + 1; i++) {
				const specificLayer = this.layers[i]; // Layer {neurons: Array(6)}  ...(6) and (2) again...

				// no input layer: merge inputs and outputs
				if (!inputLayer) {
					inputs = [];
					inputs = inputs.concat(outputs);
				} else {
					inputLayer = false;
				}

				outputs = [];
				cw = 0;

                // NESTED --------------------- loop through every neuron of every layer.......
				for (const neuron of specificLayer.neurons) {
					let sum = 0; 
                    
                    // NESTED 2 ---------- loop for the length of inputs mutiply each weight with corresponding output inc. con. weight
					for (let k = 0; k < neuron.ni - 1; ++k) { //++k increments k and returns new value
						sum += neuron.weights[k] * inputs[cw];
						cw++;
					}

					// multiply the last member of "neuron.weights" array (length is 2 so at index 1) by -1 (bias)
                    // pass created sum into sigmoid f. and fill -in outputs with result of the sigmoid f.
					sum += neuron.weights[neuron.weights.length - 1] * this.bias;
					outputs.push(this.sigmoid(sum, this.AR));
					cw = 0;
				}

			} //------------------------------------------------------------------------------ end of big loop

			return outputs;
		}


		// S = Total Input, Sum, AR = Activation Response returns number between 0 and 1
        // Math.exp(a) -> e^x where "e" is euler number 
		sigmoid(S, AR) {
			return (1 / (1 + Math.exp(-S / AR)));
		}
	}










	/*------------------------------------------------- NEURON -----------------------------------------------------
	add as many random weights to "weights" array, as the number of inputs is
	*/

	class N {
		constructor(ni) {
			this.weights = [];
			this.ni = ni;

			for (let i = 0; i < ni; i++) {
				const nw = -1 + (Math.random() * 2); // (-1, 1>
				this.weights.push(nw); // new weight
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




const Net = (ni, no, hidden, density, ...inputs) => {
		const network = new Network(ni, no, hidden, density);
		const outputs = network.update(...inputs);
		return outputs;
	}




// XOR example
for (let i = 0; i < 1000; i++) {
	let w = Net(2, 2, 2, 6, [1, 1]);
	console.log(Math.round(w[0])); // 0 or 1
    console.log(w) // ? 
}
    
/*
else to if this.hidden > 0
   
 else {
				// if there is NO hidden layers, create output layer
				var outputLayer = new Layer(this.no, this.ni);
				this.layers.push(outputLayer);
                console.log("O")
}
*/
    

