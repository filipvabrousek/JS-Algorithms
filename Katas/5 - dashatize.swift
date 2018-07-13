
func dashatize(_ number: Int) -> String {
    
    var num = number
    if abs(num) != num { // get positive number
        num = abs(num)
    }
    
    
    let inp = String(num) // 6815  num
    var arr = [Int]()
    
    for char in inp {
        arr.append(Int(String(char))!)
    }
    
    
    var sub = [String]()
    
    for (i, val) in arr.enumerated() {
        
        if arr[i] % 2 == 0  { // odd (7) add mark
            sub.append(String(arr[i]))
        } else {
            sub.append("-")
            sub.append(String(arr[i]))
            sub.append("-")
        }
    }
    
    
    for i in 0..<sub.count - 1{
        
        if (sub[i + 1] == "-" && sub[i] == "-"){
            print(i)
            sub[i] = "X"
        }
        
        
        if  sub[sub.count - 1] == "-"{
            sub[sub.count - 1] = "X"
        }
        
        if  sub[0] == "-"{
            sub[0] = "X"
        }
    }
    
    
    var res = ""
    
    for el in sub {
        if (el != "X"){
            res += el
        }
    }
    
    return res
}

dashatize(-28369)

/*
 dashatize(274) -> '2-7-4'
 dashatize(6815) -> '68-1-5'
 dashatize(-28369) -> '28-3-6-9'
 https://www.codewars.com/kata/58223370aef9fc03fd000071/train/swift
 */

// 21:09 done :D


