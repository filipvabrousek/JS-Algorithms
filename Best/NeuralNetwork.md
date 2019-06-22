## Neural network

```swift
import UIKit

func S(x: Double) -> Double {
    return 1 / (1 + pow(M_E, -x))
}

func compare(inputs: [Double], desired: Double){
    var weights = [Double.random(in: 0.0..<1.0), Double.random(in: 0.0..<1.0)]
    var sum = 0.0
    
    for _ in 0..<1000 {
        for i in 0..<weights.count {
            sum += weights[i] * inputs[i]
        }
        
        let prox = S(x: sum)
        let diff = abs(prox - desired)
        print(desired - diff)
        
        weights = weights.map { $0 * diff * 10 }
    }
}

compare(inputs: [0.0, 1.0], desired: 1)
// 0.9854726852747152
// 22.6.19 - 12:56
```
