let textToFind = {
  "If there is a problem charging your selected payment method, we may charge any other valid payment method associated with your account.": "This allows Amazon to charge you without your explicit consent if your primary payment method fails, which is unfair and potentially harmful.",
  "Amazon reserves the right to refuse service, terminate accounts, terminate your rights to use Amazon Services, remove or edit content, or cancel orders in its sole discretion.": "This gives Amazon excessive power to take actions against you without explanation or recourse, which is exploitative.",
  "If you do post content or submit material, and unless we indicate otherwise, you grant Amazon a nonexclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, perform, translate, create derivative works from, distribute, and display such content throughout the world in any media.": "This grants Amazon extremely broad rights to your content, potentially forever and without compensation, limiting your control and ability to profit from your own work.",
  "Amazon takes no responsibility and assumes no liability for any content posted by you or any third party.": "This clause releases Amazon from responsibility for harmful or illegal content on their platform, leaving you vulnerable and unprotected.",
  "THE AMAZON SERVICES AND ALL INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE) AND OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE AMAZON SERVICES ARE PROVIDED BY AMAZON ON AN “AS IS” AND “AS AVAILABLE” BASIS, UNLESS OTHERWISE SPECIFIED IN WRITING. AMAZON MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE AMAZON SERVICES, OR THE INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE) OR OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE AMAZON SERVICES, UNLESS OTHERWISE SPECIFIED IN WRITING.": "This is a broad disclaimer of liability, meaning Amazon is not responsible for issues or damages that may arise from using their services. This leaves you with little protection in case of problems.",
  "TO THE FULL EXTENT PERMISSIBLE BY LAW, AMAZON WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF ANY AMAZON SERVICE, OR FROM ANY INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE) OR OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH ANY AMAZON SERVICE, INCLUDING, BUT NOT LIMITED TO DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, AND CONSEQUENTIAL DAMAGES, UNLESS OTHERWISE SPECIFIED IN WRITING.": "This is a broad limitation of liability that protects Amazon from any damages, including financial losses and harm caused by their services. This shifts responsibility and risk almost entirely to you.",
  "Any dispute or claim relating in any way to your use of any Amazon Service will be adjudicated in the state or Federal courts in King County, Washington, and you consent to exclusive jurisdiction and venue in these courts.": "This forces you to resolve disputes in a specific location, regardless of where you live, making it potentially expensive and inconvenient to seek legal action against them.",
  "We each waive any right to a jury trial.": "This clause forces you to give up your right to a trial by jury, severely limiting your options for resolving disputes. This gives Amazon an advantage in any litigation."
}

const tooltip = document.createElement('div');
tooltip.style.position = 'absolute';
tooltip.style.backgroundColor = 'black';
tooltip.style.color = 'white';
tooltip.style.padding = '5px';
tooltip.style.borderRadius = '4px';
tooltip.style.display = 'none'; // Initially hidden
tooltip.style.zIndex = '1000'; // Ensure it's above other content
document.body.appendChild(tooltip); // Add it to the body

const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');


if (localStorage.getItem("currentLanguage") == "English"){
  elements.forEach(element => {
  let newHTML = element.innerHTML; // Start with the original HTML

  // Loop through each key and replace it with a highlighted span
  for (const key in textToFind) {
    const regex = new RegExp(`(${key})`, 'g'); // Create a regex to match the key
    newHTML = newHTML.replace(regex, (match) => {
      // Use a unique identifier for each span
      const uniqueKey = `highlight-${Date.now()}-${Math.random()}`;
      return `<span id="${uniqueKey}" class="highlight" style="border: 2px solid red; background-color: red;" data-tooltip="${textToFind[key]}">${match}</span>`;
    });
  }

  // Update the innerHTML once after all replacements
  element.innerHTML = newHTML;

  // Now, add event listeners for each highlighted element
  const highlightedElements = element.querySelectorAll('.highlight');

  highlightedElements.forEach(highlightedElement => {
    highlightedElement.addEventListener('mouseenter', (event) => {
      tooltip.textContent = highlightedElement.getAttribute('data-tooltip'); // Set tooltip text
      tooltip.style.display = 'block'; // Show the tooltip
      tooltip.style.left = `${event.pageX + 10}px`; // Position tooltip
      tooltip.style.top = `${event.pageY + 10}px`;
    });

    highlightedElement.addEventListener('mousemove', (event) => {
      tooltip.style.left = `${event.pageX + 10}px`; // Update tooltip position
      tooltip.style.top = `${event.pageY + 10}px`;
    });

    highlightedElement.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none'; // Hide the tooltip
    });
  });
});
}
else {
  // let translatedTextToFind = translate(textToFind);
  let translatedTextToFind = {"spanishk1" : "spanishv1", "spanishk2" : "spanishv2", "spanishk3" : "spanishv3"};
  let translatedArray = Array.from(translatedTextToFind);
  originalArray = Array.from(textToFind)

    elements.forEach(element => {
      let newHTML = element.innerHTML; // Start with the original HTML

      // Loop through each key in the first map (textToFind)
      for (let i = 0; i<translatedArray.length; i++) {
        const regex = new RegExp(`(${originalArray[i][0]})`, 'g'); // Create a regex to match the key
        newHTML = newHTML.replace(regex, (match) => {
          // Use the key from the second map for the replacement
          // const replacement = translatedArray[i][0]; // Get the replacement from the second map

          // Use a unique identifier for each span
          const uniqueKey = `highlight-${Date.now()}-${Math.random()}`;
          return `<span id="${uniqueKey}" class="highlight" style="border: 2px solid red; background-color: red;" data-tooltip="${translatedTextToFind[i][1]}">${translatedTextToFind[i][0]}</span>`;
        });
      }

      // Update the innerHTML once after all replacements
      element.innerHTML = newHTML;
    });

}



