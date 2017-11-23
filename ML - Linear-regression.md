```js
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "red";

const x = [];
const y = [];

let m = 2;
let b = 2;

ctx.textAlign = "center";
const mouse = {x: 0, y: 0};

canvas.addEventListener("click", e => {
    x.push(e.offsetX);
    y.push(canvas.height - e.offsetY);
});

canvas.addEventListener("mousemove", e => {
    mouse.x = Math.round(e.offsetX), mouse.y = Math.round(canvas.height-e.offsetY);
});


function drawPoints() {
    for (let i = 0; i < x.length; i++) {
        ctx.fillRect(x[i] - 2, canvas.height - y[i] - 2, 4, 4);
    }
}



function learn(alpha) {
    if (x.length <= 0) return;
    let sum1 = 0;
    let sum2 = 0;
    // unvectorized approach, but what can you do
    for (let i = 0; i < x.length; i++) {
        sum1 += line(x[i]) - y[i];
        sum2 += (line(x[i]) - y[i]) * x[i];
    }
    // for some reason the 'b' term changes very slowly, so I scaled it up a bit...
    b = b - 1000000*alpha * sum1 / (x.length);
    m = m - alpha * sum2 / (x.length);
}

function line(x) {
    return m * x  + b;
}

function drawLine() {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - line(0));
    ctx.lineTo(canvas.width, canvas.height - line(canvas.width));
    ctx.stroke();
}

setInterval(() => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    learn(0.000001);
    drawPoints();
    drawLine();
    ctx.fillText(`${mouse.x}, ${mouse.y}`, mouse.x, canvas.height - mouse.y);
}, 1000 / 60);

```
