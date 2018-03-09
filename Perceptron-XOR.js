
class Perceptron {


	constructor() {
		this.weights = [];
		this.treshold = 1;
		this.learningrate = 0.1;
		this.debug = false;
		this.threshold = 1;
		this.data = [];
	}



	retrain() {
		let success = true;
		this.data.forEach(a => {
			const training = this.data.shift();
			success = this.train(training.input, training.target) && success
		});
		return success
	}


	train(inputs, expected) {
		while (this.weights.length < inputs.length) {
			this.weights.push(Math.random())
		}

		// add a bias weight for the threshold
		if (this.weights.length == inputs.length) {
			this.weights.push(1);
		}

		const result = this.perceive(inputs);
		this.data.push({
			input: inputs,
			target: expected,
			prev: result
		})


		if (result == expected) {
			return true
		} else {
			this.weights.forEach((el, index) => {
				const input = (index == inputs.length) ? this.treshold : inputs[index];
				this.adjust(result, expected, input, index)
			});

			return false
		}
	}

	adjust(result, expected, input, index) {
		const d = this.delta(result, expected, input, this.learningrate);
		this.weights[index] += d;
	}

	delta(actual, expected, input, learnrate) {
		return (expected - actual) * learnrate * input
	}

	perceive(inputs, net, activationFunc) {
		let result = 0;

		inputs.forEach((el, index) => result += inputs[index] *  this.weights[index]);
		result += this.threshold * this.weights[this.weights.length - 1];
		return this.sigmoid(result) // determine if neuron fires
	}

	sigmoid(t) {
		return 1 / (1 + Math.exp(-t));
	}
}


const p = new Perceptron();
p.train([0, 0], 0);
p.train([0, 1], 1);


// practice makes perfect (we hope...)
var i = 0;
while (i++ < 10000 && !p.retrain()) {}
console.log(p.perceive([0, 0]));
console.log(p.perceive([0, 1]));

