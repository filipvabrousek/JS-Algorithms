class Perceptron {
	constructor() {
		this.weights = [];
		this.treshold = 1;
		this.learningrate = 0.1; // used in adjust
		this.debug = false;
		this.threshold = 1;
		this.data = [];
	}


// called first
	train(inputs, expected) { // [0, 1], 1
	    		while (this.weights.length < inputs.length) {
			this.weights.push(Math.random())
		}

		

        // get result and push it to data ("use percieve")
		const result = this.perceive(inputs); // result from sigmoid (weights are passed in), used to calculate delta
		this.data.push({input: inputs, target: expected, prev: result});
		if (result == expected) {return true} 

        // adjust weights id result is not expected using "adjust"
        this.weights.forEach((el, index) => {
            const input = (index == inputs.length) ? this.treshold : inputs[index];
            this.adjust(result, expected, input, index)
			});
        return false
	}
    
    // uses delta, adds delta to weights
	adjust(result, expected, input, index) {
    const d = (expected - result) * input * this.learningrate;
		this.weights[index] += d;
	}

	
/*
called 2nd, use "train" function, this.data:
{input: [0,0], target: 1, prev: 0.97} 
{input: [0,1], target: 0, prev: 0.049} periodically swaps
*/
	retrain() {
		let success = true;
		this.data.forEach(a => {
			const training = this.data.shift(); // 1st el during 1st repeatition, then 2nd, 3rd ---
			success = this.train(training.input, training.target) && success;
		});
		return success
	}
    

    // called 3rd, get sum of weighed inputs and pass them into sigmoid
	perceive(inputs) {
		let result = 0;
		inputs.forEach((el, index) => result += inputs[index] *  this.weights[index]);
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

let res = p.perceive([0, 1]);
console.log(res);
