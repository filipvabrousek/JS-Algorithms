class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const points = [
    new Point(10, 70),
    new Point(20, 50),
    new Point(200, 90),
    new Point(100, 120),
    new Point(20, 80),
    new Point(90, 10),
    new Point(200, 100),
    new Point(80, 120),
    new Point(70, 130)
];



class Means {
    constructor(selector) {
        this.selector = selector;
        this.el = null;
        this.points = [];
    }


    init(points) {
        this.el = document.querySelector(this.selector);
        this.ctx = this.el.getContext("2d");
        this.points = points;
    }




    getMean() {
        const meanX = this.points.map(p => p.x).reduce((a, b) => a + b) / this.points.length;
        const meanY = this.points.map(p => p.y).reduce((a, b) => a + b) / this.points.length;
        return {
            x: meanX,
            y: meanY
        }
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

        let mean = this.getMean();
        this.ctx.fillStyle = "#1abc9c";
        this.ctx.beginPath();
        this.ctx.arc(mean.x, mean.y, 4, 0, Math.PI * 2);
        this.ctx.fill();


    }
}

let m = new Means("canvas");
m.init(points);
m.draw();
m.getMean();

// <canvas width = "400" height="400"></canvas>
