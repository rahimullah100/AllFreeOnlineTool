// Probability Calculator for Math Tools
// Handles: basic, conditional, binomial, normal, poisson
function handleProbabilityCalculation() {
    try {
        const type = document.getElementById('probability-type').value;
        let result = '';
        switch (type) {
            case 'basic': {
                const favorable = parseFloat(document.getElementById('favorable-outcomes').value);
                const total = parseFloat(document.getElementById('total-outcomes').value);
                if (isNaN(favorable) || isNaN(total) || total <= 0) {
                    throw new Error('Please enter valid numbers for outcomes');
                }
                result = (favorable / total).toFixed(6);
                break;
            }
            case 'conditional': {
                const pA = parseFloat(document.getElementById('p-a').value);
                const pBgivenA = parseFloat(document.getElementById('p-b-given-a').value);
                if (isNaN(pA) || isNaN(pBgivenA) || pA < 0 || pA > 1 || pBgivenA < 0 || pBgivenA > 1) {
                    throw new Error('Please enter valid probabilities (0 to 1)');
                }
                result = (pA * pBgivenA).toFixed(6);
                break;
            }
            case 'binomial': {
                const n = parseInt(document.getElementById('n-trials').value);
                const k = parseInt(document.getElementById('k-successes').value);
                const p = parseFloat(document.getElementById('p-success').value);
                if (isNaN(n) || isNaN(k) || isNaN(p) || n < 0 || k < 0 || p < 0 || p > 1) {
                    throw new Error('Please enter valid values for n, k, and p (0 <= p <= 1)');
                }
                function binomCoeff(n, k) {
                    let res = 1;
                    for (let i = 1; i <= k; i++) {
                        res *= (n - i + 1) / i;
                    }
                    return res;
                }
                result = (binomCoeff(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)).toFixed(6);
                break;
            }
            case 'normal': {
                const mean = parseFloat(document.getElementById('mean').value);
                const std = parseFloat(document.getElementById('std-dev').value);
                const x = parseFloat(document.getElementById('x-value').value);
                if (isNaN(mean) || isNaN(std) || isNaN(x) || std <= 0) {
                    throw new Error('Please enter valid mean, std dev (>0), and x');
                }
                // Standard normal PDF
                const pdf = (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
                result = pdf.toFixed(6);
                break;
            }
            case 'poisson': {
                const lambda = parseFloat(document.getElementById('lambda').value);
                const k = parseInt(document.getElementById('k-events').value);
                if (isNaN(lambda) || isNaN(k) || lambda < 0 || k < 0) {
                    throw new Error('Please enter valid lambda and k (>=0)');
                }
                function factorial(n) {
                    return n <= 1 ? 1 : n * factorial(n - 1);
                }
                result = (Math.pow(lambda, k) * Math.exp(-lambda) / factorial(k)).toFixed(6);
                break;
            }
            default:
                throw new Error('Invalid probability type');
        }
        document.getElementById('probability-result').textContent = 'Result: ' + result;
    } catch (error) {
        document.getElementById('probability-result').textContent = 'Error: ' + error.message;
    }
}

function showProbabilityInputs() {
    const type = document.getElementById('probability-type').value;
    const sections = {
        basic: document.querySelector('.basic-probability'),
        conditional: document.querySelector('.conditional-probability'),
        binomial: document.querySelector('.binomial-distribution'),
        normal: document.querySelector('.normal-distribution'),
        poisson: document.querySelector('.poisson-distribution')
    };
    for (const key in sections) {
        if (sections[key]) sections[key].style.display = 'none';
    }
    if (sections[type]) sections[type].style.display = 'block';
}

function reinitProbabilityCalculator() {
    const btn = document.getElementById('calculate-probability');
    if (btn) {
        btn.addEventListener('click', handleProbabilityCalculation);
    }
    const typeSelect = document.getElementById('probability-type');
    if (typeSelect) {
        typeSelect.addEventListener('change', showProbabilityInputs);
        showProbabilityInputs(); // Set initial state
    }
}
// Call after DOMContentLoaded and after debug script
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    reinitProbabilityCalculator();
} else {
    window.addEventListener('DOMContentLoaded', reinitProbabilityCalculator);
} 