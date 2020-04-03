<section id="content"></section>

<style>

	table, td, th {
		border: 1px solid black;
		border-collapse: collapse;
	}
	
	
	td {
		width: 2.3em;
		text-align: center;
	}
	
	.bold {
		font-weight: bold;
	}

</style>

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
	
Number.prototype.rounded = function(){
	return +(Math.round(this + "e+2")  + "e-2");
}
	
function printNicely(m){
	S("#content").innerHTML += "<br><br>";

	
	var str = "<table>";
	for (var i = 0; i < 3; i++){
		var row = []; //m[i];
		row.push("&nbsp;" + m[i][0].rounded() + "&nbsp;");
		row.push("&nbsp;" + m[i][1].rounded() + "&nbsp;");
		row.push("&nbsp;" + m[i][2].rounded() + "&nbsp;");
		row.push("&nbsp;" + m[i][3].rounded() + "&nbsp;");
		row.push("&nbsp;" + m[i][4].rounded() + "&nbsp;");
		row.push("&nbsp;" + m[i][5].rounded() + "&nbsp;");
		
		
	
			str += `<td>${m[i][0].rounded()}</td>`;
		    str += `<td>${m[i][1].rounded()}</td>`;
		    str += `<td>${m[i][2].rounded()}</td>`;
			str += `<td class="bold">${m[i][3].rounded()}</td>`;
			str += `<td class="bold"> ${m[i][4].rounded()}</td>`;
			str += `<td class="bold">${m[i][5].rounded()}</td>`;
		
		
	str += `</tr>`;
		console.warn("ONE OF 9 NUMBRS " + m[i]);
	}
	
	str += "</table>";
	
	S("#content").innerHTML += str;
}
	
	
	/*
function printNicely(m){
	S("#content").innerHTML += "<br><br>";
	for (var i = 0; i < 3; i++){
		var row = []; //m[i];
		row.push("&nbsp;" + m[i][0].rounded() + "&nbsp;");
		row.push("&nbsp;" + m[i][1].rounded() + "&nbsp;");
		row.push("&nbsp;" + m[i][2].rounded() + "&nbsp;");
		row.push("&nbsp;" + m[i][3].rounded() + "&nbsp;");
		row.push("&nbsp;" + m[i][4].rounded() + "&nbsp;");
		row.push("&nbsp;" + m[i][5].rounded() + "&nbsp;");
		S("#content").innerHTML += row.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;") + "<br>";
	}
}*/

// 0 -> 1 ======> 1 -> 2
	
	
	
// (m, 0,  1)
	
function begin(m, zero, one){
	
	
if (one == 1){
	printNicely(m);
}
	
let A = m[zero][0];
let B = m[one][0];
let res = getNumberToMultiply(A, B, 1, m);
m[one][0] = 0;
S("#content").innerHTML += `Multiply First row with by ${res} and add to 2nd row. <br>`;
	
let C = m[zero][1];
let D = m[one][1];
let belowCD = C * res + D;
m[one][1] = belowCD;

let E = m[zero][2];
let F = m[one][2];
let belowEF = E * res + F;
m[one][2] = belowEF;
	
let G = m[zero][3];
let H = m[one][3];
let belowGH = G * res + H;
m[one][3] = belowGH;
	
	
let I = m[zero][4];
let J = m[one][4];
let belowIJ = I * res + J;
m[one][4] = belowIJ;
	
let K = m[zero][5];
let L = m[one][5];
let belowKL = K * res + L;
m[one][5] = belowKL;
	
printNicely(m);
	
return m;
}	
	
	
var res = begin([[2, 1, 9, 1, 0, 0], 
			  	 [3, 8, 1, 0, 1, 0], 
			  	 [6, 8, 1, 0, 0, 1],],
				 0, 1);

var next = begin(res, 0, 2);
	
// https://matrixcalc.org/cs/#rank%28%7B%7B2,1,9%7D,%7B3,8,1%7D,%7B6,8,1%7D%7D%29
	

function lastBelowDiagonal(m){
	
let A = m[1][1];
let B = m[2][1];
let res = getNumberToMultiply(A, B, 1, m);
m[2][1] = 0;
S("#content").innerHTML += `Multiply 2nd row with by ${res.toPrecision(2)} and add to 2nd row. <br>`;
	
	
	
let C = m[1][2];
let D = m[2][2];
let belowCD = C * res + D;
m[2][2] = belowCD;
	
	
	
	
console.warn(m[1][3]);
console.warn(m[2][3]);
	
let E = m[1][3];
let F = m[2][3];
//console.log(`E IS  ${E}  F IS${F} `);
let belowEF = E * res + F;
m[2][3] = belowEF;

console.warn(m[1][4]);
console.warn(m[2][4]);
	
let G = m[1][4];
let H = m[2][4];
//console.log(`E IS  ${E}  F IS${F} `);
let belowGH = G * res + H;
m[2][4] = belowGH;
	
let I = m[1][5];
let J = m[2][5];
//console.log(`E IS  ${E}  F IS${F} `);
let belowIJ = I * res + J;
m[2][5] = belowIJ;
	
printNicely(m);
return m;
}	

var another = lastBelowDiagonal(next);
	
	
	
	






</script>
