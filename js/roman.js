function convertRoman() {
    const direction = document.getElementById('conversion-direction').value;
    const input = document.getElementById('input-value').value.trim();
    const resultElement = document.getElementById('roman-result');
    try {
        let result, steps;
        if (direction === 'to-roman') {
            // Convert decimal to Roman
            const num = parseInt(input);
            if (isNaN(num)) {
                throw new Error('Please enter a valid number');
            }
            if (num < 1 || num > 3999) {
                throw new Error('Number must be between 1 and 3999');
            }
            result = decimalToRoman(num);
            steps = `1. Break down ${num} into Roman numeral components:\n` +
                   `   ${num} = ${result}`;
        } else {
            // Convert Roman to decimal
            if (!/^[IVXLCDM]+$/i.test(input)) {
                throw new Error('Please enter a valid Roman numeral (I, V, X, L, C, D, M)');
            }
            result = romanToDecimal(input.toUpperCase());
            steps = `1. Convert each Roman numeral to its decimal value:\n` +
                   `   ${input.toUpperCase()} = ${result}`;
        }
        let resultText = `<strong>Conversion:</strong> ${direction === 'to-roman' ? 'Decimal to Roman' : 'Roman to Decimal'}<br><br>`;
        resultText += `<strong>Input:</strong> ${input}<br><br>`;
        resultText += `<strong>Result:</strong> ${result}<br><br>`;
        resultText += `<strong>Calculation Steps:</strong><br>${steps.replace(/\n/g, '<br>')}`;
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        console.log(`Roman numeral conversion: ${input} → ${result}`);
    } catch (error) {
        if (typeof showError === 'function') {
            showError('roman-result', error.message);
        } else {
            resultElement.textContent = 'Error: ' + error.message;
        }
    }
}

function decimalToRoman(num) {
    const romanNumerals = [
        { value: 1000, symbol: 'M' },
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
    ];
    let result = '';
    for (let i = 0; i < romanNumerals.length; i++) {
        while (num >= romanNumerals[i].value) {
            result += romanNumerals[i].symbol;
            num -= romanNumerals[i].value;
        }
    }
    return result;
}

function romanToDecimal(roman) {
    const romanValues = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    let result = 0;
    for (let i = 0; i < roman.length; i++) {
        const current = romanValues[roman[i]];
        const next = romanValues[roman[i + 1]];
        if (next && current < next) {
            result += next - current;
            i++;
        } else {
            result += current;
        }
    }
    return result;
}

document.addEventListener('DOMContentLoaded', function() {
    const convertRomanBtn = document.getElementById('convert-roman');
    if (convertRomanBtn) {
        convertRomanBtn.addEventListener('click', convertRoman);
    }
    const directionSelect = document.getElementById('conversion-direction');
    if (directionSelect) {
        directionSelect.addEventListener('change', function() {
            const input = document.getElementById('input-value');
            const direction = directionSelect.value;
            input.value = '';
            input.placeholder = direction === 'to-roman' ? 'Enter decimal number (1-3999)' : 'Enter Roman numeral (I, V, X, L, C, D, M)';
        });
    }
}); 