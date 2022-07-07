export function speak(s) {
  const utterance = new SpeechSynthesisUtterance(s);
  //utterance.lang = lang.langCode;
  speechSynthesis.speak(utterance);
}