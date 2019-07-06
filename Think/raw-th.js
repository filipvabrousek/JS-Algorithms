const th = (() => {
    
/*----------------------------------------------PERCEPTRON----------------------------------------------*/
class Perc {
    constructor(inputs, desired){
        this.inputs = inputs;
        this.desired = desired;
    }
    
    S(x){
        return  1 / (1 + Math.exp(-x));
    }
    
    process(){
        var weights = Array(2).fill(Math.random());
        
        var sum = 0;
        var res = 0;
        
        for (var c = 0; c < 100; c++){
            
            for (var i = 0; i < weights.length; i++){
                sum += weights[i] * this.inputs[i];
            }
            
            var normalized = this.S(sum); // normalize to 0 and 1
           
            let diff = Math.abs(normalized - this.desired);
            weights = weights.map(w => w * diff * 10);
            res = normalized - diff;
        }
        
        return res;
    }
}
    
    
    
/*----------------------------------------------REGRESSION----------------------------------------------*/
class P {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

     class Regression {
        constructor(selector, points) {
            this.selector = selector;
            this.el = document.querySelector(this.selector);
            this.points = points.map(el => new P(el[0], el[1]));
            this.ctx = this.el.getContext("2d");
        }

        plot() {
            let ctx = this.ctx,
                points = this.points;
            ctx.clearRect(0, 0, 400, 400); // this.el.width

            points.forEach((el, i) => {
                ctx.beginPath();
                ctx.arc(points[i].x, points[i].y, 2, 0, 2 * Math.PI);
                ctx.fill();
            });

            let f = this.linreg(points);
            ctx.strokeStyle = "#3498db";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(0, f.m);
            ctx.lineTo(400, f.x); // 400 - line across entire width of the element 
            ctx.stroke();
        }


        linreg(points) { // data get passed to "line" function

            let x = 0, b = 0;

            let meanX = points.map(a => a.x).reduce((a, b) => a + b) / points.length;
            let meanY = points.map(a => a.y).reduce((a, b) => a + b) / points.length;

            points.forEach((val, i) => {
                x += (points[i].x - meanX) * (points[i].y - meanY); // xMean diff * yMean diff
                b += (points[i].x - meanX) * (points[i].x - meanX); // xMean dif squared
            });

            let gradient = x / b;
            
            return {
                m: meanY - gradient * meanX, // beginning point of the line
                x: 400 * gradient + (meanY - gradient * meanX) // end point of the line
            }
        }
    }
    
    
    
/*----------------------------------------------KMEANS----------------------------------------------*/
    class PointDist {
        constructor(point, dist, name, center) {
            this.point = point
            this.dist = dist
            this.name = name
            this.center = center
        }
    }

    class KMeans {
        constructor(selector, points, k) {
            this.k = k;
            this.selector = selector;
            this.points = points.map(el => new P(el[0], el[1]));
            this.means = [];
            this.assigned = {};
            this.centroids = [];
            this.controlF = [];
            this.tempfin = false;
            this.el = document.querySelector(this.selector);
            this.ctx = this.el.getContext("2d");
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


        // get each points distance from each center
        assign(centrs) {

            var pd = [];
            var letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

            
             // 1 -------------------------------------- create K random centroids
            let ranges = this.getRanges();
            
            if (centrs.length == 0) {
                for (var i = 0; i < this.k; i++) {
                    centrs.push(new P(ranges.xrange * Math.random(), ranges.yrange * Math.random()));
                }
            } // ELSE we are using argument


            // 2 -------------------------------------- get the distance of each point to each centroid
            centrs.forEach((centr, i) => {
                this.points.forEach((point, j) => {
                    let dist = this.euclidean(point, centr);

                    let centrname = letters[i];
                    let d = new PointDist(point, Math.round(dist), centrname, centr);
                    pd.push(d);
                });
            });

            
            // 3 -------------------------------------- get split points
            var st = ""
            var splits = [];
            var mel = 0;

            for (var i = 0; i < pd.length; i++) {
                let el = pd[i];

                if (el.name != st) {
                    st = el.name
                    splits.push(i);
                } else {
                    mel += 1;
                }
            }

            var all = [];

            splits.forEach((el, i) => {
                let sub = pd.slice(splits[i], splits[i + 1]);
                all.push(sub);
            });
            
            console.log(all);
            // [Array(160), Array(160), Array(160)]
            // first array holds the distance of each point to centroid A, 2nd to B and so on...
            
            
            var clusters = [];
            var rem = -1;
            var done = false;
            var inc = -1;

            var group = [];

            // ALL = array of 3 subarrays (each holds diatnce of each point to one of the 3 centers (one for A, one for B, one for C))

            for (var i = 0; i < all.length; i++) {
                while (done === false) {
                    inc += 1;

                    var sub = [];

                    for (var sx = 0; sx < all.length; sx++) {
                        let s = all[sx][inc];
                        // sx 0, 1, 2

                        if (s != undefined) {
                            sub.push(s);
                        }


                        if (sx == all.length - 1) {
                            if (sub.length > 0) {
                                group.push(sub);
                            }
                        }
                    }

                    if (inc == all[i].length) {
                        done = true;
                    }
                }
            }

            /*
            group:
            [A(3), A(3)...]
            0: PointDist {point: P, dist: 118, name: "A", center: P}
            1: PointDist {point: P, dist: 55, name: "B", center: P}
            2: PointDist {point: P, dist: 309, name: "C", center: P}
            */
            
            let flat = [].concat(...group);
       
            console.log(all);
            // console.log(mega);
            
            

            var ft = [];

            for (var i = 0; i < flat.length; i++) {
                var sub = [];

                all.forEach((el, j) => {
                    if (all[j][i] != undefined) {
                        // console.warn(mega[j][i]);
                        sub.push(all[j][i]);
                    }
                });

                ft.push(sub);
                sub = [];
            }


            
            // 4 -------------------------------------- get our CLUSTERS
            // array of K arrays :)
            var eachToEach = ft.filter(el => el.length > 0);
            
            var final = [];
            var subal = [];

            var ew = [];
            for (var i = 0; i < this.k; i++) {
                ew.push([]);
            }

            for (var i = 0; i < eachToEach.length; i++) {
                let one = eachToEach[i];
                let dists = one.map(e => e.dist); // [32, 23, 45]

                let min = Math.min(...dists); // 23
                let idx = dists.indexOf(min); // 1 
                let letters = ["A", "B", "C", "E", "F", "G", "H"]; // corresponds to B

            
                let p = ew[idx];

                if (p != undefined) {
                    ew[idx].push(one[idx].point);
                }
               

                final = ew;
            }



            // THIS HAS TO CONTAIN ALL POINTS !!!!!!!!
     

            this.controlF = final;
            this.centroids = [];
            this.plot();

            centrs.forEach((el, i) => {
                this.ctx.beginPath();
                this.ctx.fillStyle = "#1abc9c";
                this.ctx.arc(centrs[i].x, centrs[i].y, 8, 0, Math.PI * 2);
                this.ctx.fill();
            });


            // 5 -------------------------------------- draw our results
            final.forEach((el, i) => {

                let colors = ["green", "#3498db", "orange", "pink", "yellow"];

                let arr = final[i];

                if (arr.length > 0) {
                    const meanX = arr.map(p => p.x).reduce((a, b) => a + b) / arr.length;
                    const meanY = arr.map(p => p.y).reduce((a, b) => a + b) / arr.length;
                    
                    let mean = new P(meanX, meanY);
                    this.drawPoints([mean], "red");
                    this.drawPoints(arr, colors[i]);
                    this.centroids.push(mean);
                    // 25.6.2019 - 15:49 WORKING manually calling cluster :D
                }

            });
        }
        

        drawPoints(points, color) {
            points.forEach((el, i) => {
                this.ctx.beginPath();
                this.ctx.fillStyle = color;
                this.ctx.arc(el.x, el.y, 4, 0, Math.PI * 2);
                this.ctx.fill();
            });
        }



        euclidean(a, b) {
            let xd = Math.pow(a.x - b.x, 2);
            let yd = Math.pow(a.y - b.y, 2);
            let res = Math.sqrt(xd + yd);
            return res;
        }

      // 6 -------------------------------------- try to cluster our points
        cluster() {

            window.setInterval(() => {
                this.getRanges();
                this.plot();


                var lastX = 0;
                var lastY = 0;

                var moveAmount = 0;

                var done = false;

                this.assign(this.centroids);
                let m = this.controlF.flat();
                console.log(m);

                let cc = this.controlF.length;
            }, 2000);

        }
    }
    
    
    
   // maps input between 0 and 1
    const S = (x) => 1 / (1 + Math.exp(-x));

    class Neuron {
        constructor() {
            this.weights = Array(2).fill(0).map(e => Math.random());
        }

        forward(inputs) {
            var sum = 0;
            this.weights.forEach((el, i) => sum += this.weights[i] * inputs[i]);
            return S(sum);
        }

        backward(error) {
            this.weights = this.weights.map(w => w * error);
        }
    }


    /*----------------------------------NET-------------------------------*/
    class Net {
        constructor(n) { // 7 layers: 
            this.layers = Array(n).fill([]).map(el => el = [new Neuron(), new Neuron(), new Neuron()]);
        }

        forward(first) {
            // [Array(3), Array(3), Array(3)] WE CANNOT RETURN THIS !!!!
            // transforming to Array(3) (avg of el[0] els of each Array, of el[1] ...)
            var mega = [];
            var sum = 0;
            
            let ret = this.layers.flat().reverse().map(n => n.forward(first));
          
            ret.forEach((el, i) => {
                sum += ret[i];

                if (i % 3 == 0) {
                    mega.push(sum / 3);
                    sum = 0;
                }
            });

           // console.error(mega.reduce((a, b) => a + b) / mega.length);
            return mega;
            
            
        }


        predict(arr, expected) {
            for (var i = 0; i < 1000; i++) { // 2 vs 100
                var data = this.forward(arr);
                var diff = 0;
                data.forEach(res => diff += Math.abs(res - expected)); // if I divide diff by 3 less bad - 0.67
                this.layers.flat().reverse().map(n => n.backward(diff));
            }

            const output = this.forward(arr);
            const diffs = output.map(el => Math.abs(el - expected));
            const ret = diffs.indexOf(Math.min(...diffs));
            return output[ret];
        }
    }


    
    // 30.6.2019 - 17:20 done for 1 !!!    
    // https://stackoverflow.com/questions/8439194/multiple-output-neural-network - 2.7.19
    
    
/*----------------------------------------------USAGE----------------------------------------------*/
const perceptron = (inputs, desired) => new Perc(inputs, desired);
const regression = (canvas, points) => new Regression(canvas, points);
const means = (canvas, points, k) => new KMeans(canvas, points, k);
const net = (n) => new Net(n);
   

return {
    net,
    regression,
    means
}
}
               
)();
