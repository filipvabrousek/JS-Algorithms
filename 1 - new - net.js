<script>

    
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
	class Network {
		constructor(ni, no, hidden, density) {

			this.ni = ni; // number of inputs
			this.no = no; // number of expected outputs
			this.hidden = hidden;
			this.density = density;

			this.bias = -1.0;
			this.AR = 1.0; // activation response when will the next unit fire
			this.layers = [];

			this.init(); // create our network
		}



		init() {

			
                // if this.hidden > 0
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
        // Math.exp(x) -> e^x where "e" is euler number 
		sigmoid(S, AR) {
			return (1 / (1 + Math.exp(-S / AR)));
		}
        
        
        
        
    /*---------------------------------------NOT REQUIRED---------------------------*/
        getWeights(){
            let weights = [];
            
            // for each hidden layer
            for (var i = 0; i < this.hidden + 1; ++i)
                // for each neuron
                for (var j = 0; j < this.layers[i].neurons.length; ++j){
                    // for each weight
                    for (var k = 0; k < this.layers[i].neurons[j].ni; ++k){
                        weights.push(this.layers[i].neurons[j].weights[k]); // add data to weights
                        
                    }
                }
            return weights;
            }
        
        
    setWeights(weights){
         let cw = 0;
            
        // for each hidden layer
        for (var i = 0; i < this.hidden + 1; ++i){
            // for each neuron
            for(var j = 0; j < this.layers[i].neurons.length; ++j){
                
            
            // for each weight
            for (var k = 0; k < this.layers[i].neurons[j].ni; ++k){
                this.layers[i].neurons[j].weights[k] = weights[cw++];
            }
        }
            
        
        }
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







let inputs = [0.12, 0.24];
const network = new Network(2, 2, 20, 6);

for (let i = 0; i < 1000; i++) {
	let outputs = network.update(inputs);

	let [a, b] = [outputs[0], outputs[1]];
	a > b ? console.log(a / b) : console.log(b / a);
	console.log("inputs ratio " + inputs[0] / inputs[1]);

}


/*
const Net = (ni, no, hidden, density, ...inputs) => {
		const network = new Network(ni, no, hidden, density);
		const outputs = network.update(...inputs);
		return outputs;
	}

for (let i = 0; i < 500; i++) {
	let w = Net(2, 2, 2, 1000, [0,0]); // should be one
	console.log(w); // will be bigger than when we do [0, 0] or [1, 1]
}
*/
    
    
    
    
   /*
    
    
let weights = network.getWeights();
let news = []; // new weights
for (let i = 0; i < weights.len; i++){
    news.push(weights[i] * 0.5);
}

network.setWeights(weights);

let get = network.getWeights();
console.log(get);
*/



    

    
// https://medium.com/the-theory-of-everything/understanding-activation-functions-in-neural-networks-9491262884e0



</script>
