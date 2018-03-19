
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
		this.points = [];
		this.means = [];
	}


	init(points) {
		this.el = document.querySelector(this.selector);
		this.ctx = this.el.getContext("2d");
		this.points = points;
	}

	getExtremes() {
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




	getMean() {
		const meanX = this.points.map(p => p.x).reduce((a, b) => a + b) / this.points.length;
		const meanY = this.points.map(p => p.y).reduce((a, b) => a + b) / this.points.length;
		return {
			x: meanX,
			y: meanY
		}
	}



	initMeans(k = 2) {


		const ranges = this.getExtremes();
		let cand1 = new Point(ranges.xrange * Math.random(), ranges.yrange *  Math.random());
		let cand2 = new Point(ranges.xrange * Math.random(), ranges.yrange *  Math.random());
		this.means.push(cand1);
		this.means.push(cand2);
		//console.log(this.means);

		return this.means; // candidates for our center;
	}




	assign() {


		let APoints = [],
			BPoints = [];
		let centroids = this.initMeans();


		points.forEach((val, i) => {
			let resx = points[i].x - centroids[1].x; // working only with first centroid
			let resy = points[i].y - centroids[1].y;
			let powx = Math.pow(resx, 2);
			let powy = Math.pow(resy, 2)
			let sqrtx = Math.sqrt(powx);
			let sqrty = Math.sqrt(powy);

			(sqrtx && sqrty) < 30 ? APoints.push(points[i]) : BPoints.push(points[i])
		});
		return APoints;
	}

	moveMeans() {
		//...
	}

	draw() {
		let points = this.points,
			ctx = this.ctx;
		this.ctx.fillStyle = "#000";

		points.forEach((el, i) => {
			ctx.beginPath();
			ctx.arc(points[i].x, points[i].y, 4, 0, Math.PI * 2);
			ctx.fill();
		});


		// draw initial mean point
		let mean = this.getMean();
		ctx.fillStyle = "#1abc9c";
		ctx.beginPath();
		ctx.arc(mean.x, mean.y, 8, 0, Math.PI * 2);
		ctx.fill();

		// 2 random candidates for cluster centers
		let ms = this.initMeans();
        
        // the same four lines for "red" but with ms[0]
		ctx.fillStyle = "blue";
		ctx.beginPath();
		ctx.arc(ms[1].x, ms[1].y, 4, 0, Math.PI * 2);
		ctx.fill();

		// clear and recolor points according to centroids
		let as = this.assign();
		this.ctx.fillStyle = "blue";
		as.forEach((el, i) => {
			ctx.beginPath();
			ctx.arc(as[i].x, as[i].y, 4, 0, Math.PI * 2);
			ctx.fill();
		});
	}

	process() {
		this.getMean();
		this.getExtremes();
		this.assign();
		this.draw();

	}
}

const points = [
	new Point(10, 70),
	new Point(20, 50),
	new Point(200, 90),
	new Point(100, 120),
	new Point(20, 10),
	new Point(90, 300),
	new Point(200, 300),
	new Point(80, 230),
	new Point(79, 220),
	new Point(200, 100),
	new Point(100, 190),
	new Point(100, 245)
];


let m = new Means("canvas");
m.init(points);
m.process();
