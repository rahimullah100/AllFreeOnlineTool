function calculateGCD(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function calculateArrayGCD(numbers) {
    if (!numbers || numbers.length === 0) return 0;
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        result = calculateGCD(result, numbers[i]);
        if (result === 1) return 1;
    }
    return result;
}

function calculateLCM(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / calculateGCD(a, b);
}

function calculateArrayLCM(numbers) {
    if (!numbers || numbers.length === 0) return 0;
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] === 0) return 0;
        result = calculateLCM(result, numbers[i]);
    }
    return result;
}

function handleGcdLcmCalculation() {
    try {
        const input = document.getElementById('gcd-lcm-numbers').value.trim();
        if (!input) {
            throw new Error('Please enter numbers to calculate');
        }
        const numbers = input.split(',')
            .map(num => num.trim())
            .filter(num => num !== '')
            .map(num => {
                const parsed = parseFloat(num);
                if (isNaN(parsed) || !Number.isInteger(parsed) || parsed < 0) {
                    throw new Error('Please enter valid positive integers separated by commas');
                }
                return parsed;
            });
        if (numbers.length < 2) {
            throw new Error('Please enter at least two numbers');
        }
        const gcd = calculateArrayGCD(numbers);
        const lcm = calculateArrayLCM(numbers);
        document.getElementById('gcd-result').textContent = gcd;
        document.getElementById('lcm-result').textContent = lcm;
    } catch (error) {
        console.error('GCD/LCM Calculation Error:', error);
        document.getElementById('gcd-result').textContent = 'Error';
        document.getElementById('lcm-result').textContent = 'Error';
        const resultsContainer = document.querySelector('#gcd-lcm .conversion-results');
        if (resultsContainer) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = error.message;
            errorElement.style.color = '#ff4d4d';
            errorElement.style.marginTop = '10px';
            errorElement.style.fontSize = '0.9em';
            const existingError = resultsContainer.querySelector('.error-message');
            if (existingError) {
                resultsContainer.removeChild(existingError);
            }
            resultsContainer.appendChild(errorElement);
        }
    }
}

function initializeGcdLcmCalculator() {
    const calculateBtn = document.getElementById('calculate-gcd-lcm');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', handleGcdLcmCalculation);
        const inputField = document.getElementById('gcd-lcm-numbers');
        if (inputField) {
            inputField.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleGcdLcmCalculation();
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeGcdLcmCalculator();
}); 