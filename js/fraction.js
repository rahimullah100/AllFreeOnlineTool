function calculateFraction() {
    const num1 = parseInt(document.getElementById('fraction1-numerator').value);
    const den1 = parseInt(document.getElementById('fraction1-denominator').value);
    const num2 = parseInt(document.getElementById('fraction2-numerator').value);
    const den2 = parseInt(document.getElementById('fraction2-denominator').value);
    const operation = document.getElementById('fraction-operation').value;
    const resultElement = document.getElementById('fraction-result');
    if (isNaN(num1) || isNaN(den1) || isNaN(num2) || isNaN(den2)) {
        if (typeof showError === 'function') {
            showError('fraction-result', 'Please enter valid numbers for all fields');
        } else {
            resultElement.textContent = 'Error: Please enter valid numbers for all fields';
        }
        return;
    }
    if (den1 === 0 || den2 === 0) {
        if (typeof showError === 'function') {
            showError('fraction-result', 'Denominator cannot be zero');
        } else {
            resultElement.textContent = 'Error: Denominator cannot be zero';
        }
        return;
    }
    try {
        let resultNum, resultDen, steps;
        switch(operation) {
            case 'add':
                resultNum = (num1 * den2) + (num2 * den1);
                resultDen = den1 * den2;
                steps = `1. Find common denominator: ${den1} × ${den2} = ${resultDen}\n` +
                       `2. Convert fractions: ${num1}/${den1} = ${num1 * den2}/${resultDen}, ${num2}/${den2} = ${num2 * den1}/${resultDen}\n` +
                       `3. Add numerators: ${num1 * den2} + ${num2 * den1} = ${resultNum}`;
                break;
            case 'subtract':
                resultNum = (num1 * den2) - (num2 * den1);
                resultDen = den1 * den2;
                steps = `1. Find common denominator: ${den1} × ${den2} = ${resultDen}\n` +
                       `2. Convert fractions: ${num1}/${den1} = ${num1 * den2}/${resultDen}, ${num2}/${den2} = ${num2 * den1}/${resultDen}\n` +
                       `3. Subtract numerators: ${num1 * den2} - ${num2 * den1} = ${resultNum}`;
                break;
            case 'multiply':
                resultNum = num1 * num2;
                resultDen = den1 * den2;
                steps = `1. Multiply numerators: ${num1} × ${num2} = ${resultNum}\n` +
                       `2. Multiply denominators: ${den1} × ${den2} = ${resultDen}`;
                break;
            case 'divide':
                if (num2 === 0) {
                    if (typeof showError === 'function') {
                        showError('fraction-result', 'Cannot divide by zero');
                    } else {
                        resultElement.textContent = 'Error: Cannot divide by zero';
                    }
                    return;
                }
                resultNum = num1 * den2;
                resultDen = den1 * num2;
                steps = `1. Multiply first fraction by reciprocal of second: ${num1}/${den1} × ${den2}/${num2}\n` +
                       `2. Multiply numerators: ${num1} × ${den2} = ${resultNum}\n` +
                       `3. Multiply denominators: ${den1} × ${num2} = ${resultDen}`;
                break;
        }
        const gcd = findGCD(Math.abs(resultNum), Math.abs(resultDen));
        const simplifiedNum = resultNum / gcd;
        const simplifiedDen = resultDen / gcd;
        let resultText = `<strong>Expression:</strong> ${num1}/${den1} ${getOperationSymbol(operation)} ${num2}/${den2}<br><br>`;
        resultText += `<strong>Result:</strong> ${simplifiedNum}/${simplifiedDen}`;
        if (simplifiedDen === 1) {
            resultText += ` = ${simplifiedNum}`;
        } else {
            const decimal = (simplifiedNum / simplifiedDen).toFixed(6);
            resultText += ` ≈ ${decimal}`;
        }
        resultText += `<br><br><strong>Calculation Steps:</strong><br>${steps.replace(/\n/g, '<br>')}`;
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        console.log(`Fraction calculation: ${num1}/${den1} ${operation} ${num2}/${den2} = ${simplifiedNum}/${simplifiedDen}`);
    } catch (error) {
        if (typeof showError === 'function') {
            showError('fraction-result', 'Error calculating fraction: ' + error.message);
        } else {
            resultElement.textContent = 'Error: ' + error.message;
        }
    }
}

function findGCD(a, b) {
    return b === 0 ? a : findGCD(b, a % b);
}

function getOperationSymbol(operation) {
    switch(operation) {
        case 'add': return '+';
        case 'subtract': return '-';
        case 'multiply': return '×';
        case 'divide': return '÷';
        default: return '';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const calculateFractionBtn = document.getElementById('calculate-fraction');
    if (calculateFractionBtn) {
        calculateFractionBtn.addEventListener('click', calculateFraction);
    }
}); 