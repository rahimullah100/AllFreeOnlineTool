// Integral Calculator for Math Tools
// Requires math.js to be loaded globally

function computeIntegral() {
    const funcInput = document.getElementById('integral-function');
    const varInput = document.getElementById('integral-variable');
    const lowerInput = document.getElementById('integral-lower');
    const upperInput = document.getElementById('integral-upper');
    const resultSpan = document.getElementById('integral-result');
    console.log('[Integral] computeIntegral called');
    if (!funcInput || !varInput || !lowerInput || !upperInput || !resultSpan) {
        console.log('[Integral] Missing input elements');
        return;
    }
    const expr = funcInput.value.trim();
    const variable = varInput.value.trim() || 'x';
    const lower = lowerInput.value.trim();
    const upper = upperInput.value.trim();
    console.log('[Integral] Inputs:', { expr, variable, lower, upper });
    if (!expr) {
        resultSpan.textContent = 'Please enter a function.';
        resultSpan.style.color = '#ff4d4d';
        console.log('[Integral] No function entered');
        return;
    }
    if (!variable.match(/^[a-zA-Z]$/)) {
        resultSpan.textContent = 'Variable must be a single letter.';
        resultSpan.style.color = '#ff4d4d';
        console.log('[Integral] Invalid variable');
        return;
    }
    if (lower === '' || upper === '') {
        resultSpan.textContent = 'Indefinite (symbolic) integration is not supported. Please provide both lower and upper bounds for a definite (numerical) result.';
        resultSpan.style.color = '#ff4d4d';
        console.log('[Integral] Missing bounds');
        return;
    }
    try {
        const lowerVal = math.evaluate(lower);
        const upperVal = math.evaluate(upper);
        // Create a function of the variable
        const f = math.compile(expr);
        // Use numerical integration (Simpson's rule)
        const N = 1000;
        const a = lowerVal;
        const b = upperVal;
        const h = (b - a) / N;
        let sum = 0;
        for (let i = 0; i <= N; i++) {
            const x = a + i * h;
            const scope = {};
            scope[variable] = x;
            const fx = f.evaluate(scope);
            if (i === 0 || i === N) {
                sum += fx;
            } else if (i % 2 === 0) {
                sum += 2 * fx;
            } else {
                sum += 4 * fx;
            }
        }
        const result = (h / 3) * sum;
        resultSpan.textContent = `Definite integral: ${result}`;
        resultSpan.style.color = '#333';
        resultSpan.style.fontWeight = 'bold';
        console.log('[Integral] Result:', result);
    } catch (err) {
        resultSpan.textContent = 'Error: ' + err.message;
        resultSpan.style.color = '#ff4d4d';
        console.log('[Integral] Error:', err);
    }
}

function initializeIntegralCalculator() {
    const calcBtn = document.getElementById('calculate-integral');
    if (calcBtn) {
        calcBtn.addEventListener('click', computeIntegral);
    }
    // Optional: Enter key triggers calculation
    const inputs = [
        document.getElementById('integral-function'),
        document.getElementById('integral-variable'),
        document.getElementById('integral-lower'),
        document.getElementById('integral-upper')
    ];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') computeIntegral();
            });
        }
    });
} 