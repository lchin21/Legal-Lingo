


document.addEventListener("DOMContentLoaded", function () {
    // const text = {
    //     "Statement 1": "Explanation 1",
    //     "Statement 2": "Explanation 2",
    //     "Statement 3": "Explanation 3",
    //     "Statement 4": "Explanation 4",
    //     "Statement 5": "Explanation 5"
    // };
    // 
  
    // Get references to loader and counter elements
    const loaderElement = document.querySelector(".loader");
    const counterElement = document.getElementById("counter");

    // Initialize flag count to 0
    let flagCount = 0;

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
    }, 3000); // Simulates a 3-second loading time
});
