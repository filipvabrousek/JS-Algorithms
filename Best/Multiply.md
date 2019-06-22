## Multiply
* multiply large numbers together using standard method

```swift

func getHold(n: Int) -> Int {
    
    var ret = 0
    let n = "\(n)"
    if n.count == 2 {
        ret = Int(String(n.first!))!
    } else {
        ret = 0
    }
    
    return ret
}

func getWrite(n: Int, isLast: Bool) -> Int {
    let n = "\(n)"
    if n.count == 2 && isLast == false {
        return Int(String(n.last!))!
    } else {
        return Int(n)!
    }
}


func multiply(s: String, sem: String) {
    
    var xo = s.compactMap {$0.wholeNumberValue}
    var mo = sem.compactMap {$0.wholeNumberValue}
    var first = Array(xo.reversed())
    var second = Array(mo.reversed())
    
    
    var firstLine = [String]()
    var holds = [0]
    
    
    // 14:43 my first nested cycle
    for i in 0..<second.count {
        for x in 0..<first.count {
            
            var hold = getHold(n: second[i] * first[x])
            
            if holds.count >= 2 {
                hold = getHold(n: second[i] * first[x] + holds.last!)
            }
            
            holds.append(hold)
            
            let m = second[i] * first[x] + holds[holds.count - 2]
            
            if x == first.count - 1 { // Reset holds
                firstLine.append("\(getWrite(n: Int(m/* + holds[holds.count - 2]*/), isLast: true))")
                holds = [0]
                firstLine.append("X")
            } else {
                firstLine.append("\(getWrite(n: m, isLast: false))")
            }
        }
    }
    
    
    
    let ret = Array(firstLine.reversed())
    var vet = ret.split(separator: "X")
    
    var w = Array(vet[0])
    w.append("X")
    
    let f = Array(vet[1])
    
    
    var re = f.flatMap{String($0)}.map{String($0)}
    var pe = w.flatMap{String($0)}.map{String($0)}
    print(re.joined())
    print(pe.joined())
    print("-------------")
  
    finalize(first: f, second: w)
    
}


multiply(s: "756", sem: "32")


func finalize(first: [String], second: [String]){
    
    var fs = first.flatMap {$0}
    var ss = second.flatMap {$0}
    
    var finta = replaceXWithZero(arr: fs)
    var sinta = replaceXWithZero(arr: ss)
    
    
    // perfectly balanced, as all things should be :D
    if (finta.count < sinta.count){
        finta.insert(0, at: 0)
    } else {
        sinta.insert(0, at: 0)
    }
    
    
    var fint = Array(finta.reversed())
    var sint = Array(sinta.reversed())
    
    
    var holds = [0]
    
    var ret = [Int]()
    
    for i in 0..<fint.count {
        var hold = getHold(n: fint[i] + sint[i])
        
        if holds.count >= 2 {
            hold = getHold(n: fint[i] + sint[i] + holds.last!)
        }
        
        holds.append(hold)
        
        let m = sint[i] + fint[i] + holds[holds.count - 2]
        
        let wr = getWrite(n: m, isLast: false)
        ret.append(wr)
    }
    
    let rev = Array(ret.reversed())
    let sr = rev.map {String($0)}
    print(sr.joined())
    
}




func replaceXWithZero(arr: [String.Element]) -> [Int] {
    var arr = arr
    for i in 0..<arr.count {
        if arr[i] == "X"{
            arr[i] = "0"
        }
    }
    
    var ret = [Int]()
    for i in 0..<arr.count {
        ret.append(Int(String(arr[i])) ?? -1)
    }
    
    return ret
}


// 17:58 - 16.6.2019 done for some cases (18:24 end)
// 21.6.19 - 14:48 done for all !! :) 4 hrs
// TOTALLY DONE 21.6.2019 - 23:15
```
