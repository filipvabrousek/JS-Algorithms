
function Perceptron(opts) {
  opts = {}

  
    const weights = [];
    const treshold = 1;
    let learningrate = 0.1;
    const debug = false;
    const threshold = 1;
    const data = [];
    

    
  const api = {
    weights,
   
    retrain() {
      let success = true;
        
    data.forEach(a => {
        const training = data.shift();
        success = api.train(training.input, training.target) && success
        });
      return success
    },
      
      
    train(inputs, expected) {
     while (weights.length < inputs.length) {
        weights.push(Math.random())
      }
  
      // add a bias weight for the threshold
      if (weights.length == inputs.length) {
        weights.push(1);
      }

      const result = api.perceive(inputs);
      data.push({input: inputs, target: expected, prev: result})


      if (result == expected) {
        return true
      } else {
        this.weights.forEach((el, index) => {
            const input = (index == inputs.length) ? treshold : inputs[index];
            api.adjust(result, expected, input, index)
        });
          
        return false
      }
    },

    adjust(result, expected, input, index) {
      const d = api.delta(result, expected, input, learningrate);
      weights[index] += d;
    },

    delta(actual, expected, input, learnrate) {
      return (expected - actual) * learnrate * input
    },

    perceive(inputs, net, activationFunc) {
      let result = 0;
        
    inputs.forEach((el, index) => result += inputs[index] * weights[index]);
      result += threshold * weights[weights.length - 1]; 
        return this.sigmoid(result) // determine if neuron fires
    },
    
    sigmoid(t) {
        return 1 / (1 + Math.exp(-t));
    },
    
    
  };

  return api;
}


const p = new Perceptron();
p.train([0, 0], 0);
p.train([0, 1], 1);


// practice makes perfect (we hope...)
var i = 0;
while(i++ < 10000 && !p.retrain()) {}
console.log(p.perceive([0, 0]));
console.log(p.perceive([0, 1]));


