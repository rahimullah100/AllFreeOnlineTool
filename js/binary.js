function calculateBinary() {
    const num1 = document.getElementById('binary-number1').value;
    const num2 = document.getElementById('binary-number2').value;
    const operation = document.getElementById('binary-operation').value;
    const resultElement = document.getElementById('binary-result');
    // Validate inputs
    if (!num1 || (operation !== 'not' && !num2)) {
        if (typeof showError === 'function') {
            showError('binary-result', 'Please enter valid binary numbers');
        } else {
            resultElement.textContent = 'Error: Please enter valid binary numbers';
        }
        return;
    }
    // Validate binary format
    if (!/^[01]+$/.test(num1) || (operation !== 'not' && !/^[01]+$/.test(num2))) {
        if (typeof showError === 'function') {
            showError('binary-result', 'Please enter valid binary numbers (only 0s and 1s)');
        } else {
            resultElement.textContent = 'Error: Please enter valid binary numbers (only 0s and 1s)';
        }
        return;
    }
    try {
        let result, steps;
        const decimal1 = parseInt(num1, 2);
        const decimal2 = operation !== 'not' ? parseInt(num2, 2) : null;
        switch(operation) {
            case 'add':
                result = decimal1 + decimal2;
                steps = `1. Convert to decimal: ${num1}₂ = ${decimal1}₁₀, ${num2}₂ = ${decimal2}₁₀\n` +
                       `2. Add: ${decimal1} + ${decimal2} = ${result}\n` +
                       `3. Convert back to binary: ${result}₁₀ = ${result.toString(2)}₂`;
                break;
            case 'subtract':
                if (decimal1 < decimal2) {
                    if (typeof showError === 'function') {
                        showError('binary-result', 'First number must be greater than or equal to second number');
                    } else {
                        resultElement.textContent = 'Error: First number must be greater than or equal to second number';
                    }
                    return;
                }
                result = decimal1 - decimal2;
                steps = `1. Convert to decimal: ${num1}₂ = ${decimal1}₁₀, ${num2}₂ = ${decimal2}₁₀\n` +
                       `2. Subtract: ${decimal1} - ${decimal2} = ${result}\n` +
                       `3. Convert back to binary: ${result}₁₀ = ${result.toString(2)}₂`;
                break;
            case 'multiply':
                result = decimal1 * decimal2;
                steps = `1. Convert to decimal: ${num1}₂ = ${decimal1}₁₀, ${num2}₂ = ${decimal2}₁₀\n` +
                       `2. Multiply: ${decimal1} × ${decimal2} = ${result}\n` +
                       `3. Convert back to binary: ${result}₁₀ = ${result.toString(2)}₂`;
                break;
            case 'divide':
                if (decimal2 === 0) {
                    if (typeof showError === 'function') {
                        showError('binary-result', 'Cannot divide by zero');
                    } else {
                        resultElement.textContent = 'Error: Cannot divide by zero';
                    }
                    return;
                }
                result = Math.floor(decimal1 / decimal2);
                steps = `1. Convert to decimal: ${num1}₂ = ${decimal1}₁₀, ${num2}₂ = ${decimal2}₁₀\n` +
                       `2. Divide: ${decimal1} ÷ ${decimal2} = ${result}\n` +
                       `3. Convert back to binary: ${result}₁₀ = ${result.toString(2)}₂`;
                break;
            case 'and':
                result = decimal1 & decimal2;
                steps = `1. Convert to decimal: ${num1}₂ = ${decimal1}₁₀, ${num2}₂ = ${decimal2}₁₀\n` +
                       `2. Perform AND operation: ${decimal1} & ${decimal2} = ${result}\n` +
                       `3. Convert back to binary: ${result}₁₀ = ${result.toString(2)}₂`;
                break;
            case 'or':
                result = decimal1 | decimal2;
                steps = `1. Convert to decimal: ${num1}₂ = ${decimal1}₁₀, ${num2}₂ = ${decimal2}₁₀\n` +
                       `2. Perform OR operation: ${decimal1} | ${decimal2} = ${result}\n` +
                       `3. Convert back to binary: ${result}₁₀ = ${result.toString(2)}₂`;
                break;
            case 'xor':
                result = decimal1 ^ decimal2;
                steps = `1. Convert to decimal: ${num1}₂ = ${decimal1}₁₀, ${num2}₂ = ${decimal2}₁₀\n` +
                       `2. Perform XOR operation: ${decimal1} ^ ${decimal2} = ${result}\n` +
                       `3. Convert back to binary: ${result}₁₀ = ${result.toString(2)}₂`;
                break;
            case 'not':
                result = ~decimal1 >>> 0; // Convert to unsigned 32-bit integer
                steps = `1. Convert to decimal: ${num1}₂ = ${decimal1}₁₀\n` +
                       `2. Perform NOT operation: ~${decimal1} = ${result}\n` +
                       `3. Convert back to binary: ${result}₁₀ = ${result.toString(2)}₂`;
                break;
        }
        // Format the result
        let resultText = `<strong>Operation:</strong> ${operation.toUpperCase()}<br><br>`;
        resultText += `<strong>Input Values:</strong><br>`;
        resultText += `First Number: ${num1}₂ (${decimal1}₁₀)<br>`;
        if (operation !== 'not') {
            resultText += `Second Number: ${num2}₂ (${decimal2}₁₀)<br>`;
        }
        resultText += `<br><strong>Result:</strong><br>`;
        resultText += `Binary: ${result.toString(2)}₂<br>`;
        resultText += `Decimal: ${result}₁₀<br><br>`;
        resultText += `<strong>Calculation Steps:</strong><br>${steps.replace(/\n/g, '<br>')}`;
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        // Log the calculation
        console.log(`Binary calculation: ${num1} ${operation} ${operation !== 'not' ? num2 : ''} = ${result.toString(2)}`);
    } catch (error) {
        if (typeof showError === 'function') {
            showError('binary-result', 'Error calculating: ' + error.message);
        } else {
            resultElement.textContent = 'Error: ' + error.message;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const calculateBinaryBtn = document.getElementById('calculate-binary');
    if (calculateBinaryBtn) {
        calculateBinaryBtn.addEventListener('click', calculateBinary);
    }
}); 