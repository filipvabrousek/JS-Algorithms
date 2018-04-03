class N {
	constructor(ni) {
		this.weights = [];
		this.data = [];
		this.weights.length = 2; // 2
		this.weights.fill(Math.random());

		if (this.weights.length == 2) {
			this.weights.push(1);
		}
	}




	forward(inputs) {
		this.inputs = inputs;
		this.sum = 0;
		this.weights.forEach((el, i) => this.sum += this.inputs[i] * this.weights[i]);
		this.sum += this.weights[this.weights.length - 1];
		return this.sigmoid(this.sum);
	}

	backward(error) {
		this.error = error;
		return this.weights.map(w => w * error).slice(1); // w * err, remove first element (bias)
	}

	train(inputs, expected) { // instead of update


		const res = this.forward(inputs);

		this.data.push({
			input: inputs,
			target: expected
		});


		this.weights.forEach((el, i) => {
			const input = (i == inputs.length) ? 1 : inputs[i];
			let diff = expected - res;
			this.weights[i] += diff * input * 0.1;
		});


	}

	sigmoid(x) {
		return 1 / (1 + Math.exp(-x));
	}
}




class Layer {
	constructor(len, inputs) {
		this.neurons = [];
		this.neurons.length = len;
		this.neurons.fill(new N(inputs));
	}

	forward(inputs) {
		this.neurons.map(n => n.forward(inputs));
	}

	backward(errors) {
		return this.neurons.map((n, i) => n.backward(errors[i])).reduce((a, b) => a + b);
	}

	train() {
		this.neurons.forEach(n => n.train());
	}
}




class Network {

	constructor(len, nl) { // number of layers
		this.layers = [];
		this.layers.length = nl;
		this.layers.fill(new Layer(len));
		console.log(this.layers);
	}



	forward(inputs) {
		return this.layers.reduce((inp, lr) => lr.forward([1].concat(inp)), inputs);
	}

	backward(errors) {
		this.layers.forEach((el, i) =>  el.backward(errors[i]));
	}

	train(inputs, expected) {
		this.layers.forEach(l => l.train(inputs, expected));
	}


	learn() {


		let filled = []; // result array

		for (let it = 0; it < 40000; it++) {
			const i = Math.floor(Math.random() * data.length);

			// data from our array
			const input = data[i].input;
			const output = data[i].output;

			// result from network - desired output send it back, and update the connection weights between nodes
			const res = this.forward(input);
			let err = [];
			res.forEach((el, index) => err.push(res[index] - output[index]));
			this.backward(err);
			this.train();
		}


		// get result
		data.forEach((val, i) => {
			const input = data[i].input;
			const output = this.forward(input)
			const n = Number(output)
			filled.push(n);
		});

		return filled;


	}


}



let net = new Network(2, 10);
net.train([0, 0], 0);
net.train([0, 1], 1);

let res = net.learn();
console.log(res);
