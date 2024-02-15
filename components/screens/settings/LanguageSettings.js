// LanguageSettings.js
const languages = {
  en: {
    noDeckSelected: "No Deck Selected",
    noFlashcardsAvailable: "No flashcards available for this deck",
    flashcardsFor: "Flashcards for",
  },
  es: {
    noDeckSelected: "Ninguna baraja seleccionada",
    noFlashcardsAvailable: "No hay tarjetas disponibles para esta baraja",
    flashcardsFor: "Tarjetas para",
  },
  fr: {
    noDeckSelected: "Aucun deck sélectionné",
    noFlashcardsAvailable: "Aucune carte disponible pour ce deck",
    flashcardsFor: "Cartes pour",
  },
  jp: {
    noDeckSelected: "デッキが選択されていません",
    noFlashcardsAvailable: "このデッキには利用可能なフラッシュカードがありません",
    flashcardsFor: "フラッシュカード"
  },
  // Add more languages here
};

// 1. Dynamic Language Selection
let currentLanguage = 'en'; // Default language

const setLanguage = (languageCode) => {
  if (languages[languageCode]) {
    currentLanguage = languageCode;
    // Save the selected language preference in local storage or state
    // You can use Redux or Context API for global state management
  } else {
    console.error(`Language '${languageCode}' is not supported.`);
  }
};

const getLocalizedString = (key) => {
  return languages[currentLanguage][key] || key; // Fallback to the key itself if translation is missing
};

// 2. Additional Languages
// Add more languages to the 'languages' object as needed

// 3. Localized Images and Icons
// Provide localized versions of images and icons

// 4. Language-Specific Formatting
// Implement language-specific formatting for dates, numbers, and currencies

// 5. Text-to-Speech Support
// Implement text-to-speech functionality if needed

// 6. Community Contributions
// Allow users to contribute translations or suggest improvements

// 7. Fallback Language
// Implement a fallback language (e.g., English) for missing translations

// 8. RTL (Right-to-Left) Support
// Implement RTL support for languages that are written from right to left

export { setLanguage, getLocalizedString };
