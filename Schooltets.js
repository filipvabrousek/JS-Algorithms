class Person{
constructor(name, born){
this.name = name;
this.born = born;
}

getAge(){
return 2018 - this.born;
}
}

let me = new Person("Filip", 1999);
me.getAge(); 	// 19
