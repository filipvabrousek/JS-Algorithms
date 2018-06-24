

/*
// https://www.codewars.com/kata/1-slash-n-cycle/train/swift
func cycle(_ n: Int) -> Int {
    // your code
    var res = 1.0 / Double(n)
    print(res)
    
    var sres = String(res)
    sres.removeFirst()
    sres.removeFirst() // 09 09 09
    
    var arr:[Character] = []
    for char in sres.characters{
        arr.append(char)
    }
    
    var ret = 0 // returned value
    
    
    for i in 0..<arr.count - 6 {
        // try 2
        
        let first = arr[i]
        let second = arr[i + 1]
        let third = arr[i + 2]
        let fourth = arr[i + 3]
        let fifth = arr[i + 4]
        let sixth = arr[i + 5]
       
        
        if (first == third && second == fourth){
            // cycle 11 met
            ret = 2
        }
        
    }
    
    print(arr)
    
    
    

    return ret
}

cycle(11) // cycle(1/11) to invoke the condition

/*
 cycle(1/11) .... 0.09 09 09 09 .....
 cycle(5) = -1
 cycle(27) = 3 -> 0.037 037 037 037 0370
 cycle(22) = -1 since 1/22 ~ 0.0 45 45 45 45 ...
 */




// https://www.codewars.com/kata/8-inch-pizza-equivalence/train/swift
// how much 8 inch pizzas will fit into 16 inch
func howMany8Pizzas(_ n: Int) -> String {
    
    
    var count = Double(n * 2).truncatingRemainder(dividingBy: 8)
    
    print(count)
    
    
    var pizza = 2 * n / 8
    var slices = 0
    
  let rpizzass = pizza
let rslices = slices
    
    return "pizzas: \(rpizzass), slices: \(rslices)"
}


howMany8Pizzas(12)
/*
 how_many_pizzas(16) -> "pizzas: 4, slices: 0"
 how_many_pizzas(12) -> "pizzas: 2, slices: 2"
 how_many_pizzas(8) -> "pizzas: 1, slices: 0"
 how_many_pizzas(6) -> "pizzas: 0, slices: 5"
 how_many_pizzas(0) -> "pizzas: 0, slices: 0"
 
 
 */

*/


// Works :D
/*
// https://www.codewars.com/kata/57ae18c6e298a7a6d5000c7a/train/swift
func replaceAll<T: Equatable>(array: [T], old: T, new: T) -> [T] {
    
    var arr = array
    
    //var second = [T]()
    var indexes = [Int]()
   
    for i in 0..<arr.count {
        if (arr[i] == old){
           indexes.append(i)
        }
    }
    
    
    
    for i in 0..<indexes.count{
        let index = indexes[i]
        arr[index] = new
        
    }
    return arr
}




let res = replaceAll(array: ["ooh", "la", "la"], old: "la", new: "baby")
print(res)
//  ["ooh", "la", "la"], old: "la", new: "baby"), ["ooh", "baby", "baby"])
*/





/* Swifter solutions :D
 func replaceAll<T: Equatable>(array: [T], old: T, new: T) -> [T] {
 return array.map { $0 == old ? new : $0 }
 }
 */



// http://www.codewars.com/kata/sum-of-integers-in-string/train/swift
// Sum of integers within a string
/*
func sumOfInts(_ string: String) -> Int{
    
    var ints = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    
    var filin = [Int]()
  
    for char in string{
     
        let ch = String(char)
        
        if ints.contains(ch){
            print(ch)
            filin.append(Int(ch)!)
        }
        
    }
    
    
       let res = filin.reduce(0, +)
     return res
}

sumOfInts("FA1U+33Ě") // is 7 should be 34
*/

/*
func sumOfInts(_ string: String) -> Int{
    
    let ints = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    
    var filin = [Int]()
    
    
    var filterout = [String]()
    var indexes = [Int]()
    
    for i in 0..<string.count {
        let index = string.index(string.startIndex, offsetBy: i)
        let char = string[index]
        let schar = String(char)
        
        
        if ints.contains(schar){
            let ind = string.index(of: char)
            let dist = string.distance(from: string.startIndex, to: ind!)
            indexes.append(dist)
            
        } else {
            print(char)
            filterout.append(schar)
        }
    }
    
      print(indexes)
    
    
    for i in 0..<indexes.count {
       
        
        
        for i in 0..<string.count {
         var posl = string.index(string.startIndex, offsetBy: i + 1)
            if (i == string.count - 1){
                posl = string.index(string.startIndex, offsetBy: i)
                print("Last letter \(string[posl])")
                
                if (Int(posl) == indexes[i]]){
                    
                }
                
            } else {
                posl = string.index(string.startIndex, offsetBy: i)
            }
       
        }
        
        
        
        
        
        let idx = indexes[i]
        let index = string.index(string.startIndex, offsetBy: idx)
        let num = string[index]
        print("C \(num)")
    }
    
    
    let res = filin.reduce(0, +)
    return res
}
*/
//sumOfInts("Ab122a1") // should be 123
// "The30quick20brown10f0x1203jumps914ov3r1349the102l4zy dog", the sum of the integers is 3635.


/*
func isLBefore(string: String, index: Int){
 if (string.index(before: String.indexB)){
 }
}
 */





// http://www.codewars.com/kata/sum-of-integers-in-string/train/swift

func SOI(_ str: String){
    
    let ints = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    var arr:[Character] = []
    var resnums:[Int] = []
   
    // 1 - get all characters other than a number and replace them with "X" symbol
    // "A122a1" -> ["X", "1", "2", "2", "X", "1"]
    for i in 0..<str.count {
        let index = str.index(str.startIndex, offsetBy: i)
        let char = str[index]
        
        if (ints.contains(String(char))){
            arr.append(char)
        } else {
            arr.append("X")
        }
        
       
        // 2 - using loop over this array and group numbers together
        // ["X", "1", "2", "2", "X", "1"] -> ["X", "122", "X", "1"]
        // get index of ech "X" eg. at [1, 3, 4] -> append indexes to array "inds"
        // if range(inds[i] inds[i + 1] != "X" => we have the whole number :D
        var str = ""
        for i in 0..<arr.count - 1{
            if (arr[i] != "X" && arr[i + 1] != "X") {
               str += "\(arr[i])"
            }
        }
        
        print(str)

       
    }
    
    print(arr)
    
    // 3 - sum the elements using "reduce(0, +)" or for loop
    
}

SOI("A122a1")


