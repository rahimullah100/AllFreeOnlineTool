function calculateExponential() {
    const base = parseFloat(document.getElementById('exponential-base').value);
    const exponent = parseFloat(document.getElementById('exponential-exponent').value);
    const resultElement = document.getElementById('exponential-result');
    if (isNaN(base) || isNaN(exponent)) {
        if (typeof showError === 'function') {
            showError('exponential-result', 'Please enter valid numbers for base and exponent');
        } else {
            resultElement.textContent = 'Error: Please enter valid numbers for base and exponent';
        }
        return;
    }
    try {
        const result = Math.pow(base, exponent);
        let resultText = `<strong>Expression:</strong> ${base}^${exponent}<br><br>`;
        resultText += `<strong>Result:</strong> ${result.toFixed(6)}<br><br>`;
        resultText += `<strong>Calculation Steps:</strong><br>`;
        resultText += `1. Start with base = ${base} and exponent = ${exponent}<br>`;
        resultText += `2. Calculate ${base}^${exponent}<br>`;
        resultText += `3. Final result = ${result.toFixed(6)}`;
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        console.log(`Exponential calculation: ${base}^${exponent} = ${result}`);
    } catch (error) {
        if (typeof showError === 'function') {
            showError('exponential-result', 'Error calculating exponential: ' + error.message);
        } else {
            resultElement.textContent = 'Error: ' + error.message;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const calculateExponentialBtn = document.getElementById('calculate-exponential');
    if (calculateExponentialBtn) {
        calculateExponentialBtn.addEventListener('click', calculateExponential);
    }
}); 