 var speech = function() {
   var x = "lol";
   var body = document.querySelector("body");
   var h1 = document.querySelector("h1");
   var recognition = new webkitSpeechRecognition();
   recognition.continuous = true;
   recognition.interimResults = true;

   recognition.onresult = function(event) {
     var colour = event.results[event.results.length - 1][0].transcript;
     // make it lowercase
     colour = colour.toLowerCase();
     // strip the spaces out of it
     colour = colour.replace(/\s/gi, '');
     body.style.background = colour;
     h1.innerHTML = colour;
   }

   recognition.start();

 }

 if (!('webkitSpeechRecognition' in window)) {
   alert("Sorry, your browser doesn´t support speech recognition.");
 } else {
   speech();
 }
