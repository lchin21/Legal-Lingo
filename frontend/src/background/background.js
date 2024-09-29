// background/background.js

chrome.runtime.onInstalled.addListener(() => {
    console.log('TOS Analyzer Extension Installed.');
});
  
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content/contentScript.js']
    });
});