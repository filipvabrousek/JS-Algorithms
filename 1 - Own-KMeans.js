let canvas; 
let ctx;
const height = 400;
const width = 400;


class KMeans {
    constructor(data, selector){
        this.data = data;
        this.selector = selector || null;
        this.means = [];
        this.assignments = [];
        this.range = null; // change
        this.dataExtremes = null;
        this.element = null;
        this.width = 400;
        this.heigth = 400;
    }
    
    // w, h 400
    make(){
        this.element = document.querySelector(this.selector);
        this.element.ctx = this.element.getContext("2d");
        this.dataExtremes = this.getDataExtremes(this.data);
        
        this.range = this.getDataRanges(this.dataExtremes); // get ranges from extremes 
        // console.log(this.range) 9,10 - WORKS here!
        this.means = this.initMeans(3);
        this.assignPoints();
        this.draw();
        // setTimeout(run, 2000);
    }
       

/*------------------------------------------------------GET DATA RANGES------------------------------------------------------
pass in "data[]"
fill in ranges array from "data" array with the points, dimension is [x, y]
*/
     getDataRanges(extremes){
     const ranges = [];
        for (const dimension in extremes){
            ranges[dimension] = extremes[dimension].max - extremes[dimension].min;
            // 10 - 1 => 9, 11 - 1 => 10
        }

    return ranges; // [9, 10]
    }
    
    
    
    // get border points
    getDataExtremes(points){
      const extremes = [];
        
    for (const i in this.data){
        const point = data[i];
        
        // dimension = [x, y] 
        for (const dimension in point){
            
            if (!extremes[dimension]){
                extremes[dimension] = {min: 1000, max:0} // changing those values
            }
            
            if (point[dimension] < extremes[dimension].min){
                extremes[dimension].min = point[dimension];
            }
            
            if (point[dimension] > extremes[dimension].max){
                extremes[dimension].max = point[dimension];
            }
            
           
        }
    }
        

        console.log(extremes)
        return extremes; // {min: 1, max: 10} {min:1, max:1}
        
    }
    
    
    
    initMeans(k = 3){
        // init means
        
        while(k--){
            const mean = [];
            
            for (const dimension in this.dataExtremes){
                mean[dimension] = this.dataExtremes[dimension].min + (Math.random() * this.range[dimension]);
            }
            
            this.means.push(mean);
        }
        console.log(this.means);
        return this.means; // 3 array, each has 2 numbers in it (random)
    }
    
    
    // Really understand!!!
    
/*------------------------------------------------------ASSIGN POINTS------------------------------------------------------
1) calculate distance between each point and the cluster center
2) assign all data points to the centroid closest to it
*/

    assignPoints(){
        
    for (const i in data){
        const point = data[i];
        const distances = [];
        
        for (const j in this.means){
            const mean = this.means[j];
            let sum = 0;
            
            for (const dimension in point){
                let diff = point[dimension] - mean[dimension];
                diff *= diff;
                sum += diff;
            }
            
            distances[j] = Math.sqrt(sum);
        }
        
        this.assignments[i] = distances.indexOf(Math.min.apply(null, distances));
        console.log(this.assignments[i]); // 0s 1s 2s
        
    }

    }
    
/* MOVE MEANS
move centroids
*/ 
    moveMeans(){
    // move means    
    }
    
    
    draw(){
       // draw 
    }
    
    run(){
        
    }
    
      
}

    
    
const data = [
    [1, 2],
    [2, 1],
    [2, 4], 
    [1, 3],
    [2, 2],
    [3, 1],
    [1, 1],

    [7, 3],
    [8, 2],
    [6, 4],
    [7, 4],
    [8, 1],
    [9, 2],

    [10, 8],
    [9, 10],
    [7, 8],
    [7, 9],
    [8, 11],
    [9, 9],
];
    
    

let el = new KMeans(data, "canvas");
el.make();
// ranges wont work here
// <canvas width="400" height="400"></canvas>
   
