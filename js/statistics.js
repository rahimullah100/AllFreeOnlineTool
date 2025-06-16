// Statistics Calculator Tool (modularized from math-tools.js)

function calculateStatistics(data) {
    // ... (full function code from math-tools.js)
    try {
        if (typeof data !== 'string') {
            throw new Error('Input must be a string');
        }
        const numberStrings = data.split(',');
        const numbers = numberStrings
            .map(n => n.trim())
            .filter(n => n !== '')
            .map(n => parseFloat(n))
            .filter(n => !isNaN(n));
        if (numbers.length === 0) {
            throw new Error('No valid numbers provided. Please enter numbers separated by commas.');
        }
        let mean, median, mode, variance, stdDev, min, max, range;
        mean = calculateMean(numbers);
        median = calculateMedian(numbers);
        mode = calculateMode(numbers);
        variance = calculateVariance(numbers, mean);
        stdDev = Math.sqrt(variance);
        min = Math.min(...numbers);
        max = Math.max(...numbers);
        range = max - min;
        const results = {
            'mean-result': mean !== undefined ? mean.toFixed(4) : 'N/A',
            'median-result': median !== undefined ? median.toFixed(4) : 'N/A',
            'mode-result': mode !== undefined ? formatMode(mode) : 'N/A',
            'std-result': stdDev !== undefined ? stdDev.toFixed(4) : 'N/A',
            'variance-result': variance !== undefined ? variance.toFixed(4) : 'N/A',
            'range-result': range !== undefined ? range.toFixed(4) : 'N/A',
            'min-result': min !== undefined ? min.toString() : 'N/A',
            'max-result': max !== undefined ? max.toString() : 'N/A'
        };
        Object.entries(results).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
                element.style.display = 'inline';
                element.style.visibility = 'visible';
                element.style.opacity = '1';
            }
        });
        const resultsContainer = document.querySelector('.statistics-results');
        if (resultsContainer) {
            resultsContainer.style.display = 'block';
            resultsContainer.style.visibility = 'visible';
            resultsContainer.style.opacity = '1';
        }
        // Setup copy buttons after results are updated
        setupStatisticsCopyButtons();
        return true;
    } catch (error) {
        const resultIds = ['mean', 'median', 'mode', 'std', 'variance', 'range', 'min', 'max'];
        resultIds.forEach(id => {
            const element = document.getElementById(`${id}-result`);
            if (element) {
                element.textContent = '';
            }
        });
        throw new Error('Statistics calculation error: ' + error.message);
    }
}

function calculateMean(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

function calculateMedian(numbers) {
    const sorted = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
}

function calculateMode(numbers) {
    const frequency = {};
    numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    if (maxFreq === 1) {
        return null;
    }
    const modes = Object.entries(frequency)
        .filter(([_, freq]) => freq === maxFreq)
        .map(([num]) => parseFloat(num))
        .sort((a, b) => a - b);
    return modes;
}

function calculateVariance(numbers, mean) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Invalid input: numbers array is empty or not an array');
    }
    if (typeof mean !== 'number' || isNaN(mean)) {
        throw new Error('Invalid input: mean is not a valid number');
    }
    const squaredDifferences = numbers.map(num => {
        if (typeof num !== 'number' || isNaN(num)) {
            throw new Error('Invalid input: contains non-numeric values');
        }
        return Math.pow(num - mean, 2);
    });
    const variance = squaredDifferences.reduce((sum, num) => sum + num, 0) / numbers.length;
    if (isNaN(variance)) {
        throw new Error('Error: variance calculation resulted in NaN');
    }
    return variance;
}

function formatMode(mode) {
    if (!mode) return 'No mode';
    if (Array.isArray(mode)) {
        if (mode.length === 1) return mode[0].toString();
        return mode.join(', ');
    }
    return mode.toString();
}

function initializeStatisticsCalculator() {
    try {
        const calculateBtn = document.getElementById('calculate-statistics');
        const dataInput = document.getElementById('data-input');
        const resultsContainer = document.querySelector('.statistics-results');
        if (!calculateBtn || !dataInput || !resultsContainer) {
            return;
        }
        const newBtn = calculateBtn.cloneNode(true);
        calculateBtn.parentNode.replaceChild(newBtn, calculateBtn);
        newBtn.addEventListener('click', function() {
            try {
                const inputValue = dataInput.value.trim();
                if (!inputValue) {
                    throw new Error('Please enter some numbers to calculate');
                }
                const resultElements = document.querySelectorAll('.result-value');
                resultElements.forEach(el => {
                    el.textContent = 'Calculating...';
                    el.style.color = '';
                    el.style.display = 'inline';
                });
                resultsContainer.style.display = 'block';
                resultsContainer.style.visibility = 'visible';
                resultsContainer.style.opacity = '1';
                const success = calculateStatistics(inputValue);
                if (!success) {
                    throw new Error('Failed to calculate statistics');
                }
            } catch (error) {
                const firstResult = document.querySelector('.result-value');
                if (firstResult) {
                    firstResult.textContent = 'Error: ' + error.message;
                    firstResult.style.color = 'red';
                }
            }
        });
    } catch (error) {
        // Fail silently
    }
}

function setupStatisticsCopyButtons() {
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.onclick = function() {
            const targetId = btn.getAttribute('data-target');
            const target = document.getElementById(targetId);
            if (target && target.textContent) {
                navigator.clipboard.writeText(target.textContent).then(() => {
                    btn.title = 'Copied!';
                    btn.classList.add('copied');
                    setTimeout(() => {
                        btn.title = 'Copy to clipboard';
                        btn.classList.remove('copied');
                    }, 1000);
                });
            }
        };
    });
}

document.addEventListener('DOMContentLoaded', initializeStatisticsCalculator); 