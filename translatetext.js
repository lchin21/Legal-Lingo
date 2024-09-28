const { Translate } = require('@google-cloud/translate').v2;

const translate = new Translate({ key: process.env.GOOGLE_CLOUD_API_KEY });

// Sample input for test
// const text = {
//     "You can choose not to provide certain information, but then you might not be able to take advantage of many of our Amazon Services.": 
//         "This statement implies that users will lose access to essential services if they don't share their personal information, creating an unfair power imbalance. This is coercive and manipulative.",
//     "We use your personal information to display interest-based ads for features, products, and services that might be of interest to you. We do not use information that personally identifies you to display interest-based ads.": 
//         "While claiming not to use personally identifying information for ads, the ambiguity leaves room for practices that could still compromise user privacy. The lack of transparency is concerning.",
//     // More key-value pairs...
// };

// Pass in object language to, text(map of [key:string]:string)
const translationRequest = {
    languageTo: 'es', 
    text: text
};

async function translateObject(obj) {
    const language = obj.languageTo;
    const textMap = obj.text;
    const translatedText = {};
  
    for (const [key, value] of Object.entries(textMap)) {
        try {
            const [translatedKey] = await translate.translate(key, language);
            const [translatedValue] = await translate.translate(value, language);
      
            translatedText[translatedKey] = translatedValue;
        } catch (error) {
            console.error(`Error translating key-value pair (${key}):`, error);
        }
    }
  
    return translatedText;
}

function highlightImportant(obj) {
    const text = obj.text;
    const toHighlight = Object.keys(text);
    console.log(toHighlight);
}

translateObject(translationRequest)
  .then(translatedTextMap => {
    console.log('Translated Text Map:', translatedTextMap);
  })
  .catch(error => {
    console.error('Error translating object:', error);
  });

    .catch(function (error) {
    console.error('Error translating object:', error);
});
