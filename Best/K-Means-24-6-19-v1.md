## K-Means
* 24.6.19

```html
<p><b>Cluster mean</b> orange, <b>random centroids:</b> green</p>
<canvas width="400" height="400"></canvas>
```

```js
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    class Means {
        constructor(selector) {
            this.selector = selector;
            this.points = [];
            // filled with our input
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
            let xm = 0
              , ym = 0
              , xn = 0
              , yn = 0
              , points = this.points;
            points.forEach((el,i)=>{
                xm = Math.max(...points.map(e=>e.x));
                ym = Math.max(...points.map(e=>e.y));
                xn = Math.min(...points.map(e=>e.x));
                yn = Math.min(...points.map(e=>e.y));
            }
            );

            return {
                xrange: xm - xn,
                yrange: ym - yn
            }
        }

        //init k means (3 in this case) within range using "getRanges()"
        initMeans(k) {
            const ranges = this.getRanges();
            this.means.length = k;
            this.means.fill(0)
            this.k = k;

            this.means.forEach((el,i)=>{
                let cand = new Point(400 * Math.random(),400 * Math.random());
                // this.el.width
                this.means.push(cand);
            }
            );

            this.means = this.means.slice(k);
            // [0, 0, Point, Point] remove 2 zeros
            return this.means;
        }

        // get each points distance from each center
        assign(centrs) {

            var pd = [];
            var letters = ["A", "B", "C", "D"];

            centrs = [new Point(20,30), new Point(112,180), new Point(295,345)];

            /*  centrs = [new Point(400 * Math.random(), 400 * Math.random()),
                 new Point(400 * Math.random(), 400 * Math.random()),
                  new Point(400 * Math.random(), 400 * Math.random())
                 ];*/

            centrs.forEach((el,i)=>{
                this.ctx.beginPath();
                this.ctx.fillStyle = "#1abc9c";
                this.ctx.arc(centrs[i].x, centrs[i].y, 4, 0, Math.PI * 2);
                this.ctx.fill();
            }
            );

            centrs.forEach((centr,i)=>{
                points.forEach((point,j)=>{
                    let dist = this.euclidean(point, centr);

                    let centrname = letters[i];
                    let d = new PointDist(point,Math.round(dist),centrname,centr);
                    pd.push(d);
                }
                );
            }
            );

            // get split points
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

            console.log(splits);

            var all = [];

            splits.forEach((el,i)=>{
                let sub = pd.slice(splits[i], splits[i + 1]);
                all.push(sub);
            }
            );

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

                        if (s != undefined){
                              sub.push(s);
                        }
                      

                        if (sx == all.length - 1) {
                            if (sub.length > 0){
                            group.push(sub);
                            }
                        }
                    }

                    if (inc == all[i].length) {
                        done = true;
                    }
                }
            }
      
            let flat = [].concat(...group);
            
            const together = flat.reduce((acc, item) => {
               if (!acc[item.name]){
                   acc[item.name] = [];
               }
                
                   acc[item.name].push(item);
                   return acc;
               
            }, {});
            
            
            var mega = [];
            for (let [dist, n] of Object.entries(together)){
                mega.push(n);
            }
            
            
            var ft  = [];
            
            for (var i = 0; i < flat.length; i++){
                var sub = [];
                
                  mega.forEach((el, j) => {
                      if (mega[j][i] != undefined){
                          // console.warn(mega[j][i]);
                              sub.push(mega[j][i]);
                      }
                  });
                 
                ft.push(sub);
                sub = [];
            }
            
            
            var eachToEach = ft.filter(el => el.length > 0);
            console.warn(eachToEach);
            
            
            var ll="A";
            
            var final = [];
            var subal = [];
            
             for (var i = 0; i < eachToEach.length; i++){
                 let one = eachToEach[i];
                 
                 let dists = one.map(e => e.dist);
                  let min = Math.min(...dists);
                 let idx = dists.indexOf(min);
                 
                 
                 let letters = ["A", "B", "C"];
                
                 
                 if(letters[idx] != ll){
                     ll = letters[idx];
                     console.error("NOW");
                     final.push(subal);
                     subal = [];
                     
                 }
                 
                 subal.push(one[idx].point);
                 
                  console.warn(`${letters[idx]} FOR POINT [${one[idx].point.x}, ${one[idx].point.y}]`);
                 
                 if (i == eachToEach.length - 1){
                     console.error(subal);
                     final.push(subal);
                 }
                 
             }
            
            console.error(final);
            
          
            
            
            // GET MEAN OF ARRAYS IN BIG  
            
            
            final.forEach((el, i) => {
            let arr = final[i];
            
                const meanX = arr.map(p=>p.x).reduce((a,b)=>a + b) / arr.length;
                const meanY = arr.map(p=>p.y).reduce((a,b)=>a + b) / arr.length;
                console.log(`CLUSTER CENTER: [${meanX} ${meanY}]`);
                
                let center = new Point(meanX, meanY);
                this.drawPoints([center], "orange");
                this.drawPoints(arr, "#3498db");
                
            });
        }

        drawPoints(points, color) {
            points.forEach((el,i)=>{
                this.ctx.beginPath();
                this.ctx.fillStyle = color;
                this.ctx.arc(el.x, el.y, 4, 0, Math.PI * 2);
                this.ctx.fill();
            }
            );

        }

        containsPoint(points, check) {
            for (var p in points) {
                if ((p.x == check.x) && (p.y == check.y)) {

                    return true
                }
            }
        }

        euclidean(a, b) {
            let xd = Math.pow(a.x - b.x, 2);
            let yd = Math.pow(a.y - b.y, 2);
            let res = Math.sqrt(xd + yd);
            return res;
        }

        // get mean of all assigned points (mean point of APoints and BPoints array), do: if len === 0 condition
        assignedPointsMean(arr, len) {
            const meanX = arr.map(p=>p.x).reduce((a,b)=>a + b) / len;
            const meanY = arr.map(p=>p.y).reduce((a,b)=>a + b) / len;
            return {
                x: meanX,
                y: meanY
            }
        }

        // plot the points we define in our array on the canvas and recolor them according to assigned points
        plot() {

            let points = this.points
              , ctx = this.ctx;
            this.ctx.fillStyle = "#000";

            // draw black points from our array
            ctx.clearRect(0, 0, this.el.width, this.el.height);
            points.forEach((el,i)=>{
                ctx.beginPath();
                ctx.arc(points[i].x, points[i].y, 4, 0, Math.PI * 2);
                ctx.fill();
            }
            );
        }

        // try to cluster the points, if "done" in findMeans is false, try again
        try() {
            this.getRanges();
            this.plot();
            this.assign(-1);

            /*let finished = this.drawMean();
		if (!finished) {
			setTimeout(this.try.bind(this), 2000);
		}*/
        }
    }

    class PointDist {
        constructor(point, dist, name, center) {
            this.point = point
            this.dist = dist
            this.name = name
            this.center = center

        }
    }

    const points = [// x a y less 50 (top left corner)
    new Point(30,40), new Point(20,10), new Point(70,30), new Point(20,50), new Point(10,30), new Point(20,50), new Point(10,20), new Point(40,30), new Point(20,60), new Point(20,40),
        
        
        // middle cluster
      new Point(30,220), new Point(40,170), new Point(110,210), new Point(40,210), new Point(20,200), new Point(40,230), new Point(20,190), new Point(80,200), new Point(80,230), new Point(40,210),
        
    // x and y higher than 50 (bottom right corner)
    new Point(270,210), new Point(280,320), new Point(300,310), new Point(310,300), new Point(330,300), new Point(340,290), new Point(270,280), new Point(260,320), new Point(280,270), new Point(260,290)
       /* new Point(200, 10), new Point(220, 30) TR cluster*/
    ];

    let m = new Means("canvas");
    m.init(points);
    m.try();
    // will try to cluster the points into 3 clusters
```
