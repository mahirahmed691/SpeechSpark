# Speech Spark

# Speech Spark

Speech Spark is a sophisticated React Native Expo application designed to empower non-verbal communication, foster mental well-being, and deliver a captivating user experience through interactive gaming features. Leveraging Expo's Speech functionality, this app provides seamless text-to-speech capabilities, a robust diary feature for personal journaling, and curated mental health resources. Additionally, it introduces engaging games to elevate the overall user experience.

## Unique Features

### 1. Non-Verbal Communication

- Harnesses the power of Expo Speech for fluid text-to-speech functionality.
- Personalize the user experience with customizable voices.

### 2. Diary Feature

- Empowers users to chronicle their thoughts and experiences.
- Intuitive interface for seamless daily entries.

### 3. Mental Health Resources

- Offers a curated collection of mental health resources and insightful tips.
- Nurtures well-being through informative content.

### 4. Interactive Games

- Elevates user engagement with captivating and interactive gaming features.
- Enhances the overall user experience through thoughtful design.

## Customizing Voices

Tailor the text-to-speech experience by customizing voices through the `speakText` function in [App.js](./App.js). Refer to the Expo Speech documentation for [available voices](https://docs.expo.dev/versions/latest/sdk/speech/).

Here's an example of how to customize voices:

```jsx
const speakText = (text) => {
  Speech.stop(); // Stop any existing speech

  // Specify the voiceId for the desired voice
  const voiceId = 'com.apple.ttsbundle.Moira-compact';

  // Speak the text using the specified voice
  Speech.speak(text, {
    voiceId,
  });
};


### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/speech-spark.git
   cd speech-spark


### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/expo-speech-demo.git
   cd expo-speech-demo

npm install
# or
yarn install

expo start
