class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Means {
	constructor(selector) {
		this.selector = selector;
		this.el = null;
		this.points = []; // filled with our input
		this.means = [];
        this.assigned = {};
	}


	init(points) {
		this.el = document.querySelector(this.selector);
		this.ctx = this.el.getContext("2d");
		this.points = points;
	}

	getRanges() { // get point ranges, to create random centroids within ranges of our dataset
		let xm = 0,
			ym = 0,
			xn = 0,
			yn = 0;
		this.points.forEach((el, i) => {
			xm = this.points.map(e => e.x).reduce((a, b) => Math.max(a, b));
			ym = this.points.map(e => e.y).reduce((a, b) => Math.max(a, b));
			xn = this.points.map(e => e.x).reduce((a, b) => Math.min(a, b));
			yn = this.points.map(e => e.y).reduce((a, b) => Math.min(a, b));
		});
		let xdiff = xm - xn,
			ydiff = ym - yn;
		return {
			xrange: xdiff,
			yrange: ydiff
		} // return as array
	}

	initMeans() { // k is 2 in this case
		const ranges = this.getRanges();
		let cand1 = new Point(ranges.xrange * Math.random(), ranges.yrange * Math.random());
		let cand2 = new Point(ranges.xrange * Math.random(), ranges.yrange * Math.random());
		this.means.push(cand1);
		this.means.push(cand2);
		return this.means; // candidates for our center;
	}




	assign() { // pushing points either into APoints / B points due to distance from each centroid

		let APoints = [],
			BPoints = [];
		let centroids = this.initMeans();


		points.forEach((val, i) => {
			let onex = points[i].x - centroids[1].x; // distance to first centroid
			let oney = points[i].y - centroids[1].y;
			let zerox = points[i].x - centroids[0].x; // distance to 2nd centroid
			let zeroy = points[i].y - centroids[0].y;

			let powx = Math.pow(zerox, 2);
			let powy = Math.pow(zeroy, 2)
			let sqzerox = Math.sqrt(powx);
			let sqzeroy = Math.sqrt(powy);

			let powxo = Math.pow(onex, 2);
			let powyo = Math.pow(oney, 2);
			let sqonex = Math.sqrt(powxo);
			let sqoney = Math.sqrt(powyo);

            // 100 ... influence treshold
			(sqzerox && sqzeroy) < 80 ? APoints.push(points[i]) : 0;
			(sqonex && sqoney) < 80 ? BPoints.push(points[i]) : 0;
		});
console.log(APoints.length, BPoints.length)

		return {
			AP: APoints,
			BP: BPoints
		};
	}


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

	draw() {

		this.ctx.clearRect(0, 0, 400, 400)

		let points = this.points,
			ctx = this.ctx;
		this.ctx.fillStyle = "#000";

		ctx.clearRect(0, 0, this.el.width, this.el.height);
		points.forEach((el, i) => {
			ctx.beginPath();
			ctx.arc(points[i].x, points[i].y, 4, 0, Math.PI * 2);
			ctx.fill();
		});

		// recolor points according to centroids
        this.assigned = this.assign();
		let aq = this.assigned;
		let as = aq.AP;
		this.ctx.fillStyle = "red";
		as.forEach((el, i) => {
			ctx.beginPath();
			ctx.arc(as[i].x, as[i].y, 4, 0, Math.PI * 2);
			ctx.fill();
		});


		let am = aq.BP;
		this.ctx.fillStyle = "blue";
		am.forEach((el, i) => {
			ctx.beginPath();
			ctx.arc(am[i].x, am[i].y, 4, 0, Math.PI * 2);
			ctx.fill();
		});
	}

	drawRandomMean() {

		// 2 random candidates for cluster centers
		let meana = this.initMeans(),
			ctx = this.ctx;
		this.ctx.fillStyle = "orange";
		meana.forEach((el, i) => {
			ctx.beginPath();
			ctx.arc(meana[0].x, meana[0].y, 4, 0, Math.PI * 2);
			ctx.arc(meana[1].x, meana[1].y, 4, 0, Math.PI * 2);
			ctx.fill();
		});
         this.drawMean();

	}

	drawMean() { // calculate mean point with assigned points
       
        let ctx = this.ctx;
		let a = this.assigned;
		let ap = a.AP; // red points
		let bp = a.BP // blue points

		let redmean = this.assignedPointsMean(ap, ap.length);
		let bluemean = this.assignedPointsMean(bp, bp.length);
		//console.log("Red", redmean, "Blue", bluemean); // move the centroid to this position

        if (ap.length == bp.length && ap.length === 10) { console.log("Clustering done!");}
        else { console.log("Clustering not done")}

   
        
window.setTimeout(() => {
    	// the same four lines for "red" but with ms[0]
		ctx.fillStyle = "blue";
		ctx.beginPath();
		ctx.arc(bluemean.x, bluemean.y, 6, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = "red";
		ctx.beginPath();
		ctx.arc(redmean.x, redmean.y, 6, 0, Math.PI * 2);
		ctx.fill();
}, 2000)
        
        
   
    
// type: m.drawMean()
	}
    


}

const points = [
	//  x a y less 50 (top left corner)
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

	//  x and y higher than 50 (bottom right corner)
	new Point(270, 230),
	new Point(280, 320),
	new Point(300, 310),
	new Point(310, 300),
	new Point(300, 300),
	new Point(300, 290),
	new Point(270, 280),
	new Point(260, 320),
	new Point(280, 270), // THIS
	new Point(260, 290)
	
];


let m = new Means("canvas");
m.init(points);
m.getRanges();
m.draw();
m.drawRandomMean();
m.drawMean();
//setTimeout(m.drawMean.bind(m), 2000); // old points are orange, new are red and green
// <canvas width="400" height = "400"></canvas>

    
    



