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
        
        this.range = this.getDataRanges(this.dataExtremes); // get ranges from above 
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
        }

        return ranges; // we should see 9, 10
    }
    
    
    
    // pass in data, get ranges
    getDataExtremes(points){
      const extremes = [];
        
    for (const i in this.data){
        const point = data[i];
        
        // dimension = [x, y] 
        for (const dimension in point){
            
            if (!extremes[dimension]){
                extremes[dimension] = {min: 1000, max:0}
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
        return extremes;
        
    }
    
    
    
    initMeans(k = 3){
        // init means
    }
    
    assignPoints(){
        // assign points
    }
    
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
