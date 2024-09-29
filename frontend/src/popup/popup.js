document.getElementById('analyzeBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;
    
        chrome.scripting.executeScript(
            {
            target: { tabId: tabs[0].id },
            files: ['content/contentScript.js']
            },
            () => {
                console.log('Content script injected.');
            }
        );
    });
});



