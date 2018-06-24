func disemvowel(_ str: String) -> String { // test for 3.1 (str.characters)
    
    let vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]
    
    var res = ""
    for i in 0..<str.count {
       
        let index = str.index(str.startIndex, offsetBy: i)
        let char = str[index]
        
        if (vowels.contains(String(char))){
            //res += " "
        } else {
            res += String(char)
        }
    }
    
    return res
}


disemvowel("This website is for losers LOL!")

// "This website is for losers LOL!"
// => "Ths wbst s fr lsrs LL!".


/*
 OR:
 func disemvowel(_ s: String) -> String {
 let vowels: [Character] = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]
 return String(s.characters.filter { !vowels.contains($0) })
 }
 */

