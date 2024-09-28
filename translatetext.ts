const { Translate } = require('@google-cloud/translate').v2;

const translate = new Translate({ key: process.env.GOOGLE_CLOUD_API_KEY });

interface TranslationObject {
    languageTo: string;
    text: { [key: string]: string }; 
}

//sample input for test
// const text: { [key: string]: string } = {
//     "You can choose not to provide certain information, but then you might not be able to take advantage of many of our Amazon Services.": "This statement implies that users will lose access to essential services if they don't share their personal information, creating an unfair power imbalance.  This is coercive and manipulative.",
//     "We use your personal information to display interest-based ads for features, products, and services that might be of interest to you. We do not use information that personally identifies you to display interest-based ads.": "While claiming not to use personally identifying information for ads, the ambiguity leaves room for practices that could still compromise user privacy.  The lack of transparency is concerning.",
//     "These third-party service providers have access to personal information needed to perform their functions, but may not use it for other purposes.": "This assertion lacks concrete enforcement. There's no guarantee these third parties won't misuse user data, despite Amazon's claim.",
//     "As we continue to develop our business, we might sell or buy other businesses or services. In such transactions, customer information generally is one of the transferred business assets but remains subject to the promises made in any pre-existing Privacy Notice (unless, of course, the customer consents otherwise).": "The vague phrasing of 'generally' and the escape clause of 'unless, of course, the customer consents otherwise' diminishes user control over their data in business transactions. This is a potential risk.",
//     "We release account and other personal information when we believe release is appropriate to comply with the law; enforce or apply our Conditions of Use and other agreements; or protect the rights, property, or safety of Amazon, our users, or others.": "This broad justification for data release lacks transparency and oversight.  It allows Amazon significant leeway to share data without clearly defined limitations, potentially jeopardizing user privacy.",
//     "As described above, you can choose not to provide certain information, but then you might not be able to take advantage of many of the Amazon Services.": "This repeats a coercive tactic by implying that users must surrender data to access essential services.",
//     "Because cookies and identifiers allow you to take advantage of some essential features of Amazon Services, we recommend that you leave them turned on. For instance, if you block or otherwise reject our cookies, you will not be able to add items to your Shopping Cart, proceed to Checkout, or use any Services that require you to Sign in.": "This is another coercive statement, pressuring users into accepting tracking mechanisms under the guise of functionality.",
//     "Depending on your data choices, certain services may be limited or unavailable.": "This statement threatens to restrict service access based on users' privacy choices, essentially punishing them for prioritizing their data protection.",
//     "If you are under 18, you may use Amazon Services only with the involvement of a parent or guardian.": "While seemingly protective, this clause could limit access for minors who might need online services independently or in situations where parental oversight is unavailable or impractical.",
//     "If you choose to use Amazon Services, your use and any dispute over privacy is subject to this Notice and our Conditions of Use, including limitations on damages, resolution of disputes, and application of the law of the state of Washington.": "This attempts to limit user recourse in case of privacy violations by imposing a specific jurisdiction and potentially limiting compensation.",
//     "We stand behind the promises we make, however, and will never materially change our policies and practices to make them less protective of customer information collected in the past without the consent of affected customers.": "This claim is not legally binding and lacks specific mechanisms for user consent or notification of material policy changes. It provides a false sense of security."
// };

//pass in object language to, text(map of [key:string]:string)
// const translationRequest: TranslationObject = {
//     languageTo: 'es', 
//     text: 
// };

async function translateObject(obj: TranslationObject) {
    const language = obj.languageTo;
    const textMap = obj.text;
    const translatedText: { [key: string]: string } = {};
  
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

translateObject(translationRequest)
  .then(translatedTextMap => {
    console.log('Translated Text Map:', translatedTextMap);
  })
  .catch(error => {
    console.error('Error translating object:', error);
  });
