document.addEventListener("DOMContentLoaded", function () {

    // Get references to loader and counter elements
    const loaderElement = document.querySelector(".loader");
    const counterElement = document.getElementById("counter");

    // Show the loader initially
    // loaderElement.style.display = '';
    counterElement.style.display = 'none'; // Hide the counter initially

    // Simulate a delay to count the flags (e.g., 3 seconds)
    setTimeout(() => {
        // Count the number of keys in the text object
        flagCount = Object.keys(text).length;

        // If flag count is greater than 0, update the counter and hide loader
        if (flagCount > 0) {
            
            counterElement.textContent = `${flagCount}`;
            counterElement.style.fontSize = '40px'
            loaderElement.style.display = 'none'; // Hide the loader
            
            counterElement.style.display = 'block'; // Show the counter
        }else{
            counterElement.textContent = 'No Flags Detected';
            loaderElement.style.display = 'none'; // Hide the loader
            counterElement.style.display = 'block'; //
        }
        console.log(flagCount);
    }, 10000); // Simulates a 10-second max delay time
});