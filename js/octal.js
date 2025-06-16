function calculateOctal() {
    const num1 = document.getElementById('octal-number1').value;
    const num2 = document.getElementById('octal-number2').value;
    const operation = document.getElementById('octal-operation').value;
    const resultElement = document.getElementById('octal-result');
    // Validate inputs
    if (!num1 || !num2) {
        if (typeof showError === 'function') {
            showError('octal-result', 'Please enter valid octal numbers');
        } else {
            resultElement.textContent = 'Error: Please enter valid octal numbers';
        }
        return;
    }
    // Validate octal format
    if (!/^[0-7]+$/.test(num1) || !/^[0-7]+$/.test(num2)) {
        if (typeof showError === 'function') {
            showError('octal-result', 'Please enter valid octal numbers (0-7)');
        } else {
            resultElement.textContent = 'Error: Please enter valid octal numbers (0-7)';
        }
        return;
    }
    try {
        let result, steps;
        const decimal1 = parseInt(num1, 8);
        const decimal2 = parseInt(num2, 8);
        switch(operation) {
            case 'add':
                result = decimal1 + decimal2;
                steps = `1. Convert to decimal: ${num1}₈ = ${decimal1}₁₀, ${num2}₈ = ${decimal2}₁₀\n` +
                       `2. Add: ${decimal1} + ${decimal2} = ${result}\n` +
                       `3. Convert back to octal: ${result}₁₀ = ${result.toString(8)}₈`;
                break;
            case 'subtract':
                if (decimal1 < decimal2) {
                    if (typeof showError === 'function') {
                        showError('octal-result', 'First number must be greater than or equal to second number');
                    } else {
                        resultElement.textContent = 'Error: First number must be greater than or equal to second number';
                    }
                    return;
                }
                result = decimal1 - decimal2;
                steps = `1. Convert to decimal: ${num1}₈ = ${decimal1}₁₀, ${num2}₈ = ${decimal2}₁₀\n` +
                       `2. Subtract: ${decimal1} - ${decimal2} = ${result}\n` +
                       `3. Convert back to octal: ${result}₁₀ = ${result.toString(8)}₈`;
                break;
            case 'multiply':
                result = decimal1 * decimal2;
                steps = `1. Convert to decimal: ${num1}₈ = ${decimal1}₁₀, ${num2}₈ = ${decimal2}₁₀\n` +
                       `2. Multiply: ${decimal1} × ${decimal2} = ${result}\n` +
                       `3. Convert back to octal: ${result}₁₀ = ${result.toString(8)}₈`;
                break;
            case 'divide':
                if (decimal2 === 0) {
                    if (typeof showError === 'function') {
                        showError('octal-result', 'Cannot divide by zero');
                    } else {
                        resultElement.textContent = 'Error: Cannot divide by zero';
                    }
                    return;
                }
                result = Math.floor(decimal1 / decimal2);
                steps = `1. Convert to decimal: ${num1}₈ = ${decimal1}₁₀, ${num2}₈ = ${decimal2}₁₀\n` +
                       `2. Divide: ${decimal1} ÷ ${decimal2} = ${result}\n` +
                       `3. Convert back to octal: ${result}₁₀ = ${result.toString(8)}₈`;
                break;
        }
        // Format the result
        let resultText = `<strong>Operation:</strong> ${operation.toUpperCase()}<br><br>`;
        resultText += `<strong>Input Values:</strong><br>`;
        resultText += `First Number: ${num1}₈ (${decimal1}₁₀)<br>`;
        resultText += `Second Number: ${num2}₈ (${decimal2}₁₀)<br><br>`;
        resultText += `<strong>Result:</strong><br>`;
        resultText += `Octal: ${result.toString(8)}₈<br>`;
        resultText += `Decimal: ${result}₁₀<br><br>`;
        resultText += `<strong>Calculation Steps:</strong><br>${steps.replace(/\n/g, '<br>')}`;
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        // Log the calculation
        console.log(`Octal calculation: ${num1} ${operation} ${num2} = ${result.toString(8)}`);
    } catch (error) {
        if (typeof showError === 'function') {
            showError('octal-result', 'Error calculating: ' + error.message);
        } else {
            resultElement.textContent = 'Error: ' + error.message;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const calculateOctalBtn = document.getElementById('calculate-octal');
    if (calculateOctalBtn) {
        calculateOctalBtn.addEventListener('click', calculateOctal);
    }
}); 