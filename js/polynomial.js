function calculatePolynomial() {
    try {
        const coefficientsStr = document.getElementById('polynomial-coefficients').value;
        const xValue = parseFloat(document.getElementById('polynomial-x').value);
        if (!coefficientsStr) {
            throw new Error('Please enter polynomial coefficients');
        }
        if (isNaN(xValue)) {
            throw new Error('Please enter a valid value for x');
        }
        const coefficients = coefficientsStr.split(',')
            .map(coeff => coeff.trim())
            .map(coeff => parseFloat(coeff));
        if (coefficients.some(isNaN)) {
            throw new Error('Invalid coefficient format');
        }
        let result = 0;
        let polynomialStr = '';
        for (let i = 0; i < coefficients.length; i++) {
            const power = coefficients.length - 1 - i;
            const coeff = coefficients[i];
            if (coeff !== 0) {
                result += coeff * Math.pow(xValue, power);
                if (polynomialStr) {
                    polynomialStr += coeff >= 0 ? ' + ' : ' - ';
                }
                polynomialStr += Math.abs(coeff);
                if (power > 1) {
                    polynomialStr += `x^${power}`;
                } else if (power === 1) {
                    polynomialStr += 'x';
                }
            }
        }
        const resultText = `Polynomial: ${polynomialStr}\n\nValue at x = ${xValue}:\n${result.toFixed(6)}`;
        const resultElement = document.getElementById('polynomial-result');
        if (resultElement) {
            resultElement.textContent = resultText;
        }
        console.log('Polynomial calculation:', {
            coefficients,
            xValue,
            result,
            polynomialStr
        });
    } catch (error) {
        console.error('Polynomial calculation error:', error);
        if (typeof showError === 'function') {
            showError('polynomial-result', error.message);
        } else {
            const resultElement = document.getElementById('polynomial-result');
            if (resultElement) {
                resultElement.textContent = 'Error: ' + error.message;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const calculatePolynomialBtn = document.getElementById('calculate-polynomial');
    if (calculatePolynomialBtn) {
        calculatePolynomialBtn.addEventListener('click', calculatePolynomial);
    }
}); 