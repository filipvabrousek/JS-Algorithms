# Advanced genes

## Gene class
```js
class Gene {
    constructor(code) {
    if (code){ 
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

    
    /*---------------------------------------MUTATE----------------------------------------
   1 - finds center point
   2 - creates a new String
    */
    mutate(chance) {
        if (Math.random() > chance) {return};

        // 1
        const index = Math.floor(Math.random() * this.code.length);
        const upOrDown = Math.random() <= 0.5 ? -1 : 1;
        const newChar = String.fromCharCode(this.code.charCodeAt(index) + upOrDown);
        
        // 2
        let newString = '';
        for (let i = 0; i < this.code.length; i++) {
            if (i == index) newString += newChar;
            else newString += this.code[i];
        }

        this.code = newString;
    }

    
    /*---------------------------------------MATE----------------------------------------
    takes model String as an argument, finds differences in ASCII codes and squares them
    */
    mate(gene) {
        const pivot = Math.round(this.code.length / 2) - 1;

        const child1 = this.code.substr(0, pivot) + gene.code.substr(pivot);
        const child2 = gene.code.substr(0, pivot) + this.code.substr(pivot);

        return [new Gene(child1), new Gene(child2)];
    }

    /*--------------------------------------CALC COST--------------------------------------
    compareTo is the passed String
    */
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
/*----------------------------------------------------------------------------------
1 -add random letters to the gene and push it to memebers
*/
class Population {
    
    constructor(goal, size) {
        this.members = [];
        this.goal = goal;
        this.generationNumber = 0;
        while (size--) {
            // 1
            const gene = new Gene();
            gene.random(this.goal.length);
            this.members.push(gene);
        }
    }

    
    
    /*--------------------------------------DISPLAY--------------------------------------*/
    display() {
        console.log(`Generation: ${this.generationNumber}`);
    
        for (let i = 0; i < this.members.length; i++){
            console.log(`${this.members[i].code} ${this.members[i].cost}`);
        }
         console.log("-----------------------------------------");
    }

    
    /*--------------------------------------SORT--------------------------------------*/
    sort() {
        this.members.sort((a, b) => a.cost - b.cost);
    }

    
    /*--------------------------------------GENERATION--------------------------------------
    1 - calculate cost of the string and display, create chn by mating and splice them
    2 - looping through memebers 50% mutation rate using the mutate method
    3 - we have the result !!!!
    4 - increase generationNumber and call "generation()" every 20 ms
    */
    generation() {
       
        // 1
        for (var i = 0; i < this.members.length; i++) {
            this.members[i].calcCost(this.goal);
        }

        this.sort();
        this.display();
        const children = this.members[0].mate(this.members[1]);
        this.members.splice(this.members.length - 2, 2, children[0], children[1]);

        // 2
        for (var i = 0; i < this.members.length; i++) {
            this.members[i].mutate(0.5);
            this.members[i].calcCost(this.goal);
           // 3
            if (this.members[i].code == this.goal) {
                this.sort();
                this.display();
                return true;
            }
        }
        
        // 4
        this.generationNumber++;
        const scope = this;
        setTimeout(() => {
            scope.generation();
        }, 20);
    }
}


const population = new Population("Hello", 10); // 373
population.generation();

// http://burakkanber.com/blog/machine-learning-genetic-algorithms-part-1-javascript/
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
