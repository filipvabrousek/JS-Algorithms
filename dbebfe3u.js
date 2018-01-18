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
			this.treshold = bias * -1; // -3 in this case
		}
		run(inputs) {
			let sum = 0.0;
			for (let i = 0; i < inputs.length; i++) {
				sum += inputs[i] * this.weights[i]; // += 0, +=-2
			}
			if (sum <= this.treshold) {
				return 0;
			} else {
				return 1;
			}
		}
	}
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
				const first = new Layer(this.density, this.ni);
				this.layers.push(first);
				for (let i = 0; i < this.hidden - 1; i++) {
					const newHiddenLayer = new Layer(this.density, this.density);
					this.layers.push(newHiddenLayer);
				}
				var outputLayer = new Layer(this.no, this.density);
				this.layers.push(outputLayer);
			} else {
				var outputLayer = new Layer(this.no, this.ni);
				this.layers.push(outputLayer);
			}
		}
		update(inputs) {
			let outputs = [];
			let cw = 0;
			inputs.length != this.ni ? outputs : 0;
			let inputLayer = true;
			for (let i = 0; i < this.hidden + 1; i++) {
				const specificLayer = this.layers[i];
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
					for (let k = 0; k < neuron.ni - 1; ++k) {
						totalInput += neuron.weights[k] * inputs[cw];
						cw++;
					}
					totalInput += neuron.weights[neuron.weights.length - 1] * this.bias;
					outputs.push(this.sigmoid(totalInput, this.activationResponse));
					cw = 0;
				}
			} //------------------------------------------------------------------------------
			return outputs;
		}
		sigmoid(totalInput, activationResponse) {
			return (1 / (1 + Math.exp(-totalInput / activationResponse)));
		}
	}
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
	class Layer {
		constructor(density, ni) {
			this.neurons = [];
			for (let i = 0; i < density; i++) {
				const newN = new N(ni);
				this.neurons.push(newN);
			}
		}
	}
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
			// b is 2 - 1000000 * 0.000001 / 2 and we adjust its value in the "line()", same for "m"
			for (let i = 0; i < x.length; i++) {
				sum1 += this.line(x[i]) - y[i];
				sum2 += (this.line(x[i]) - y[i]) * x[i];
			}
			b = b - 1000000 * alpha * sum1 / (x.length);
			m = m - alpha * sum2 / (x.length);
		}
		line(x) {
			return m * x + b;
		}
		drawLine() {
			let el = this.element;
			el.ctx.beginPath();
			el.ctx.moveTo(0, el.height - this.line(0));
			el.ctx.lineTo(el.width, el.height - this.line(el.width));
			el.ctx.stroke();
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
    class Means {
	constructor(data, selector) {
		this.data = data; // our input, points we define
		this.selector = selector || null; // "canvas"
		this.means = []; // centroids, we will update data in this array
		this.assignments = []; // will be array of 0s 1s and 2s
		this.range = null; // [9, 10]
		this.dataExtremes = null; // array of 2 min and max objects
		this.element = null; // selected by selector - <canvas>
		this.width = 400;
		this.height = 400;
	}
	make() {
		this.element = document.querySelector(this.selector);
		this.element.ctx = this.element.getContext("2d");
		this.dataExtremes = this.getDataExtremes(this.data);
		this.range = this.getDataRanges(this.dataExtremes); // get ranges from extremes 
		this.means = this.initMeans(3);
		this.assignPoints();
		this.draw();
		this.run = this.run.bind(this);
		setTimeout(this.run, 2000);
	}
	getDataRanges(extremes) {
		const ranges = [];
		for (const dimension in extremes) {
			ranges[dimension] = extremes[dimension].max - extremes[dimension].min;
		}
		return ranges; // [9, 10]
	}
	getDataExtremes(points) {
		const extremes = [];
		let data = this.data;
		for (const i in data) {
			const point = data[i];
			for (const dimension in point) {
				if (!extremes[dimension]) {
					extremes[dimension] = {min: 1000, max: 0};
				}
				if (point[dimension] < extremes[dimension].min) {
					extremes[dimension].min = point[dimension];
				}
				if (point[dimension] > extremes[dimension].max) {
					extremes[dimension].max = point[dimension];
				} 
                // extremes[dimension] returns one of those
			}
		}
		return extremes;
	}
	initMeans(k = 3) {
		while (k--) {
			const mean = [];
			for (const dimension in this.dataExtremes) {
				mean[dimension] = this.dataExtremes[dimension].min + (Math.random() * this.range[dimension]);
			}
			this.means.push(mean);
		}
		return this.means; // (3) [Array(2), Array(2), Array(2)]
	}
	assignPoints() {
		let data = this.data; // data we define
		let means = this.means; // random points (candidates)
		let assignments = this.assignments;
		for (const i in data) {
			const point = data[i];
			const distances = []; // create "distances" array
			for (const j in means) {
				const mean = means[j];
				let sum = 0;
                // (from array with random points - candidates for centroids)
				for (const dimension in point) {
					let difference = point[dimension] - mean[dimension];
					difference *= difference;
					sum += difference;
				}
				distances[j] = Math.sqrt(sum);  // eg. [0.69, 6.51, 10.10]
			}
            let lowest = Math.min.apply(null, distances); 
			assignments[i] = distances.indexOf(lowest);
			// (19) [2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
		}
	}
	moveMeans() {
		this.assignPoints(); // fill in assignments array
		let ms = this.means;
		const sums = Array(ms.length); // empty, same length as "ms"
		const counts = Array(ms.length); // also empty and same length
		let moved = false;
		for (const j in ms) {
			counts[j] = 0; 
			sums[j] = Array(ms[j].length); // create nested array in sums (multidimensional)
			for (const dimension in ms[j]) {
				sums[j][dimension] = 0; // zero out the 2nd depth level of "sums", filled with zeros, then with sums
			}
		}
		for (const pointIndex in this.assignments) {
			let meanIndex = this.assignments[pointIndex]; // 2 or 1 or 0 - one of the 3 centroids
			const point = data[pointIndex]; // point assigned to centroid
			const mean = ms[meanIndex];
			counts[meanIndex]++; // increment count for each cluster center
            // add value from point at meanIndex(= 0, 1, 2) (x and y) in one nested array in sums (TO) value from point (x or y)  
			for (const dimension in mean) {
                sums[meanIndex][dimension] += point[dimension];
			}
		}
		for (const meanIndex in sums) {
			for (const dimension in sums[meanIndex]) {
				sums[meanIndex][dimension] /= counts[meanIndex];
			}
		}
		if (this.means.toString() !== sums.toString()) {
			moved = true;
		}
        console.log(moved);
		this.means = sums; // update our "means" and go again to "assignPoints"
		return moved;
	}
	run() {
		const moved = this.moveMeans();
		this.draw();
		moved ? setTimeout(this.run, 2000) : 0;
	}
	draw() {
		const width = 400;
		const height = 400;
		let extremes = this.dataExtremes;
		let range = this.range;
		let ctx = this.element.ctx;
		ctx.clearRect(0, 0, this.width, this.height);
		ctx.globalAlpha = 1;
		for (let i in data) {
			ctx.save();
			let point = data[i];
			let x = (point[0] - extremes[0].min + 1) * (width / (range[0] + 2));
			let y = (point[1] - extremes[1].min + 1) * (height / (range[1] + 2));
			ctx.strokeStyle = '#333333';
			ctx.translate(x, y); // set point position
			ctx.beginPath();
			ctx.arc(0, 0, 5, 0, Math.PI * 2, true); // draws the circle
			ctx.stroke();
			ctx.closePath();
			ctx.restore();
		}
		for (let i in this.means) {
			ctx.save();
			let point = this.means[i];
			let x = (point[0] - extremes[0].min + 1) * (width / (range[0] + 2));
			let y = (point[1] - extremes[1].min + 1) * (height / (range[1] + 2));
			ctx.fillStyle = 'green';
			ctx.translate(x, y); 
			ctx.beginPath();
			ctx.arc(0, 0, 5, 0, Math.PI * 2, true); 
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		}
	}
}
	const P = (bias, ...weights) => {
		const obj = new Perceptron(weights, bias)
		return obj;
	}
	const Line = (selector) =>  {
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
    const KMeans = (data, selector) => {
        const el = new Means(data, selector);
        el.make();
    }
	return {
		P,
		Line,
		Net,
        KMeans
	}
})();
let res = Think.P([-2, -2], 3);
console.log(res.run([0, 1]));
