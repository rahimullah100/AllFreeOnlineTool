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

function formatComplexNumber(real, imag) {
    if (imag === 0) return real.toString();
    if (real === 0) return `${imag}i`;
    return `${real}${imag >= 0 ? '+' : ''}${imag}i`;
}

function parseVector(str) {
    if (!str) return [];
    return str.split(',').map(part => {
        part = part.trim();
        if (!part) return { real: 0, imag: 0 };
        return parseComplexNumber(part);
    });
}

function formatVector(vector) {
    return vector.map(({ real, imag }) => formatComplexNumber(real, imag)).join(', ');
}

const vectorOperations = {
    add: (v1, v2) => {
        if (v1.length !== v2.length) {
            throw new Error('Vectors must have the same length for addition');
        }
        return v1.map((num, i) => ({
            real: num.real + (v2[i]?.real || 0),
            imag: num.imag + (v2[i]?.imag || 0)
        }));
    },
    subtract: (v1, v2) => {
        if (v1.length !== v2.length) {
            throw new Error('Vectors must have the same length for subtraction');
        }
        return v1.map((num, i) => ({
            real: num.real - (v2[i]?.real || 0),
            imag: num.imag - (v2[i]?.imag || 0)
        }));
    },
    dot: (v1, v2) => {
        if (v1.length !== v2.length) {
            throw new Error('Vectors must have the same length for dot product');
        }
        let result = { real: 0, imag: 0 };
        for (let i = 0; i < v1.length; i++) {
            const a = v1[i];
            const b = v2[i];
            const real = (a.real * b.real) - (a.imag * b.imag);
            const imag = (a.real * b.imag) + (a.imag * b.real);
            result.real += real;
            result.imag += imag;
        }
        return [result];
    }
};

function handleVectorCalculation() {
    try {
        const operation = document.getElementById('vector-operation').value;
        const vector1Str = document.getElementById('vector1').value.trim();
        const vector2Str = document.getElementById('vector2').value.trim();
        if (!vector1Str || !vector2Str) {
            throw new Error('Please enter both vectors');
        }
        const vector1 = parseVector(vector1Str);
        const vector2 = parseVector(vector2Str);
        if (vector1.length === 0 || vector2.length === 0) {
            throw new Error('Vectors cannot be empty');
        }
        const result = vectorOperations[operation](vector1, vector2);
        const resultElement = document.getElementById('vector-result');
        if (resultElement) {
            resultElement.textContent = formatVector(result);
            resultElement.style.color = '#333';
            resultElement.style.fontWeight = 'bold';
        }
    } catch (error) {
        console.error('Vector Calculation Error:', error);
        const resultElement = document.getElementById('vector-result');
        if (resultElement) {
            resultElement.textContent = `Error: ${error.message}`;
            resultElement.style.color = '#ff4d4d';
        }
    }
}

function initializeVectorCalculator() {
    const calculateBtn = document.getElementById('calculate-vector');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', handleVectorCalculation);
        const inputFields = document.querySelectorAll('#vector-calculator input[type="text"]');
        inputFields.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleVectorCalculation();
                }
            });
        });
    }
} 