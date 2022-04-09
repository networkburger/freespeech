export function currentLanguage() {
  return localStorage.getItem("root.lang") || "enGB";
}
export function setCurrentLanguage(lang) {
  localStorage.setItem("root.lang", lang);
}

export const languageStrings = {
  enGB: {
    langCode: "en-GB",
    isEnglish: true,
    general: {
      language: "Language",
      languageName: "English",
      appTitle: "FREE SPEECH",
    },
    write: { title: "QUIP" },
    build: {
      title: "BUILD",
      category: "category",
      newWordTitle: "New Word",
      newWordPlaceholder: "word",
      pronunciationPlaceholder: "phonetic pronunciation",
      cancelButton: "CANCEL",
      deleteWordTitle: "Delete Word?",
      deleteButton: "DELETE",
    },
    choose: {
      title: "CHOOSE",
    },
  },

  enUS: {
    langCode: "en-US",
    general: {
      languageName: "American English",
    },
  },

  frFR: {
    langCode: "fr-FR",
    general: {
      language: "Langue",
      languageName: "Française",
    },
    build: {
      category: "catégorie",
      newWordTitle: "Nouveau Mot",
      newWordPlaceholder: "mot",
      pronunciationPlaceholder: "prononciation phonétiquead",
      cancelButton: "ANNULER",
      deleteWordTitle: "Supprimer le Mot?",
      deleteButton: "EFFACER",
    },
  },
};

export function isEnglish(code) {
  return code === "en-GB" || code === "en-US";
}

export function loc(code) {
  const local = languageStrings[code] || languageStrings.enGB;
  const en = languageStrings.enGB;
  return {
    langCode: local.langCode || en.langCode,
    general: { ...en.general, ...local.general },
    build: { ...en.build, ...local.build },
    write: { ...en.write, ...local.write },
    choose: { ...en.choose, ...local.choose },
  };
}

export function speak(lang, s) {
  const utterance = new SpeechSynthesisUtterance(s);
  utterance.lang = lang.langCode;
  speechSynthesis.speak(utterance);
}
