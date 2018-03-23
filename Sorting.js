
// --------------------------------- school bubble sort (slow)
let arr = [8, 4, 6, 7];

function bubble(arr){
    
for (let j = 0; j < arr.length - 1; j++){
    
    for (let i = 0; i < (arr.length - j - 1); i++){
        
    if (arr[i] > arr[i + 1]){
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
    }
    }
    
}
    
return arr;
}
    
let res = bubble(arr);
console.log(res);                                                    
    

    

// --------------------------------------- quick sort
function quick(arr){
    if (arr.length < 2) {return arr}
    
    let pivot = arr[0], left = [], right = [];
    
    for (let i = 1; i < arr.length; i++){
       
       switch(true){
            case (arr[i] < pivot) :
                left.push(arr[i]);
                break;
                
            case (arr[i] >= pivot):
               if (arr[i]){
                   right.push(arr[i]);  
                   break;
               }  
        }
   }
    return [].concat(quick(left), pivot, quick(right));
} 
   
let qs = quick(arr);
console.log(qs);
    
    
    
    
// ---------------------------------------- insertion sort    
function insertion(arr){
    for (let i = 0; i < arr.length; i++){
        let temp = arr[i];
       
        let j = i - 1;
        while( j >= 0 && arr[j] > temp ){
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = temp;
    }
    
    return arr;
}
    
    
let is = insertion(arr);
console.log(is)
// https://medium.com/basecs/exponentially-easy-selection-sort-d7a34292b049
    
    
    
    
// ---------------------------------------- selection sort
function selection(arr){
    for (let i = 0; i < arr.length; i++){
        let smallest = i; // smallestNumberIndex
        
        for (let next = i + 1; next < arr.length; next++){
            console.log(`Comparing ${arr[smallest]} and ${arr[next]}`);
            
            if (arr[next] < arr[smallest]){ 
                smallest = next; 
            }
            
            if (smallest != i){
            let curr = arr[i];
            console.log(`Swapping ${arr[smallest]} for the number ${arr[i]}`);
                
            arr[i] = arr[smallest];
            arr[smallest] = curr;
            }
            
        }
        return arr;
    }
}
    
    
let sel = selection(arr);
console.log(sel);
    
    
/*
function bubble(arr){
   let sorted = false;
    
while(!sorted){
    sorted = true;
    arr.forEach((el, i, arr) => {
        if (el > arr[i + 1]){
            arr[i] = arr[i + 1];
            arr[i + 1] = el;
            sorted = false;
        }
    })
}
    return arr;
}
      
let sorto = bubble(arr);
console.log(sorto);
*/
