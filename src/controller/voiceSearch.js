export const voiceRecognition= (voiceState)=>{
   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
   
    if (SpeechRecognition) {
    console.log("browser support speech recognition")


    const recognition = new SpeechRecognition();
        if (voiceState==="") {// Start Speech Recognition
        recognition.start();
        
        } 
        else if (voiceState==="hidden") {//Stop Speech Recognition
        
        recognition.stop();
        
        }
    
    recognition.addEventListener("start", startSpeechRecognition);
    function startSpeechRecognition() {
        
        console.log("Speech Recognition Active");
        
    }
    recognition.addEventListener("end", endSpeechRecognition);
    function endSpeechRecognition() {
        
        console.log("Speech Recognition not Active");
    }

    recognition.addEventListener("result", resultofSpeehRecognition);
    function resultofSpeehRecognition(event){
        const transcript = event.results[0][0].transcript;
        
        console.log(transcript)
    }
    } 
    else {
    console.log("browser does not support speech recognition")
    
    }
}