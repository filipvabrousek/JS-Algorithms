// http://www.codewars.com/kata/sum-of-integers-in-string/train/swift
/*
Your task in this kata is to implement a
function that calculates the sum of the integers inside a string. 
For example, in the string "The30quick20brown10f0x1203jumps914ov3r1349the102l4zy dog",
the sum of the integers is 3635.
Note: only positive integers will be tested.
*/
func sumOfIntegersInString(_ str: String) -> Int {

    let ints = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    var arr:[Character] = []
    

    
    var pure:[[Int]] = []
    
    // 1 - get all characters other than a number and replace them with "X" symbol
    // "A122a1" -> ["X", "1", "2", "2", "X", "1"]
    
    
    
    for i in 0..<str.characters.count {
        let index = str.index(str.startIndex, offsetBy: i)
        let char = str[index]
        
        if (ints.contains(String(char))){
            arr.append(char)
        } else {
            arr.append("X")
        }
    }
    
    print(arr) // ["X", "1", "2", "2", "X", "1", "X", "2"]
    
    
    
 
    var sub = [Int]()
    
    for i in 0..<arr.count {
        
        if (arr[i] != "X"){
            sub.append(Int(String(arr[i]))!)
        } else {
            
            pure.append(sub)
            sub.removeAll()
        }
        
        if (i == arr.count - 1){
            print("Now")
            
            if (arr[i] != "X"){
                sub.append(Int(String(arr[i]))!)
                sub.removeLast()
                pure.append(sub)
            }
            
        }
        
        
    }
    
    // pure: [[], [1, 2, 2], [1]]
    
 
    var sume = 0
    for subarr in pure{
        //  print("S\(subarr)")
        
        var count = ""
        for char in subarr{
            count += "\(Int(char))"
        }
        
        
        if let count = Int(count){
            print(count)
            sume += count
        }
        
    }
    
    
    return sume
    
}

// 7.7.2018



// Works :D

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






/* Swifter solutions :D
 func replaceAll<T: Equatable>(array: [T], old: T, new: T) -> [T] {
 return array.map { $0 == old ? new : $0 }
 }
 */
