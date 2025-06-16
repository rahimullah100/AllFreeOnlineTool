// Derivative Calculator for Math Tools
// Requires math.js to be loaded globally

function computeDerivative() {
    const funcInput = document.getElementById('derivative-function');
    const varInput = document.getElementById('derivative-variable');
    const orderInput = document.getElementById('derivative-order');
    const resultSpan = document.getElementById('derivative-result');
    if (!funcInput || !varInput || !orderInput || !resultSpan) return;
    const expr = funcInput.value.trim();
    const variable = varInput.value.trim() || 'x';
    let order = parseInt(orderInput.value, 10);
    if (!expr) {
        resultSpan.textContent = 'Please enter a function.';
        resultSpan.style.color = '#ff4d4d';
        return;
    }
    if (!variable.match(/^[a-zA-Z]$/)) {
        resultSpan.textContent = 'Variable must be a single letter.';
        resultSpan.style.color = '#ff4d4d';
        return;
    }
    if (isNaN(order) || order < 1) order = 1;
    try {
        let node = math.parse(expr);
        let derivative = node;
        for (let i = 0; i < order; i++) {
            derivative = math.derivative(derivative, variable);
        }
        const simplified = derivative.toString();
        resultSpan.textContent = simplified;
        resultSpan.style.color = '#333';
        resultSpan.style.fontWeight = 'bold';
    } catch (err) {
        resultSpan.textContent = 'Error: ' + err.message;
        resultSpan.style.color = '#ff4d4d';
    }
}

function initializeDerivativeCalculator() {
    const calcBtn = document.getElementById('calculate-derivative');
    if (calcBtn) {
        calcBtn.addEventListener('click', computeDerivative);
    }
    // Optional: Enter key triggers calculation
    const inputs = [
        document.getElementById('derivative-function'),
        document.getElementById('derivative-variable'),
        document.getElementById('derivative-order')
    ];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') computeDerivative();
            });
        }
    });
} 