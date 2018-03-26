
class Perceptron{
    constructor(){
        this.weights = [];
        this.data = [];
    }
    

    train(inputs, expected){ // [0, 1] 1
       	
        while (this.weights.length < inputs.length) { // runs just 2 times, during 1st call
			this.weights.push(Math.random()) // fill weights with 2 random weights
		}

        /* push 1 at the end of array (bias) , runs as 2nd, just ONCE
        weights = [0.7852802128420682, 0.30835232927779943, 1] */
        if (this.weights.length == inputs.length) { //
			this.weights.push(1);
		}
        
        const res = this.calc(inputs); // sum += inputs * corresponding weights -> sigmoid
        this.data.push({input: inputs, target: expected});
        
        this.weights.forEach((el, i) => {
            const input = (i == inputs.length) ? 1 : inputs[i]; 
            let diff = (expected - res) * input * 0.1; // 1 - result from sigmoid * 1 or 0 * 0.1
            this.weights[i] += diff; // we add diff to weights, because we want the different result in "calc()"
        });
    }
    

   calc(inputs){
       let res = 0;
       inputs.forEach((el, i) => res += inputs[i] * this.weights[i]);
       res += this.weights[this.weights.length - 1]; // bias (different each time) (0.9 .... -3.4) decreases
       return this.sigmoid(res);
   }
    
    retrain(){
        this.data.forEach(a => {
            const training = this.data.shift();
            this.train(training.input, training.target);
        });
    }
    
    learn(){ // call retrain 10000 times to change weights
    for (let i = 0; i < 1000; i++){ 
    this.retrain();
    }
    }
    
    sigmoid(x){
        return 1 / (1 + Math.exp(-x));
    }
}


let p = new Perceptron();
p.train([0, 0], 0);
p.train([0, 1], 1);
p.learn();  // call this.retrain 10000 times

    
let small = p.calc([0, 0]);
let big = p.calc([0, 1]); 
console.log(small, big);
