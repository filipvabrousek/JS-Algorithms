# Advanced genes

## Gene class
```js
class Gene {
  constructor(code) {
    if (code) {
      this.code = code;
    }
    this.cost = 9999;
  }

  /*--------------------------------CREATE RANDOM CHROMOZOME-----------------------------*/
  random(length) {
    while (length--) {
      this.code += String.fromCharCode(Math.floor(Math.random() * 255));
    }
  }


  /*---------------------------------------MUTATE----------------------------------------*/
  mutate(chance) {
    if (Math.random() > chance) {
      return
    };

    const index = Math.floor(Math.random() * this.code.length);
    const upOrDown = Math.random() <= 0.5 ? -1 : 1;
    const newChar = String.fromCharCode(this.code.charCodeAt(index) + upOrDown);
    let newString = '';
    for (let i = 0; i < this.code.length; i++) {
      if (i == index) newString += newChar;
      else newString += this.code[i];
    }

    this.code = newString;
  }


  /*---------------------------------------MATE----------------------------------------*/
  mate(gene) {
    const pivot = Math.round(this.code.length / 2) - 1;

    const child1 = this.code.substr(0, pivot) + gene.code.substr(pivot);
    const child2 = gene.code.substr(0, pivot) + this.code.substr(pivot);

    return [new Gene(child1), new Gene(child2)];
  }

  /*--------------------------------------CALC COST--------------------------------------*/
  calcCost(compareTo) {
    let total = 0;
    for (let i = 0; i < this.code.length; i++) {
      total += (this.code.charCodeAt(i) - compareTo.charCodeAt(i)) * (this.code.charCodeAt(i) - compareTo.charCodeAt(i));
    }
    this.cost = total;
  }
}

Gene.prototype.code = '';
```


## Population class
```js
class Population {
  constructor(goal, size) {
    this.members = [];
    this.goal = goal;
    this.generationNumber = 0;
    while (size--) {
      const gene = new Gene();
      gene.random(this.goal.length);
      this.members.push(gene);
    }
  }



  /*--------------------------------------DISPLAY--------------------------------------*/
  display() {
    console.log(`Generation: ${this.generationNumber}`);

    for (let i = 0; i < this.members.length; i++) {
      console.log(`${this.members[i].code} ${this.members[i].cost}`);
    }
    console.log("-----------------------------------------");
  }


  /*--------------------------------------SORT--------------------------------------*/
  sort() {
    this.members.sort((a, b) => a.cost - b.cost);
  }


  /*--------------------------------------GENERATION--------------------------------------*/
  generation() {
    for (var i = 0; i < this.members.length; i++) {
      this.members[i].calcCost(this.goal);

    }

    this.sort();
    this.display();
    const children = this.members[0].mate(this.members[1]);
    this.members.splice(this.members.length - 2, 2, children[0], children[1]);

    for (var i = 0; i < this.members.length; i++) {
      this.members[i].mutate(0.5);
      this.members[i].calcCost(this.goal);
      if (this.members[i].code == this.goal) {
        this.sort();
        this.display();
        return true;
      }
    }
    this.generationNumber++;
    const scope = this;
    setTimeout(() => {
      scope.generation();
    }, 20);
  }
}


const population = new Population("Hello", 10);
population.generation();

```







## Simple
```js
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
```
