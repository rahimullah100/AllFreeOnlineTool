// Equation Solver Tool (modularized from math-tools.js)

// Requires math.js to be loaded globally

function showError(elementId, message) {
    console.error(`Showing error in ${elementId}:`, message);
    let element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element with ID '${elementId}' not found, trying class selector...`);
        element = document.querySelector(`.${elementId}`);
    }
    if (!element) {
        console.error(`Could not find element with ID or class '${elementId}'`);
        return;
    }
    let errorElement = element.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#dc3545';
        errorElement.style.marginTop = '10px';
        errorElement.style.padding = '10px';
        errorElement.style.backgroundColor = '#f8d7da';
        errorElement.style.border = '1px solid #f5c6cb';
        errorElement.style.borderRadius = '4px';
        element.prepend(errorElement);
    }
    errorElement.textContent = `Error: ${message}`;
    errorElement.style.display = 'block';
    setTimeout(() => {
        if (errorElement) {
            errorElement.style.display = 'none';
            errorElement.textContent = '';
        }
    }, 5000);
    console.error(`Error in ${elementId}:`, message);
}

// Helper: Extract polynomial coefficients from a math.js expression
function getPolynomialCoefficients(expr, variable, degree) {
    // Returns array of coefficients for x^degree ... x^0
    // e.g., for degree=2: [a, b, c] for ax^2 + bx + c
    const node = math.parse(expr);
    const poly = math.simplify(node);
    const coeffs = Array(degree + 1).fill(0);
    function traverse(node) {
        if (node.type === 'OperatorNode' && node.op === '+') {
            traverse(node.args[0]);
            traverse(node.args[1]);
        } else if (node.type === 'OperatorNode' && node.op === '-') {
            traverse(node.args[0]);
            const neg = math.parse(`-1*(${node.args[1].toString()})`);
            traverse(neg);
        } else if (node.type === 'OperatorNode' && node.op === '*') {
            let coeff = 1, power = 0;
            node.args.forEach(arg => {
                if (arg.type === 'SymbolNode' && arg.name === variable) {
                    power += 1;
                } else if (arg.type === 'OperatorNode' && arg.op === '^' && arg.args[0].name === variable) {
                    power += parseInt(arg.args[1].value);
                } else if (arg.type === 'ConstantNode') {
                    coeff *= parseFloat(arg.value);
                } else {
                    try { coeff *= math.evaluate(arg.toString()); } catch {}
                }
            });
            if (power <= degree) coeffs[degree - power] += coeff;
        } else if (node.type === 'OperatorNode' && node.op === '^' && node.args[0].name === variable) {
            const power = parseInt(node.args[1].value);
            if (power <= degree) coeffs[degree - power] += 1;
        } else if (node.type === 'SymbolNode' && node.name === variable) {
            coeffs[degree - 1] += 1;
        } else if (node.type === 'ConstantNode') {
            coeffs[degree] += parseFloat(node.value);
        }
    }
    traverse(poly);
    return coeffs;
}

function solveLinearEquation(leftSide, rightSide) {
    try {
        const expr = `(${leftSide}) - (${rightSide})`;
        const simplified = math.simplify(expr).toString();
        const [a, b] = getPolynomialCoefficients(simplified, 'x', 1);
        if (a === 0) throw new Error('No x term found in equation');
        const solution = -b / a;
        return `x = ${solution}`;
    } catch (error) {
        throw new Error('Error solving linear equation: ' + error.message);
    }
}

function solveQuadraticEquation(leftSide, rightSide) {
    try {
        const expr = `(${leftSide}) - (${rightSide})`;
        const simplified = math.simplify(expr).toString();
        const [a, b, c] = getPolynomialCoefficients(simplified, 'x', 2);
        if (a === 0 && b === 0) {
            if (c === 0) return 'Infinite solutions (0 = 0)';
            return 'No solution';
        }
        const discriminant = b * b - 4 * a * c;
        if (discriminant < 0) {
            return 'No real solutions';
        } else if (discriminant === 0) {
            const x = -b / (2 * a);
            return `x = ${x}`;
        } else {
            const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            return `x = ${x1} or x = ${x2}`;
        }
    } catch (error) {
        throw new Error('Error solving quadratic equation: ' + error.message);
    }
}

function solveCubicEquation(leftSide, rightSide) {
    try {
        const expr = `(${leftSide}) - (${rightSide})`;
        const simplified = math.simplify(expr).toString();
        const [a, b, c, d] = getPolynomialCoefficients(simplified, 'x', 3);
        if (a === 0) throw new Error('Not a cubic equation');
        const roots = math.roots([a, b, c, d]);
        if (!roots.length) return 'No real solutions';
        return 'x = ' + roots.map(r => (typeof r === 'object' ? math.format(r, {precision: 4}) : r)).join(' or x = ');
    } catch (error) {
        throw new Error('Error solving cubic equation: ' + error.message);
    }
}

function solveEquation(equation, type) {
    try {
        const [leftSide, rightSide] = equation.split('=').map(side => side.trim());
        switch(type) {
            case 'linear':
                return solveLinearEquation(leftSide, rightSide);
            case 'quadratic':
                return solveQuadraticEquation(leftSide, rightSide);
            case 'cubic':
                return solveCubicEquation(leftSide, rightSide);
            default:
                throw new Error('Invalid equation type');
        }
    } catch (error) {
        throw new Error('Equation solving error: ' + error.message);
    }
}

function solveEquationHandler() {
    try {
        const equation = document.getElementById('equation-input').value;
        const type = document.getElementById('equation-type').value;
        const resultElement = document.getElementById('equation-result');
        if (!equation || !type) {
            showError('equation-result', 'Please enter an equation and select a type.');
            return;
        }
        try {
            const result = solveEquation(equation, type);
            resultElement.textContent = result;
        } catch (error) {
            showError('equation-result', error.message);
        }
    } catch (error) {
        showError('equation-result', error.message);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const solveEquationBtn = document.getElementById('solve-equation');
    if (solveEquationBtn) {
        solveEquationBtn.addEventListener('click', solveEquationHandler);
    }
    // Optionally, handle Enter key in the equation input
    const equationInput = document.getElementById('equation-input');
    if (equationInput) {
        equationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                solveEquationHandler();
            }
        });
    }
}); 