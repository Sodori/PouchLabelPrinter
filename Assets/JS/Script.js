// Function to create and append 51 div elements with the class 'label' for each page
function addLabels(pages, KokID, Rpos) {
    var labelPagesContainer = document.querySelector('.LabelPages');
    var Rcycle = [1, 1, 3, 3, 5, 5];

    // Clear existing pages
    while (labelPagesContainer.firstChild) {
        labelPagesContainer.removeChild(labelPagesContainer.firstChild);
    }

    if (KokID == "") {
        KokID = "1";
    }

    console.log("Starting addLabels script:");
    console.log("Pages: ", pages);
    console.log("KokId: ", KokID);
    console.log("R-position: ", Rpos);

    for (var page = 1; page <= pages; page++) {
        var pagesContainer = document.createElement('div');
        pagesContainer.className = 'Pages';
        // pagesContainer.style.backgroundImage = "url('assets/media/background.jpg')";
        pagesContainer.style.backgroundSize = 'cover';
        pagesContainer.style.backgroundRepeat = 'no-repeat';

        for (var i = 1; i <= 51; i++) {
            var labelDiv = document.createElement('div');
            labelDiv.className = 'label';

            // Create the SKR div with two nested divs
            var skrDiv = document.createElement('div');
            skrDiv.className = 'SKR';

            var skDiv = document.createElement('div');
            skDiv.className = "SK";
            skDiv.innerText = '-SK- ' + KokID;

            var rDiv = document.createElement('div');
            rDiv.className = "R";
            rDiv.innerText = '-R- ' + Rcycle[Rpos];
            
            // Add one to Rpos
            Rpos++;

            // Check if Rpos is five, then add one to KokID and reset Rpos to zero
            if (Rpos === 6) {
            KokID++;
            Rpos = 0;
            }

            // Append the nested divs to the SKR div
            skrDiv.appendChild(skDiv);
            skrDiv.appendChild(rDiv);

            // Append the SKR div to the label div
            labelDiv.appendChild(skrDiv);

            // labelDiv.innerText = 'Page ' + page + ', Label ' + i; // Optional: Add text content

            // Generate a random background color
            var randomColor = getRandomColor(0.25);
            labelDiv.style.backgroundColor = randomColor;

            pagesContainer.appendChild(labelDiv);
        }

        labelPagesContainer.appendChild(pagesContainer);
    }
}

  
// Function to generate a random color
function getRandomColor(alpha) {
    if (alpha === undefined) {
        alpha = 1; // Default to fully opaque if alpha is not provided
    }
    
    var letters = '0123456789ABCDEF';
    var color = '#';
    
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    // Convert hex to rgba
    var hexColor = parseInt(color.substring(1), 16);
    var r = (hexColor >> 16) & 255;
    var g = (hexColor >> 8) & 255;
    var b = hexColor & 255;

    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

function getInputValue(inputId) {
// Get the value of the input element with the specified ID
var value = document.getElementById(inputId).value
console.log(value)
return document.getElementById(inputId).value;
}

function getSelectedRadioValue(radioName) {
// Get the value of the selected radio button within the specified radio group
var radioButtons = document.getElementsByName(radioName);
for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
    return radioButtons[i].id;
    }
}
// Return a default value if no radio button is checked
return 'defaultRadioValue';
}


  document.addEventListener('DOMContentLoaded', function() {
    // Call the function with the desired number of pages (change the parameter value as needed)
    // addLabels(2,3630,0);
    addLabels(getInputValue('pages'), getInputValue('KokId'), getSelectedRadioValue('rButtons'));

    var printButton = document.getElementById('Print');

    // Event listener for the "Print" button
    printButton.addEventListener('click', function() {
      // Call the function with the desired number of pages
      addLabels(getInputValue('pages'), getInputValue('KokId'), getSelectedRadioValue('rButtons'));
  
      // Perform printing action
      window.print();
    });
  });
  
