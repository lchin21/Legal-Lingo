async function callGemini(text) {
  try {
    const gemini = await fetch(
      "https://termsinator-backend-108092707474.us-central1.run.app/gemini",
      {
        method: "POST",
        body: JSON.stringify({
          prompt: text,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    ).then((res) => res.json());
    return gemini;
  } catch (err) {
    console.log(err);
  }
}

async function handleGeminiCall(text1) {
  let obj;
  try {
    obj = await callGemini(text1);
  } catch (error) {
    console.error("Error calling Gemini:", error);
  }
  return obj;
}

async function callTranslate(text, language) {
  try {
    const translate = await fetch(
      "https://termsinator-backend-108092707474.us-central1.run.app/translate",
      {
        method: "POST",
        body: JSON.stringify({
          text: text,
          lang: language,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    ).then((res) => res.json());
    return translate;
  } catch (err) {
    console.log(err);
  }
}

async function handleTranslateCall(text1, lang) {
  let obj;
  try {
    obj = await callTranslate(text1, lang);
  } catch (error) {
    console.error("Error calling Translate:", error);
  }
  return obj;
}

function getLanguageFromStorage() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("currentLanguage", function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result["currentLanguage"] || "English"); // Default to English if not set
      }
    });
  });
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function generateExactMatchRegex(key) {
  return new RegExp(`(${escapeRegExp(key)})`, 'gi');
}

function extractVisibleText(element) {
  let text = '';
  for (let node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      text += extractVisibleText(node);
    }
  }
  return text;
}

async function highlightAndTranslate(textToFind) {
  textToFind = await textToFind;
  const tooltip = document.createElement("div");
  tooltip.style.position = "absolute";
  tooltip.style.backgroundColor = "black";
  tooltip.style.color = "white";
  tooltip.style.padding = "5px";
  tooltip.style.borderRadius = "4px";
  tooltip.style.display = "none"; // Initially hidden
  tooltip.style.zIndex = "1000"; // Ensure it's above other content
  document.body.appendChild(tooltip); // Add it to the body

  const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p");

  let translatedText;
  let isTranslated = false;
  let lang;
  try {
    lang = await getLanguageFromStorage();
  } catch (error) {
    console.error("Failed to retrieve language:", error);
    lang = "English"; // Fallback to default if error
  }
  if (lang !== "English") {
    try {
      const translationResult = await handleTranslateCall(textToFind, lang);
      translatedText = translationResult;
      isTranslated = true;
    } catch (error) {
      console.error("Translation failed:", error);
    }
  }

  elements.forEach((element) => {
    const originalHTML = element.innerHTML;
    let visibleText = extractVisibleText(element);
    let matches = [];

    for (const key in textToFind) {
      const regex = generateExactMatchRegex(key);
      let match;
      while ((match = regex.exec(visibleText)) !== null) {
        matches.push({
          key: key,
          index: match.index,
          length: match[0].length,
          original: match[0]
        });
      }
    }

    // Sort matches by index (to process from end to start)
    matches.sort((a, b) => b.index - a.index);

    let newHTML = originalHTML;
    for (const match of matches) {
      const replacement = `<span class="highlight" style="border: 2px solid red; background-color: red;" data-tooltip="${
        isTranslated ? translatedText.vals[match.key] : textToFind[match.key]
      }">${match.original}</span>`;
      
      newHTML = newHTML.slice(0, match.index) + replacement + newHTML.slice(match.index + match.length);
    }

    element.innerHTML = newHTML;

    // Now, add event listeners for each highlighted element
    const highlightedElements = element.querySelectorAll(".highlight");

    highlightedElements.forEach((highlightedElement) => {
      highlightedElement.addEventListener("mouseenter", (event) => {
        tooltip.textContent = highlightedElement.getAttribute("data-tooltip"); // Set tooltip text
        tooltip.style.display = "block"; // Show the tooltip
        tooltip.style.left = `${event.pageX + 10}px`; // Position tooltip
        tooltip.style.top = `${event.pageY + 10}px`;
      });

      highlightedElement.addEventListener("mousemove", (event) => {
        tooltip.style.left = `${event.pageX + 10}px`; // Update tooltip position
        tooltip.style.top = `${event.pageY + 10}px`;
      });

      highlightedElement.addEventListener("mouseleave", () => {
        tooltip.style.display = "none"; // Hide the tooltip
      });
    });
  });
}

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
  "terms",
];

// Function to check headers
function isTOS() {
  chrome.storage.local.set({ numFlags: 0 });
  // Accumulate all the text from h1 to h6
  let headersText = "";
  for (let i = 1; i <= 6; i++) {
    const headers = document.getElementsByTagName(`h${i}`);
    for (let header of headers) {
      headersText += header.innerText + " ";
    }
  }

  // Split the accumulated text into words and convert to lower case
  const words = headersText.toLowerCase().split(/\s+/);

  // Check for matches with the constant list
  const matches = termsOfServiceTitles.filter((keyword) =>
    words.includes(keyword)
  );

  // Log or return the matches
  if (matches.length < 3) {
    return false;
  } else {
    return true;
  }
}

// Function to accumulate text from paragraphs and body elements
async function generateGeminiText() {
  let bodyText = document.querySelector("body").innerText;

  // return the accumulated body text
  const text = await handleGeminiCall(bodyText);
  return text;
}

// Run the function
if (isTOS()) {
  (async function () {
    const textToFind = await generateGeminiText();
    chrome.storage.local.set({ numFlags: Object.keys(textToFind).length });
    console.log(textToFind);
    await highlightAndTranslate(textToFind);
  })();
}
