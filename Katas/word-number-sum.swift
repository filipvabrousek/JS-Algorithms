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
