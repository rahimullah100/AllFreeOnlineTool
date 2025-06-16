function calculateSequence() {
    try {
        const firstTerm = parseFloat(document.getElementById('first-term').value);
        const commonDiff = parseFloat(document.getElementById('common-diff').value);
        const numTerms = parseInt(document.getElementById('num-terms').value);
        const sequenceType = document.getElementById('sequence-type').value;
        if (isNaN(firstTerm) || isNaN(commonDiff) || isNaN(numTerms)) {
            throw new Error('Please enter valid numbers for all fields');
        }
        if (numTerms <= 0) {
            throw new Error('Number of terms must be positive');
        }
        let terms = [];
        let resultText = '';
        if (sequenceType === 'arithmetic') {
            for (let i = 0; i < numTerms; i++) {
                const term = firstTerm + (i * commonDiff);
                terms.push(term);
            }
            resultText = `Arithmetic Sequence:\nFirst term (a₁) = ${firstTerm}\nCommon difference (d) = ${commonDiff}\nNumber of terms (n) = ${numTerms}\n\nSequence: ${terms.join(', ')}`;
        } else {
            for (let i = 0; i < numTerms; i++) {
                const term = firstTerm * Math.pow(commonDiff, i);
                terms.push(term);
            }
            resultText = `Geometric Sequence:\nFirst term (a₁) = ${firstTerm}\nCommon ratio (r) = ${commonDiff}\nNumber of terms (n) = ${numTerms}\n\nSequence: ${terms.join(', ')}`;
        }
        const resultElement = document.getElementById('sequence-result');
        if (resultElement) {
            resultElement.textContent = resultText;
        }
        console.log('Sequence calculation:', {
            type: sequenceType,
            firstTerm,
            commonDiff,
            numTerms,
            terms
        });
    } catch (error) {
        console.error('Sequence calculation error:', error);
        if (typeof showError === 'function') {
            showError('sequence-result', error.message);
        } else {
            const resultElement = document.getElementById('sequence-result');
            if (resultElement) {
                resultElement.textContent = 'Error: ' + error.message;
            }
        }
    }
} 