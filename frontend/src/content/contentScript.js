(function() {
    // Function to extract TOS text
    function getTOSText() {
      // This is a simplistic approach; adjust selectors as needed
      const tosElement = document.body;
      return tosElement.innerText;
    }
  
    // Function to display analysis
    function displayAnalysis(result) {
      const analysisDiv = document.createElement('div');
      analysisDiv.style.position = 'fixed';
      analysisDiv.style.bottom = '10px';
      analysisDiv.style.right = '10px';
      analysisDiv.style.width = '300px';
      analysisDiv.style.height = '200px';
      analysisDiv.style.overflow = 'auto';
      analysisDiv.style.backgroundColor = 'rgba(0,0,0,0.8)';
      analysisDiv.style.color = '#fff';
      analysisDiv.style.padding = '10px';
      analysisDiv.style.zIndex = '10000';
      analysisDiv.style.borderRadius = '8px';
      analysisDiv.innerHTML = `<h3>TOS Analysis</h3><pre>${result}</pre>`;
      document.body.appendChild(analysisDiv);
    }
  
    // Main Execution
    const tosText = getTOSText();
    const analysisResult = analyzeTOS(tosText);
    displayAnalysis(analysisResult);
})();

document.getElementById('subject').addEventListener('change', function () {
    let selectedElement = document.querySelector('#subject');
    let chosen = selectedElement.value;

    chrome.storage.local.set({ language: chosen }).then(() => {
        console.log("Language is set");
    });
});

function setDefaultOption() {
    chrome.storage.local.get(['language'], function (data) {
        const dropdown = document.getElementById('subject');
        const storedValue = data.language;

        // Check if there's a stored value and set it as selected
        if (storedValue) {
            dropdown.value = storedValue;
        }
        else {
            dropdown.value = "English"
        }
    });
}