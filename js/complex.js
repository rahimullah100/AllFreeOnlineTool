class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real || 0;
        this.imaginary = imaginary || 0;
    }

    add(other) {
        return new ComplexNumber(
            this.real + other.real,
            this.imaginary + other.imaginary
        );
    }

    subtract(other) {
        return new ComplexNumber(
            this.real - other.real,
            this.imaginary - other.imaginary
        );
    }

    multiply(other) {
        const real = (this.real * other.real) - (this.imaginary * other.imaginary);
        const imaginary = (this.real * other.imaginary) + (this.imaginary * other.real);
        return new ComplexNumber(real, imaginary);
    }

    divide(other) {
        const denominator = (other.real * other.real) + (other.imaginary * other.imaginary);
        if (denominator === 0) {
            throw new Error('Cannot divide by zero');
        }
        const real = ((this.real * other.real) + (this.imaginary * other.imaginary)) / denominator;
        const imaginary = ((this.imaginary * other.real) - (this.real * other.imaginary)) / denominator;
        return new ComplexNumber(real, imaginary);
    }

    toString() {
        const realPart = this.real !== 0 ? this.real : '';
        let imaginaryPart = '';
        
        if (this.imaginary !== 0) {
            const absImaginary = Math.abs(this.imaginary);
            const sign = this.imaginary > 0 ? '+' : '-';
            const coefficient = absImaginary === 1 ? '' : absImaginary;
            
            if (this.real === 0) {
                // If real part is 0, don't show sign before the imaginary part
                imaginaryPart = `${sign === '-' ? '-' : ''}${coefficient}i`;
            } else {
                // Show sign between real and imaginary parts
                imaginaryPart = ` ${sign} ${coefficient}i`;
            }
        }
        
        // Handle cases where real part is 0
        if (this.real === 0 && this.imaginary === 0) {
            return '0';
        } else if (this.real === 0) {
            return imaginaryPart;
        } else if (this.imaginary === 0) {
            return realPart.toString();
        }
        
        return `${realPart}${imaginaryPart}`.replace(/\s\+/g, ' + ').replace(/\s-\s/g, ' - ');
    }
}

function handleComplexNumberCalculation() {
    try {
        const operation = document.getElementById('complex-operation').value;
        const real1 = parseFloat(document.getElementById('complex1-real').value) || 0;
        const imag1 = parseFloat(document.getElementById('complex1-imag').value) || 0;
        const real2 = parseFloat(document.getElementById('complex2-real').value) || 0;
        const imag2 = parseFloat(document.getElementById('complex2-imag').value) || 0;
        const num1 = new ComplexNumber(real1, imag1);
        const num2 = new ComplexNumber(real2, imag2);
        let result;
        switch (operation) {
            case 'add':
                result = num1.add(num2);
                break;
            case 'subtract':
                result = num1.subtract(num2);
                break;
            case 'multiply':
                result = num1.multiply(num2);
                break;
            case 'divide':
                result = num1.divide(num2);
                break;
            default:
                throw new Error('Invalid operation selected');
        }
        const resultElement = document.getElementById('complex-result');
        if (resultElement) {
            resultElement.textContent = `Result: ${result.toString()}`;
            resultElement.style.color = '#333';
            resultElement.style.fontWeight = 'bold';
        }
    } catch (error) {
        console.error('Complex Number Calculation Error:', error);
        const resultElement = document.getElementById('complex-result');
        if (resultElement) {
            resultElement.textContent = `Error: ${error.message}`;
            resultElement.style.color = '#ff4d4d';
        }
    }
}

function updateComplexInputs() {
    const operation = document.getElementById('complex-operation').value;
    const powerInput = document.querySelector('.power-input');
    const rootInput = document.querySelector('.root-input');
    if (operation === 'power') {
        powerInput.style.display = 'block';
        rootInput.style.display = 'none';
    } else if (operation === 'root') {
        powerInput.style.display = 'none';
        rootInput.style.display = 'block';
    } else {
        powerInput.style.display = 'none';
        rootInput.style.display = 'none';
    }
}

function initializeComplexNumberCalculator() {
    const calculateBtn = document.getElementById('calculate-complex');
    const operationSelect = document.getElementById('complex-operation');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', handleComplexNumberCalculation);
    }
    if (operationSelect) {
        operationSelect.addEventListener('change', updateComplexInputs);
    }
    const numberInputs = document.querySelectorAll('#complex-numbers input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value !== '' && !/^-?\d*\.?\d*$/.test(this.value)) {
                this.value = this.value.slice(0, -1);
            }
        });
    });
}

function parseComplexNumber(str) {
    str = str.replace(/\s+/g, '');
    if (!str.includes('i')) {
        return { real: parseFloat(str) || 0, imag: 0 };
    }
    if (!str.match(/[+-]/) && str !== 'i') {
        str = str.replace('i', '');
        return { real: 0, imag: parseFloat(str) || 1 };
    }
    const parts = str.split(/([+-])/);
    let real = 0;
    let imag = 0;
    let current = '';
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part === '+' || part === '-') {
            if (current) {
                if (current.includes('i')) {
                    const num = current.replace('i', '') || '1';
                    imag += parseFloat(num);
                } else {
                    real += parseFloat(current);
                }
            }
            current = part;
        } else {
            current += part;
        }
    }
    if (current) {
        if (current.includes('i')) {
            const num = current.replace('i', '') || '1';
            imag += parseFloat(num);
        } else {
            real += parseFloat(current) || 0;
        }
    }
    return { real, imag };
} 