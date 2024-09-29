document.getElementById("subject").addEventListener("change", function () {
  let selectedElement = document.querySelector("#subject");
  let chosen = selectedElement.value;

  // localStorage.setItem('currentLanguage', chosen);
  // console.log(localStorage.getItem('currentLanguage'));
  chrome.storage.local.set({ currentLanguage: chosen });
  chrome.storage.local.get("currentLanguage", function (result) {
    console.log(result["currentLanguage"]);
  });
});

function setDefaultOption() {
  const dropdown = document.getElementById("subject");

  // Retrieve the stored value from Chrome storage
  chrome.storage.local.get("currentLanguage", function (result) {
    // Check if there's a stored value and set it as selected
    if (result.currentLanguage) {
      dropdown.value = result.currentLanguage;
    } else {
      dropdown.value = "English"; // Default option
    }
    console.log("Current language:", result.currentLanguage);
  });
}

setDefaultOption();
