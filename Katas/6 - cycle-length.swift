// cycle length (are numbers coprimes)
// https://www.codewars.com/kata/1-slash-n-cycle/train/swift

func cycle(_ n:Int) -> Int{
    let div = 1.0 / Double(n)
    
    let str = String(div)
    print(str)
    var numbers = [Int]()
    
    
    // 0.03 03 03 03 03 03 03 03 -> remove first el,
    
    var e = 0
    
    for char in str{
        e += 1
        
        if e > 2 {
            let l = String(char)
            let q = Int(l)
            numbers.append(q!)
        }
    }
    
    
    
    // [0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3]
    var sub = [Int]()
    let f = numbers[0]
    
    for i in 0..<numbers.count {
        if (numbers[i] == f){
            sub.append(i + 1)
        }
    }
    
    
    var ret = 0
    
    var sum  = sub[0] - sub[1]
    if sum < 0 {
        sum = -sum
    }
    
    if n > 1{
         ret = sum
    } else { // or number is coprime
        ret = -1
    }
   
    
    
    print("cycle length \(ret)")
    
    
    print(numbers)
    
    return 0
}


cycle(33)

/*
 cycle(33) = 2 -> 0.03 03 03 03 03 03 03 03
 cycle(37) = 3 -> 0.027 027 027 027 027 0
 cycle(94) = -1
 cycle(22) = -1 since 1/22 ~ 0.0 45 45 45 45 ...
 */

// 23:30 number length done :D
