


## Linear regression

```js

class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
    
    
class LR{
    constructor(selector){
        this.selector = selector;
        this.el = null;
        this.points = [];
    }
    
   init(){
             
       this.el = document.querySelector(this.selector);
       this.ctx = this.el.getContext("2d");
      
       this.el.addEventListener("click", e => {
       let x = e.clientX - this.el.offsetLeft; // top left corner.... coord are [0, 0]
       let y = e.clientY - this.el.offsetTop;
       this.points.push(new Point(x, y));
       this.draw();
       });
    
   }
    

    draw(){
    let ctx = this.ctx, points = this.points;
        
    ctx.clearRect(0,0, this.el.width, this.el.height);
    ctx.fillStyle = "#3498db";
    points.forEach((el, i) => {
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, 2, 0, 2 * Math.PI);
        ctx.fill();
    });
        
    let f = this.linreg(points);
    ctx.strokeStyle = "#1abc9c";
    ctx.beginPath();
    ctx.moveTo(0, f.b);
    ctx.lineTo(this.el.width - 1, f.a * (this.el.width - 1 ) + f.b);
    ctx.stroke(); 
    // console.log(`y = ${f.a.toPrecision(3)} x: ${f.a.toPrecision(3)}`)
    }
    
    linreg(points){
       
        
        if (points.length == 0){
            return {a: 0, b:0}
        }
        
        let gradient = null;
        let yIntercept = null;
        
        let sumX = 0;
        let sumY = 0;
        
        points.forEach((val, i)=>{
            sumX += points[i].x;
            sumY += points[i].y;   
        });
        
        let meanX = sumX / points.length;
        let meanY = sumY / points.length;
        
        let numerator = 0;
        let denominator = 0; // ??
        
        points.forEach((val, i) => {
        numerator   += (points[i].x - meanX) * (points[i].y - meanY);
        denominator += (points[i].x - meanX) * (points[i].x - meanX);
        });
        
        if (denominator == 0) {return {a:0, b:0}}
        gradient = numerator / denominator;
        yIntercept = meanY - gradient * meanX;
        return {a: gradient, b:yIntercept}
    }
    
    // add another y = mx + b
    
    }

    
    let el = new LR("canvas");
    el.init();
    
    // https://codepen.io/kriswik/pen/xdeJYo
    // https://jsfiddle.net/7z48o33f/1/
    // <canvas width="800" height = "800"></canvas>

```
