# Think
* simple ML library which allows to create perceptron or use linear regression

## Perceptron
follows "feed-forward" model
1) for every input multiply it by its weight
2) sum all weighted inputs
3) compute the output based on the sum passed through an activation f. (sign of the sum)
![perceptron](https://qph.ec.quoracdn.net/main-qimg-70af31b2f67f064c4aa5b7824fe5ad50)


## Linear regression
* we predict scores on one variable from scores on 2nd variable
* Y - criterion (the variable we are predicting)
* X - predictor (we are basing our predictions on it)
* regression line - best fitting straight line between the points (minimizing error)

![regression](http://onlinestatbook.com/2/regression/graphics/reg_error.gif)

## Neural network
**Phase 1:**
* input -> hidden units -> outputs (feedforward)
* each unit receives input from the unit on the left
* (inputs are multiplied by the weight of the connection they travel along)
* every unit adds the total sum (if s. > treshold -> unit fires and triggers next)

**Phase 2:**
* learn using going backwards (backpropagation)
* compare output with desired on and use the diffrence to modify weights of connections between the units

![neural network](https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Colored_neural_network.svg/296px-Colored_neural_network.svg.png)

```js

const Think = (() => {


	// Regression variables
	const x = [];
	const y = [];
	let m = 2;
	let b = 2;

	const mouse = {
		x: 0,
		y: 0
	}


	/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	P([-2, -2], 3) -> 1 "linear classifier" "supervised learning of binary classifiers"
	*/
	class Perceptron {
		constructor(bias, weights) {
			this.weights = weights;
			this.treshold = bias * -1; // -3 in this case
		}

		// multiply each input with correponding weight
		run(inputs) {
			let sum = 0.0;
			for (let i = 0; i <  inputs.length; i++) {
				sum += inputs[i] * this.weights[i]; // += 0, +=-2
			}

			// if sum of all weighted inputs is > treshold -> 1   "-2 >-3 => 1"
			if (sum <= this.treshold) {
				return 0;
			} else {
				return 1;
			}
		}
	}





	/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
	class Network {
		constructor(ni, no, hidden, density) {

			this.ni = ni; // number of inputs
			this.no = no;
			this.hidden = hidden;
			this.density = density;

			this.bias = -1.0;
			this.activationResponse = 1.0; // when will the next unit fire
			this.layers = [];

			this.init(); // create our network
		}



		init() {

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


			// LOOP -------------------------------------------------------------- through hidden (number) layers, get one at index
			for (let i = 0; i < this.hidden + 1; i++) {
				const specificLayer = this.layers[i];

				// no input layer: merge inputs and outputs
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









	/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	L. regression: we predict scores on one varible Y, based on the scores from 2nd variable X
	finding best fitting straight line between points (minimizing error)
	*/

	class L {
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


	const P = (bias, ...weights) => {
		const obj = new Perceptron(weights, bias)
		return obj;
	}

	const Line = (selector) =>  {
		const el = new L(selector);
		el.make();
		el.addEL();
		el.do();
		return el;
	}



	const Net = (ni, no, hidden, density, ...inputs) => {
		const network = new Network(ni, no, hidden, density);
		const outputs = network.update(...inputs);
		return outputs;
	}

	return {
		P,
		Line,
		Net
	}


})();


let res = Think.P([-2, -2], 3);
console.log(res.run([0, 1]));

```

### Neural network
```js
/*
// XOR example
for (let i = 0; i < 1000; i++) {
	let w = Think.Net(2, 2, 2, 6, [1, 1]);
	console.log(Math.round(w[0])); // mostly 0 as predicted :D
}
*/
```
### Linear regression
```js
// <canvas width="800" height = "800"></canvas>
Think.Line("canvas");
```
