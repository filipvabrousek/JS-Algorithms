// http://www.codewars.com/kata/sum-of-integers-in-string/train/swift
func SOI(_ str: String) -> Int {
    
    let ints = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    var arr:[Character] = []
    
    
    
    var pure:[[Int]] = []
    
    // 1 - get all characters other than a number and replace them with "X" symbol
    // "A122a1" -> ["X", "1", "2", "2", "X", "1"]
    
    
    
    for i in 0..<str.count { // str.characters.count if we use swift 3.1
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
    
    // print(pure) // [[], [1, 2, 2], [1]]
    
    
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


let w = SOI("The30quick20brown10f0x1203jumps914ov3r1349the102l4zy dog")
print(w)

// 24.6.2018 - 17:29 rank 7

/* 
func sumOfIntegersInString(_ string: String) -> Int {
    return string.components(separatedBy: CharacterSet.decimalDigits.inverted).flatMap({Int($0)}).reduce(0, +)
}*/
