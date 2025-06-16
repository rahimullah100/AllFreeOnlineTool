function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function calculatePermComb() {
    const n = parseInt(document.getElementById('total-items').value);
    const r = parseInt(document.getElementById('selected-items').value);
    const type = document.getElementById('perm-comb-type').value;
    const resultElement = document.getElementById('perm-comb-result');
    if (isNaN(n) || isNaN(r)) {
        if (typeof showError === 'function') {
            showError('perm-comb-result', 'Please enter valid numbers for both fields');
        } else {
            resultElement.textContent = 'Error: Please enter valid numbers for both fields';
        }
        return;
    }
    if (n < 0 || r < 0) {
        if (typeof showError === 'function') {
            showError('perm-comb-result', 'Numbers cannot be negative');
        } else {
            resultElement.textContent = 'Error: Numbers cannot be negative';
        }
        return;
    }
    if (r > n) {
        if (typeof showError === 'function') {
            showError('perm-comb-result', 'Selected items (r) cannot be greater than total items (n)');
        } else {
            resultElement.textContent = 'Error: Selected items (r) cannot be greater than total items (n)';
        }
        return;
    }
    try {
        let result, steps;
        if (type === 'permutation') {
            result = factorial(n) / factorial(n - r);
            steps = `1. Calculate n! = ${n}! = ${factorial(n)}\n` +
                   `2. Calculate (n-r)! = (${n}-${r})! = ${factorial(n-r)}\n` +
                   `3. Divide: ${factorial(n)} / ${factorial(n-r)} = ${result}`;
        } else {
            result = factorial(n) / (factorial(r) * factorial(n - r));
            steps = `1. Calculate n! = ${n}! = ${factorial(n)}\n` +
                   `2. Calculate r! = ${r}! = ${factorial(r)}\n` +
                   `3. Calculate (n-r)! = (${n}-${r})! = ${factorial(n-r)}\n` +
                   `4. Divide: ${factorial(n)} / (${factorial(r)} × ${factorial(n-r)}) = ${result}`;
        }
        let resultText = `<strong>Calculation Type:</strong> ${type === 'permutation' ? 'Permutation (nPr)' : 'Combination (nCr)'}<br><br>`;
        resultText += `<strong>Input Values:</strong><br>`;
        resultText += `n = ${n}<br>`;
        resultText += `r = ${r}<br><br>`;
        resultText += `<strong>Result:</strong> ${result.toLocaleString()}<br><br>`;
        resultText += `<strong>Calculation Steps:</strong><br>${steps.replace(/\n/g, '<br>')}`;
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        console.log(`${type === 'permutation' ? 'Permutation' : 'Combination'} calculation: n=${n}, r=${r}, result=${result}`);
    } catch (error) {
        if (typeof showError === 'function') {
            showError('perm-comb-result', 'Error calculating: ' + error.message);
        } else {
            resultElement.textContent = 'Error: ' + error.message;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const calculatePermCombBtn = document.getElementById('calculate-perm-comb');
    if (calculatePermCombBtn) {
        calculatePermCombBtn.addEventListener('click', calculatePermComb);
    }
}); 