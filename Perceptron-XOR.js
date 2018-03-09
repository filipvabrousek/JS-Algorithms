
class Perceptron {
	constructor() {
		this.weights = [];
		this.treshold = 1;
		this.learningrate = 0.1;
		this.debug = false;
		this.threshold = 1;
		this.data = [];
	}

/*
use "train" function
{input: [0,0], target: 1, prev: 0.9676282649610425} 
{input: [0,1], target: 0, prev: 0.04869526289002674} periodically swaps
*/
	retrain() {
		let success = true;
		this.data.forEach(a => {
			const training = this.data.shift(); 
			success = this.train(training.input, training.target) && success
		});
		return success
	}

    
/* called first, fill the weights with ranodm numbers, 
2) add the bias
3) get result and push it to data ("use percieve")
4) if result is not expected, adjust weights */
	train(inputs, expected) {
		while (this.weights.length < inputs.length) {
			this.weights.push(Math.random())
		}

		// 2
		if (this.weights.length == inputs.length) {
			this.weights.push(1);
		}

        // 3 
		const result = this.perceive(inputs);
		this.data.push({input: inputs, target: expected, prev: result});
		if (result == expected) {return true} 

        // 4 (uses "adjust")
        this.weights.forEach((el, index) => {
            const input = (index == inputs.length) ? this.treshold : inputs[index];
            this.adjust(result, expected, input, index)
			});
        return false
		
	}

    // uses delta, adds delta to weights
	adjust(result, expected, input, index) {
		const d = this.delta(result, expected, input, this.learningrate);
		this.weights[index] += d;
	}

	delta(actual, expected, input, learnrate) {
		return (expected - actual) * learnrate * input
	}

    // get sum of weighed inputs and pass them into sigmoid
	perceive(inputs, net, activationFunc) {
		let result = 0;
		inputs.forEach((el, index) => result += inputs[index] *  this.weights[index]);
		result += this.threshold * this.weights[this.weights.length - 1];
		return this.sigmoid(result); // determine if neuron fires
	}

	sigmoid(t) {
		return 1 / (1 + Math.exp(-t));
	}
}


const p = new Perceptron();
p.train([0, 0], 0);
p.train([0, 1], 1);

// practice makes perfect (we hope...)
let i = 0;
while (i++ < 10000 && !p.retrain()) {}
console.log(p.perceive([0, 0]));
console.log(p.perceive([0, 1]));

    
// SOURCE: https://gist.github.com/primaryobjects/dfb8927f9f0ca21b6a24647168cead41
