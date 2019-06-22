## First 2 integers equal to given sum
* 2019 Google Interview question
* given an unsorted array of integers, find first two numbers  in the array that equal a given sum.

```swift
func find(sum: Int, arr: [Int]) -> [Int] {
    var droppped = [Int]()
    
    for i in 0..<arr.count {
        let res = sum - arr[i]
        
        if arr.contains(res) && droppped.contains(res) == false  {
            droppped.append(res)
        }
    }
    
    return droppped
}

find(sum: 9, arr: [2, 3, 3, 8, 6])

// 22.6.19 - 5 mins
```
