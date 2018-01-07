# Think
* simple ML library which allows to create perceptron or use linear regression
* for educational purposes
* To do: Neural network, K means (classes)
## Linear regression
* we predict scores on one variable from scores on 2nd variable
* Y - criterion (the variable we are predicting)
* X - predictor (we are basing our predictions on it)
* regression line - best fitting straight line between the points (minimizing error)

![regression](http://onlinestatbook.com/2/regression/graphics/reg_error.gif)

```js

    
const Think = (() => {

	const x = [];
	const y = [];
	let m = 2;
	let b = 2;

	const mouse = {
		x: 0,
		y: 0
	}


	class Perceptron {
		constructor(bias, weights) {
			this.weights = weights;
			this.treshold = bias * -1;
		}

		run(inputs) {
			let sum = 0.0;
			for (let i = 0; i < inputs.length; i++) {
				sum += inputs[i] * this.weights[i];
			}

			if (sum <= this.threshold) {
				return 0;
			} else {
				return 1;
			}
		}
	}






	class Network {
		constructor(ni, no, hidden, density) {

			this.ni = ni;
			this.no = no;
			this.hidden = hidden;
			this.density = density;

			this.bias = -1.0;
			this.activationResponse = 1.0;
			this.layers = [];

			this.createNetwork();
		}



		createNetwork() {

			if (this.hidden > 0) {

				// first hidden l.
				const first = new Layer(this.density, this.ni);
				this.layers.push(first);

				for (let i = 0; i < this.hidden - 1; i++) {
					const newHiddenLayer = new Layer(this.density, this.density);
					this.layers.push(newHiddenLayer);
				}

				// output layers
				var outputLayer = new Layer(this.no, this.density);
				this.layers.push(outputLayer);

			} else {
				// output layers
				var outputLayer = new Layer(this.no, this.ni);
				this.layers.push(outputLayer);
			}
		}




		update(inputs) {

			let outputs = [];
			let cw = 0;

			// number of inputs is incorrect (rem. 0)
			inputs.length != this.ni ? outputs : 0;
			let inputLayer = true;


			// LOOP -------------------------------------------------------------- through hidden layers, get one at index
			for (let i = 0; i < this.hidden + 1; i++) {
				const specificLayer = this.layers[i];

				// there is no input layer merge inputs and outputs
				if (!inputLayer) {
					inputs = [];
					inputs = inputs.concat(outputs);
				} else {
					inputLayer = false;
				}

				outputs = [];
				cw = 0;


				for (const neuron of specificLayer.neurons) {
					let totalInput = 0;
					// For each weight...
					for (let k = 0; k < neuron.ni - 1; ++k) {
						totalInput += neuron.weights[k] * inputs[cw];
						cw++;
					}

					// Add in the bias (final weight) and store outputs
					totalInput += neuron.weights[neuron.weights.length - 1] * this.bias;
					outputs.push(this.sigmoid(totalInput, this.activationResponse));
					cw = 0;
				}


			} //------------------------------------------------------------------------------

			return outputs;
		}


		// starter function
		sigmoid(totalInput, activationResponse) {
			return (1 / (1 + Math.exp(-totalInput / activationResponse)));
		}
	}










	/*------------------------------------------------- NEURON -----------------------------------------------------
	use number of inputs and add a random weight to  "weigths" array
	(because we want to start with some connections and compare them to the desired output)
	*/

	class N {
		constructor(ni) {
			this.weights = [];
			this.ni = ni;

			for (let i = 0; i < ni; i++) {
				const newWeigth = -1 + (Math.random() * 2);
				this.weights.push(newWeigth);
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











	class E {
		constructor(selector) {
			this.selector = selector || null;
			this.element = null;
		}

		make() {
			this.element = document.querySelector(this.selector);
			this.element.ctx = this.element.getContext("2d");
			this.element.ctx.fillStyle = "green";
		}

		addEL() {
			this.element.addEventListener("click", e => {
				x.push(e.offsetX);
				y.push(this.element.height - e.offsetY);
			});

		}



		drawPoints() {
			for (let i = 0; i < x.length; i++) {
				this.element.ctx.fillRect(x[i] - 2, this.element.height - y[i] - 2, 4, 4); // x, y, w, h
			}
		}


		learn(alpha) {
			if (x.length <= 0) return;

			let sum1 = 0;
			let sum2 = 0;

			for (let i = 0; i < x.length; i++) {
				sum1 += this.line(x[i]) - y[i];
				sum2 += (this.line(x[i]) - y[i]) * x[i];
			}

			b = b - 1000000 * alpha * sum1 / (x.length);
			m = m - alpha * sum2 / (x.length);
			return this.element;
		}


		line(x) {
			return m * x + b;
		}


		drawLine() {
			this.element.ctx.beginPath();
			this.element.ctx.moveTo(0, this.element.height - this.line(0));
			this.element.ctx.lineTo(this.element.width, this.element.height - this.line(this.element.width));
			this.element.ctx.stroke();
			return this.element;
		}


		do() {
			setInterval(() => {
				this.element.ctx.clearRect(0, 0, this.element.width, this.element.height); // x, y, w, h
				this.learn(0.000001);
				this.drawPoints();
				this.drawLine();
			}, 1000 / 60);
		}

	}


	const S = (selector) =>  {
		const el = new E(selector);
		el.make();
		el.addEL();
		el.do();
		return el;
	}

	const P = (bias, ...weights) => {
		const p = new Perceptron(weights, bias)
		return p;
	}

	const Net = (ni, no, hidden, density, ...inputs) => {
		const network = new Network(ni, no, hidden, density);
		const outputs = network.update(...inputs);
		return outputs;
	}

	return {
		S,
		P,
		Net
	}


})();


let res = Think.P([-2, -2], 3);
console.log(res.run([0, 1]));



/*
let w = Think.Net(2, 2, 2, 6, [0.12, 0.24]);
console.log(w);
*/

// Think.S("canvas");
// <canvas width="800" height = "800"></canvas>

```
