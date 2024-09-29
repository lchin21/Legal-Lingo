document.getElementById('subject').addEventListener('change', function() {
    let selectedElement = document.querySelector('#subject');
    let chosen = selectedElement.value;

    localStorage.setItem('currentLanguage', chosen);
    console.log(localStorage.getItem('currentLanguage'));
});

function setDefaultOption() {
        const dropdown = document.getElementById('subject');
        let storedValue = localStorage.getItem('currentLanguage');

        // Check if there's a stored value and set it as selected
        if (storedValue) {
            dropdown.value = storedValue;
        }
        else {
            dropdown.value = "English";
        }
}

setDefaultOption()


