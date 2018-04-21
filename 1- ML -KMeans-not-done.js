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


    // get point ranges, to create random centroids within ranges of our d ataset
    getRanges() {
        let xm = 0,
            ym = 0,
            xn = 0,
            yn = 0,
            points = this.points;
        points.forEach((el, i) => {
            xm = Math.max(...points.map(e => e.x));
            ym = Math.max(...points.map(e => e.y));
            xn = Math.min(...points.map(e => e.x));
            yn = Math.min(...points.map(e => e.y));
        });

        return {
            xrange: xm - xn,
            yrange: ym - yn
        }
    }

    //init k means (2 in this case) within range using "getRanges()"
    initMeans(k = 2) {
        const ranges = this.getRanges();
        this.means.length = k;
        this.means.fill(0)
        this.k = k;

        this.means.forEach((el, i) => {
            let cand = new Point(400 * Math.random(), 400 * Math.random()); // this.el.width
            this.means.push(cand);
        });

        this.means = this.means.slice(k); // [0, 0, Point, Point] remove 2 zeros
        return this.means;
    }


    /* pushing points either into APoints / BPoints according to distance from each centroid use "getRanges"
    used in "drawMeans()"*/
    assign(centrs) {
        let APoints = [],
            BPoints = [],
            assignments = [],
            distances = [],
            sum = 0;
        let closertoFirst = [];

        let first = centrs[0];
        let second = centrs[1];

        points.forEach((val, i) => {

            let point = points[i];

            let distanceZero = Math.sqrt(Math.pow((point.x - first.x), 2) + Math.pow((point.y - first.y), 2));
            let distanceOne = Math.sqrt(Math.pow((point.x - second.x), 2) + Math.pow((point.y - second.y), 2));

            let res = {
                pointIndex: i,
                zeroDist: distanceZero,
                oneDist: distanceOne,
                assignTo: 0 // this value will be changed
            }

            distances[i] = res;
        });




        distances.forEach((el, i) => {

            if (distances[i].zeroDist < distances[i].oneDist) { // closer to zero
                closertoFirst.push(points[distances[i].pointIndex])
                distances[i].assignTo = 0
            } else {
                distances[i].assignTo = 1;
            }


        });

        this.ctx.fillStyle = "orange";
        this.ctx.beginPath();
        this.ctx.arc(centrs[0].x, centrs[0].y, 6, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.fillStyle = "blue";
        this.ctx.beginPath();
        this.ctx.arc(centrs[1].x, centrs[1].y, 6, 0, 2 * Math.PI);
        this.ctx.fill();


        /*----------------------------------FINAL DATA ARRAY---------------------------*/
        let data = [];



        let clustero = distances.filter(el => el.assignTo === 0);
        clustero.forEach((el, i) => {

            let point = points[clustero[i].pointIndex]
            console.log(point);

            this.ctx.fillStyle = "orange";
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
            this.ctx.fill();

            data.push(point)
        });


        let clusterb = distances.filter(el => el.assignTo === 1);
        clusterb.forEach((el, i) => {

            let point = points[clusterb[i].pointIndex];

            this.ctx.fillStyle = "blue";
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
            this.ctx.fill();

            data.push(point);
        });



        //console.log(data);


        let half = this.clusterMean(data).half;
        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(half.x, half.y, 4, 0, 2 * Math.PI);
        this.ctx.fill();


        let end = this.clusterMean(data).end;
        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(end.x, end.y, 4, 0, 2 * Math.PI);
        this.ctx.fill();

        return {
            dist: distances,
            halfMean: half,
            endMean: end
            
        }

    }




    clusterMean(data) {
        let half = data.slice(0, Math.floor(data.length / 2));
        const halfMeanX = half.map(p => p.x).reduce((a, b) => a + b) / half.length; // divide!
        const halfMeanY = half.map(p => p.y).reduce((a, b) => a + b) / half.length;

        let end = data.slice(Math.floor(data.length / 2), data.length);
        const endMeanX = end.map(p => p.x).reduce((a, b) => a + b) / end.length;
        const endMeanY = end.map(p => p.y).reduce((a, b) => a + b) / end.length;

        const halfMean = {
            x: halfMeanX,
            y: halfMeanY
        }

        const endMean = {
            x: endMeanX,
            y: endMeanY
        }

        return {
            half: halfMean,
            end: endMean
        }

    }




    // plot the points we define in our array on the canvas and recolor them according to assigned points
    plot() {

        let points = this.points,
            ctx = this.ctx;
        this.ctx.fillStyle = "#000";

        // draw black points from our array
        ctx.clearRect(0, 0, this.el.width, this.el.height);
        points.forEach((el, i) => {
            ctx.beginPath();
            ctx.arc(points[i].x, points[i].y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    try () {
        this.plot();
        let means = this.initMeans();
        this.assign(means);
        let res = this.assign(means);
        
        
        setTimeout(() => {
        let half = res.halfMean;
        let end = res.endMean;
        let mn2 = [half, end];
        this.assign(mn2);
        }, 2000);
        
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
    new Point(270, 210),
    new Point(280, 320),
    new Point(300, 310),
    new Point(310, 300),
    new Point(330, 300),
    new Point(340, 290),
    new Point(270, 280),
    new Point(260, 320),
    new Point(280, 270),
    new Point(260, 290)
];


let m = new Means("canvas");
m.init(points);
m.try(); // will try to cluster the points into 2 clusters
// <canvas width="400" height = "400"></canvas>
