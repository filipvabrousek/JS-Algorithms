const Think = (() => {
    
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
    
    
/*----------------------------------------------USAGE----------------------------------------------*/
const perceptron = (inputs, desired) => {
    let r = new Perc(inputs, desired);
    return r.process();
}

const regression = (canvas, points) => {
    let reg = new Regression(canvas, points);
    return reg;
}

const means = (canvas, points, k) => {
  let m = new KMeans(canvas, points, k)
  return m;
}



return {
    perceptron,
    regression,
    means
}
}
               
)();
    
    
    
/*----------------------------------------------USAGE----------------------------------------------*/
 var data = [[51,40],[40,53],[56,55],[67,43],[68,66],[44,67],[54,83],[80,81],[77,54],[68,80],[107,78],[85,71],[97,63],[95,80],[91,49],[119,62],[120,86],[94,95],[67,95],[80,91],[80,105],[99,105],[104,94],[133,70],[107,54],[91,35],[71,121],[89,126],[105,120],[114,102],[134,99],[55,105],[88,120],[130,118],[113,123],[117,111],[131,89],[137,88],[126,76],[120,48],[137,54],[145,72],[146,89],[120,140],[121,128],[147,112],[137,129],[97,135],[78,135],[112,135],[143,100],[158,77],[154,62],[137,40],[104,30],[169,109],[160,125],[155,155],[145,142],[148,175],[173,171],[183,153],[203,129],[227,127],[262,139],[273,177],[272,208],[252,232],[232,240],[184,245],[157,232],[157,209],[162,196],[168,209],[177,182],[195,162],[226,146],[243,146],[187,136],[229,160],[213,184],[191,189],[189,210],[212,205],[230,199],[233,179],[250,173],[248,211],[259,193],[259,162],[215,169],[210,143],[215,226],[191,226],[170,223],[241,221],[210,238],[170,242],[270,221],[238,257],[260,252],[282,251],[289,267],[270,276],[251,277],[252,326],[272,316],[259,308],[233,291],[255,292],[269,290],[292,290],[290,309],[304,323],[282,333],[253,344],[222,338],[237,326],[214,325],[199,333],[204,354],[243,354],[231,304],[215,310],[292,323],[315,316],[324,340],[295,342],[306,333],[276,341],[270,354],[293,354],[310,354],[313,371],[284,371],[258,368],[235,367],[239,346],[244,339],[243,310],[284,295],[313,295],[303,303],[303,281],[330,284],[330,301],[332,305],[338,324],[351,354],[326,354],[334,375],[347,338],[365,332],[373,319],[169,89],[185,89],[176,70],[162,41],[197,145],[247,249]];
    

let means = Think.means("canvas", data, 3);
means.cluster();
    
/*
Think.perceptron([0, 1], 1);

let r = Think.regression("canvas", data);
r.plot();
*/

/*<canvas width="400" height="400" style="border: 1px solid black"></canvas>*/
    
