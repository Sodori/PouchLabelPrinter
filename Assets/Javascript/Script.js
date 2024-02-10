document.addEventListener('DOMContentLoaded', (event) => {
    const scanButton = document.getElementById('ScanButton'); // The button to trigger the scanning feature
    const resultDiv = document.getElementById('result'); // Listing the results here
    const errorDiv = document.getElementById('error'); // Case any errors
    let isCameraOn = false;
    let quaggaInstance = null;

    updateButtonText();

    scanButton.addEventListener('click', () => {
        console.log('Hello world!')
        if (!isCameraOn) {
            startBarcodeScanner()
                .then((barcodeValue) => {
                    // Append the new barcode value to the existing content
                    resultDiv.textContent += `Barcode Value: ${barcodeValue}\n`;
                })
                .catch((error) => {
                    errorDiv.textContent = 'Error scanning barcode. Please try again.';
                    console.error(error);
                });
        } else {
            stopBarcodeScanner();
        }

        isCameraOn = !isCameraOn;
        updateButtonText();
    });
});

function startBarcodeScanner() {
    console.log('Hello me!')
    return new Promise((resolve, reject) => {
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
                        stopBarcodeScanner();
                        resolve(result.codeResult.code);
                    });
                }
            });
        } else {
            resolve();
        }
    });
}

function stopBarcodeScanner() {
    if (isCameraOn && quaggaInstance) {
        quaggaInstance.stop();
        quaggaInstance = null;
    }
}

function updateButtonText() {
    const scanButton = document.getElementById('ScanButton');
    console.log('Update Button Text:', isCameraOn, scanButton);

    scanButton.textContent = isCameraOn ? 'Stop Scanning' : 'Scan Barcodes';
    // if (scanButton) {
    //     scanButton.textContent = isCameraOn ? 'Stop Scanning' : 'Scan Barcodes';
    // }
}
