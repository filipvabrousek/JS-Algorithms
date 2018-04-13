const sigmoid = x => 1 / (1 + Math.exp(-x)); // maps any input into value between 0 and 1
const sgrad = x => sigmoid(x) * (1 - sigmoid(x)); // val * (1 - val)


class N {
	constructor(ni) {
		this.weights = [];
		this.weights.length = ni;
		this.weights.fill(Math.random());
	}

	forward(inputs) {
		this.inputs = inputs;
		this.sum = 0;
		this.weights.forEach((el, i) => this.sum += this.weights[i] * this.inputs[i]);
		return sigmoid(this.sum);
	}

	backward(error) {
		this.error = error;
		return this.weights.map(w => w * error).slice(1); // remove bias
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

	update(data) {
		this.neurons.forEach(n => n.update());
	}
}



class Network {
	constructor() {
		this.layers = [new Layer(3, 3), new Layer(1, 4)];
	}

	/*
	"ourdata" is [0, 1] is "first", that gets passed into concat so: Layer {n: Array(1)}.forward([1,0,1]) 
	the last value is returned (thats why we use reduce) we are training and returning, but we only care about returned value after the loop finishes  */
	forward(first) {
		return this.layers.reduce((ourdata, layer) => layer.forward([1].concat(ourdata)), first);
	}

	learn() {

		for (let it = 0; it < 1000; it++) {

			// fill err array with (result from network - desired output), and update the connection weights between nodes
			const res = this.forward(data[0]);
			let err = [];
			res.forEach((el, index) => err.push(res[index] - data[1]));

			// backpropagation , send err array back
			this.layers.reverse().reduce((error, layer) => layer.backward(error), err);
			this.layers.reverse(); // reverse back

			// update the connection weights 
			this.layers.forEach(l => l.update());
		}


		// add bias, and get our result
		const output = this.forward(data[0]);
		return output;
	}

}


/*------------------------------------------------------USAGE----------------------------------------------------------*/


const data = [[0, 1], 1]; // or [[0, 0], 0]

const network = new Network();
const res = network.learn(data);
console.log(res);
