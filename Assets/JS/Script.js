// Function to create and append 51 div elements with the class 'label' for each page
function addLabels(pages) {
    var labelPagesContainer = document.querySelector('.LabelPages');
  
    for (var page = 1; page <= pages; page++) {
      var pagesContainer = document.createElement('div');
      pagesContainer.className = 'Pages';
      pagesContainer.style.backgroundImage = "url('assets/media/background.jpg')";
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
        skDiv.innerText = '-SK-';

        var rDiv = document.createElement('div');
        rDiv.className = "R";
        rDiv.innerText = '-R-';

        // Append the nested divs to the SKR div
        skrDiv.appendChild(skDiv);
        skrDiv.appendChild(rDiv);

        // Append the SKR div to the label div
        labelDiv.appendChild(skrDiv);


        // labelDiv.innerText = 'Page ' + page + ', Label ' + i; // Optional: Add text content
  
        // Generate a random background color
        var randomColor = getRandomColor();
        skrDiv.style.backgroundColor = randomColor;
  
        pagesContainer.appendChild(labelDiv);
      }
  
      labelPagesContainer.appendChild(pagesContainer);
    }
  }
  
// Function to generate a random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  // Run addLabels when the document is fully loaded
  document.addEventListener('DOMContentLoaded', function () {
    // Call the function with the desired number of pages (change the parameter value as needed)
    addLabels(2); // Example: Create 5 pages with 51 labels each
  });
  