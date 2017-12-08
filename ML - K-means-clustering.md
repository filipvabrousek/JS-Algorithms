# K means clustering
* you have to initalize 3 points: cluster centroids 
* because we want to group data int 3 clusters
1) cluster assignment - algorithm goes through each of the data points and depending on which cluster is closer (k)
2) move centroid - moving centroid to the average data point in cluster

* (repeated, until there's no change in the cluster)
* https://burakkanber.com/blog/machine-learning-k-means-clustering-in-javascript-part-1/


```js
let canvas; 
let ctx;
const height = 400;
const width = 400;
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

let means = [];
const assignments = [];
let dataExtremes;
let dataRange;
const drawDelay = 2000;









/*------------------------------------------------------SETUP------------------------------------------------------*/
function setup() {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');

    dataExtremes = getDataExtremes(data);
    dataRange = getDataRanges(dataExtremes);
    means = initMeans(3);

    makeAssignments();
    draw();

    setTimeout(run, drawDelay);
}



/*------------------------------------------------------GET DATA RANGES------------------------------------------------------
just helper method, get ranges of each dimension
X ranges from 1 to 11
Y ranges from 3 to 7
*/
function getDataRanges(extremes) {
    const ranges = [];

    for (const dimension in extremes){
        ranges[dimension] = extremes[dimension].max - extremes[dimension].min;
    }
    return ranges;
}




/*------------------------------------------------------GET DATA EXTREMES------------------------------------------------------
loop through all the points, and each dimension in the point 
1) loop through "data" array defined above and get point
2) loop through points and get extreme data points (min and max)

*/

function getDataExtremes(points) {
    
    const extremes = [];

    for (const i in data)
    {
        // 1
        const point = data[i];

        // 2
        for (const dimension in point)
        {
            if ( ! extremes[dimension] )
            {
                extremes[dimension] = {min: 1000, max: 0};
            }

            if (point[dimension] < extremes[dimension].min)
            {
                extremes[dimension].min = point[dimension];
            }

            if (point[dimension] > extremes[dimension].max)
            {
                extremes[dimension].max = point[dimension];
            }
        }
    }

    return extremes;
}








/*------------------------------------------------------INIT MEANS------------------------------------------------------
Initalize K random clusters
1) moving centroids to the position closest to it
then move centroid to the average position of all data points assigned to it
repeat until centtroids stop moving
decrease k and fill in MEAN array with dimensions (we get it from dataExtremes array)
*/
function initMeans(k = 3) {

    /*/
    if (!k){
        k = 3;
    }
    */

    // 1
    while (k--) {
        const mean = [];

        for (const dimension in dataExtremes){
            mean[dimension] = dataExtremes[dimension].min + ( Math.random() * dataRange[dimension] );
        }

        means.push(mean);
    }

    return means;
};








/*------------------------------------------------------MAKE ASSIGNMENTS------------------------------------------------------
called by "loop" function and calculate Euclidean distance between each point and cluster center
*/
function makeAssignments() {

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
    }

}







/*------------------------------------------------------MOVE MEANS------------------------------------------------------
moving centroids to the position closest to it
*/
function moveMeans() {

    makeAssignments();

    const sums = Array( means.length );
    const counts = Array( means.length );
    let moved = false;

    for (const j in means)
    {
        counts[j] = 0;
        sums[j] = Array( means[j].length );
        for (var dimension in means[j])
        {
            sums[j][dimension] = 0;
        }
    }

    for (const point_index in assignments)
    {
        var mean_index = assignments[point_index];
        const point = data[point_index];
        const mean = means[mean_index];

        counts[mean_index]++;

        for (var dimension in mean)
        {
            sums[mean_index][dimension] += point[dimension];
        }
    }

    for (var mean_index in sums)
    {
        console.log(counts[mean_index]);
        if ( 0 === counts[mean_index] ) 
        {
            sums[mean_index] = means[mean_index];
            console.log("Mean with no points");
            console.log(sums[mean_index]);

            for (var dimension in dataExtremes)
            {
                sums[mean_index][dimension] = dataExtremes[dimension].min + ( Math.random() * dataRange[dimension] );
            }
            continue;
        }

        for (var dimension in sums[mean_index])
        {
            sums[mean_index][dimension] /= counts[mean_index];
        }
    }

    if (means.toString() !== sums.toString())
    {
        moved = true;
    }

    means = sums;

    return moved;

}






function run() {

    const moved = moveMeans();
    draw();

    if (moved)
    {
        setTimeout(run, drawDelay);
    }

}











function draw() {

    ctx.clearRect(0,0,width, height);
    ctx.globalAlpha = 0.3;
   
    
    for (const point_index in assignments)
    {
        const mean_index = assignments[point_index];
        var point = data[point_index];
        const mean = means[mean_index];

        ctx.save();

        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(
            (point[0] - dataExtremes[0].min + 1) * (width / (dataRange[0] + 2) ),
            (point[1] - dataExtremes[1].min + 1) * (height / (dataRange[1] + 2) )
        );
        ctx.lineTo(
            (mean[0] - dataExtremes[0].min + 1) * (width / (dataRange[0] + 2) ),
            (mean[1] - dataExtremes[1].min + 1) * (height / (dataRange[1] + 2) )
        );
        ctx.stroke();
        ctx.closePath();
    
        ctx.restore();
    }
    ctx.globalAlpha = 1;

    for (var i in data)
    {
        ctx.save();

        var point = data[i];

        var x = (point[0] - dataExtremes[0].min + 1) * (width / (dataRange[0] + 2) );
        var y = (point[1] - dataExtremes[1].min + 1) * (height / (dataRange[1] + 2) );

        ctx.strokeStyle = '#333333';
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI*2, true);
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }

    for (var i in means)
    {
        ctx.save();

        var point = means[i];

        var x = (point[0] - dataExtremes[0].min + 1) * (width / (dataRange[0] + 2) );
        var y = (point[1] - dataExtremes[1].min + 1) * (height / (dataRange[1] + 2) );

        ctx.fillStyle = 'green';
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI*2, true);
        ctx.fill();
        ctx.closePath();

        ctx.restore();

    }

}

setup();

    /*
    <canvas id="canvas" height="400" width="400"></canvas>



<style>
        canvas {
            margin: 1em;
            border: 1px solid black;
           
        }
</style>
    */
```
