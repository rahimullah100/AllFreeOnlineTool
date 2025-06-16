function calculateHex() {
    const num1 = document.getElementById('hex-number1').value;
    const num2 = document.getElementById('hex-number2').value;
    const operation = document.getElementById('hex-operation').value;
    const resultElement = document.getElementById('hex-result');
    // Validate inputs
    if (!num1 || !num2) {
        if (typeof showError === 'function') {
            showError('hex-result', 'Please enter valid hexadecimal numbers');
        } else {
            resultElement.textContent = 'Error: Please enter valid hexadecimal numbers';
        }
        return;
    }
    // Validate hex format
    if (!/^[0-9A-Fa-f]+$/.test(num1) || !/^[0-9A-Fa-f]+$/.test(num2)) {
        if (typeof showError === 'function') {
            showError('hex-result', 'Please enter valid hexadecimal numbers (0-9, A-F)');
        } else {
            resultElement.textContent = 'Error: Please enter valid hexadecimal numbers (0-9, A-F)';
        }
        return;
    }
    try {
        let result, steps;
        const decimal1 = parseInt(num1, 16);
        const decimal2 = parseInt(num2, 16);
        switch(operation) {
            case 'add':
                result = decimal1 + decimal2;
                steps = `1. Convert to decimal: ${num1}₁₆ = ${decimal1}₁₀, ${num2}₁₆ = ${decimal2}₁₀\n` +
                       `2. Add: ${decimal1} + ${decimal2} = ${result}\n` +
                       `3. Convert back to hex: ${result}₁₀ = ${result.toString(16).toUpperCase()}₁₆`;
                break;
            case 'subtract':
                if (decimal1 < decimal2) {
                    if (typeof showError === 'function') {
                        showError('hex-result', 'First number must be greater than or equal to second number');
                    } else {
                        resultElement.textContent = 'Error: First number must be greater than or equal to second number';
                    }
                    return;
                }
                result = decimal1 - decimal2;
                steps = `1. Convert to decimal: ${num1}₁₆ = ${decimal1}₁₀, ${num2}₁₆ = ${decimal2}₁₀\n` +
                       `2. Subtract: ${decimal1} - ${decimal2} = ${result}\n` +
                       `3. Convert back to hex: ${result}₁₀ = ${result.toString(16).toUpperCase()}₁₆`;
                break;
            case 'multiply':
                result = decimal1 * decimal2;
                steps = `1. Convert to decimal: ${num1}₁₆ = ${decimal1}₁₀, ${num2}₁₆ = ${decimal2}₁₀\n` +
                       `2. Multiply: ${decimal1} × ${decimal2} = ${result}\n` +
                       `3. Convert back to hex: ${result}₁₀ = ${result.toString(16).toUpperCase()}₁₆`;
                break;
            case 'divide':
                if (decimal2 === 0) {
                    if (typeof showError === 'function') {
                        showError('hex-result', 'Cannot divide by zero');
                    } else {
                        resultElement.textContent = 'Error: Cannot divide by zero';
                    }
                    return;
                }
                result = Math.floor(decimal1 / decimal2);
                steps = `1. Convert to decimal: ${num1}₁₆ = ${decimal1}₁₀, ${num2}₁₆ = ${decimal2}₁₀\n` +
                       `2. Divide: ${decimal1} ÷ ${decimal2} = ${result}\n` +
                       `3. Convert back to hex: ${result}₁₀ = ${result.toString(16).toUpperCase()}₁₆`;
                break;
        }
        // Format the result
        let resultText = `<strong>Operation:</strong> ${operation.toUpperCase()}<br><br>`;
        resultText += `<strong>Input Values:</strong><br>`;
        resultText += `First Number: ${num1.toUpperCase()}₁₆ (${decimal1}₁₀)<br>`;
        resultText += `Second Number: ${num2.toUpperCase()}₁₆ (${decimal2}₁₀)<br><br>`;
        resultText += `<strong>Result:</strong><br>`;
        resultText += `Hexadecimal: ${result.toString(16).toUpperCase()}₁₆<br>`;
        resultText += `Decimal: ${result}₁₀<br><br>`;
        resultText += `<strong>Calculation Steps:</strong><br>${steps.replace(/\n/g, '<br>')}`;
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        // Log the calculation
        console.log(`Hexadecimal calculation: ${num1} ${operation} ${num2} = ${result.toString(16).toUpperCase()}`);
    } catch (error) {
        if (typeof showError === 'function') {
            showError('hex-result', 'Error calculating: ' + error.message);
        } else {
            resultElement.textContent = 'Error: ' + error.message;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const calculateHexBtn = document.getElementById('calculate-hex');
    if (calculateHexBtn) {
        calculateHexBtn.addEventListener('click', calculateHex);
    }
}); 