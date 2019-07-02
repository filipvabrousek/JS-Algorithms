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
        constructor() { // 7 layers: 
            this.layers = Array(7).fill([]).map(el => el = [new Neuron(), new Neuron(), new Neuron()]);
        }

        forward(first) {
            // [Array(3), Array(3), Array(3)] WE CANNOT RETURN THIS !!!!
            // transforming to Array(3) (avg of el[0] els of each Array, of el[1] ...)
            var mega = [];
            var sum = 0;
            
            let ret = this.layers.flat().reverse().map(n => n.forward(first));
            console.log(ret);
          
            ret.forEach((el, i) => {
                sum += ret[i];

                if (i % 3 == 0) {
                    mega.push(sum / 3);
                    sum = 0;
                }
            });

           // console.error(mega.reduce((a, b) => a + b) / mega.length);
            return mega;
            
            
        }


        learn(arr, expected) {
            for (var i = 0; i < 1000; i++) { // 2 vs 100
                var data = this.forward(arr);
                var diff = 0;
                data.forEach(res => diff += Math.abs(res - expected)); // if I divide diff by 3 less bad - 0.67
                this.layers.flat().reverse().map(n => n.backward(diff));
            }

            const output = this.forward(arr);
            const diffs = output.map(el => Math.abs(el - expected));
            const ret = diffs.indexOf(Math.min(...diffs));
            return output[ret];
        }
    }


    const net = new Net();
    let res = net.learn([0, 1], 1); // [0, 0], 0 -> 0.16666
    console.log(res);
    // 30.6.2019 - 17:20 done for 1 !!!    
    // https://stackoverflow.com/questions/8439194/multiple-output-neural-network - 2.7.19
