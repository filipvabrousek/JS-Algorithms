class Perceptrona {
	constructor() {
		this.weights = [];
		this.data = [];
	}


// called first
	train(inputs, expected) { // [0, 1], 1
		while (this.weights.length < inputs.length) {
			this.weights.push(Math.random())
		}

		
        // add the bias
		if (this.weights.length == inputs.length) {
			this.weights.push(1);
		}

        // get result and push it to data ("use percieve")
		const result = this.perceive(inputs); // result from sigmoid (weights are passed in), used to calculate delta
		this.data.push({input: inputs, target: expected, prev: result});
		

        // adjust weights id result is not expected using "adjust"
        this.weights.forEach((el, index) => {
            const input = (index == inputs.length) ? 1 : inputs[index];
            this.adjust(result, expected, input, index)
			});
   
	}
    

    // add elta to weights 0.1 is learning rate
    adjust(result, expected, input, index) {
		const d = (expected - result) * input * 0.1;
		this.weights[index] += d;
	}
    
/*
called 2nd, use "train" function, this.data:
{input: [0,0], target: 1, prev: 0.97}
{input: [0,1], target: 0, prev: 0.049} periodically swaps
*/
	retrain() {
		let scs = true;
		this.data.forEach(a => {
			const training = this.data.shift(); // 1st el during 1st repeatition, then 2nd, 3rd ---
			scs = this.train(training.input, training.target) && scs;
		});
		return scs
	}
    

    // called 3rd, get sum of weighed inputs and pass them into sigmoid
	perceive(inputs) {
		let result = 0;
		inputs.forEach((el, index) => result += inputs[index] *  this.weights[index]);
		result += 1 * this.weights[this.weights.length - 1];
		return this.sigmoid(result); // determine if neuron fires
	}

	sigmoid(t) {
		return 1 / (1 + Math.exp(-t));
	}
}


const pa = new Perceptrona();
pa.train([0, 0], 0);
pa.train([0, 1], 1);

// practice....
for (let i = 0; i < 10000; i++){
    pa.retrain();
}

let small = pa.perceive([0, 0]);
let big = pa.perceive([0, 1]); 
console.log(small, big);
