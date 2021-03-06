const Think = (() => {

    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Perceptron :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
    class Perceptron {
        constructor() {
            this.weights = [];
            this.data = [];
        }

        fill() {
            this.weights.length = 2; // 2
            this.weights.fill(Math.random());

            if (this.weights.length == 2) {
                this.weights.push(1);
            }
        }

        train(inputs, expected) {

            const res = this.calc(inputs);
            this.data.push({
                input: inputs,
                target: expected
            });

            this.weights.forEach((el, i) => {
                const input = (i == inputs.length) ? 1 : inputs[i];
                let diff = expected - res;
                this.weights[i] += diff * input * 0.1;
            });

        }

        calc(inputs) {
            let res = 0;
            inputs.forEach((el, i) => res += this.weights[i] * inputs[i]);
            res += this.weights[this.weights.length - 1]; // bias, different each time
            return this.sigmoid(res);
        }


        retrain() {
            this.data.forEach(a => {
                const training = this.data.shift();
                this.train(training.input, training.target);
            });
        }

        learn() {
            for (let i = 0; i < 1000; i++) {
                this.retrain();
            }
        }

        sigmoid(x) {
            return 1 / (1 + Math.exp(-x));
        }
    }




    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: NEURAL NETWORK :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

    const sigmoid = x => 1 / (1 + Math.exp(-x)); // maps any input into value between 0 and 1
    const sgrad = x => sigmoid(x) * (1 - sigmoid(x)); // val * (1 - val)


    class N {
        constructor(ni) {
            this.weights = [];
            this.weights.length = ni;
            this.weights.fill(Math.random());
        }

        forward(inputs) {
            this.inputs = inputs;
            this.sum = 0;
            this.weights.forEach((el, i) => this.sum += this.weights[i] * this.inputs[i]);
            return sigmoid(this.sum);
        }

        backward(error) {
            this.error = error;
            return this.weights.map(w => w * error).slice(1); // remove bias
        }

        /* adjusting weights: make adjustment proportional to the size of error "sigmoid gradient" ensures the we adjust just a little bit
        pass "this.sum" from "forward()" into sigmoid gradient (sgrad), adjust weights by substracting deltas */
        update() {
            const deltas = this.inputs.map(input => input * sgrad(this.sum) * this.error);
            this.weights.forEach((el, i) => this.weights[i] = this.weights[i] - deltas[i]);
        }
    }


    /*------------------------------------------------------LAYER----------------------------------------------------------*/
    class Layer {
        constructor(len, inputs) {
            this.neurons = [];
            this.neurons.length = len;
            this.neurons.fill(new N(inputs));
        }

        forward(inputs) {
            return this.neurons.map(n => n.forward(inputs));

        }

        backward(errors) {
            return this.neurons.map((n, i) => n.backward(errors[i])).reduce((a, b) => a + b); // pass each error backwards and get weighted sum
        }

        update(data) {
            this.neurons.forEach(n => n.update());
        }
    }



    class Network {
        constructor() {
            this.layers = [new Layer(3, 3), new Layer(1, 4)];
        }

        /*
        "ourdata" is [0, 1] is "first", that gets passed into concat so: Layer {n: Array(1)}.forward([1,0,1]) 
        the last value is returned (thats why we use reduce) we are training and returning, but we only care about returned value after the loop finishes  */
        forward(first) {
            return this.layers.reduce((ourdata, layer) => layer.forward([1].concat(ourdata)), first);
        }

        learn(data) {

            for (let it = 0; it < 1000; it++) {

                // fill err array with (result from network - desired output), and update the connection weights between nodes
                const res = this.forward(data[0]);
                let err = [];
                res.forEach((el, index) => err.push(res[index] - data[1]));

                // backpropagation , send err array back
                this.layers.reverse().reduce((error, layer) => layer.backward(error), err);
                this.layers.reverse(); // reverse back

                // update the connection weights 
                this.layers.forEach(l => l.update());
            }


            // add bias, and get our result
            const output = this.forward(data[0]);
            return output;
        }

    }



    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: REGRESSION :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

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
            let ctx = this.ctx,
                points = this.points;
            ctx.clearRect(0, 0, 400, 400); // this.el.width
            ctx.fillStyle = "#3498db";

            points.forEach((el, i) => {
                ctx.beginPath();
                ctx.arc(points[i].x, points[i].y, 2, 0, 2 * Math.PI);
                ctx.fill();
            });

            let f = this.linreg(points);
            let y = this.line(f.g, f.i);
            ctx.strokeStyle = "#1abc9c";
            ctx.beginPath();
            ctx.moveTo(0, f.i);
            ctx.lineTo(400, y); // 400 - line across entire width of the element 
            ctx.stroke();
        }

        line(g, i) {
            return 400 * g + i; // m*x + b => 400 * gradient + intercept
        }


        linreg(points) {

            let x = 0,
                b = 0;

            let meanX = points.map(a => a.x).reduce((a, b) => a + b) / points.length;
            let meanY = points.map(a => a.y).reduce((a, b) => a + b) / points.length;

            points.forEach((val, i) => {
                x += (points[i].x - meanX) * (points[i].y - meanY); // current "x" point - avg "x" point value * (same for "y")
                b += (points[i].x - meanX) * (points[i].x - meanX); // each "x" point - avg, squared
            });

            let gradient = x / b;

            return {
                g: gradient, // gradient
                i: meanY - gradient * meanX // intercept with y axis
            }
        }

    }




    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: K MEANS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/


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

            let APoints = [],
                BPoints = [];

let points = this.points;
            points.forEach((val, i) => {

                let zerox = points[i].x - centrs[0].x; // distance to 1st centroid
                let zeroy = points[i].y - centrs[0].y;
                let onex = points[i].x - centrs[1].x; // distance to 2nd centroid
                let oney = points[i].y - centrs[1].y;


                // get posititive of each point from each centroid
                let sqzerox = Math.sqrt(zerox * zerox);
                let sqzeroy = Math.sqrt(zeroy * zeroy);
                let sqonex = Math.sqrt(onex * onex);
                let sqoney = Math.sqrt(oney * oney);

                // if the point is within the range (all points have less distance than 110 px to all points) push it to according array
                let ranges = this.getRanges();
                (sqzerox || sqzeroy) < ranges.xrange / 3 ? APoints.push(points[i]) : 0;
                (sqonex || sqoney) < ranges.xrange / 3 ? BPoints.push(points[i]) : 0;
            });

            return {
                AP: APoints,
                BP: BPoints
            };
        }


        // get mean of all assigned points (mean point of APoints and BPoints array), do: if len === 0 condition
        assignedPointsMean(arr, len) {
        
            const meanX = arr.map(p => p.x).reduce((a, b) => a + b) / len;
            const meanY = arr.map(p => p.y).reduce((a, b) => a + b) / len;
            return {
                x: meanX,
                y: meanY
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



        /* calculate mean point with assigned points and draw each cluster centroid
        if we have classified all the points */
        drawMean() {
            let ctx = this.ctx, points = this.points;
            let means = this.initMeans(); // init ranodm means
            let a = this.assign(means); // assign points to means
            let ap = a.AP; // A cluster points
            let bp = a.BP // B cluster points
        
            let amean = this.assignedPointsMean(ap, ap.length);
            let bmean = this.assignedPointsMean(bp, bp.length);
            let done = false;


            if (ap.length + bp.length !== points.length) {
                ctx.fillStyle = "#1abc9c";
                ctx.beginPath();
                ctx.arc(amean.x, amean.y, 6, 0, Math.PI * 2);
                ctx.arc(bmean.x, bmean.y, 6, 0, Math.PI * 2);
                ctx.fill();
                console.log("Not done")
            }

            // if we have all the points and ap and bp arent equal we found the means :D
            if (ap.length + bp.length === points.length && amean.x !== bmean.x) {

                ctx.beginPath();
                ctx.fillStyle = "red";
                ctx.arc(amean.x, amean.y, 6, 0, Math.PI * 2);
                ctx.arc(bmean.x, bmean.y, 6, 0, Math.PI * 2);
                ctx.fill();

                console.log("Clustering done. ", "Mean A: ", amean, "Mean B:", bmean);
                done = true;
            }

            return done;

        }



        // try to cluster the points, if "done" in findMeans is false, try again
        try () {
            this.getRanges();
            this.plot();

            let finished = this.drawMean();
            if (!finished) {
                setTimeout(this.try.bind(this), 2000);
            }
        }
    }



    /*::::::::::::::::::::::::::::::;;;;;:::::::::::::::::::::::::::::::::::: K Means :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/




    const PXOR = (data) => {
        let p = new Perceptron();

        p.fill();
        p.train([0, 0], 0);
        p.train([0, 1], 1);
        p.learn();

        let big = p.calc(data);
        return big;
    }




    const Net = (data) => {
        const network = new Network();
        const res = network.learn(data);
        return res;
    }


    const Regression = (selector) => {
        const el = new LR(selector);
        el.init();
    }


    const KMeans = (selector, points) => {
        let m = new Means(selector); // <canvas width="400" height="400"></canvas> add point class, point array and call this method
        m.init(points);
        m.try();
    }


    return {
        PXOR,
        Net,
        Regression,
        KMeans
    }


})();



let xor = Think.Net([
    [0, 1], 1
]);
console.log(xor);
    
    
 /*   
class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
const data = [
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
Think.KMeans("canvas", data);
    */
