// Your constant list of strings
const termsOfServiceTitles = [
    "terms",
    "service",
    "conditions",
    "agreement",
    "policy",
    "license",
    "privacy",
    "acceptable",
    "service",
    "legal",
    "customer",
    "conduct",
    "code",
    "use",
    "guidelines",
    "protection",
    "agreement",
    "membership",
    "terms"
];

// Function to check headers
function isTOS() {
    // Accumulate all the text from h1 to h6
    let headersText = '';
    for (let i = 1; i <= 6; i++) {
        const headers = document.getElementsByTagName(`h${i}`);
        for (let header of headers) {
            headersText += header.innerText + ' ';
        }
    }

    // Split the accumulated text into words and convert to lower case
    const words = headersText.toLowerCase().split(/\s+/);

    // Check for matches with the constant list
    const matches = termsOfServiceTitles.filter(keyword => words.includes(keyword));

    // Log or return the matches
    if(matches.length < 3){
        return false;
    }
    else{
        return true;
    }
}

// Function to accumulate text from paragraphs and body elements
function accumulateBodyText() {
    let bodyText = '';

    // Select all paragraph elements
    const paragraphs = document.getElementsByTagName('p');
    for (let paragraph of paragraphs) {
        bodyText += paragraph.innerText + ' ';
    }

    // Select other relevant body elements (optional)
    const otherBodyElements = document.querySelectorAll('div, span'); // Adjust as needed
    otherBodyElements.forEach(element => {
        bodyText += element.innerText + ' ';
    });

    // Trim any excess whitespace
    bodyText = bodyText.trim();

    // Log or return the accumulated body text
    console.log('Accumulated Body Text:', bodyText);
    return bodyText;
}

// Run the function
if (isTOS){
    accumulateBodyText();
}



