var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Translate = require('@google-cloud/translate').v2.Translate;
var translate = new Translate({ key: process.env.GOOGLE_CLOUD_API_KEY });
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
function translateObject(obj) {
    return __awaiter(this, void 0, void 0, function () {
        var language, textMap, translatedText, _i, _a, _b, key, value, translatedKey, translatedValue, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    language = obj.languageTo;
                    textMap = obj.text;
                    translatedText = {};
                    _i = 0, _a = Object.entries(textMap);
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    _b = _a[_i], key = _b[0], value = _b[1];
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, translate.translate(key, language)];
                case 3:
                    translatedKey = (_c.sent())[0];
                    return [4 /*yield*/, translate.translate(value, language)];
                case 4:
                    translatedValue = (_c.sent())[0];
                    translatedText[translatedKey] = translatedValue;
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _c.sent();
                    console.error("Error translating key-value pair (".concat(key, "):"), error_1);
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/, translatedText];
            }
        });
    });
}
translateObject(translationRequest)
    .then(function (translatedTextMap) {
    console.log('Translated Text Map:', translatedTextMap);
})
    .catch(function (error) {
    console.error('Error translating object:', error);
});
