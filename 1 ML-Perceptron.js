class Perceptron {
    constructor() {
        this.weights = [];
        this.arr = [];
    }

    fill() {
        this.weights.length = 2; // 2
        this.weights.fill(Math.random());

        if (this.weights.length == 2) {
            this.weights.push(1);
        }
    }

    train(data) { // [[0, 1], 1]
        const res = this.calc(data[0]); // inputs data 0 ... expected data 1
        this.arr.push(data)
        this.weights.forEach((el, i) => {
            const input = (i == data[0].length) ? 1 : data[0][i];
            let diff = data[1] - res;
            this.weights[i] += diff * input * 0.1;
        });

    }

    calc(inputs) {
        let res = 0;
        inputs.forEach((el, i) => res += this.weights[i] * inputs[i]);
        res += this.weights[this.weights.length - 1]; // bias, different each time
        return this.sigmoid(res);
    }


    retrain() {
        this.arr.forEach(e => this.train(this.arr.shift()));
    }

    learn() {
        for (let i = 0; i < 1000; i++) {
            this.retrain();
        }
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }
}


const p = new Perceptron();
p.fill();
p.train([[0, 1], 1]);
p.learn();

let res = p.calc([0, 1]);
console.log(res);
