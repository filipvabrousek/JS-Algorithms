class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

    
class Means {
	constructor(selector) {
		this.selector = selector;
		this.points = []; // filled with our input
		this.means = [];
		this.assigned = {};
	}


	init(points) {
		this.el = document.querySelector(this.selector);
		this.ctx = this.el.getContext("2d");
		this.points = points;
	}

    
    // get point ranges, to create random centroids within ranges of our dataset
	getRanges() { 
		let xm = 0, ym = 0, xn = 0, yn = 0;
		this.points.forEach((el, i) => {
			xm = this.points.map(e => e.x).reduce((a, b) => Math.max(a, b));
			ym = this.points.map(e => e.y).reduce((a, b) => Math.max(a, b));
			xn = this.points.map(e => e.x).reduce((a, b) => Math.min(a, b));
			yn = this.points.map(e => e.y).reduce((a, b) => Math.min(a, b));
		});
        
		let xdiff = xm - xn, ydiff = ym - yn;
		
        return {
            xrange: xdiff,
			yrange: ydiff
		} 
	}

    //init k means (2 in this case) within range using "getRanges()"
	initMeans(k = 2) { 
		const ranges = this.getRanges();
        this.means.length = k;
        this.means.fill(0)
        this.k = k;
        
        this.means.forEach((el, i) => {
            let cand = new Point(ranges.xrange * Math.random(), ranges.yrange * Math.random());
            this.means.push(cand);
        })
		
        this.means = this.means.slice(k); // [0, 0, Point, Point] remove 2 zeros
		return this.means; 
	}


    // pushing points either into RPoints / BPoints according to distance from each centroid use "initMeans"
	assign() { 

		let RPoints = [], BPoints = [];
		let centroids = this.initMeans(); // k

		points.forEach((val, i) => {
			
            let zerox = points[i].x - centroids[0].x; // distance to 1st centroid
			let zeroy = points[i].y - centroids[0].y;
            let onex = points[i].x - centroids[1].x; // distance to 2nd centroid
			let oney = points[i].y - centroids[1].y;
			

            // get posititive of each point from each centroid
			let sqzerox = Math.sqrt(zerox * zerox); 
			let sqzeroy = Math.sqrt(zeroy * zeroy);
			let sqonex = Math.sqrt(onex * onex);
			let sqoney = Math.sqrt(oney *  oney);

            // if the point is within the range, push it to according array
            let ranges = this.getRanges(), k = this.k;
            (sqzerox || sqzeroy) < ranges.xrange / k ? RPoints.push(points[i]) : 0;
            (sqonex || sqoney) < ranges.xrange / k ? BPoints.push(points[i]) : 0;
		});

		return {
			RP: RPoints,
			BP: BPoints
		};
	}


// get mean of all assigned points (mean point of RPoints and BPoints array)
	assignedPointsMean(arr, len) {
		if (arr.length === 0) {
			return "Mean with no points"
		}
		const meanX = arr.map(p => p.x).reduce((a, b) => a + b) / len;
		const meanY = arr.map(p => p.y).reduce((a, b) => a + b) / len;
		return {
			x: meanX,
			y: meanY
		}
	}


// plot the points we define in our array on the canvas and recolor them according to assigned points
	plot() {

		let points = this.points, ctx = this.ctx;
		this.ctx.fillStyle = "#000";

        // draw black points from our array
		ctx.clearRect(0, 0, this.el.width, this.el.height);
		points.forEach((el, i) => {
			ctx.beginPath();
			ctx.arc(points[i].x, points[i].y, 4, 0, Math.PI * 2);
			ctx.fill();
		});

		// recolor points according to centroids
        this.assigned = this.assign();
		let ass = this.assigned;
        let redpoints = ass.RP; // points assigned to the red centroid
        let bluepoints = ass.BP;
    
	}


    /* calculate mean point with assigned points and draw each cluster centroid
    if we have classified all the points */
	drawMean() { 
		let ctx = this.ctx;
		let a = this.assigned;
		let ap = a.RP; // points assigned to the red cluster
		let bp = a.BP // points assigned to the blue cluster

		let redmean = this.assignedPointsMean(ap, ap.length);
		let bluemean = this.assignedPointsMean(bp, bp.length);

        
        let done = false;
        
        
        if (ap.length + bp.length !== points.length){
            let meana = this.initMeans()
		    this.ctx.fillStyle = "orange";
		meana.forEach((el, i) => {
			ctx.beginPath();
			ctx.arc(meana[0].x, meana[0].y, 6, 0, Math.PI * 2);
			ctx.arc(meana[1].x, meana[1].y, 6, 0, Math.PI * 2);
			ctx.fill();
		});
            
        }
        
        
		// if we have all the points and ap and bp arent equal we found the means :D
		if (ap.length + bp.length === points.length && redmean.x !== bluemean.x) {
			ctx.fillStyle = "blue";
			ctx.beginPath();
			ctx.arc(bluemean.x, bluemean.y, 6, 0, Math.PI * 2);
			ctx.fill();

			ctx.fillStyle = "red";
			ctx.beginPath();
			ctx.arc(redmean.x, redmean.y, 6, 0, Math.PI * 2);
			ctx.fill();
			console.log("Clustering done ", "Redmean: ", redmean, "Blueman ", bluemean);
            console.log(redmean)

            done = true;
		} else {
			console.log("Clustering not done");
		}
        
        return done;

	}
    


    // try to cluster the points, call function above
	try () {
		this.getRanges();
		this.plot();
        
         let r = this.drawMean();
        if(!r){
            setTimeout(this.drawMean.bind(this), 2000);
            setTimeout(this.try.bind(this), 2000);
            
        }
	}
}

const points = [
 // x a y less 50 (top left corner)
	new Point(30, 40),
	new Point(20, 10),
	new Point(70, 30),
	new Point(20, 50),
	new Point(10, 30),
	new Point(20, 50),
	new Point(10, 20),
	new Point(40, 30),
	new Point(20, 60),
	new Point(20, 40),

	// x and y higher than 50 (bottom right corner)
	new Point(270, 230),
	new Point(280, 320),
	new Point(300, 310),
	new Point(310, 300),
	new Point(300, 300),
	new Point(300, 290),
	new Point(270, 280),
	new Point(260, 320),
	new Point(280, 270), 
	new Point(260, 290)
];


let m = new Means("canvas");
m.init(points);
m.try(); // will try to cluster the points into 2 clusters
// <canvas width="400" height = "400"></canvas>
