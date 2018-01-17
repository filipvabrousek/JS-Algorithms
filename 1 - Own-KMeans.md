# Own KMeans
1) **points** - array we defined
2) **getExtremes** - we loop through dimensions and fill "extremes" array - with those objects {min: 1000, max: 0} adjusted for actual values;
3) **getRanges** - we loop through "extremes" and get the difference between min and max (fill in "ranges")  [9, 10]
4) **initMeans** - we create 3 random candidates for "centroid" by using "extremes" and "ranges"
5) **assignments** - we get the positive differences between "point[dimension] - mean[dimension]" add them to one sum, fill "distances" array with sums (getting smallest distance to centroid)
5.1) fill in "assignments" with indexes of lowest numbers from "distance" array
6) **moveMeans** - fill in sums, assign "sums" to means (get the average position) if "means" is different from "sums" moved is true
7) **run** - as long as moved is true, call "*moveMeans*" and "*assignPoints*" again and redraw the scene using "*draw*" on canvas 


```js
class KMeans {
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
            // mean with no points, add...
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



// custom code
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
