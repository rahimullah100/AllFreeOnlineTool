function generateRandomNumbers() {
    const minValue = parseFloat(document.getElementById('min-value').value);
    const maxValue = parseFloat(document.getElementById('max-value').value);
    const numCount = parseInt(document.getElementById('num-count').value);
    const decimalPlaces = parseInt(document.getElementById('decimal-places').value);
    const allowDuplicates = document.getElementById('allow-duplicates').checked;
    const resultElement = document.getElementById('random-result');
    try {
        // Validate inputs
        if (isNaN(minValue) || isNaN(maxValue)) {
            throw new Error('Please enter valid minimum and maximum values');
        }
        if (minValue >= maxValue) {
            throw new Error('Minimum value must be less than maximum value');
        }
        if (isNaN(numCount) || numCount < 1) {
            throw new Error('Please enter a valid number of values (minimum 1)');
        }
        if (isNaN(decimalPlaces) || decimalPlaces < 0 || decimalPlaces > 10) {
            throw new Error('Please enter a valid number of decimal places (0-10)');
        }
        // Calculate range and check if enough unique numbers are possible
        const range = maxValue - minValue;
        const possibleUniqueNumbers = Math.floor(range * Math.pow(10, decimalPlaces)) + 1;
        if (!allowDuplicates && numCount > possibleUniqueNumbers) {
            throw new Error(`Cannot generate ${numCount} unique numbers in the given range. Maximum possible unique numbers: ${possibleUniqueNumbers}`);
        }
        // Generate random numbers
        const numbers = new Set();
        while (numbers.size < numCount) {
            const randomNum = minValue + Math.random() * range;
            const roundedNum = Number(randomNum.toFixed(decimalPlaces));
            if (allowDuplicates || !numbers.has(roundedNum)) {
                numbers.add(roundedNum);
            }
        }
        // Format the result
        const numbersArray = Array.from(numbers);
        let resultText = `<strong>Generated ${numCount} random number${numCount > 1 ? 's' : ''}:</strong><br><br>`;
        resultText += numbersArray.join(', ');
        // Add statistics
        const sortedNumbers = [...numbersArray].sort((a, b) => a - b);
        const sum = numbersArray.reduce((a, b) => a + b, 0);
        const mean = sum / numCount;
        const median = numCount % 2 === 0 
            ? (sortedNumbers[numCount/2 - 1] + sortedNumbers[numCount/2]) / 2 
            : sortedNumbers[Math.floor(numCount/2)];
        resultText += `<br><br><strong>Statistics:</strong><br>`;
        resultText += `Minimum: ${sortedNumbers[0]}<br>`;
        resultText += `Maximum: ${sortedNumbers[numCount - 1]}<br>`;
        resultText += `Mean: ${mean.toFixed(decimalPlaces)}<br>`;
        resultText += `Median: ${median.toFixed(decimalPlaces)}`;
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        // Log the generation
        console.log(`Generated ${numCount} random numbers between ${minValue} and ${maxValue}`);
    } catch (error) {
        showError('random-result', error.message);
    }
}

function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
        el.innerHTML = `<span style='color:red;'>Error: ${message}</span>`;
        el.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-random');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateRandomNumbers);
    }
    // Add event listeners for input changes with debounce
    const randomInputs = ['min-value', 'max-value', 'num-count', 'decimal-places'];
    randomInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            let debounceTimer;
            input.addEventListener('input', () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(generateRandomNumbers, 300);
            });
        }
    });
    // Add event listener for checkbox changes
    const allowDuplicates = document.getElementById('allow-duplicates');
    if (allowDuplicates) {
        allowDuplicates.addEventListener('change', generateRandomNumbers);
    }
}); 