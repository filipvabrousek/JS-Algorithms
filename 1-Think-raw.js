const Think = (() => {

	/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	*/
	class Perceptron {
		constructor(bias, weights) {
			this.weights = weights;
			this.treshold = bias * -1; // -3 in this case
		}

		// multiply each input with correponding weight
		run(inputs) {
			let sum = 0.0;
			for (let i = 0; i < inputs.length; i++) {
				sum += inputs[i] * this.weights[i]; // += 0, +=-2
			}

			// if sum of all weighted inputs is > treshold -> 1   "-2 > -3 => 1"
			if (sum <= this.treshold) {
				return 0;
			} else {
				return 1;
			}
		}
	}



    /*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	*/
    class Crosover{
        constructor(mother, father){
        this.mother = mother;
        this.father = father;
        this.dnaSplit = (Math.random() * this.mother.length) | 0;
        this.daughter = new Array(mother.length);
        this.son = new Array(mother.length);
    }
    
    
    make(){
        
        for (let i = 0; i < this.mother.length; i++){
            if (i > this.dnaSplit){
                this.son[i] = this.mother[i];
                this.daughter[i] = this.father[i];
            } else {
                this.son[i] = this.father[i];
                this.daughter[i] = this.mother[i];
            }
        }
         return `Daughter: ${this.daughter} Son: ${this.son}`;
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
	use "N" class to push neuron into the "neurons" array layer, increase density
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
            this.x = [];
            this.y = [];
            this.m = 2;
            this.b = 2;
            this.mouse = {x:0, y:0};
		}

		make() {
			this.element = document.querySelector(this.selector);
			this.element.ctx = this.element.getContext("2d");
			this.element.ctx.fillStyle = "green";
		}

		// fill in "x" and "y" arrays, with coordinates of the click
		addEL() {
			this.element.addEventListener("click", e => {
				this.x.push(e.offsetX);
				this.y.push(this.element.height - e.offsetY);
			});

		}

		// draw green points when clicked, called by "setInterval()" every 17ms
		drawPoints() {
			for (let i = 0; i < this.x.length; i++) {
				this.element.ctx.fillRect(this.x[i] - 2, this.element.height - this.y[i] - 2, 4, 4); // x, y, w, h
			}
		}



		// algorithm, which calculates our "b" values, called by "setInterval()" every 17ms
		learn(alpha) {
			if (this.x.length <= 0) return;

			let sum1 = 0;
			let sum2 = 0;
           
			// eg.: x [100, 200], y: [200, 300] ======> sum1 is 2 * 100 + 2 - 200 = 2
			// b is 2 - 1000000 * 0.000001 / 2 and we adjust its value in the "line()", same for "m"
			for (let i = 0; i < this.x.length; i++) {
				sum1 += this.line(this.x[i]) - this.y[i];
				sum2 += (this.line(this.x[i]) - this.y[i]) * this.x[i];
			}

			this.b = this.b - 1000000 * alpha * sum1 / (this.x.length);
			this.m = this.m - alpha * sum2 / (this.x.length);
		}

		// 2x + 2
		line(x) {
			return this.m * x + this.b;
		}


		// use the "moveTo()" function to begin and "lineTo()" draw the line
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
    
    
    
    
    
    
    /*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	Kmeans clustering 
	*/
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


	/*------------------------------------------------------MAKE------------------------------------------------------*/
	make() {
		this.element = document.querySelector(this.selector);
		this.element.ctx = this.element.getContext("2d");
		this.dataExtremes = this.getDataExtremes(this.data);
		this.range = this.getDataRanges(this.dataExtremes); // get ranges from extremes 
		this.means = this.initMeans(3);
		this.assignPoints();
		this.draw();

		// call run every 2 sec.
		this.run = this.run.bind(this);
		setTimeout(this.run, 2000);
	}



	/*------------------------------------------------------GET DATA RANGES------------------------------------------------------
    1) pass in extremes array returned from "getDataExtremes" below
    2) fill in ranges array with range of each dimension (max - min value) 
    */
	getDataRanges(extremes) {
		const ranges = [];

		for (const dimension in extremes) {
            // extremes is {min: 1, max: 10} => 10 - 1 = 9;  {1, 11} => 11 - 1 = 10
			ranges[dimension] = extremes[dimension].max - extremes[dimension].min;
		}
		return ranges; // [9, 10]
	}



	/*------------------------------------------------------GET DATA EXTREMES------------------------------------------------------
	1) get each point ([x,y]) from the points array
	2) loop through points and get extreme data points (min and max) [x, y] pair
	3) if point[dimension] is smaller than current min. (extremes[diemnsion].min), make it the minimum
	*/
	getDataExtremes(points) {
		const extremes = [];

		let data = this.data;

        // this loop exists just because we want to get every single "point" [x, y]
		for (const i in data) {
			// 1 [x, y]
			const point = data[i];

			// 2 for x and y 
			for (const dimension in point) {
				if (!extremes[dimension]) {
					extremes[dimension] = {min: 1000, max: 0};
				}

				// 3
				if (point[dimension] < extremes[dimension].min) {
					extremes[dimension].min = point[dimension];
				}

				if (point[dimension] > extremes[dimension].max) {
					extremes[dimension].max = point[dimension];
				} 
				// Extremes: [{min: 1, max: 10} AND  {min: 1, max: 11}]
                // extremes[dimension] returns one of those
                
			}
		}
		return extremes;
	}




	/*------------------------------------------------------INIT MEANS-----------------------------------------------------
    initalize K random clusters - candidates for centroids (3), fill in "means"
    create new points with random coordinates within the ranges and dimensions of our data set
    */
	initMeans(k = 3) {

		while (k--) {
			const mean = [];

			for (const dimension in this.dataExtremes) {
				mean[dimension] = this.dataExtremes[dimension].min + (Math.random() * this.range[dimension]);
                // mean[dimension] = 1 + Math.random() * 9  (OR)  1 + Math.random() * 10
			}
			this.means.push(mean);
		}
		return this.means; // (3) [Array(2), Array(2), Array(2)]
	}

    
    
    
    
    

	/*------------------------------------------------------ASSIGN POINTS------------------------------------------------------
called by "run" function and calculate distance between each point and the cluster center
assigning all our data points to the centroid closest to it
*/
	assignPoints() {
		let data = this.data; // data we define
		let means = this.means; // random points (candidates)
		let assignments = this.assignments;

        // this loop exists just because we need to get the every single "point"
		for (const i in data) {
			const point = data[i];
			const distances = []; // create "distances" array

            // this loop exists just because we want to get the every single "mean" (looping through every centroid)
			for (const j in means) {
				const mean = means[j];
				let sum = 0;

                // for each dimension in point, get the difference from each dimension in mean
                // (from array with random points - candidates for centroids)
				for (const dimension in point) {
					let difference = point[dimension] - mean[dimension];
					difference *= difference;
					sum += difference;
				}

                // we don't want to have negative values, power, than sqrt
				distances[j] = Math.sqrt(sum);  // eg. [0.69, 6.51, 10.10]
			}
            
          
            let lowest = Math.min.apply(null, distances); 
            // fill in assignments with indexes of lowest number from distances (getting the closest centroid)
			assignments[i] = distances.indexOf(lowest);
            // array of center indexes 
			// (19) [2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
		}

	}

    
    
    

/*------------------------------------------------------MOVE MEANS ------------------------------------------------------
moving the centroids to the average position of all the data points assigned to it
repeat that until the centroids stop moving (as long as moved = true)
(this method will change the "mean" array)
*/
	moveMeans() {
		this.assignPoints(); // fill in assignments array

        // (3)[Array(2) - centroid 1, Array(2) - centroid 2, Array(2) - centroid 3]
		let ms = this.means;
		const sums = Array(ms.length); // empty, same length as "ms"
		const counts = Array(ms.length); // also empty and same length
		let moved = false;

         //-------------------------------------------1st loop CREATE NEW MULTIDIMENSIONAL SUMS ARRAY
		for (const j in ms) {
			counts[j] = 0; 
			sums[j] = Array(ms[j].length); // create nested array in sums (multidimensional)
			for (const dimension in ms[j]) {
				sums[j][dimension] = 0; // zero out the 2nd depth level of "sums", filled with zeros, then with sums
			}
		}
        
         //-------------------------------------------2nd loop LOOP THROUGH POINTS
		for (const pointIndex in this.assignments) {
			let meanIndex = this.assignments[pointIndex]; // 2 or 1 or 0 - one of the 3 centroids
			const point = data[pointIndex]; // point assigned to centroid
			const mean = ms[meanIndex];

			counts[meanIndex]++; // increment count for each cluster center

            // "sums" is (3) [Array(2), Array(2), Array(2)] and "sums[meanIndex]" gets point 
            // add value from point at meanIndex(= 0, 1, 2) (x and y) in one nested array in sums (TO) value from point (x or y)  
			for (const dimension in mean) {
                sums[meanIndex][dimension] += point[dimension];
			}
            
		}


		//-------------------------------------------3rd loop GETTING AVERAGE POSTION FOR EACH CLUSTER CENTER AN MOVING IT
		for (const meanIndex in sums) {
            
			for (const dimension in sums[meanIndex]) {
				sums[meanIndex][dimension] /= counts[meanIndex];
			}
		}

        // if mean is different from sums, the center has moved
		if (this.means.toString() !== sums.toString()) {
			moved = true;
		}

        console.log(moved);
		this.means = sums; // update our "means" and go again to "assignPoints"
		return moved;
	}


    // update and redraw
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

		// to add blue lines insert loop here, globAlpha 0.3?

		ctx.globalAlpha = 1;
		//------------------------------------------------------------ DRAW GREY POINTS
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


		//------------------------------------------------------------ DRAW GREEN POINTS
		for (let i in this.means) {
			ctx.save();

            // final array
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


   


	/*------------------------------------------------------------------------------------------------------*/
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
    
    const KMeans = (data, selector) => {
        const el = new Means(data, selector);
        el.make();
    }
    
    /*
    const Crossover = (...mother, ...father) => {
        const obj = new Crosover(...mother, ...father);
        obj.make(); // ERROR: Rest parameter must be last formal parameter
    }*/

	return {
		P,
		Line,
		Net,
        KMeans,
        //Crossover
	}


})();




let res = Think.P([-2, -2], 3);
console.log(res.run([0, 1]));
   
