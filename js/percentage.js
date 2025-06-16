function initializePercentageCalculator() {
    console.log('Initializing Percentage Calculator...');
    const calculateBtn = document.getElementById('calculate-percentage');
    const typeSelect = document.getElementById('percentage-type');
    const valueInput = document.getElementById('percentage-value');
    const totalInput = document.getElementById('percentage-total');
    const resultDiv = document.getElementById('percentage-result');
    if (!calculateBtn || !typeSelect || !valueInput || !totalInput || !resultDiv) {
        console.error('Missing required elements for Percentage Calculator');
        return;
    }
    calculateBtn.style.border = '2px solid #4CAF50';
    const newBtn = calculateBtn.cloneNode(true);
    if (calculateBtn.parentNode) {
        calculateBtn.parentNode.replaceChild(newBtn, calculateBtn);
    }
    newBtn.addEventListener('click', function() {
        resultDiv.innerHTML = '';
        resultDiv.style.display = 'block';
        try {
            const type = typeSelect.value;
            const valueStr = valueInput.value.trim();
            const totalStr = totalInput.value.trim();
            if (!valueStr || !totalStr) {
                throw new Error('Please fill in all fields');
            }
            const value = parseFloat(valueStr);
            const total = parseFloat(totalStr);
            if (isNaN(value) || isNaN(total)) {
                throw new Error('Please enter valid numbers in both fields');
            }
            if (type !== 'of' && total === 0) {
                throw new Error('Total/Original value cannot be zero for this calculation');
            }
            let result, calculation, additionalInfo;
            switch (type) {
                case 'basic':
                    result = (value / total) * 100;
                    calculation = `(${value} / ${total}) × 100 = ${result.toFixed(2)}%`;
                    additionalInfo = `${value} is ${result.toFixed(2)}% of ${total}`;
                    break;
                case 'increase':
                    result = ((value - total) / total) * 100;
                    calculation = `((${value} - ${total}) / ${total}) × 100 = ${result.toFixed(2)}%`;
                    additionalInfo = `${value} is ${result.toFixed(2)}% more than ${total}`;
                    break;
                case 'decrease':
                    result = ((total - value) / total) * 100;
                    calculation = `((${total} - ${value}) / ${total}) × 100 = ${result.toFixed(2)}%`;
                    additionalInfo = `${value} is ${result.toFixed(2)}% less than ${total}`;
                    break;
                case 'of':
                    result = (value * total) / 100;
                    calculation = `(${value}% × ${total}) / 100 = ${result.toFixed(2)}`;
                    additionalInfo = `${value}% of ${total} is ${result.toFixed(2)}`;
                    break;
                default:
                    throw new Error('Invalid calculation type');
            }
            resultDiv.innerHTML = `
                <div class="result-item" style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 5px; border-left: 4px solid #4CAF50;">
                    <div style="font-size: 1.2em; font-weight: bold; color: #2c3e50; margin-bottom: 10px;">
                        <i class="fas fa-calculator" style="margin-right: 8px;"></i>Result: ${result.toFixed(2)}${type === 'of' ? '' : '%'}
                    </div>
                    <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 4px; font-family: monospace;">
                        <strong>Calculation:</strong> ${calculation}
                    </div>
                    <div style="color: #555; font-style: italic;">
                        <i class="fas fa-info-circle" style="margin-right: 5px;"></i>${additionalInfo}
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error in percentage calculation:', error);
            resultDiv.innerHTML = `
                <div style="padding: 15px; margin: 10px 0; background: #ffebee; border-left: 4px solid #f44336; color: #c62828;">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i>
                    <strong>Error:</strong> ${error.message}
                </div>
            `;
        }
    });
}

function reinitPercentageCalculator() {
    initializePercentageCalculator();
}
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    reinitPercentageCalculator();
} else {
    window.addEventListener('DOMContentLoaded', reinitPercentageCalculator);
} 