<section id="content"></section>


<script>
// --- INVERSE

	
		
const S = el => document.querySelector("#content");
	
	
function getNumberToMultiply(top, below, i, matrix){
	let eq = `${top}x=-${below}`;
	console.log(eq);
	
	// 2x=-4
	let two = eq.split("x")[0];
	let four = eq.split("=")[1];
	let times = parseFloat(Number(four) / Number(two));		
	
	console.log(`x = ${times}`);
	//S("#content").innerHTML += `Multiply  ROW ${i} by ${times} and add to ROW ${i + 1} <br>`;
	return times;
}
	

	
function printNicely(m){
	S("#content").innerHTML += "<br><br>";
	for (var i = 0; i < 3; i++){
		var row = []; //m[i];
		row.push(m[i][0]);
		row.push(m[i][1]);
		row.push(m[i][2]);
		row.push(m[i][3]);
		row.push(m[i][4]);
		row.push(m[i][5]);
		S("#content").innerHTML += row.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;") + "<br>";
	}
}

	
function getFirst(m){
printNicely(m);
	
let A = m[0][0];
let B = m[1][0];
let res = getNumberToMultiply(A, B, 1, m);
m[1][0] = 0;
S("#content").innerHTML += `Multiply  First row with by ${res} and add to 2nd row. <br>`;
	
let C = m[0][1];
let D = m[1][1];
let belowCD = C * res + D;
m[1][1] = belowCD;

let E = m[0][2];
let F = m[1][2];
let belowEF = E * res + F;
m[1][2] = belowEF;
	
let G = m[0][3];
let H = m[1][3];
let belowGH = G * res + H;
m[1][3] = belowGH;
	
	
let I = m[0][4];
let J = m[1][4];
let belowIJ = I * res + J;
m[1][4] = belowIJ;
	
let K = m[0][5];
let L = m[1][5];
let belowKL = K * res + L;
m[1][5] = belowKL;
	
	
	
	
	
	
printNicely(m);
	
return m;
}
	
var res = getFirst([[2, 1, 9, 1, 0, 0], 
			  		[3, 8, 1, 0, 1, 0], 
			  		[6, 8, 1, 0, 0, 1],
				   ]);

/*
for (var i = 0; i < 2; i++){
		var row = m[i];
		for (var j = 0; j < 3; j++){
			let top = m[i][j];
			let below = m[i + 1][j];
			calc(top, below, i, j);
		}
	}
*/
	

	
	
	
	

	/*
function getSecond(m){
let A = m[0][0];
let B = m[2][0];
calc(A, B, 2, 0);
m[2][0] = 0;
	
	
//let C = m[0][0];
//let D = m[2][0];
//calc(C, D, 2, 0);
//m[2][0] = 0;
	
	
m[2][1] = 0;
printNicely(m);
return m;
}
	*/

//var next = getSecond(res);

	
	
	/*
function getThird(m){
let A = m[1][1];
let B = m[2][1];
calc(A, B);
m[2][1] = 0;
printNicely(m);
return m;
}
	
var third = getThird(next);
	
function getFourth(m){
let A = m[2][2];
let B = m[1][2];
calc(A, B);
m[1][2] = 0;
printNicely(m);
return m;
}
	
var fourth = getFourth(third);


function getFifth(m){
let A = m[2][2];
let B = m[0][2];
calc(A, B);
m[0][2] = 0;
printNicely(m);
return m;
}
	
var fifth = getFifth(fourth);

	*/
	
	
	
	
	
	
	
	
	/*
	function inverseTest(m){
	let top = m[0][0];
	let below = m[1][0];
		
		
	console.log(top);
	console.log(below);
		
	let eq = `${top}x=-${below}`;
	//console.log(eq);
		
	// => -4 / 2
	// 2x=-4
	let two = eq.split("x")[0];
	let four = eq.split("=")[1];
	//console.log(`${two} ${four}`);
	
	let times = parseFloat(Number(four) / Number(two));
	//console.log(times);
	console.log(`Multiply ${two} times ${times} and add to ${below}`);
	}
	
	inverseTest([[2, 3, 8],
			 [4, 2, 8], 
			 [7, 8, 3]])

*/
	
	
	






</script>
