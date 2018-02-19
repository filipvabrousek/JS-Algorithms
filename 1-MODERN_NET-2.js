// Means sqaured error
const mse = (errors) => errors.reduce((sum, i) => sum + i * i, 0) / errors.length;
const rand = () => Math.random() * 0.4 - 0.2; // random n between -0.2 to 0.2
const sum = arr => arr.reduce((prev, cur) => prev + cur, 0); // sum of els. of the array
const sigmoid = x => 1 / (1 + Math.exp(Math.E, x)); //  y = 1 / (1 + e^x); x is passed in


/*------------------------------------------------NEURON------------------------------------------------*/
class Neuron{
    constructor(ni){
        this.weights = []; // fuck new 
        this.weights.length = ni;
        this.bias = rand();
        this.weights.fill(rand()); // fill weights with random numbers 
    }
    
    process(inputs){
        this.lastInput = inputs;
        let sum = 0;
        sum += inputs.reduce((a, b) => a + b) + this.weights.reduce((a, b) => a + b); //s. of all weigh. * s. of all inps.
        sum += this.bias;
        return this.lo = sigmoid(sum); // last output
    }
}



/*------------------------------------------------LAYER------------------------------------------------*/
class Layer{
    constructor(nn, ni){ // nn - num. of neurons
        this.neurons = [];
        this.neurons.length = nn;
        this.neurons.fill(new Neuron(ni)); // fill array using "Neuron" class
    }
    
    process(inputs){
        return this.neurons.map(n => n.process(inputs)); // neuron ?
    }
}





/*------------------------------------------------LAYER------------------------------------------------*/
class Network{
    constructor(){
        this.layers = [];
    }
    
    process(inputs){ // calls "proccess" for each neuron and for each layer
        let outputs;
        this.layers.forEach(l => {
            outputs = l.process(inputs) // call procces for each N and for each Layer
            inputs = outputs
        });
        return outputs;
    }
    
    add(nn, ni){ // add layer
        if (ni == null){
            const prev = this.layers[this.layers.length - 1]; // get "ni" top array
            ni = prev.neurons.length; 
        }
        const layer = new Layer(nn, ni); //get number of inps and neurons, *new "Layer" and push it to "layers"
        this.layers.push(layer);
    }
    
    
    
    // data instead of examples
    train(data) {
        const top = this.layers[this.layers.length - 1]; // output layer (top layer)
        
        for (let it = 0; it < this.iters; it++){ // --------------------- KEEP TRACK OF THE NUMBER OF EACH ITERATION
          
            for (let e = 0; e < data.length; e++){ // ----------------------- GET DATA FROM ARR
                const inputs = data[e][0]; // 1st member of nested array (pattern)  train([ [zero, [0,0]] ...])
                const targets = data[e][1]; // 2nd member
                const outputs = this.process(inputs); // pass "pattern" into process f. -> in neurons proccess f.
            
                
               // --------------- COMPARE TARGETS WITH OUTPUTS, add props to n.
                    top.neurons.forEach((n, index) => {
                        n.error = targets[index] - outputs[index]; // get diff (2nd nested arr member - neurons guess - process)
                        n.errors = n.errors || []; // keep track of errors 
                        n.errors[e] = n.error;
                        n.delta = n.lo * (1 - n.lo) * n.error; // mistake ????
    
                    }); 
                   
                    // last layer won't be included 
                    for (let l = this.layers.length - 2; l >= 0; l--){ // -------------- GET EACH LAYER without first and last ???????
                        
                        for (let j = 0; j < this.layers[l].neurons.length; j++){ 
                            
                            let NJ = this.layers[l].neurons[j]; // -> Layer {neurons: Array(10)} .neurons[j] "Neuron {weights: Array(20)..
                            NJ.error = sum(this.layers[l + 1].neurons.map(n => n.weights[j] * n.delta)); // for 2nd layer for each n. weight * delta)
                            NJ.delta = NJ.lo * (1 - NJ.lo) * NJ.error; // update neuron delta
                            
                            let NI = this.layers[l + 1].neurons[l]; // -> Layer {neurons: Array(2)} .neurons[j] "Neuron {weights: Array(20)...
                            NI.weights.forEach((val, index) => NI.weights[index] += NI.lastInput[index] * NI.delta); 
                            NI.bias += this.learningRate * NI.delta; 
                       }
                    }   
                
                 const error = mse(top.neurons.reduce((errors, n) => errors.concat(n.errors), []));
                 (it % 10000 === 0) ? console.log({iteration: it, mse: error}) : 0;
                 if (error <= this.errorThreshold) {return}
                
    } 
        
    } // end of the biggest loop
}
                
}






   
    


// Stop training when mean squared error of all output neurons reach this threshold
Network.prototype.errorThreshold = 0.00001
// Number of iterations on each training
Network.prototype.iters = 50000 
// Rate at which the network learns in each iteration
Network.prototype.learningRate = 0.3

    
/*----------------------------------------------------------USAGE----------------------------------------------------------*/
const network = new Network();
network.add(10, 20) // Hidden layer, 10 neurons, 20 inputs (members of the array)
network.add(2)      // Output layer, 2 neurons


// Our character "images". Imagine `1`s as black pixels.
const zero = [
  0, 1, 1, 0,
  1, 0, 0, 1,
  1, 0, 0, 1,
  1, 0, 0, 1,
  0, 1, 1, 0
];

const one = [
  0, 0, 1, 0,
  0, 0, 1, 0,
  0, 0, 1, 0,
  0, 0, 1, 0,
  0, 0, 1, 0
];

const two = [
  0, 1, 1, 0,
  1, 0, 0, 1,
  0, 0, 1, 0,
  0, 1, 0, 0,
  1, 1, 1, 1
];

const three = [
  1, 1, 1, 1,
  0, 0, 0, 1,
  0, 1, 1, 1,
  0, 0, 0, 1,
  1, 1, 1, 1
];

network.train([
  // Training examples
  // inputs   outputs
  [  zero,    [0, 0]  ],
  [  one,     [0, 1]  ],
  [  two,     [1, 0]  ],
  [  three,   [1, 1]  ],
])



// Querying the network (recognized, even if pixels in left corners aren't zero)
const outputs = network.process([
  1, 1, 1, 1,
  1, 0, 0, 1,
  1, 0, 0, 1,
  1, 0, 0, 1,
  1, 1, 1, 0
]); // outputs === [~0, ~0]

// Convert the output to binary (base 2) and then to decimal (base 10).
const binary  = outputs.map(v => Math.round(v)).join("");
const decimal = parseInt(binary, 2);

console.log("Recognized", decimal, outputs);
    
// SOURCE:  https://github.com/greatcodeclub/neural/blob/master/lib/neural.js

/*
for (let w = 0; w < NI.weights.length; w++){
NI.weights[w] += this.learningRate * NI.lastInput[w] * NI.delta;
}*/
