let changed = false;
// Get references to loader and counter elements
const loaderElement = document.querySelector(".loader");
const counterElement = document.getElementById("counter");

function getNumFlagsFromStorage() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get("numFlags", function (result) {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result["numFlags"] || 0); // Default to English if not set
        }
      });
    });
  }

chrome.storage.onChanged.addListener(async (changes, namespace) => {
    if (namespace === 'local') {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
            const numFlags = await getNumFlagsFromStorage();
            if (key = "numFlags" && numFlags > 0) {
                counterElement.textContent = `Red Flags: ${numFlags}`;
                counterElement.style.fontSize = '150%';
                loaderElement.style.display = 'none'; // Hide the loader
                counterElement.style.display = 'block'; // Show the counter
                changed = true;
            }
        }
    }

  });



document.addEventListener("DOMContentLoaded", async function () {
    counterElement.style.display = 'none'; // Hide the counter initially
    const numFlags = await getNumFlagsFromStorage();
    if (numFlags > 0) {
        counterElement.textContent = `Red Flags: ${numFlags}`;
        counterElement.style.fontSize = '150%';
        loaderElement.style.display = 'none'; // Hide the loader
        counterElement.style.display = 'block'; // Show the counter
        counterElement.offsetHeight; // Force redraw
        console.log(counterElement.style.display);
        changed = true;
    }

    // Show the loader initially
    // loaderElement.style.display = '';

    setTimeout(() => {
        // If flag count is greater than 0, update the counter and hide loader
        if (!changed) {
            counterElement.textContent = 'No Red Flags Detected';
            loaderElement.style.display = 'none'; // Hide the loader
            counterElement.style.display = 'block';
        }
    }, 10000); // Simulates a 10-second max delay time
});