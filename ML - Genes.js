let genMother = [1, 1, 0, 0, 1, 0];
let genFather = [0, 0, 1, 1, 0, 1];

// crossover algorithms (lengths must be the same)
let dnaSplit = (Math.random() * genMother.length) | 0;
let genDaughter = new Array(genMother.length);
let genSon = new Array(genMother.length);


for (let d = 0; d < genMother.length; d++) {

  if (d > dnaSplit) {
    genSon[d] = genMother[d];
    genDaughter[d] = genFather[d];
  } else {
    genSon[d] = genFather[d];
    genDaughter[d] = genMother[d];
  }
}

console.log(genDaughter); // [1, 1, 0, 1, 0, 1]
console.log(genSon); // [0, 0, 1, 0, 1, 0]

// vnoucata02
