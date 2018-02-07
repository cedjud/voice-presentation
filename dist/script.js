// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#Event_handlers
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API


document.addEventListener('DOMContentLoaded', function(){

  // // Assign values

  // Bind DOM
  var buttonStart = document.querySelector('#buttonStart');
  var buttonStop = document.querySelector('#buttonStop');
  var slide = document.querySelector('.slides p');

  // Get speech recognition objects
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  // var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

  // Set up grammar
  var triggers = ['modest','preventing','ireland','burden','beneficial','public' ];
  // var grammar = '#JSGF V1.0; grammar colors; public <triggers> = ' + triggers.join(' | ') + ' ;'

  // Instantate recognition and recognition list
  var recognition = new SpeechRecognition();
  // var speechRecognitionList = new SpeechGrammarList();


  //// Configure recognition

  // add grammar to recognition list 
  // speechRecognitionList.addFromString(grammar, 1);

  // add grammar and other configuration to recgnition
  // recognition.grammars = speechRecognitionList;
  recognition.continuous = true;
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  // recognition.maxAlternatives = 1;


  // Bind events
  buttonStart.addEventListener('click', startSpeechRecognition);
  buttonStop.addEventListener('click', stopSpeechRecognition);
  recognition.onresult = recognitionResult;


  // Functions

  /**
   * start speech recognition
   * 
   * @returns void
   */
  function startSpeechRecognition() {
    console.log('start');
    recognition.start();
  };


  /**
   * end speech recognition
   * 
   * @returns void
   */
  function stopSpeechRecognition() {
    console.log('stop');
    recognition.stop();
  };



  /**
   * animate slides
   * @param {object} element
   */
  function animateSlide(slide){
    slide.classList.remove('visible');
    slide.classList.add('visible');
  }



  /**
   * recognition result - handle voice input 
   * @param {object} event 
   */
  function recognitionResult(event){
    
    // Get the most recent text input
    var last = event.results.length - 1;
    var trigger = event.results[last][0].transcript;

    if ( trigger.toLowerCase().indexOf(triggers[0]) != -1) {
      console.log(triggers[0]);

      slide.textContent = triggers[0];

      animateSlide(slide);
      
      triggers.shift();

    } 

    // else if there are no more triggers disable speech recognition
    else if ( triggers.length <= 0 ){
      stopSpeechRecognition();
    }
  };

  recognition.onspeechend = function() {
    recognition.stop();
  }
});