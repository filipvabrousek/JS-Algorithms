func SOI(_ str: String) -> Int {
    
    let ints = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    var arr:[Character] = []
  
     var indexes:[Int] = []
    
    var pure:[[Int]] = []
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
    }
    
    
    print(arr) // ["X", "1", "2", "2", "X", "1", "X", "2"]
    
    
    /*
    
    var sum = 0
 
    var sub = [Int]()
    
    for i in 0..<arr.count{
     
        if (arr[i] != "X"){
            sub.append(Int(String(arr[i]))!)
        } else {
           
            pure.append(sub)
            sub.removeAll()
        }
        
        
    }
    
    print(pure) // [[], [1, 2, 2], [1]]
   */
    
    var sum = 0
    
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
        print(sume)
       // print(Int(count))
    }
    
    
    return 0

    }

SOI("A122A1B2")

