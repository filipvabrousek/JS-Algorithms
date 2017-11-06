# Candidates class

```js

class Candidates {
    
	constructor(code) {
		if (code) this.code = code;
		this.cost = 9999;
	}
    
    // fmethod for building a random string
	random(length) {
		while (length--) {
			this.code += String.fromCharCode(Math.floor(Math.random() * 255));
		}
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
    
    
	/*--------------------------------------COMBINE-------------------------------------
  splits the string in half and returns the 2 mated Strings
  if string is "Hello" pivot is 3 - 1 = 2
  child1 is this.code.substr(0, 2) + cand.code.substr(2)
  child2 is cand.code.substr(0, 2) + cand.code.substr(2)
    */
	combine(cand) {
		const pivot = Math.round(this.code.length / 2) - 1;
		const child1 = this.code.substr(0, pivot) + cand.code.substr(pivot);
		const child2 = cand.code.substr(0, pivot) + this.code.substr(pivot);
		return [new Candidates(child1), new Candidates(child2)];
	}
    
    
    
	/*---------------------------------------MUTATE---------------------------------------
   1 - if Math.random() is bigger than passed chance, do nothing
   
   2 - we need to alter character from the string
   
   3 - loop through characters of the "code" string and if the letter from the index in the for loop in the "code" string is equal to random index (0 or 1) add character to the "newString", else skip it
   
   4 - replace old string with new
    */
	mutate(chance) {
		
        //  1
        if (Math.random() > chance) return;
		
        //  2
        const index = Math.floor(Math.random() * this.code.length);
		const upOrDown = Math.random() <= 0.5 ? -1 : 1;
		const newChar = String.fromCharCode(this.code.charCodeAt(index) + upOrDown);
		
        
        //  3
        let newString = '';
		for (let i = 0; i < this.code.length; i++) {
			if (i == index) newString += newChar;
			else newString += this.code[i];
		}
        
        // 4
		this.code = newString;
		console.log(`${newString} + ${index} `);
	}
}

Candidates.prototype.code = '';



```



## Group
```js
/*--------------------------------------------------------------
1 - "Hello", 25 is the size of the group
2 - fills the whole group with random candidates
*/

class Group {
    // 1
    constructor(goal, size){
        this.members = [];
        this.goal = goal;
        this.stageNumber = 0;
        
        // 2
        while(size--){
            const gene = new Candidates();
            gene.random(this.goal.length);
            this.members.push(gene);
        }
    };
    
    
    display(){
      document.body.innerHTML = "";
		document.body.innerHTML += `<h2>Stage: ${this.stageNumber}</h2>`;
		document.body.innerHTML += '<ul>';
		for (let i = 0; i < this.members.length; i++) {
			document.body.innerHTML += `<li>${this.members[i].code} (${this.members[i].cost})`;
		}
		document.body.innerHTML += '</ul>';
    };
    
    
    sort(){
        this.members.sort((a, b) => a.cost - b.cost);
    };
    
    
    /*--------------------------------------STAGE--------------------------------------
	1 - calculate cost of the string and display, create chn by mating the using "mate()" and splice them
    splice(from, to)
    
	2 - looping through memebers and mutate each 50% mutation rate using the mutate method
	3 - we have the result !!!!
	4 - increase stage and call "generation()" every 20 ms
	*/
    stage(){
        
        //  1
        for (let i = 0; i < this.members.length; i++){
            this.members[i].calcCost(this.goal);
        }
        this.sort();
        this.display();
        const chn = this.members[0].combine(this.members[1]);
        this.members.splice(this.members.length - 2, 2, chn[0], chn[1]);
        
        //  2
        for (var i = 0; i < this.members.length; i++){
            this.members[i].mutate(0.5);
            this.members[i].calcCost(this.goal);
            
            //  3
            if (this.members[i].code == this.goal){
                this.sort();
                this.display();
                return true;
            }
        }
        
        //  4
        this.stageNumber++;
        const scope = this;
        setTimeout(() => {
            scope.stage();
        }, 20);
        
    };
}


const population = new Group("Hello", 25);
population.stage();

// <body></body>
// https://medium.com/@ddcreationstudi/easy-javascript-machine-learning-algorithm-a056f9acc9b6
```
