const sigmoid = x => 1 / (1 + Math.exp(-x));

class N {
 constructor(ni) {
     this.weights = [];
     this.weights.length = ni;
     this.weights.fill(Math.random() - .5);
 }
    
forward(inputs){
    this.inputs = inputs;
    this.sum = 0;
    this.weights.forEach((el, index) => this.sum += this.weights[index] * this.inputs[index])
    return sigmoid(this.sum);
}
    
backward(error){
    this.error = error;
    return this.weights.map(w => w * error).slice(1); //.slice 1 ?
}
    
update(){
 const deltas = this.inputs.map(input => input * sigmoid(this.sum) * (1 - sigmoid(this.sum)) * this.error * .5);
 let sum = 0;
 this.weights.forEach((el, index) => sum += this.weights[index] - deltas[index]);
}
}
    
    
    
class Layer{
    constructor(len, inputs){
        this.neurons = [];
        this.neurons.length = len;
        this.neurons.fill(new N(inputs)); 
    }
    
    forward(inputs){
       return this.neurons.map(n => n.forward(inputs)); 
    }
    
    backward(errors){
       return this.neurons.map((n, i) => n.backward(errors[i]).reduce((a, b) => a + b));
    }
    
    update(){
        this.neurons.forEach(n => n.update());
    }
}

    
    
class Network {
    constructor(){
        
        
        const sizes = [...arguments];
        this.layers = [];
         // don't loop over last member of sizes [2, 3, 1], create layer using sizes args and push it to "layers"  
    /*  
    for (let i = 0; i < sizes.length-1; i++) {
      const layer = new Layer(sizes[i+1], sizes[i]+1); // (2) [Layer, Layer] -> Layer {neurons: Array(3)} and ...(1)
      this.layers.push(layer);
    }*/
        
    const helper = [];
    helper.length = sizes.length - 1;
    helper.forEach((val, index) => {
        const layer = new Layer(sizes[index + 1], sizes[index] + 1);
        this.layers.push(layer);
    })
        
    console.log(this.layers)
    }
    
    forward(inputs){
         return this.layers.reduce((inp, lr) => lr.forward([1].concat(inp)), inputs); 
    }
    
    backward(errors){
        this.layers.reverse().forEach((el, index) => this.layers[index].backward(errors));
        this.layers.reverse();
    }
    
    update(){
        this.layers.forEach(l => l.update);
    }

    
    learn(data){
        let filled = [];
        
        for (let it = 0; it < 40000; it++){
            
            
            // my learning algorithm, delta ?
             const i = Math.floor(Math.random() * data.length);
            
            const input = data[i].input;
            const output = data[i].output;
            
            const res = this.forward(input);  
            
           let error = 0;
            res.forEach((el, index) => error += res[index] - output[index]);  
           
            this.backward(error);
            this.update();
        }
        
        data.forEach((val, i) => {
            const input = data[i].input;
            const output = this.forward(input)
            const n = Number(output)
            filled.push(n);
        });
        return filled;
    }
    
}

    

let data = [
    {input: [0, 0],
    output: [0]},
    {input: [1, 0],
    output: [1]}
];
    
    

    
    
let net = new Network(2, 3, 1); // input, hidden, output
let res = net.learn(data);
console.log(res);

