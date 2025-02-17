let speech = new SpeechSynthesisUtterance();
const button = document.querySelector("button");
const voiceSelect = document.querySelector("select");
let voices = [];

// Function to load voices
function loadVoices() {
  voices = window.speechSynthesis.getVoices();
  
  // Clear previous options
  voiceSelect.innerHTML = "";

  voices.forEach((voice, i) => {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });

  // Set default voice if available
  if (voices.length > 0) {
    speech.voice = voices[0];
  }
}

// Ensure voices are loaded properly
window.speechSynthesis.onvoiceschanged = loadVoices;
loadVoices(); // Call manually in case voices are already available

// Button click event
button.addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  
  // Set the selected voice
  const selectedVoiceIndex = voiceSelect.value;
  if (voices[selectedVoiceIndex]) {
    speech.voice = voices[selectedVoiceIndex];
  }

  window.speechSynthesis.speak(speech);
});
