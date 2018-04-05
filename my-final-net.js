const sigmoid = x => 1 / (1 + Math.exp(-x)); // maps any input into value between 0 and 1
const sigmoidGradient = x => sigmoid(x) * (1 - sigmoid(x)); // val * (1 - val)

/*------------------------------------------------------NEURON----------------------------------------------------------*/
class N {
	constructor(ni) {
		this.weights = [];
		this.weights.length = ni;
		this.weights.fill(Math.random() - 0.5) // fill weights with random numbers
	}

	// we get weighed sum of neuron inputs and normalize it to value between 0 and 1 using sigmoid
	forward(inputs) {
		this.inputs = inputs;
		this.sum = 0;
		this.weights.forEach((el, index) => this.sum += this.inputs[index] * this.weights[index])
		return sigmoid(this.sum); // returns (1 / 1 + e^-this.sum)
	}

	backward(error) {
		this.error = error; // we need to access error below (what forward returned - desired output)
		return this.weights.map(w => w * error).slice(1); // each w. * error and remove 1st el. (bias)
	}

	/* adjusting weights: make adjustment proportional to the size of error "sigmoidGradient" ensures the we adjust just a little bit
	pass "this.sum" from "forward()" into sigmoidGradient,
	input (0 = no adjustment or 1) * sigmoidGradient * error -> creates "deltas array" 
	adjust weights by substracting deltas*/
	update() {
		const deltas = this.inputs.map(input => input * sigmoidGradient(this.sum) * this.error);
		this.diff = [];
		this.weights.forEach((el, index) => this.diff.push(this.weights[index] - deltas[index]));
		this.weights = this.diff;
	}
}




/*------------------------------------------------------LAYER----------------------------------------------------------*/
class Layer {
	constructor(len, inputs) {
		this.neurons = [];
		this.neurons.length = len;
		this.neurons.fill(new N(inputs));
	}

	forward(inputs) {
		return this.neurons.map(n => n.forward(inputs));
	}

	backward(errors) {
		return this.neurons.map((n, i) => n.backward(errors[i])).reduce((a, b) => a + b); // pass each error backwards and get weighted sum
	}

	update() {
		this.neurons.forEach(n => n.update());
	}
}



/*------------------------------------------------------NETWORK---------------------------------------------------------*/
class Network {
	constructor() {
		this.layers = [new Layer(3, 3), new Layer(1, 4)];
	}

	learn(data) {
		let filled = []; // result array

		for (let it = 0; it < 40000; it++) {
			const i = Math.floor(Math.random() * data.length);

			// data from our array
			const input = data[i].input;
			const output = data[i].output;

			// result from network - desired output send it back, and update the connection weights between nodes
			const res = this.layers.reduce((inp, lr) => lr.forward([1].concat(inp)), input);
			let err = [];
			res.forEach((el, index) => err.push(res[index] - output[index]));
			// call backward for each layer
			this.layers.reverse().reduce((error, layer) => layer.backward(error), err);
			this.layers.reverse(); // reverse back

			this.layers.forEach(l => l.update())
		}


		// get result
		data.forEach((val, i) => {
			const input = data[i].input;
			const output = this.layers.reduce((inp, lr) => lr.forward([1].concat(inp)), input);
			const n = Number(output)
			filled.push(n);
		});

		return filled;
	}

}



/*------------------------------------------------------USAGE----------------------------------------------------------*/
const data = [{
	input: [0, 0],
	output: [0],
}, {
	input: [1, 0],
	output: [1],
}];


const network = new Network();
const res = network.learn(data);
console.log(res);
