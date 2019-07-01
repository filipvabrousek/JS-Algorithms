 // maps input between 0 and 1
    const S = (x) => 1 / (1 + Math.exp(-x));

    class Neuron {
        constructor() {
            this.weights = Array(2).fill(0).map(e => Math.random());
        }

        forward(inputs) {
            var sum = 0;
            this.weights.forEach((el, i) => sum += this.weights[i] * inputs[i]);
            return S(sum);
        }

        backward(error) {
            this.weights = this.weights.map(w => w * error);
        }
    }


    /*----------------------------------NET-------------------------------*/
    class Net {
        constructor() { // 3 layers: 
            this.layers = [
                [new Neuron(), new Neuron(), new Neuron()],
                [new Neuron(), new Neuron(), new Neuron()],
                [new Neuron(), new Neuron(), new Neuron()]
            ];
        }

        forward(first) {
            // [Array(3), Array(3), Array(3)] WE CANNOT RETURN THIS !!!!
            // transforming to Array(3) (avg of el[0] els of each Array, of el[1] ...)
            var mega = [];
            var sum = 0;

            let ret = this.layers.reverse().map(l => l.map(n => n.forward(first)));

            ret.forEach((el, i) => el.forEach((el, j) => {
                sum += ret[j][i];

                if (j == 2) { // j == 1 better results but arrays are not even
                    mega.push(sum / 3);
                    sum = 0;
                }
            }));


            return mega;
        }


        learn(arr, expected) {
            for (var i = 0; i < 100; i++) {
                var res = this.forward(arr);

                var diff = 0;
                res.forEach(el => diff += el - expected);
                this.layers.reverse().map(n => n.map(s => s.backward(diff)));
            }

            const output = this.forward(arr);
            const diffs = output.map(el => Math.abs(el - expected));
            const ret = diffs.indexOf(Math.min(...diffs));
            return output[ret];
        }
    }


    const net = new Net();
    let res = net.learn([0, 1], 1); // [0, 0], 0
    console.log(res);
    // 30.6.2019 - 17:20 done for 1 !!! 
