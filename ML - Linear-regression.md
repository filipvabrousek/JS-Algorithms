


## Linear regression

```js

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}
    
    
class LR {
	constructor(selector) {
		this.selector = selector;
		this.el = null;
		this.points = [];
	}
    
	init() {
		this.el = document.querySelector(this.selector);
		this.ctx = this.el.getContext("2d");
		this.el.addEventListener("click", e => {
			let x = e.clientX - this.el.offsetLeft; // top left corner.... coord are [0, 0]
			let y = e.clientY - this.el.offsetTop;
			this.points.push(new Point(x, y));
			this.draw();
		});
	}
    
	draw() {
		let ctx = this.ctx, points = this.points;
		ctx.clearRect(0, 0, 400, 400); // this.el.width
		ctx.fillStyle = "#3498db";
		
        points.forEach((el, i) => {
			ctx.beginPath();
			ctx.arc(points[i].x, points[i].y, 2, 0, 2 *  Math.PI);
			ctx.fill();
		});
        
		let f = this.linreg(points);
        let y = this.line(f.x, f.b);
		ctx.strokeStyle = "#1abc9c";
		ctx.beginPath();
		ctx.moveTo(0, f.b);
		ctx.lineTo(400, y); // 400 - line across entire width of the element 
		ctx.stroke();
	}
    
    line(x, b){
        return 400 * x + b; // m*x + b =>  400 * gradient + intercept
    }
    
    
	linreg(points) {
		
        let x = 0, b = 0;
        
		let meanX = points.map(a => a.x).reduce((a, b) => a + b) / points.length;
		let meanY = points.map(a => a.y).reduce((a, b) => a + b) / points.length;
        
		points.forEach((val, i) => {
			x += (points[i].x - meanX) *  (points[i].y - meanY); // current "x" point - avg "x" point value * (same for "y")
			b += (points[i].x - meanX) *  (points[i].x - meanX); // each "x" point - avg, squared
		});
        
		let gradient = x / b;
		let intrcpt = meanY - gradient * meanX;
        
		return {
			x: gradient,
			b: intrcpt // intercept with y axis
		}
	}
	
}

let el = new LR("canvas");
el.init();
    
// https://codepen.io/kriswik/pen/xdeJYo
// https://jsfiddle.net/7z48o33f/1/
// <canvas width="800" height = "800"></canvas>

```
