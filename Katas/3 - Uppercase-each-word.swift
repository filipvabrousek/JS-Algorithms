// http://www.codewars.com/kata/jaden-casing-strings

extension String {
    func toJadenCase() -> String {
        var arr = [String]()
        var pure = [[String]]()
        
        for char in self{
            if char == " "{
                arr.append("X")
            } else {
                arr.append(String(char))
            }
        }
        
        
        
        for i in 0..<arr.count - 1{
            if (i == 0){
                arr[i] = arr[i].uppercased()
            }
            
            if (arr[i] == "X"){
                arr[i + 1] = arr[i+1].uppercased()
            }
        }
        
        var sub = [String]()
        
        
        
        
        for i in 0..<arr.count{
            if (arr[i] != "X"){
                sub.append(arr[i])
            } else {
                pure.append(sub)
                sub.removeAll()
            }
            
            if (i == arr.count - 1){
                if (arr[i] != "X"){
                    sub.append(arr[i])
                    sub.removeLast()
                    pure.append(sub)
                }
            }
        }
        
        var final = ""
        for i in 0..<pure.count {
            var temp = ""
            
            for char in pure[i]{
                temp += "\(char)"
            }
            if (i != pure.count - 1){
                final += temp + " "
            } else {
                final += temp
            }
            
            temp = ""
            print(temp)
        }
        
        
        print(final)
        
        
        return final
    }
}


var str = "most Trees Are Blue"
str.toJadenCase()
// "Most trees are blue" -> "most Trees Are Blue"
