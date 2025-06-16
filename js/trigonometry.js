// Trigonometry Calculator (Modularized)
document.addEventListener('DOMContentLoaded', function() {
    const calculateTrigBtn = document.getElementById('calculate-trig');
    if (calculateTrigBtn) {
        calculateTrigBtn.addEventListener('click', function() {
            try {
                const functionType = document.getElementById('trig-function').value;
                const angle = parseFloat(document.getElementById('angle').value);
                const mode = document.getElementById('trig-mode').value;
                
                if (isNaN(angle)) {
                    throw new Error('Please enter a valid angle');
                }

                let result;
                let inputValue = angle;

                // For inverse functions, we need to handle the input differently
                if (functionType.startsWith('arc')) {
                    // For inverse functions, input must be between -1 and 1 (except arctan)
                    if (functionType !== 'arctan' && (angle < -1 || angle > 1)) {
                        throw new Error(`Input must be between -1 and 1 for ${functionType}`);
                    }

                    // Calculate inverse function
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

                    // Convert result to degrees if needed
                    if (mode === 'degrees') {
                        result = result * (180 / Math.PI);
                    }
                } else {
                    // For regular trigonometric functions
                    // Convert angle to radians if in degrees
                    const angleInRadians = mode === 'degrees' ? angle * (Math.PI / 180) : angle;

                    // Calculate based on function type
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

                // Display result
                const resultElement = document.getElementById('trig-result');
                if (resultElement) {
                    let displayFunction = functionType;
                    let displayInput = angle;
                    let displayUnit = mode === 'degrees' ? '°' : ' rad';

                    // For inverse functions, show the result in the correct format
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

                // Log calculation
                console.log('Trigonometry calculation:', {
                    function: functionType,
                    input: angle,
                    mode: mode,
                    result: result
                });
            } catch (error) {
                console.error('Trigonometry calculation error:', error);
                const resultElement = document.getElementById('trig-result');
                if (resultElement) {
                    resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
                }
            }
        });
    }
}); 