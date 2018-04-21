class P {
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


    /* -------------GET RANGES--------------- get point ranges, to create random centroids within ranges of our dataset ---------------------------- */
    getRanges() {
        let xm = 0, ym = 0, xn = 0, yn = 0, points = this.points;
       
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

    /* --------------INIT MEANS-------------- init k means (2 in this case) within range using "getRanges()" ---------------------------- */
    initMeans(k = 2) {
        const ranges = this.getRanges();
        this.means.length = k;
        this.means.fill(0)
        this.k = k;

        this.means.forEach((el, i) => {
            let cand = new P(400 * Math.random(), 400 * Math.random()); // this.el.width
            this.means.push(cand);
        });

        this.means = this.means.slice(k); // [0, 0, Point, Point] remove 2 zeros
        return this.means;
    }

   
    
    
    
    /* --------------ASSIGN-------------- assign each point to either first or second centroid (centrs[0] or centrs[1])  ---------------------------- */
    assign(centrs) {
        let distances = [], sum = 0;
    
        // 2 random centroid candidates
        let first = centrs[0]; 
        let second = centrs[1];

        // get each points positive distance from both centroids and fill-in distances array with objects with those data
        points.forEach((val, i) => {

            let point = points[i];
            let distanceZero = Math.sqrt(Math.pow((point.x - first.x), 2) + Math.pow((point.y - first.y), 2));
            let distanceOne = Math.sqrt(Math.pow((point.x - second.x), 2) + Math.pow((point.y - second.y), 2));

            let res = {
                pointIndex: i,
                zeroDist: distanceZero,
                oneDist: distanceOne,
                assignTo: 0 // index of centroid we assign to
            }

            distances[i] = res;
        });

        // change assignTo property according to distance from the centroid
        distances.forEach((el, i) => {
            if (distances[i].zeroDist < distances[i].oneDist) { // closer to zero
                distances[i].assignTo = 0
            } else {
                distances[i].assignTo = 1;
            }
        });

        // clear the canvas so we don´t have multiple points (btw. you can plot centers[0] and centers[1] points)
        this.ctx.clearRect(0, 0, 400, 400);
        this.plot();
        
        

        // --------------------------------------------------------- final data array
        let data = [];

        // firstly push points assigned to means[0] point to data
        let clustero = distances.filter(el => el.assignTo === 0);
        clustero.forEach((el, i) => {

            let point = points[clustero[i].pointIndex];

            this.ctx.fillStyle = "orange";
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
            this.ctx.fill();
            data.push(point)
        });

        // second push points assigned to means[0] point to data
        let clusterb = distances.filter(el => el.assignTo === 1);
        clusterb.forEach((el, i) => {

            let point = points[clusterb[i].pointIndex];

            this.ctx.fillStyle = "blue";
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
            this.ctx.fill();
            data.push(point);
        });


        // get both cluster centers using "clusterMean()" and draw it
        let half = this.clusterMean(data).half;
        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(half.x, half.y, 6, 0, 2 * Math.PI);
        this.ctx.fill();

        let end = this.clusterMean(data).end;
        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(end.x, end.y, 6, 0, 2 * Math.PI);
        this.ctx.fill();

        return {
            dist: distances,
            halfMean: half,
            endMean: end
        }

    }



    /* --------------CLUSTER MEAN-------------- get means of point in first and in 2nd half of arrays ---------------------------- */
    clusterMean(data) {
        let half = data.slice(0, Math.floor(data.length / 2)); // first half of distances array
        const halfMeanX = half.map(p => p.x).reduce((a, b) => a + b) / half.length; 
        const halfMeanY = half.map(p => p.y).reduce((a, b) => a + b) / half.length;

        let end = data.slice(Math.floor(data.length / 2), data.length); // second half of distances array
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




      /* --------------PLOT-------------- plot points from array into our canvas ---------------------------- */
        plot() {

        let points = this.points, ctx = this.ctx;
        ctx.fillStyle = "#000";

        points.forEach((el, i) => {
            ctx.beginPath();
            ctx.arc(points[i].x, points[i].y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
        }

        /* --------------TRY
        1) assign data points to centroid[0] or centroid[0] according to distance and get their center
        2) assign all points to that new center position and get their mean position again */
    try () {
       
        let means = this.initMeans();
        this.assign(means);
        let res = this.assign(means);  
    
        // this is where the magic happens -> one iteration of K-Means algorithm :D
        setTimeout(() => {
        let half = res.halfMean;
        let end = res.endMean;
        this.assign([half, end]);
        }, 2000);
    }


}

 const points = [
     new P(190, 220),
     new P(180, 210),
     new P(170, 190),
     new P(190, 180),
     new P(190, 190), // rep. 
     new P(200, 170),
     new P(200, 200),
     new P(210, 220),
     new P(200, 180),
     new P(200, 210),
     new P(220, 200),
     new P(210, 200),
     new P(170, 200),
     new P(210, 170),
     new P(220, 200),
     new P(220, 180),

     // left
     new P(150, 170),
     new P(140, 180),
     new P(120, 180),
     new P(140, 200), // important
     new P(120, 210),
     new P(130, 190),
     new P(120, 200),
     new P(120, 210),
     new P(150, 190),
     new P(140, 190),
     new P(170, 170),
     new P(160, 160),
     new P(150, 180)
 ];

let m = new Means("canvas");
m.init(points);
m.try(); // will try to cluster the points into 2 clusters
// <canvas width="400" height = "400"></canvas>
