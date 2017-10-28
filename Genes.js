let genome_mother = [ 1, 1, 0, 0, 1, 0 ];
let genome_father = [ 0, 0, 1, 1, 0, 1 ];


// crossover algorithm
// XXX: assumes that both genomes have same length

let dna_split       = (Math.random() * genome_mother.length) | 0;
let genome_daughter = new Array(genome_mother.length);
let genome_son      = new Array(genome_mother.length);

for (let d = 0; d < genome_mother.length; d++) {

	if (d > dna_split) {
		genome_son[d]      = genome_mother[d];
		genome_daughter[d] = genome_father[d];
	} else {
		genome_son[d]      = genome_father[d];
		genome_daughter[d] = genome_mother[d];
	}

}

console.log(genome_daughter);
console.log(genome_son);
