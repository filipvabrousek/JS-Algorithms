```js
// Deep clonning

let Clony = (() => {
    
function isObject(data){
    return typeof data === "object";
}    
    
    

function isArray(data){
    return Object.prototype.toString.call(data) === "[object Array]";
}
    
    
    
   
function clone(data){
    let copied;
    
//-----------------------
    if (!isObject(data) || data === null){
        copied = data;
        return copied;
    }
    
    
 //-----------------------   
    if (isArray(data)){
        copied = [];
        
        for  (var i = 0; i < data.length; i++){
            copied[i] = clone(data[i]);
        }
        return copied;
    }
    
    // --------------------
    copied = {};
    
    
    for (var key in data){
        if (data.hasOwnProperty(key)){
            
            if (!isObject(data[key])){
                copied[key] = data[key];
                
                // nested objects
            } else {
         copied[key] = clone(data[key]);   
            }
            
        }
    }
    
    return copied;
}
    
    
return {
    clone
}
   
})();


let me = {
    name: "Filip",
    age: 18,
    city: {
        street: "Nymburk"
    }
}

let copy = Clony.clone(me);
console.log(me);
    
copy.city.street = "Marwelle"
console.log("Copy: ", copy);
// me.city.street is still "Nymburk" (object was deeply cloned)
```
