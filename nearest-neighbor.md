## Nearest neighbour

```js
/*
 * Expected keys in object:
 * rooms, area, type
 */
class Node {
    constructor(object) {
        for (const key in object)
        {
            this[key] = object[key];
        }
    }

    measureDistances(area_range_obj, rooms_range_obj) {
        const rooms_range = rooms_range_obj.max - rooms_range_obj.min;
        const area_range  = area_range_obj.max  - area_range_obj.min;

        for (const i in this.neighbors)
        {
            /* Just shortcut syntax */
            const neighbor = this.neighbors[i];

            let delta_rooms = neighbor.rooms - this.rooms;
            delta_rooms = (delta_rooms ) / rooms_range;

            let delta_area  = neighbor.area  - this.area;
            delta_area = (delta_area ) / area_range;

            neighbor.distance = Math.sqrt( delta_rooms*delta_rooms + delta_area*delta_area );
        }
    }

    sortByDistance() {
        this.neighbors.sort((a, b) => a.distance - b.distance);
    }

    guessType(k) {
        const types = {};

        for (const i in this.neighbors.slice(0, k))
        {
            const neighbor = this.neighbors[i];

            if ( ! types[neighbor.type] )
            {
                types[neighbor.type] = 0;
            }

            types[neighbor.type] += 1;
        }

        const guess = {type: false, count: 0};
        for (const type in types)
        {
            if (types[type] > guess.count)
            {
                guess.type = type;
                guess.count = types[type];
            }
        }

        this.guess = guess;

        return types;
    }
}

class NodeList {
    constructor(k) {
        this.nodes = [];
        this.k = k;
    }

    add(node) {
        this.nodes.push(node);
    }

    determineUnknown() {

        this.calculateRanges();

        /*
         * Loop through our nodes and look for unknown types.
         */
        for (const i in this.nodes)
        {

            if ( ! this.nodes[i].type)
            {
                /*
                 * If the node is an unknown type, clone the nodes list and then measure distances.
                 */
                
                /* Clone nodes */
                this.nodes[i].neighbors = [];
                for (const j in this.nodes)
                {
                    if ( ! this.nodes[j].type)
                        continue;
                    this.nodes[i].neighbors.push( new Node(this.nodes[j]) );
                }

                /* Measure distances */
                this.nodes[i].measureDistances(this.areas, this.rooms);

                /* Sort by distance */
                this.nodes[i].sortByDistance();

                /* Guess type */
                console.log(this.nodes[i].guessType(this.k));

            }
        }
    }

    calculateRanges() {
        this.areas = {min: 1000000, max: 0};
        this.rooms = {min: 1000000, max: 0};
        for (const i in this.nodes)
        {
            if (this.nodes[i].rooms < this.rooms.min)
            {
                this.rooms.min = this.nodes[i].rooms;
            }

            if (this.nodes[i].rooms > this.rooms.max)
            {
                this.rooms.max = this.nodes[i].rooms;
            }

            if (this.nodes[i].area < this.areas.min)
            {
                this.areas.min = this.nodes[i].area;
            }

            if (this.nodes[i].area > this.areas.max)
            {
                this.areas.max = this.nodes[i].area;
            }
        }

    }

    draw(canvas_id) {
        const rooms_range = this.rooms.max - this.rooms.min;
        const areas_range = this.areas.max - this.areas.min;

        const canvas = document.getElementById(canvas_id);
        const ctx = canvas.getContext("2d");
        const width = 400;
        const height = 400;
        ctx.clearRect(0,0,width, height);

        for (const i in this.nodes)
        {
            ctx.save();

            switch (this.nodes[i].type)
            {
                case 'apartment':
                    ctx.fillStyle = 'red';
                    break;
                case 'house':
                    ctx.fillStyle = 'green';
                    break;
                case 'flat':
                    ctx.fillStyle = 'blue';
                    break;
                default:
                    ctx.fillStyle = '#666666';
            }

            const padding = 40;
            const x_shift_pct = (width  - padding) / width;
            const y_shift_pct = (height - padding) / height;

            const x = (this.nodes[i].rooms - this.rooms.min) * (width  / rooms_range) * x_shift_pct + (padding / 2);
            let y = (this.nodes[i].area  - this.areas.min) * (height / areas_range) * y_shift_pct + (padding / 2);
            y = Math.abs(y - height);


            ctx.translate(x, y);
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, Math.PI*2, true);
            ctx.fill();
            ctx.closePath();
            

            /* 
             * Is this an unknown node? If so, draw the radius of influence
             */

            if ( ! this.nodes[i].type )
            {
                switch (this.nodes[i].guess.type)
                {
                    case 'apartment':
                        ctx.strokeStyle = 'red';
                        break;
                    case 'house':
                        ctx.strokeStyle = 'green';
                        break;
                    case 'flat':
                        ctx.strokeStyle = 'blue';
                        break;
                    default:
                        ctx.strokeStyle = '#666666';
                }

                let radius = this.nodes[i].neighbors[this.k - 1].distance * width;
                radius *= x_shift_pct;
                ctx.beginPath();
                ctx.arc(0, 0, radius, 0, Math.PI*2, true);
                ctx.stroke();
                ctx.closePath();

            }

            ctx.restore();

        }

    }
}



let nodes;

const data = [
    {rooms: 1, area: 350, type: 'apartment'},
    {rooms: 2, area: 300, type: 'apartment'},
    {rooms: 3, area: 300, type: 'apartment'},
    {rooms: 4, area: 250, type: 'apartment'},
    {rooms: 4, area: 500, type: 'apartment'},
    {rooms: 4, area: 400, type: 'apartment'},
    {rooms: 5, area: 450, type: 'apartment'},

    {rooms: 7,  area: 850,  type: 'house'},
    {rooms: 7,  area: 900,  type: 'house'},
    {rooms: 7,  area: 1200, type: 'house'},
    {rooms: 8,  area: 1500, type: 'house'},
    {rooms: 9,  area: 1300, type: 'house'},
    {rooms: 8,  area: 1240, type: 'house'},
    {rooms: 10, area: 1700, type: 'house'},
    {rooms: 9,  area: 1000, type: 'house'},

    {rooms: 1, area: 800,  type: 'flat'},
    {rooms: 3, area: 900,  type: 'flat'},
    {rooms: 2, area: 700,  type: 'flat'},
    {rooms: 1, area: 900,  type: 'flat'},
    {rooms: 2, area: 1150, type: 'flat'},
    {rooms: 1, area: 1000, type: 'flat'},
    {rooms: 2, area: 1200, type: 'flat'},
    {rooms: 1, area: 1300, type: 'flat'},
];




const run = () => {

    nodes = new NodeList(3);
    for (const i in data)
    {
        nodes.add( new Node(data[i]) );
    }
    const random_rooms = Math.round( Math.random() * 10 );
    const random_area = Math.round( Math.random() * 2000 );
    nodes.add( new Node({rooms: random_rooms, area: random_area, type: false}) );

    nodes.determineUnknown();
    nodes.draw("canvas");
};


setInterval(run, 5000);
run();

// http://burakkanber.com/blog/machine-learning-in-js-k-nearest-neighbor-part-1/


```



```html

<canvas height="400" id="canvas" width="400"></canvas>
	<style>
	       canvas{
	           border: 2px solid black;
	       }
	</style>

	<script src="revise.js">
	</script>


```

# edit finish
```js

class Node {
    constructor(object){
        for (const key in object){
            this[key] = object[key];
        }
    }
    
    
    measure(areaRange, roomsRange){
        const RR = roomsRange.max - roomsRange.min;
        const AR = areaRange.max - areaRange.min;
        
        for (const i in this.neighbors){
            const n = this.neighbors[i];
            
            let dr = n.rooms - this.rooms;
            dr = dr / RR;
            
            let da = n.area - this.area;
            da = da / AR;
            
            n.distance = Math.sqrt(dr * dr + da * da);
        }
    }
    
    
    sorta(){
        this.neighbors.sort((a, b) => a.distance - b.distance);
    }
    
    
    guessType(k){
        const types = {};
        
        for (const i in this.neighbors.slice(0, k)){
            const nr = this.n[i];
            
            if (! types[nr.type]){
                types[n.type] = 0;
            }
             types[n.type] += 1;
        }
        
        const guess = {type: false, count: 0};
   
for (const type in types){
    if (types[type] > guess.count){
        guess.type = type;
        guess.count = types[type];
    }
    }

this.guess = guess;
return types;
    }
 }


    
/*------------------------------------------------------------
 1 - loop through nodes and check for unknown types
 2 - if there is unknown type, clone the node list and then measure distances
 - and clone nodes
 3 - measure distances
 4 - sort by distance
 5 - guess type
 
*/
    
class NodeList {
    
    constructor(k){
        this.nodes = [];
        this.k = k;
    }
    
    add(node){
        this.nodes.push(node);
    }
    
    determineUnknown(){
        this.calculate();
        
       // 1
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        for (const i in this.nodes)
        {
            if(! this.nodes[i].type)
            {
                
                
                
                
                
                
            // 2
            this.nodes[i].neighbors = [];
            
                for (const j in this.nodes)
                {
                    if (! this.nodes[j].type)
                    {
                        continue;
                        } else{
                          this.nodes[i].neighbors.push(new Node(this.nodes[j]));   
                        }
                       
                    
                    
                     }
                    
                    // 3
                    this.nodes[i].measure(this.areas, this.rooms);
                    // 4
                    this.nodes[i].sorta();
                    // 5
                    console.log(this.nodes[i].guessType(this.k));
                    
               
            }
        }
    }
    
    
    calculate(){
        this.areas = {min: 1000000, max: 0};
        this.rooms = {min: 1000000, max: 0};
        
        for (const i in this.nodes){
              if (this.nodes[i].rooms < this.rooms.min)
            {
                this.rooms.min = this.nodes[i].rooms;
            }

            if (this.nodes[i].rooms > this.rooms.max)
            {
                this.rooms.max = this.nodes[i].rooms;
            }

            if (this.nodes[i].area < this.areas.min)
            {
                this.areas.min = this.nodes[i].area;
            }

            if (this.nodes[i].area > this.areas.max)
            {
                this.areas.max = this.nodes[i].area;
            }
        }
    }
    
    
    
    
    draw(el){

        const rr = this.rooms.max - this.rooms.min;
        const ar = this.areas.max - this.areas.min;
        
        const canvas = document.querySelector(el);
        const ctx = canvas.getContext("2d");
        const w = 400;
        const h = 400;
        ctx.clearRect(0,0,w, h);
        
        for (const i in this.nodes){
                    console.log(this.nodes[i].neighbors);
            ctx.save();
            
            switch (this.nodes[i].type){
                case "apartment":
                    ctx.fillStyle = "red";
                    break;
                case "house": 
                    ctx.fillStyle = "green";
                    break;
                case "flat":
                    ctx.fillStyle = "blue";
                    break;
                default: 
                    ctx.fillStyle = "#666666";
            }
            
            const padding = 40;
            const xShift = (w - padding) / w;
            const yShift = (h - padding) / h;
            
            const x = (this.nodes[i].rooms - this.rooms.min) * (w / rr);
            let y = (this.nodes[i].area - this.areas.min) * (h / ar);
            y = Math.abs(y - h);
            
            ctx.translate(x, y);
            ctx.beginPath();
            ctx.arc(0,0,5,0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
            
            // if it is unknown node draw the radius of influence
        
        
        if (! this.nodes[i].type){
            switch(this.nodes[i].guess.type){
                 case "apartment":
                    ctx.strokeStyle = "red";
                    break;
                case "house": 
                    ctx.strokeStyle = "green";
                    break;
                case "flat":
                    ctx.strokeStyle = "blue";
                    break;
                default: 
                    ctx.strokeStyle = "#666666";
                
            }
            
            let radius = this.nodes[i].neighbors[this.k - 1].distance * w;
            
            radius *= xShift;
            ctx.beginPath();
            ctx.arc(0,0,radius, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.closePath();
        }
        ctx.restore();
    }
    
}
    
}

let nodes;

const data = [
    {rooms: 1, area: 350, type: 'apartment'},
    {rooms: 2, area: 300, type: 'apartment'},
    {rooms: 3, area: 300, type: 'apartment'},
    {rooms: 4, area: 250, type: 'apartment'},
    {rooms: 4, area: 500, type: 'apartment'},
    {rooms: 4, area: 400, type: 'apartment'},
    {rooms: 5, area: 450, type: 'apartment'},

    {rooms: 7,  area: 850,  type: 'house'},
    {rooms: 7,  area: 900,  type: 'house'},
    {rooms: 7,  area: 1200, type: 'house'},
    {rooms: 8,  area: 1500, type: 'house'},
    {rooms: 9,  area: 1300, type: 'house'},
    {rooms: 8,  area: 1240, type: 'house'},
    {rooms: 10, area: 1700, type: 'house'},
    {rooms: 9,  area: 1000, type: 'house'},

    {rooms: 1, area: 800,  type: 'flat'},
    {rooms: 3, area: 900,  type: 'flat'},
    {rooms: 2, area: 700,  type: 'flat'},
    {rooms: 1, area: 900,  type: 'flat'},
    {rooms: 2, area: 1150, type: 'flat'},
    {rooms: 1, area: 1000, type: 'flat'},
    {rooms: 2, area: 1200, type: 'flat'},
    {rooms: 1, area: 1300, type: 'flat'},
];



const run = () => {

    nodes = new NodeList(3);
    for (const i in data)
    {
        nodes.add( new Node(data[i]) );
    }
    const random_rooms = Math.round( Math.random() * 10 );
    const random_area = Math.round( Math.random() * 2000 );
    nodes.add( new Node({rooms: random_rooms, area: random_area, type: false}) );

    nodes.determineUnknown();
    nodes.draw("canvas");
};


// setInterval(run, 5000);
run();

     

// http://burakkanber.com/blog/machine-learning-in-js-k-nearest-neighbor-part-1/
     
     
     
     
     
     
     
```
