
# Perceptron

* the perceptron is an algorithm for supervised learning of binary classifiers 

```js
class Perceptron {
    constructor(weights, bias) {
        this.weights = weights;
        this.threshold = bias * -1;
    }

    run(inputs) {
        let sum = 0.0;
        for (let a = 0; a < inputs.length; a++) {
            sum += inputs[a] * this.weights[a];
        }
        if (sum <= this.threshold) {
            return 0;
        } else {
            return 1;
        }
    }
}



const a = new Perceptron([-2, -2], 3);

a.run([0, 0]); // 1
a.run([0, 1]); // 1
a.run([1, 0]); // 1
a.run([1, 1]); // 0

// https://gist.github.com/jonathanmarvens/dcf1975b34ef0d596a93
```

