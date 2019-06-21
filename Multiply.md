## Multiply

```swift

func multiply(s: String, sem: String) -> Void {
    
    var xo = s.compactMap {$0.wholeNumberValue}
    var mo = sem.compactMap {$0.wholeNumberValue}
    var first = Array(xo.reversed())
    var second = Array(mo.reversed())
    
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
    print(Array(vet[1]).joined())
    print(w.joined())
}


multiply(s: "753", sem: "27")

// 17:58 - 16.6.2019 done for some cases (18:24 end)
// 638 * 12
// 238 * 34
// 229 * 18 :D

// 13.35 END :D
// 753 * 27 (random test)

// 21.6.19 - 14:48 done for all !! :) 4 hrs
```
