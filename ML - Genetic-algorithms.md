# Genetic algorithms
* simple  

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


# Advanced 
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

    
    /*---------------------------------------MUTATE---------------------------------------
   1 - if Math.random() is bigger than passed chance, do nothing
   
   2 - creates a new  character from a random char. code 
   - finds center point upOrDown is either -1 or 1 
   - and a random index (0 or 1)
   
   3 - loop through characters of the "code" string and if the letter from the index in the for loop in the "code" string is equal to random index (0 or 1) add character to the "newString", else skip it
    */
    
    mutate(chance) {
        // 1
        if (Math.random() > chance) {return};

        // 2
        const index = Math.floor(Math.random() * this.code.length);
        const upOrDown = Math.random() <= 0.5 ? -1 : 1;
        const newChar = String.fromCharCode(this.code.charCodeAt(index) + upOrDown);
        
        // 3
        let newString = '';
        for (let i = 0; i < this.code.length; i++) {
            if (i == index) newString += newChar;
            else newString += this.code[i];
        }

        this.code = newString;
        console.log(`${newString} + ${index} `);
    }

    
    /*--------------------------------------MATE-------------------------------------
  splits the string in half and returns the 2 mated Strings
    */
    mate(gene) {
        const half = Math.round(this.code.length / 2) - 1;

        const child1 = this.code.substr(0, half) + gene.code.substr(half);
        const child2 = gene.code.substr(0, half) + this.code.substr(half);

        return [new Gene(child1), new Gene(child2)];
    }

 
     /*---------------------------------------CALC COST----------------------------------------
    takes "compareTo" String as an argument, finds differences in ASCII codes and squares them
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
    1 - calculate cost of the string and display, create chn by mating the using "mate()" and splice them
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


const population = new Population("Hello", 3); // 373
population.generation();

// http://burakkanber.com/blog/
```








