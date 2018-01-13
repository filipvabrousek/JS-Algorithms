# Own KMeans

```js


class KMeans {
	constructor(data, selector) {
		this.data = data;
		this.selector = selector || null;
		this.means = [];
		this.assignments = [];
		this.range = null; // change
		this.dataExtremes = null;
		this.element = null;
		this.width = 400;
		this.heigth = 400;
	}


	// w, h 400
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


	/*------------------------------------------------------GET DATA RANGES------------------------------------------------------
	pass in "data[]"
	fill in ranges array from "data" array with the points, dimension is [x, y]
	*/
	getDataRanges(extremes) {

		const ranges = [];
		for (const dimension in extremes) {
			ranges[dimension] = extremes[dimension].max - extremes[dimension].min;
			// 10 - 1 => 9, 11 - 1 => 10
		}

		return ranges; // [9, 10]
	}



	// get border points
	getDataExtremes(points) {
		const extremes = [];

		for (const i in this.data) {
			const point = data[i];

			// dimension = [x, y] 
			for (const dimension in point) {

				if (!extremes[dimension]) {
					extremes[dimension] = {
						min: 1000,
						max: 0
					} // changing those values
				}

				if (point[dimension] <  extremes[dimension].min) {
					extremes[dimension].min = point[dimension];
				}

				if (point[dimension] >  extremes[dimension].max) {
					extremes[dimension].max = point[dimension];
				}


			}
		}


		//console.log(extremes)
		return extremes; // {min: 1, max: 10} {min:1, max:1}

	}



	initMeans(k = 3) {
		// init means

		while (k--) {
			const mean = [];

			for (const dimension in this.dataExtremes) {
				mean[dimension] = this.dataExtremes[dimension].min + (Math.random() * this.range[dimension]);
			}

			this.means.push(mean);
		}
		//console.log(this.means);
		return this.means; // 3 array, each has 2 numbers in it (random)
	}


	// Really understand!!!

	/*------------------------------------------------------ASSIGN POINTS------------------------------------------------------
	1) calculate distance between each point and the cluster center
	2) assign all data points to the centroid closest to it
	3) get difference from the mean
	*/

	assignPoints() {

		// 1
		for (const i in data) {
			const point = data[i];
			const distances = [];

			// 2
			for (const j in this.means) {
				const mean = this.means[j];
				let sum = 0;
				// 3
				for (const dimension in point) {
					let diff = point[dimension] - mean[dimension];
					diff *= diff;
					sum += diff;
				}

				distances[j] = Math.sqrt(sum);
			}

			this.assignments[i] = distances.indexOf(Math.min.apply(null, distances));
			//console.log(this.assignments[i]); // 0s 1s 2s

		}

	}

	/* ------------------------------------------------------- MOVE MEANS
	move centroids
	*/
	moveMeans() {


		let ms = this.means;

		this.assignPoints();

		const sums = Array(ms.length); // Array.from
		const counts = Array(ms.length);
		let moved = false;


		//-------------------------------------1st LOOP 
		for (const j in ms) {
			counts[j] = 0;
			sums[j] = Array(ms[j].length);
			for (let dimension in ms[j]) { // var ?
				sums[j][dimension] = 0;
			}
			//console.log("J " + j); // 0, 1, 2
		}


		//-------------------------------------2nd LOOP  
		// assignments just an arrays of [pointIndex, centerIndex]
		for (const pointIndex in this.assignments) {
			let meanIndex = this.assignments[pointIndex];
			const point = data[pointIndex];
			const mean = this.means[meanIndex];

			counts[meanIndex] += 1; // ++

			for (let dimension in mean) {
				sums[meanIndex][dimension] += point[dimension];
			}
		}

		//-------------------------------------3rd LOOP  
		// count is empty ?
		for (let meanIndex in sums) {
			if (0 === counts[meanIndex]) {
				sums[meanIndex] = this.means[meanIndex];

				for (let dimension in this.dataExtremes) {
					sums[meanIndex][dimension] = this.dataExtremes[dimension].min + (Math.random() * this.range[dimension]);
				}
				continue;

			}

			for (let dimension in sums[meanIndex]) {
				sums[meanIndex][dimension] /= counts[meanIndex];
			}
		} // FOR meanIndex end


		if (this.means.toString() !== sums.toString()) {
			moved = true;
		}


		this.means = sums;
		//console.log(sums); // Array of 3 array (each with 3 members)
		return moved;

	}


 run() {
    //console.log(this.self);
   const moved = this.moveMeans();
    this.draw();
    moved ? setTimeout(this.run, 2000):0;
    }


	draw() {
		// draw on canvas
        console.log(this)
		let el = this.element;
		el.ctx.clearRect(0, 0, this.width, this.height); // make new rectangle
		el.ctx.globalAlpha = 0.3;

		for (const pointIndex in this.assignments) {
			const meanIndex = this.assignments[pointIndex];
			let point = this.data[pointIndex];
			const mean = this.means[meanIndex];

			el.ctx.save();
			el.ctx.strokeStyle = 'blue';
			el.ctx.beginPath();
			el.ctx.moveTo(
				(point[0] - this.dataExtremes[0].min + 1) * (this.width / (this.range[0] + 2)),
				(point[1] - this.dataExtremes[1].min + 1) * (this.height / (this.range[1] + 2))
			);

			el.ctx.lineTo(
				(mean[0] - this.dataExtremes[0].min + 1) * (this.width / (this.range[0] + 2)),
				(mean[1] - this.dataExtremes[1].min + 1) * (this.height / (this.range[1] + 2))
			);

			el.ctx.stroke();
			el.ctx.closePath();
			el.ctx.restore();
		}

		el.ctx.globalAlpha = 1;


		//---------------------------------LOOP
		for (var i in this.data) {
			el.ctx.save();

			let point = this.data[i];
            

			let x = (point[0] - this.dataExtremes[0].min + 1) *  (this.width / this.range[0] + 2);
			let y = (point[1] - this.dataExtremes[1].min + 1) *  (this.width / this.range[1] + 2);

			el.ctx.strokeStyle = "#333333";
			el.ctx.translate(x, y); // move origin
			el.ctx.beginPath();
			el.ctx.arc(0, 0, 5, 0, Math.PI * 2, true); // ?
			el.ctx.stroke();
			el.ctx.closePath();
			el.ctx.restore();
		}

		for (var i in this.means) {
			el.ctx.save();

			let point = this.means[i];

			let x = (point[0] - this.dataExtremes[0].min + 1) *  (this.width / this.range[0] + 2);
			let y = (point[1] - this.dataExtremes[1].min + 1) *  (this.width / this.range[1] + 2);

			el.ctx.fillStyle = "green";
			el.ctx.translate(x, y);
			el.ctx.beginPath();
			el.ctx.arc(0, 0, 5, 0, Math.PI * 2, true);
			el.ctx.fill();
			el.ctx.closePath();
			el.ctx.restore();
		}
	}
    
   


}



const data = [
	[1, 2],
	[2, 1],
	[2, 4],
	[1, 3],
	[2, 2],
	[3, 1],
	[1, 1],

	[7, 3],
	[8, 2],
	[6, 4],
	[7, 4],
	[8, 1],
	[9, 2],

	[10, 8],
	[9, 10],
	[7, 8],
	[7, 9],
	[8, 11],
	[9, 9],
];



let el = new KMeans(data, "canvas");
el.make();


//el.moveMeans();
// ranges wont work here
// <canvas width="400" height="400"></canvas>

```
