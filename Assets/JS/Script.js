document.addEventListener('DOMContentLoaded', function() {
    // Trigger initial label addition
    addLabels(getInputValue('pages'), getInputValue('KokId'), getSelectedRadioValue('rButtons'));

    // Print button event listener
    document.getElementById('Print').addEventListener('click', function() {
        addLabels(getInputValue('pages'), getInputValue('KokId'), getSelectedRadioValue('rButtons'));
        window.print();
    });

    // Advanced settings toggle
    document.getElementById('advancedSettingsToggle').addEventListener('click', function() {
        toggleAdvancedSettings(document.getElementById('advancedSettingsContent'));
    });

    // Attach change event listeners to inputs for real-time updates
    attachInputEventListeners();
});

function toggleAdvancedSettings(content) {
    var isOpen = content.style.display !== 'none';
    content.style.display = isOpen ? 'none' : 'block';
    content.style.maxHeight = isOpen ? null : content.scrollHeight + "px";
}

function attachInputEventListeners() {
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            // Trigger label addition upon any input change
            addLabels(getInputValue('pages'), getInputValue('KokId'), getSelectedRadioValue('rButtons'));
        });
    });
}

function addLabels(pages, KokID, Rpos) {
    console.log(Rpos);
    var labelPagesContainer = document.querySelector('.LabelPages');
    KokID = KokID || "6969"; // Default KokID to "1" if empty
    var Rcycle = [1, 1, 3, 3, 5, 5];
    Rpos = parseInt(Rpos) || 0; // Ensure Rpos is an integer
    
    // Clear existing labels
    labelPagesContainer.innerHTML = '';

    for (let page = 1; page <= pages; page++) {
        let pagesContainer = createPageContainer();
        for (let i = 1; i <= 51; i++) {
            Rpos = createLabel(pagesContainer, KokID, Rcycle, Rpos);
            if (Rpos >= Rcycle.length) {
                KokID++; // Increment KokID when Rpos exceeds Rcycle length
                Rpos = 0; // Reset Rpos
            }
        }
        labelPagesContainer.appendChild(pagesContainer);
    }
}

function createPageContainer() {
    var pagesContainer = document.createElement('div');
    pagesContainer.className = 'Pages';
    pagesContainer.style.backgroundSize = 'cover';
    pagesContainer.style.backgroundRepeat = 'no-repeat';
    return pagesContainer;
}

function createLabel(container, KokID, Rcycle, Rpos) {
    var labelDiv = document.createElement('div');
    labelDiv.className = 'label';
    labelDiv.style.backgroundColor = getRandomColor(0.25);

    // Check the checked status of the SK and R checkboxes
    var skCheckbox = document.getElementById('skCheckbox').checked;
    var rCheckbox = document.getElementById('rCheckbox').checked;

    var skDiv = document.createElement('div');
    skDiv.className = "SK";
    skDiv.style.textAlign = 'left';
    // Conditionally set the SK text based on the checkbox
    skDiv.innerText = skCheckbox ? `-SK- ${KokID}` : `⠀⠀⠀⠀ ${KokID}`;

    var rDiv = document.createElement('div');
    rDiv.className = "R";
    rDiv.style.textAlign = 'right'; // This line should correctly target rDiv
    // Conditionally set the R text based on the checkbox
    rDiv.innerText = rCheckbox ? `-R- ${Rcycle[Rpos]}` : `⠀⠀ ${Rcycle[Rpos]}`;

    labelDiv.appendChild(skDiv);
    labelDiv.appendChild(rDiv);
    container.appendChild(labelDiv);

    return Rpos + 1; // Return the next Rpos
}


function getRandomColor(alpha = 1) {
    return `rgba(${[...Array(3)].map(() => Math.floor(Math.random() * 256)).join(',')},${alpha})`;
}

function getInputValue(inputId) {
    return document.getElementById(inputId).value.trim();
}

function getSelectedRadioValue(radioName) {
    var selectedRadio = document.querySelector(`input[name="${radioName}"]:checked`);
    return selectedRadio ? selectedRadio.id : '0'; // Now returns the id of the selected radio button
}
