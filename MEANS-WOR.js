class KMeans {
	constructor(data, selector) {
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
	make() {
		this.element = document.querySelector(this.selector);
		this.element.ctx = this.element.getContext("2d");
		this.dataExtremes = this.getDataExtremes(this.data);

		this.range = this.getDataRanges(this.dataExtremes); // get ranges from extremes 
		this.means = this.initMeans(3);
		this.assignPoints();
		this.draw();

        
		this.run = this.run.bind(this);
		setTimeout(this.run, 2000);


	}

    getDataRanges(extremes){
     const ranges = [];

    for (const dimension in extremes){
        ranges[dimension] = extremes[dimension].max - extremes[dimension].min;
    }
    return ranges;  // [9, 10]
    }
    
    
    
    getDataExtremes(points){
        const extremes = [];

        let data = this.data;
        
    for (const i in data)
    {
        // 1
        const point = data[i];

        // 2
        for (const dimension in point)
        {
            if ( ! extremes[dimension] ){
                extremes[dimension] = {min: 1000, max: 0};
            }

            // 3
            if (point[dimension] < extremes[dimension].min){
                extremes[dimension].min = point[dimension];
            }

            if (point[dimension] > extremes[dimension].max){
                extremes[dimension].max = point[dimension];
            }
        }
    }
console.log(extremes);
    return extremes;
    }
    
    initMeans(k = 3){
         // 1
    while (k--) {
        const mean = [];

        for (const dimension in this.dataExtremes){
            mean[dimension] = this.dataExtremes[dimension].min + ( Math.random() * this.range[dimension] );
        }

        this.means.push(mean);
    }
   // console.log(this.means);
    return this.means; 
    }
    
    
    
    assignPoints(){
        let data = this.data;
        let means = this.means;
        let assignments = this.assignments;
        
    for (const i in data)
    {
        const point = data[i];
        const distances = [];

        for (const j in means)
        {
            const mean = means[j];
            let sum = 0;

            for (const dimension in point)
            {
                let difference = point[dimension] - mean[dimension];
                difference *= difference;
                sum += difference;
            }

            distances[j] = Math.sqrt(sum);
        }

        assignments[i] = distances.indexOf( Math.min.apply(null, distances) );
        
          console.log(assignments[i]); // 13 x 2 16 x 1
        //console.log("---------------------------")
    }
    
    }
    
    moveMeans(){
         this.assignPoints();

        
    let ms = this.means;
        
    const sums = Array( ms.length );
    const counts = Array( ms.length );
    let moved = false;

    for (const j in ms){
        counts[j] = 0;
        sums[j] = Array( ms[j].length );
        for (var dimension in ms[j]) {
            sums[j][dimension] = 0;
        }
    }

    
    for (const pointIndex in this.assignments){
        var meanIndex = this.assignments[pointIndex];
        const point = data[pointIndex];
        const mean = ms[meanIndex];

        counts[meanIndex]++;

        for (var dimension in mean){
            sums[meanIndex][dimension] += point[dimension];
        }
    }

    
//-------------------------------------------3rd loop
    for (var meanIndex in sums) {
        //console.log(counts[meanIndex]);
        
        if ( 0 === counts[meanIndex] ) {
            sums[meanIndex] = ms[meanIndex];
            //console.log("Mean with no points");
           // console.log(sums[meanIndex]);

            for (var dimension in this.dataExtremes) {
                sums[meanIndex][dimension] = this.dataExtremes[dimension].min + ( Math.random() * this.range[dimension] );
            }
            continue;
        }

        for (var dimension in sums[meanIndex]){
            sums[meanIndex][dimension] /= counts[meanIndex];
        }
    } // FOR meanIndex end

    if (this.means.toString() !== sums.toString()){
        moved = true;
    }

    this.means = sums;
    console.log(moved);
    return moved;
    }
    
    run(){
        const moved = this.moveMeans();
    this.draw();
    moved ? setTimeout(this.run, 2000) :0;
    }
    
    draw(){
     // moved 2 times false once true   
    // works :D
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

// <canvas width="400" height="400"></canvas>
