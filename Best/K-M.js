```js
<canvas width="400" height="400"></canvas>
<script>
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
	initMeans(k) {
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
	
    	// if the point is within the range (all points have less distance than 110 px to all points) push it to according array
    
   
    /*
    assign(centrs) {

		let APoints = [],
			BPoints = [];

		points.forEach((val, i) => {            
			let zerox = points[i].x - centrs[0].x; // distance to 1st centroid
			let zeroy = points[i].y - centrs[0].y;
			let onex = points[i].x - centrs[1].x; // distance to 2nd centroid
			let oney = points[i].y - centrs[1].y;

            // get posititive of each point from each centroid
    
			
			let sqzerox = Math.abs(zerox);
			let sqzeroy = Math.abs(zeroy);
			let sqonex = Math.abs(onex);
			let sqoney = Math.abs(oney); 
                

		
			let ranges = this.getRanges();
			(sqzerox || sqzeroy) < ranges.xrange / 3 ? APoints.push(points[i]) : 0;
			(sqonex || sqoney) < ranges.xrange / 3 ? BPoints.push(points[i]) : 0;
		});

		return {
			AP: APoints,
			BP: BPoints
		};
	}*/
    
  
    
    // get each points distance from each center
    assign(centrs){
        
       var pd = [];
        
        
        var letters = ["A", "B", "C", "D"];
        
        centrs = [new Point(20,30), new Point(112, 180), new Point(295, 345)];
        
      /*  centrs = [new Point(400 * Math.random(), 400 * Math.random()),
                 new Point(400 * Math.random(), 400 * Math.random()),
                  new Point(400 * Math.random(), 400 * Math.random())
                 ];*/
        
        
        centrs.forEach((el, i) => {
			this.ctx.beginPath();
            this.ctx.fillStyle = "#1abc9c";
			this.ctx.arc(centrs[i].x, centrs[i].y, 4, 0, Math.PI * 2);
			this.ctx.fill();
		});
        
        
        
        
        centrs.forEach((centr, i) => {
           points.forEach((point, j) => {
               let dist = this.euclidean(point, centr);
               
              let centrname = letters[i];
              let d = new PointDist(point, Math.round(dist), centrname, centr);
            
              
               pd.push(d);
           });
        });
     
       
        
    
        
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
        
        
        var all =[];
        
       splits.forEach((el, i) => {
             let sub = pd.slice(splits[i],splits[i + 1]);
             all.push(sub);
       });
          
        console.log(all);
        
        
        
        
        
        
           var clusters = [];
           var rem = -1;
           var done = false;
           var inc = -1;
             
        /*
        get top 3 elements and compare them
        
        */
        
        
        var group = [];
       
        
        for (var i = 0; i < all.length; i++){
               while (done === false){
                 inc += 1;
 
                   var sub = [];
                   
                   for (var sx = 0; sx < all.length; sx++){
                       let s = all[sx][inc]; // sx 0, 1, 2
                       
                       sub.push(s);
                     
                       if (sx == all.length - 1){
                           group.push(sub)
                       }
                   }
                 
                   if (inc == all[i].length){
                      done = true;
                   }
             }
        }
        
        
        
        console.log(group); // 21 
       
        
        
        var alreadylet = [];
        var curl = "";
        
        var small = [];
        var big =[];
        
        // find the closest centroid :D
        for (var i = 0; i < group.length; i++){
            let sub = group[i];    
        
            let min = Math.min(...sub.map(e => e.dist)); // minimal distance
            
            let pm = sub.map(el => el.dist);
           // console.log(pm);
           // console.log(min);
            
            
            // get index of min in array (same index in letters will get the closest centroid)
           
           // console.warn(s);
             var letters = ["A", "B", "C"];
             let s = pm.indexOf(min);
            
          small.push(sub[0].point);
             if (letters[s] != curl){
               curl = letters[s];
                big.push(small);
                 small = []; // MPETY IT
                 
                console.warn("PUSH");
                 console.warn(big);
               
           }
           
                // console.log(`Closest CENTROID to point with [${sub[0].point.x}, ${sub[0].point.y}] IS "${letters[s]}`);
        }
        
        console.log("XINDLX");
        console.log(big);
        
       
        
        
          
             
        
              /* let first = all[i + 0][inc];
                 let sec = all[i + 1][inc];
                 let third = all[i + 2][inc]; */
        /* for (var i = 0; i < all.length; i++){
             let sub = all[i];
             
            
              rem += 1;
            
             var done = false;
             
             var inc = 0;
             
             while (done === false){
                 inc += 1;
                let first = all[inc][i];
                 
                 if (inc == all[i].length){
                     done true;
                 }
             }
             
               for (var j = 0; j < sub.length - rem; j++){
                   console.log(all[i][j]);
         }
         }*/
        
       // console.log("Clusters");
       // console.log(clusters);
        
  /* 
    // COMPARE ELEMENTS
    for (var i = 0; i < all.length - 1; i++){
        let sub = all[i];
        
        for (var j = 0; j < sub.length; j++){
           // console.log(`COMPARE ${all[i][j].dist}`);
            
           // console.warn(all[i][j]);
           // console.warn(all[i + 1][j]);
            
            if (all[i][j].dist <= all[i + 1][j].dist){
                 console.log(all[i][j]);
                 console.log(`IS CLOSER TO ${all[i][j].name} `);
            } else {
                  console.log(all[i + 1][j]);
                  console.log(`IS CLOSER TO ${all[i + 1][j].name} `);
            }
        }
        
        
        console.log("-------------------------");
    }*/
        
        
        
        
        
   
        
        
        // get -10 (point of trnasition)
        var tp = (pd.length / centrs.length) / 2; // OR - 10
       
        
        
        
        
        /*
        for (var i = 0; i < pd.length - tp; i++){
              //console.log(pd[i].dist + "--------" + pd[i + tp].dist);
            if (pd[i].dist < pd[i + tp].dist){
               console.log(` ${i + 1} :::  ${pd[i].point.x} ${pd[i].point.y} is closer to B`);
            } else {
                console.log(` ${i + 1} ::: ${pd[i].point.x}  ${pd[i].point.y} is closer to A`);
            }
        }*/
        
        
   

        
    }
    
    
    
    
    containsPoint(points, check){
        for(var p in points){
            if ((p.x == check.x) && (p.y == check.y)) {
               
               return true
            }
        }
    }
    
    
    
     euclidean(a, b){
         let xd = Math.pow(a.x - b.x, 2);
         let yd = Math.pow(a.y - b.y, 2);
         let res = Math.sqrt(xd + yd);
         return res;
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
		let ctx = this.ctx;
		let means = this.initMeans(2); // init ranodm means
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
			console.log("Not done");
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

    
class PointDist {
    constructor(point, dist, name, center){
        this.point = point
        this.dist = dist
        this.name = name
        this.center = center
        
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
	new Point(260, 290),
    
    
    
 new Point(30, 220),
	new Point(40, 170),
	new Point(110, 210),
	new Point(40, 210),
	new Point(20, 200),
	new Point(40, 230),
	new Point(20, 190),
	new Point(80, 200),
	new Point(80, 230),
	new Point(40, 210),
];


let m = new Means("canvas");
m.init(points);
m.try(); // will try to cluster the points into 2 clusters
    
    
    

</script>
```
