function validateNumberInput(number, type) {
    const patterns = {
        decimal: /^-?\d+$/,
        binary: /^-?[01]+$/,
        octal: /^-?[0-7]+$/,
        hexadecimal: /^-?[0-9A-Fa-f]+$/
    };
    if (!patterns[type].test(number)) {
        throw new Error(`Invalid ${type} number format`);
    }
    return true;
}

function convertNumberHandler() {
    const numberInput = document.getElementById('number-input');
    const fromType = document.getElementById('from-type');
    const toType = document.getElementById('to-type');
    const resultField = document.getElementById('conversion-result');
    const tableDecimal = document.getElementById('table-decimal');
    const tableBinary = document.getElementById('table-binary');
    const tableOctal = document.getElementById('table-octal');
    const tableHex = document.getElementById('table-hex');
    const number = numberInput.value.trim();
    const from = fromType.value;
    const to = toType.value;

    // Clear all result fields
    if (resultField) resultField.value = '';
    [tableDecimal, tableBinary, tableOctal, tableHex].forEach(el => { if (el) el.textContent = ''; });

    if (!number) {
        return;
    }

    try {
        validateNumberInput(number, from);
        let decimal;
        switch (from) {
            case 'decimal':
                decimal = BigInt(number);
                break;
            case 'binary':
                decimal = BigInt('0b' + number);
                break;
            case 'octal':
                decimal = BigInt('0o' + number);
                break;
            case 'hexadecimal':
                decimal = BigInt('0x' + number);
                break;
            default:
                throw new Error('Invalid number type');
        }
        // Single conversion result
        let result;
        switch (to) {
            case 'decimal':
                result = decimal.toString();
                break;
            case 'binary':
                result = decimal.toString(2);
                break;
            case 'octal':
                result = decimal.toString(8);
                break;
            case 'hexadecimal':
                result = decimal.toString(16).toUpperCase();
                break;
            default:
                result = '';
        }
        if (resultField) resultField.value = result;
        // Fill the table
        if (tableDecimal) tableDecimal.textContent = decimal.toString();
        if (tableBinary) tableBinary.textContent = decimal.toString(2);
        if (tableOctal) tableOctal.textContent = decimal.toString(8);
        if (tableHex) tableHex.textContent = decimal.toString(16).toUpperCase();
    } catch (error) {
        // Show error in all result fields
        if (resultField) resultField.value = 'Error: ' + error.message;
        [tableDecimal, tableBinary, tableOctal, tableHex].forEach(el => {
            if (el) el.textContent = 'Error';
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const convertBtn = document.getElementById('convert-number');
    const numberInput = document.getElementById('number-input');
    const fromType = document.getElementById('from-type');
    const toType = document.getElementById('to-type');

    if (convertBtn) {
        convertBtn.addEventListener('click', convertNumberHandler);
    }
    if (numberInput) {
        numberInput.addEventListener('input', convertNumberHandler);
        numberInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                convertNumberHandler();
            }
        });
    }
    if (fromType) {
        fromType.addEventListener('change', convertNumberHandler);
    }
    if (toType) {
        toType.addEventListener('change', convertNumberHandler);
    }
    // Show results if there is already a value on page load
    if (numberInput && numberInput.value.trim()) {
        convertNumberHandler();
    }
}); 