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