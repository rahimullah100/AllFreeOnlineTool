function reinitTrigonometryCalculator() {
    const btn = document.getElementById('calculate-trig');
    if (btn) {
        btn.addEventListener('click', function() {
            try {
                const functionType = document.getElementById('trig-function').value;
                const angle = parseFloat(document.getElementById('angle').value);
                const mode = document.getElementById('trig-mode').value;
                if (isNaN(angle)) {
                    throw new Error('Please enter a valid angle');
                }
                let result;
                let inputValue = angle;
                if (functionType.startsWith('arc')) {
                    if (functionType !== 'arctan' && (angle < -1 || angle > 1)) {
                        throw new Error(`Input must be between -1 and 1 for ${functionType}`);
                    }
                    switch (functionType) {
                        case 'arcsin':
                            result = Math.asin(angle);
                            break;
                        case 'arccos':
                            result = Math.acos(angle);
                            break;
                        case 'arctan':
                            result = Math.atan(angle);
                            break;
                    }
                    if (mode === 'degrees') {
                        result = result * (180 / Math.PI);
                    }
                } else {
                    const angleInRadians = mode === 'degrees' ? angle * (Math.PI / 180) : angle;
                    switch (functionType) {
                        case 'sin':
                            result = Math.sin(angleInRadians);
                            break;
                        case 'cos':
                            result = Math.cos(angleInRadians);
                            break;
                        case 'tan':
                            result = Math.tan(angleInRadians);
                            break;
                        case 'csc':
                            result = 1 / Math.sin(angleInRadians);
                            break;
                        case 'sec':
                            result = 1 / Math.cos(angleInRadians);
                            break;
                        case 'cot':
                            result = 1 / Math.tan(angleInRadians);
                            break;
                        default:
                            throw new Error('Invalid function type');
                    }
                }
                const resultElement = document.getElementById('trig-result');
                if (resultElement) {
                    let displayFunction = functionType;
                    let displayInput = angle;
                    let displayUnit = mode === 'degrees' ? '°' : ' rad';
                    if (functionType.startsWith('arc')) {
                        resultElement.innerHTML = `
                            <div class="result-value">${result.toFixed(6)}${displayUnit}</div>
                            <div class="calculation-steps">
                                <div class="step">${functionType}(${displayInput}) = ${result.toFixed(6)}${displayUnit}</div>
                            </div>
                        `;
                    } else {
                        resultElement.innerHTML = `
                            <div class="result-value">${result.toFixed(6)}</div>
                            <div class="calculation-steps">
                                <div class="step">${functionType}(${displayInput}${displayUnit}) = ${result.toFixed(6)}</div>
                            </div>
                        `;
                    }
                }
            } catch (error) {
                const resultElement = document.getElementById('trig-result');
                if (resultElement) {
                    resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
                }
            }
        });
    }
}
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    reinitTrigonometryCalculator();
} else {
    window.addEventListener('DOMContentLoaded', reinitTrigonometryCalculator);
} 