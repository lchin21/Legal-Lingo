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
    console.log(`lang: ${lang}`);
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
    let newHTML = element.innerHTML; // Start with the original HTML

    // Loop through each key and replace it with a highlighted span
    for (const key in textToFind) {
      const regex = new RegExp(`(${key})`, "g"); // Create a regex to match the key
      newHTML = newHTML.replace(regex, (match) => {
        // Use a unique identifier for each span
        const uniqueKey = `highlight-${Date.now()}-${Math.random()}`;
        return `<span id="${uniqueKey}" class="highlight" style="border: 2px solid red; background-color: red;" data-tooltip="${
          isTranslated ? translatedText.vals[key] : textToFind[key]
        }">${isTranslated ? translatedText.keys[key] : match}</span>`;
      });
    }

    // Update the innerHTML once after all replacements
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
    await highlightAndTranslate(textToFind);
  })();
}
