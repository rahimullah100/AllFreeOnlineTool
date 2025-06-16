// Prime Factorization Tool (modularized from math-tools.js)

function factorizeNumber(number) {
    try {
        let n = Math.abs(parseInt(number));
        if (isNaN(n) || n < 2) {
            throw new Error('Please enter a valid number greater than 1');
        }
        const factors = [];
        while (n % 2 === 0) {
            factors.push(2);
            n = n / 2;
        }
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
            while (n % i === 0) {
                factors.push(i);
                n = n / i;
            }
        }
        if (n > 2) {
            factors.push(n);
        }
        return factors;
    } catch (error) {
        console.error('Error in factorizeNumber:', error);
        throw new Error('Factorization error: ' + error.message);
    }
}

function factorizeNumberHandler() {
    try {
        const inputElement = document.getElementById('factorize-input');
        const resultElement = document.getElementById('factorization-result');
        if (!inputElement || !resultElement) {
            throw new Error('Required elements not found in the DOM');
        }
        const inputValue = inputElement.value.trim();
        if (!inputValue) {
            throw new Error('Please enter a number to factorize');
        }
        resultElement.innerHTML = '<div class="loading">Calculating prime factors...</div>';
        setTimeout(() => {
            try {
                const number = parseInt(inputValue);
                if (isNaN(number) || number < 2) {
                    throw new Error('Please enter a valid number greater than 1');
                }
                const factors = factorizeNumber(number);
                let resultHTML = `<div class="result">
                    <div class="number">${number} = </div>
                    <div class="factors">${factors.join(' × ')}</div>
                </div>`;
                if (factors.length === 1) {
                    resultHTML += `<div class="prime-check">${number} is a prime number</div>`;
                } else {
                    resultHTML += `<div class="prime-check">${number} is a composite number</div>`;
                }
                resultElement.innerHTML = resultHTML;
            } catch (error) {
                console.error('Error in factorization:', error);
                resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
            }
        }, 50);
    } catch (error) {
        console.error('Error in factorizeNumberHandler:', error);
        const resultElement = document.getElementById('factorization-result');
        if (resultElement) {
            resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        }
    }
}

function initializePrimeFactorization() {
    try {
        const factorizeBtn = document.getElementById('factorize');
        const inputElement = document.getElementById('factorize-input');
        if (!factorizeBtn || !inputElement) {
            return;
        }
        const newBtn = factorizeBtn.cloneNode(true);
        factorizeBtn.parentNode.replaceChild(newBtn, factorizeBtn);
        newBtn.addEventListener('click', factorizeNumberHandler);
        inputElement.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                factorizeNumberHandler();
            }
        });
    } catch (error) {
        console.error('Error initializing prime factorization:', error);
    }
}

document.addEventListener('DOMContentLoaded', initializePrimeFactorization); 