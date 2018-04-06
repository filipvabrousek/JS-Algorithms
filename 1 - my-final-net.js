const sigmoid = x => 1 / (1 + Math.exp(-x)); // maps any input into value between 0 and 1
const sgrad = x => sigmoid(x) * (1 - sigmoid(x)); // val * (1 - val)

/*------------------------------------------------------NEURON----------------------------------------------------------*/
class N {
	constructor(ni) {
		this.weights = [];
		this.weights.length = ni;
		this.weights.fill(Math.random()) // fill weights with random numbers
	}

	// we get weighed sum of neuron inputs and normalize it to value between 0 and 1 using sigmoid
	forward(inputs) {
		this.inputs = inputs;
		this.sum = 0;
		this.weights.forEach((el, i) => this.sum += this.inputs[i] * this.weights[i]);
		return sigmoid(this.sum); // returns (1 / 1 + e^-this.sum)
	}

	backward(error) {
		this.error = error; // we need to access error below (what forward returned - desired output)
		return this.weights.map(w => w * error).slice(1); // each w. * error and remove 1st el. (bias)
	}

	/* adjusting weights: make adjustment proportional to the size of error "sigmoid gradient" ensures the we adjust just a little bit
	pass "this.sum" from "forward()" into sigmoid gradient (sgrad), adjust weights by substracting deltas */
	update() {
		const deltas = this.inputs.map(input => input * sgrad(this.sum) * this.error);
		this.weights.forEach((el, i) => this.weights[i] = this.weights[i] - deltas[i]);
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

	forward(input) {
		return this.layers.reduce((inp, lr) => lr.forward([1].concat(inp)), input); // add bias
	}

	learn(data) {

		for (let it = 0; it < 1000; it++) {

			// result from network - desired output send it back, and update the connection weights between nodes
			const res = this.forward(data[0]);
			let err = [];
			res.forEach((el, index) => err.push(res[index] - data[1]));

			// backpropagation (call backwards for each layer)
			this.layers.reverse().reduce((error, layer) => layer.backward(error), err);
			this.layers.reverse(); // reverse back
			this.layers.forEach(l => l.update())
		}
		// add bias, and get our result
		const output = this.forward(data[0]);
		return output;
	}

}


/*------------------------------------------------------USAGE----------------------------------------------------------*/

    
const data = [[0, 1], 1]; // or [[0, 1], 1]
    
const network = new Network();
const res = network.learn(data);
console.log(res);
