class Perceptron{
    constructor(){
        this.weights = [];
        this.data = [];   
    }
    
    fill(){
        this.weights.length = 2; // 2
        this.weights.fill(Math.random());
        
        if (this.weights.length == 2){
            this.weights.push(1);
        }
    }
    
    train(inputs, expected){
     
        const res = this.calc(inputs);
        this.data.push({input: inputs, target: expected});
        
        this.weights.forEach((el, i) =>{
            const input = (i == inputs.length) ? 1 : inputs[i]; 
            let diff = expected - res;
            this.weights[i] += diff * input * 0.1;
        });
        
    }
    
    calc(inputs){
    let res = 0;
    inputs.forEach((el, i) => res += this.weights[i] * inputs[i]);
    res += this.weights[this.weights.length - 1]; // bias, different each time
    return this.sigmoid(res);
    }
    
    
    retrain(){
        this.data.forEach(a => {
            const training = this.data.shift();
            this.train(training.input, training.target);
        });
    }
    
    learn(){
        for (let i = 0; i < 1000; i++){
            this.retrain();
        }
    }
    
    sigmoid(x){
        return 1 / (1 + Math.exp(-x));
    }
}

let p = new Perceptron();
p.fill();
p.train([0, 0], 0);
p.train([0, 1], 1);
p.learn();
    
let small = p.calc([0, 0]);
let big = p.calc([0, 1]);
console.log(small,big);
