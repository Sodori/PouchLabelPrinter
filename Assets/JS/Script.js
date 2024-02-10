document.addEventListener('DOMContentLoaded', (event) => {
    const scanButton = document.getElementById('ScanButton'); // Button to initialize scanning
    const resultDiv = document.getElementById('result'); // Results are listed here
    const errorDiv = document.getElementById('error'); // Results are listed here
    let isCameraOn = false; // Variable to track the camera state
    let quaggaInstance = null; // Variable to store the Quagga instance

    updateButtonText(); // Set initial button text

    scanButton.addEventListener('click', () => {
        if (!isCameraOn) {
            startBarcodeScanner()
                .then((barcodeValue) => {
                    resultDiv.textContent += `Barcode Value: ${barcodeValue}\n`;
                })
                .catch((error) => {
                    errorDiv.textContent = 'Error scanning barcode. Please try again.';
                    console.error(error);
                });
        } else {
            stopBarcodeScanner();
            errorDiv.textContent = ''; // Clear the result when stopping the camera
        }

        // Toggle the camera state
        isCameraOn = !isCameraOn;

        // Update button text after toggling the camera
        updateButtonText();
    });
});

// Move the isCameraOn variable to a broader scope
let isCameraOn = false;

function startBarcodeScanner() {
    return new Promise((resolve, reject) => {
        // Configure QuaggaJS if the camera is not already on
        if (!isCameraOn) {
            Quagga.init({
                inputStream: {
                    name: 'Live',
                    type: 'LiveStream',
                    target: document.querySelector('#scanner-container'),
                    constraints: {
                        width: 480,
                        height: 320,
                        facingMode: 'environment',
                    },
                },
                decoder: {
                    readers: ['ean_reader'],
                },
            }, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    quaggaInstance = Quagga;
                    quaggaInstance.start();
                    quaggaInstance.onDetected((result) => {
                        stopBarcodeScanner(); // Stop the scanner after detecting a barcode
                        resolve(result.codeResult.code);
                    });
                }
            });
        } else {
            // If the camera is already on, resolve immediately
            resolve();
        }
    });
}

function stopBarcodeScanner() {
    // Add code to stop the barcode scanner only if the camera is currently on
    if (isCameraOn && quaggaInstance) {
        quaggaInstance.stop();
        quaggaInstance = null;
    }
}

function updateButtonText() {
    // Set button text based on the camera state
    const scanButton = document.getElementById('ScanButton');
    if (scanButton) {
        scanButton.textContent = isCameraOn ? 'Stop Scanning' : 'Scan Barcodes';
    }
}
