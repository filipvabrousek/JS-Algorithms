# Own KMeans
* fix lines, add to Think.js

```js
    

class KMeans {
	constructor(data, selector) {
		this.data = data;
		this.selector = selector || null;
		this.means = []; // centroids
		this.assignments = []; // will be array of 0s 1s and 2s
		this.range = null; // [9, 10]
		this.dataExtremes = null; // array of 2 min and max objects
		this.element = null; // <canvas>
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

			// 2 extremes[x]
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

				//console.log(extremes); - array of 2 min and max objects
				//{min: 1, max: 10} AND  {min: 1, max: 11}, extremes[dimension] returns one of those
			}
		}

		return extremes;
	}




	/*------------------------------------------------------INIT MEANS-----------------------------------------------------
    initalize K random clusters
    creating new points with random coordinates within the ranges and dimensions of our data set
    */
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


	/*------------------------------------------------------ASSIGN POINTS------------------------------------------------------
called by "loop" function and calculate distance between each point and the cluster center
assigning all our data points to the centroid closest to it
*/
	assignPoints() {
		let data = this.data;
		let means = this.means;
		let assignments = this.assignments;

        // this loop exists just because we need to get the every single "point"
		for (const i in data) {
			const point = data[i];
			const distances = [];

            // this loop exists just because we want to get the every single "mean"
			for (const j in means) {
				const mean = means[j];
				let sum = 0;

                // for each dimension get the difference from mean 
				for (const dimension in point) {
					let difference = point[dimension] - mean[dimension];
					difference *= difference;
					sum += difference;
				}

				distances[j] = Math.sqrt(sum); // negate multiplication?
                // centroid 0 or centroid 1 or centroid 2
			}

			assignments[i] = distances.indexOf(Math.min.apply(null, distances)); // get distances
			console.log(assignments); // array of 0s 2s and 1s (zeros...) [0,1,0,1] -> [0,0, 1, 1] transformed together
		}

	}


/*------------------------------------------------------MOVE MEANS ------------------------------------------------------
moving the centroids to the average position of all the data points assigned to it
repeat that until the centroids stop moving
   */
	moveMeans() {
		this.assignPoints();

        // "ms" (this.means) is 3 arrays like this: [Array(2), Array(2), Array(2)]
		let ms = this.means;
		const sums = Array(ms.length); // empty, same length as "ms"
		const counts = Array(ms.length); // also empty
		let moved = false;

         //-------------------------------------------1st loop
		for (const j in ms) {
			counts[j] = 0; 
			sums[j] = Array(ms[j].length);
			for (var dimension in ms[j]) {
				sums[j][dimension] = 0; // zero out the 2nd depth level of "sums"
			}
		}
       // console.log(sums); //array of 3 points [ARRAY(2) -> [a = sum of all x points assigned to cluster one, b]]
        
         //-------------------------------------------3rd loop
        //"this.assignments" is array with length of 19 and values 0s and 1s and 2s
		for (const pointIndex in this.assignments) {
			let meanIndex = this.assignments[pointIndex]; // 0 or 1 or 2 - one of the 3 centroids
			const point = data[pointIndex];
			const mean = ms[meanIndex];

			counts[meanIndex]++;

			for (var dimension in mean) {
                //console.log("before " + sums[meanIndex][dimension]);
				sums[meanIndex][dimension] += point[dimension];
                //console.log("after " + sums[meanIndex][dimension]);
                console.log(sums)
			}
		}


		//-------------------------------------------3rd loop GETTIN THE AVERAGE
		for (var meanIndex in sums) {
            // mean with no points, add...
			for (var dimension in sums[meanIndex]) {
				sums[meanIndex][dimension] /= counts[meanIndex];
			}
		}

        // if mean is different from sums, the center has moved
		if (this.means.toString() !== sums.toString()) {
			moved = true;
		}

		this.means = sums;
		console.log(moved);
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
		for (var i in data) {
			ctx.save();

			var point = data[i];

			var x = (point[0] - extremes[0].min + 1) * (width / (range[0] + 2));
			var y = (point[1] - extremes[1].min + 1) * (height / (range[1] + 2));

			ctx.strokeStyle = '#333333';
			ctx.translate(x, y);
			ctx.beginPath();
			ctx.arc(0, 0, 5, 0, Math.PI * 2, true);
			ctx.stroke();
			ctx.closePath();
			ctx.restore();
		}


		//------------------------------------------------------------ DRAW GREEN POINTS
		for (var i in this.means) {
			ctx.save();

			var point = this.means[i];

			var x = (point[0] - extremes[0].min + 1) * (width / (range[0] + 2));
			var y = (point[1] - extremes[1].min + 1) * (height / (range[1] + 2));


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
// <canvas width="400" height="400"></canvas>
        
 
```

## Lines
```js
  //------------------------------------------------------------ DRAW THE BLUE LINES (uncomment, fix)
    /*
    for (const pointIndex in this.assignments){
        
        const meanIndex = this.assignments[pointIndex];
        var point = this.data[pointIndex];
        const mean = this.means[meanIndex];

        ctx.save();

        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(
            (point[0] - extremes[0].min + 1) * (width / ([0] + 2) ),
            (point[1] - extremes[1].min + 1) * (height / (range[1] + 2) )
        );
        ctx.lineTo(
            (mean[0] - extremes[0].min + 1) * (width / (range[0] + 2) ),
            (mean[1] - extremes[1].min + 1) * (height / (range[1] + 2) )
        );
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    
*/
    
// 2nd assignment
/*

console.log(counts[meanIndex]);
			if (0 === counts[meanIndex]) {
				sums[meanIndex] = ms[meanIndex];
				console.log("Mean with no points");
				// console.log(sums[meanIndex]);

				for (var dimension in this.dataExtremes) {
					sums[meanIndex][dimension] = this.dataExtremes[dimension].min + (Math.random() * this.range[dimension]);
				}
				continue;
			}
*/
    
```
