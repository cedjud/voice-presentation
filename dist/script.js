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
  function startSpeechRecognition() {
    console.log('start');
    recognition.start();
  };

  function stopSpeechRecognition() {
    console.log('stop');
    recognition.stop();
  };

  function recognitionResult(event){
    // console.log(event.results);
    // console.log(event.results.length);
    
    var last = event.results.length - 1;
    var trigger = event.results[last][0].transcript;
    // console.log(trigger);

    if ( trigger.toLowerCase().indexOf(triggers[0]) != -1) {
      console.log(triggers[0]);
      slide.textContent = triggers[0];
      triggers.shift();
    } else if ( triggers.length <= 0 ){
      stopSpeechRecognition();
    }
  };


  recognition.onspeechend = function() {
    recognition.stop();
  }

  recognition.onnomatch = function(event) {
    diagnostic.textContent = 'I didnt recognise that color.';
  }

});