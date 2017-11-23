1) Supervised learning
* classification - prediciting value in the form of categories
* regression -  predict the outcome of the given sample (output is in the form of real values)

2) Unsupervised learning
* Association - probability of co-occurance of items
* Clustering - object in one cluster are simmiliar
* Dimensional Reduction - reducing the information, just the important are persisted

3) Reinforcement learning - maximizing the reward

```js
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
ctx.textAlign = "center";

const x = [];
const y = [];

let m = 2;
let b = 2;

const mouse = {
	x: 0, y: 0
};


canvas.addEventListener("click", e => {
	x.push(e.offsetX);
	y.push(canvas.height - e.offsetY);
});

canvas.addEventListener("mousemove", e => {
	mouse.x = Math.round(e.offsetX);
	mouse.y = Math.round(canvas.height - e.offsetY);
	console.log(`${x}, ${y}, off x ${e.offsetX}`);
});


// draw green points (when clicked)
function drawPoints() {
	for (let i = 0; i < x.length; i++) {
		ctx.fillRect(x[i] - 2, canvas.height - y[i] - 2, 4, 4); // x, y, w, h
	}
}


/*
1 - iterate thorough length of "x" array 
2 - loop through values and pass every single one from "x" into line function
- then substract value from "y" index and multiply the value with x
*/
function learn(alpha) {
	if (x.length <= 0) return;
	let sum1 = 0;
	let sum2 = 0;
	// 1
	for (let i = 0; i < x.length; i++) {
		// 2
		sum1 += line(x[i]) - y[i];
		sum2 += (line(x[i]) - y[i]) * x[i];
	}
	b = b - 1000000 * alpha * sum1 / (x.length);
	m = m - alpha * sum2 / (x.length);
}


const line = (x) => m * x + b;



function drawLine() {
	ctx.beginPath();
	ctx.moveTo(0, canvas.height - line(0)); // x, y
	ctx.lineTo(canvas.width, canvas.height - line(canvas.width)); // x, y
	ctx.stroke();
}


// fire every 17 ms
setInterval(() => {
	ctx.clearRect(0, 0, canvas.width, canvas.height); // x, y, w, h
	learn(0.000001);
	drawPoints();
	drawLine();
	ctx.fillText(`${mouse.x}, ${mouse.y}`, mouse.x, mouse.y);
}, 1000 / 60);


// https://www.kdnuggets.com/2017/10/top-10-machine-learning-algorithms-beginners.html

```
