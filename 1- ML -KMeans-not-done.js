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
        let APoints = [],BPoints = [],assignments = [],distances = [], sum = 0;

        points.forEach((val, i) => {

        let point = points[i];

        centrs.forEach((val, e) => {
                
            
                let diffX = (point.x - centrs[e].x) / 10;
                let diffY = (point.y - centrs[e].y) / 10;
                sum += Math.sqrt(diffX * diffX);
                sum += Math.sqrt(diffY * diffY);

                let obj = {
                        pointIndex: i,
                        dist: Math.round(sum),
                        to: e
                }
                distances.push(obj); 
        });

});
        
          
           


        let oneClose = [];
        let secondClose = [];

        
        distances.forEach((el, i) => {
                
            if (distances[i + 1]){
                
            
            let toFirst = distances[i].dist;
            let toSecond = distances[i + 1].dist; 
            
            if (toFirst < toSecond) { // WHY IS THIS ALWAYS TRUE ???????
                console.log("Closer to the first centroid ", toFirst);
                oneClose.push(points[distances[i].pointIndex]);
            } else {
                console.log("Closer to the 2nd centroid ", toSecond);
                secondClose.push(points[distances[i].pointIndex]);
            }
           
                console.log(oneClose)
                } // security check
        });
        
        
         console.log("Centers0 ", centrs[0], "Centrs1 ", centrs[1]);
        
        this.ctx.fillStyle = "orange";
        this.ctx.beginPath();
        this.ctx.arc(centrs[0].x, centrs[0].x, 6, 0, 2 * Math.PI);
        this.ctx.fill();
        
        this.ctx.fillStyle = "blue";
        this.ctx.beginPath();
        this.ctx.arc(centrs[1].x, centrs[1].x, 6, 0, 2 * Math.PI);
        this.ctx.fill();

        
        
        oneClose.forEach((el, i) => {
            this.ctx.beginPath();
            this.ctx.arc(oneClose[i].x, oneClose[i].y, 4, 0, 2 * Math.PI);
            this.ctx.fill();
        });
        
        return distances;
      
    }

    
    assignC(){
      /**/
          
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


/*

    // get mean of all assigned points (mean point of APoints and BPoints array), do: if len === 0 condition
    assignedPointsMean(arr, len) {
        const meanX = arr.map(p => p.x).reduce((a, b) => a + b) / len;
        const meanY = arr.map(p => p.y).reduce((a, b) => a + b) / len;
        return {
            x: meanX,
            y: meanY
        }
    }





*/
    /* calculate mean point with assigned points and draw each cluster centroid
    if we have classified all the points 
    drawMean() {
        let ctx = this.ctx;
        let means = this.initMeans(); // init ranodm means
        let a = this.assign(means); // assign points to means
        let ap = a.AP; // A cluster points
        let bp = a.BP // B cluster points

        let amean = this.assignedPointsMean(ap, ap.length);
        let bmean = this.assignedPointsMean(bp, bp.length);
        let done = false;



        if (ap.length + bp.length !== points.length) {
            this.colorPoints(ap, bp);
            ctx.fillStyle = "#1abc9c";
            ctx.beginPath();
            ctx.arc(amean.x, amean.y, 6, 0, Math.PI * 2);
            ctx.arc(bmean.x, bmean.y, 6, 0, Math.PI * 2);
            ctx.fill();
            console.log("Not done")
        }



        // if we have all the points and ap and bp arent equal we found the means :D
        if (ap.length + bp.length === points.length && amean.x !== bmean.x) {
            this.colorPoints(ap, bp);
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.arc(amean.x, amean.y, 6, 0, Math.PI * 2);
            ctx.arc(bmean.x, bmean.y, 6, 0, Math.PI * 2);
            ctx.fill();

            console.log("Clustering done. ", "Mean A: ", amean, "Mean B:", bmean);
            done = true;
        }


        return done;
        // call from here
    }

    colorPoints(ap, bp) {
        let ctx = this.ctx;
        ctx.fillStyle = "#1abc9c";

        // draw black points from our array

        ap.forEach((el, i) => {
            ctx.beginPath();
            ctx.arc(ap[i].x, ap[i].y, 4, 0, Math.PI * 2);
            ctx.fill();
        });


        bp.forEach((el, i) => {
            ctx.beginPath();
            ctx.arc(bp[i].x, bp[i].y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    }
*/


    // try to cluster the points, if "done" in findMeans is false, try again
   /* try () {
     this.getRanges();
        this.plot();

        let finished = this.drawMean();
        if (!finished) {
            setTimeout(this.try.bind(this), 500);
        }
    }*/
    
    try(){
        this.plot();
        let means = this.initMeans();
        this.assign(means);
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
