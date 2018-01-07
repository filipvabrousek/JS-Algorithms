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

	return {
		S,
		P
	}


})();


let res = Think.P([-2, -2], 3);
console.log(res.run([0, 1]));

// Think.S("canvas");
// <canvas width="800" height = "800"></canvas>
```
