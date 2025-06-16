function convertBase() {
    const number = document.getElementById('number-to-convert').value.trim();
    const fromBase = parseInt(document.getElementById('from-base').value);
    const toBase = parseInt(document.getElementById('to-base').value);
    const resultElement = document.getElementById('base-result');
    try {
        // Validate input
        if (!number) {
            throw new Error('Please enter a number');
        }
        // Validate number format based on fromBase
        const validPatterns = {
            2: /^[01]+$/,
            8: /^[0-7]+$/,
            10: /^-?\d+$/,
            16: /^[0-9A-Fa-f]+$/
        };
        if (!validPatterns[fromBase].test(number)) {
            throw new Error(`Invalid ${getBaseName(fromBase)} number format`);
        }
        // Convert to decimal first
        let decimal;
        try {
            decimal = parseInt(number, fromBase);
            if (isNaN(decimal)) {
                throw new Error('Invalid number');
            }
        } catch (error) {
            throw new Error(`Invalid ${getBaseName(fromBase)} number: ${error.message}`);
        }
        // Convert to target base
        let result;
        if (toBase === 10) {
            result = decimal.toString();
        } else {
            result = decimal.toString(toBase).toUpperCase();
        }
        // Format the result
        let resultText = `<strong>Conversion:</strong> ${getBaseName(fromBase)} to ${getBaseName(toBase)}<br><br>`;
        resultText += `<strong>Input:</strong> ${number} (${getBaseName(fromBase)})<br><br>`;
        resultText += `<strong>Result:</strong> ${result} (${getBaseName(toBase)})<br><br>`;
        resultText += `<strong>Calculation Steps:</strong><br>`;
        resultText += `1. Convert ${number} from ${getBaseName(fromBase)} to decimal: ${decimal}<br>`;
        resultText += `2. Convert ${decimal} from decimal to ${getBaseName(toBase)}: ${result}`;
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        // Log the conversion
        console.log(`Base conversion: ${number} (${getBaseName(fromBase)}) → ${result} (${getBaseName(toBase)})`);
    } catch (error) {
        if (typeof showError === 'function') {
            showError('base-result', error.message);
        } else {
            resultElement.textContent = 'Error: ' + error.message;
        }
    }
}

function getBaseName(base) {
    const baseNames = {
        2: 'Binary',
        8: 'Octal',
        10: 'Decimal',
        16: 'Hexadecimal'
    };
    return baseNames[base] || `Base-${base}`;
}

document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for base converter
    const convertBaseBtn = document.getElementById('convert-base');
    if (convertBaseBtn) {
        convertBaseBtn.addEventListener('click', convertBase);
    }
    // Add event listeners for base selection changes
    const fromBaseSelect = document.getElementById('from-base');
    if (fromBaseSelect) {
        fromBaseSelect.addEventListener('change', () => {
            const number = document.getElementById('number-to-convert');
            const fromBase = document.getElementById('from-base').value;
            number.value = '';
            number.placeholder = `Enter ${getBaseName(fromBase)} number`;
        });
    }
    const toBaseSelect = document.getElementById('to-base');
    if (toBaseSelect) {
        toBaseSelect.addEventListener('change', () => {
            const number = document.getElementById('number-to-convert');
            if (number.value) {
                convertBase();
            }
        });
    }
    // Add event listener for input changes with debounce
    const numberInput = document.getElementById('number-to-convert');
    if (numberInput) {
        let debounceTimer;
        numberInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(convertBase, 300); // Wait for 300ms after user stops typing
        });
    }
}); 