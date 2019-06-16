## Multiply

```swift
// import Foundation

// https://www.umimeto.org/asset/system/um/img/novadoplnovacka/array-mult-987-12-nok.png
// print("\(second[i])  * \(first[x]) + \(holds[holds.count - 2]) =  \(m)  just held: \(holds[holds.count - 2])      ")


func multiply(s: String, sem: String) -> Void {
    
    var xo = s.compactMap {$0.wholeNumberValue}
    var mo = sem.compactMap {$0.wholeNumberValue}
    var first = Array(xo.reversed())
    var second = Array(mo.reversed())
    
    func getHold(n: Int) -> Int {
        let n = "\(n)"
        if n.count == 2 {
            return Int(String(n.first!))!
        } else {
            return 0
        }
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
            
            let hold = getHold(n: second[i] * first[x])
            holds.append(hold)
            
            let m = second[i] * first[x] + holds[holds.count - 2] //+ hold
            
            if x == first.count - 1 { // Reset holds
                firstLine.append("\(getWrite(n: Int(m + holds[holds.count - 2]), isLast: true))")
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

multiply(s: "229", sem: "18")

// 17:58 - 16.6.2019 done for some cases (18:24 end)
// 229 * 18
// 638 * 12

// 238 * 34 does not work
```
