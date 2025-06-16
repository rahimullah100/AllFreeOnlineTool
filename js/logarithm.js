function calculateLogarithm() {
    try {
        const number = parseFloat(document.getElementById('log-number').value);
        const base = parseFloat(document.getElementById('log-base').value);
        if (isNaN(number)) {
            throw new Error('Please enter a valid number');
        }
        if (isNaN(base)) {
            throw new Error('Please enter a valid base');
        }
        if (number <= 0) {
            throw new Error('Number must be positive');
        }
        if (base <= 0 || base === 1) {
            throw new Error('Base must be positive and not equal to 1');
        }
        const result = Math.log(number) / Math.log(base);
        const lnNumber = Math.log(number);
        const lnBase = Math.log(base);
        const resultText = `log${base}(${number}) = ${result.toFixed(6)}\n\nCalculation Steps:\n1. log${base}(${number}) = ln(${number}) / ln(${base})\n2. = ${lnNumber.toFixed(6)} / ${lnBase.toFixed(6)}\n3. = ${result.toFixed(6)}`;
        const resultElement = document.getElementById('logarithm-result');
        if (resultElement) {
            resultElement.innerHTML = resultText.split('\n').map(line => {
                if (line.startsWith('Calculation Steps:')) {
                    return `<strong>${line}</strong>`;
                }
                return line;
            }).join('<br>');
        }
        console.log('Logarithm calculation:', {
            number,
            base,
            result,
            naturalLogNumber: lnNumber,
            naturalLogBase: lnBase
        });
    } catch (error) {
        console.error('Logarithm calculation error:', error);
        if (typeof showError === 'function') {
            showError('logarithm-result', error.message);
        } else {
            const resultElement = document.getElementById('logarithm-result');
            if (resultElement) {
                resultElement.textContent = 'Error: ' + error.message;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const calculateLogarithmBtn = document.getElementById('calculate-logarithm');
    if (calculateLogarithmBtn) {
        calculateLogarithmBtn.addEventListener('click', calculateLogarithm);
    }
}); 