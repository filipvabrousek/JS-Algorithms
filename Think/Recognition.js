// 9.7.19 - 10:56 begin
    
class Shaper {
    constructor(selector) {
        this.selector = selector;
        this.el = document.querySelector(this.selector);
        this.ctx = this.el.getContext("2d");
        this.points = [];
        this.setupCanvas();
    }



    setupCanvas() {
        this.isDrawing = false;

        this.el.addEventListener("mousedown", e => {
            this.ctx.beginPath();
            this.ctx.strokeWidth = 2.0;
            this.isDrawing = true;
        });

        this.el.addEventListener("mouseup", e => {
            this.isDrawing = false;
        });

        this.el.addEventListener("mousemove", e => {
            if (this.isDrawing) {
                //   S("#ang").innerHTML += "ANG " + e.x + " " + e.y;
                this.ctx.lineTo(e.x, e.y);
                this.ctx.stroke();

                this.points.push({
                    x: e.x,
                    y: e.y
                });

                let r = this.WHRatio(this.points);
                // S("#ratio").innerHTML = `ratio: ${(r.ratio.toPrecision(3))}`;
            }
        });

    }

    recognize(anglesB) {
      //  var anglesB = [45, 45, 45, 45, 45, 45, 90, 90, 90, 90, 90];

        //[90, 90, 90, 90, 45, 45, 45, 45, 45, 45, 45, 90, 90, 90, 90];
        // PREV: [90, 90, 90, 72, 60, 57, 58, 60, 18, 76, 63, 60, 48, 63, 72, 84, 88, 90, 90, 90, 90]; 
        //[36, 45, 90, 88, 90]
        // [90, 90, 90, 72, 60, 57, 58, 60, 18, 76, 63, 60, 48, 63, 72, 84, 88, 90, 90, 90, 90]
        var anglesA = this.compAngles(this.points);

        // console.clear();
        console.log("------");
        console.log("ANGLES A: " + anglesA.length);
        console.log("ANGLES B: " + anglesB.length);

        const bcopy = [...anglesB];
        const acopy = [...anglesA];

        const A = anglesA;
        const B = anglesB;

        console.log("MUTATED");


        let K = Math.ceil(A.length > B.length ? A.length / B.length : B.length / A.length);

        var mutated = [];
        if (A.length > B.length) {
            mutated = this.meany(acopy, K);
        } else {
            mutated = this.meany(bcopy, K);
        }

        console.log("COMPARE " + anglesA.length + " WITH " + mutated.length + "K " + K);

        // A gets mutated to B Length


        let shorter = A.length < B.length ? A : B;

        let good = 0;
        let bad = 0;

        console.log("============AB=============");
        console.log(A);
        console.log(B);


        console.log("-----------MUATATED, SHORTER------------");
        console.log(mutated);
        console.log(shorter);

        for (var i = 0; i < shorter.length; i++) {
            if (Math.abs(shorter[i] - mutated[i]) < 15) {
                good += 1;
            } else {
                bad += 1;
            }
        }

        let match = 0;
        if (good > bad) {
            match = (bad / good) * 100;
        } else {
            (good / bad) * 100;
        }

        console.log(`Bad ${bad}  Good ${good}`);

        let probability = Math.round((good / (bad + good)) * 100)
        alert(`Shape is 1 with probability of ${probability} %`);
        return 0;
    }

    splitArr(arr, chunk) {
        var R = [];
        let s = new Array(Math.ceil(arr.length / chunk)).fill().map(_ => arr.splice(0, chunk));
        return s
    }


    compAngles(points) { // neede ????
        this.bongles = [];

        var n = 6;
        var delta = Math.floor(Math.random(points.length / n));
        let every6th = points.filter((_, i) => i % 9 == 0).filter(Boolean);

        for (var i = 0; i < every6th.length - 1; i++) {
            let curr = every6th[i];
            let next = every6th[i + 1];
            let angle = this.getA(curr.x, curr.y, next.x, next.y);
            console.log(`PUSH ${angle}`);
            this.bongles.push(Math.round(angle));

        }

        return this.bongles.filter(Boolean);
        // return {good: goodPoints, bad: badPoints, ratio: goodPoints / badPoints};
    }

    getA(x1, y1, x2, y2) {
        var dy = Math.abs(y2 - y1);
        var dx = Math.abs(x2 - x1);
        var dist = Math.sqrt((dy * dy) + (dx * dx));
        var val = dy / dist;
        var asine = Math.asin(val);
        var deg = asine * (180 / Math.PI);
        return deg;
    }

    meany(arr, n) {
        let copy = arr;
        let groups = [];
        while (copy.length) {
            groups.push(copy.splice(0, n));
        }

        return groups.map(g => g.reduce((a, b) => a + b) / g.length).map(n => Math.round(n));
    }


    WHRatio(points) {

        let xs = this.points.map(p => p.x);
        let ys = this.points.map(p => p.y);

        var maxX = Math.max(...xs);
        var maxY = Math.max(...ys);
        var minX = Math.min(...xs);
        var minY = Math.min(...ys);

        var e = xs.indexOf(maxX);
        var f = ys.indexOf(maxY);
        var g = xs.indexOf(minX);
        var h = ys.indexOf(minY);


        let res = {
            mx: maxX,
            my: maxY,
            minx: minX,
            miny: minY
        }

        let width = Math.abs(maxX - minX);
        let height = Math.abs(maxY - minY);

        let w = 0;
        if (width > height) {
            w = height / width;
        } else {
            w = width / height;
        }

        return {
            w: width,
            h: height,
            ratio: width / height
        };
    }
}

    
let r = document.querySelector("#compare");
let s = new Shaper("canvas");
r.addEventListener("click", () => s.recognize([45, 45, 45, 45, 45, 45, 90, 90, 90, 90, 90]));
    
/* <button id="compare">Compare</button>
<canvas width="400" height="400"></canvas> */
