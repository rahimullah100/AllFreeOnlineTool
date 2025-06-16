// Series Calculator (Modularized)
document.addEventListener('DOMContentLoaded', function() {
    const calculateSeriesBtn = document.getElementById('calculate-series');
    if (calculateSeriesBtn) {
        calculateSeriesBtn.addEventListener('click', function() {
            try {
                const seriesType = document.getElementById('series-type').value;
                let result;
                let terms = [];
                
                switch (seriesType) {
                    case 'arithmetic':
                        const firstTerm = parseFloat(document.getElementById('series-first-term').value);
                        const commonRatio = parseFloat(document.getElementById('series-common-diff').value);
                        const numTerms = parseInt(document.getElementById('series-terms').value);

                        if (isNaN(firstTerm) || isNaN(commonRatio) || isNaN(numTerms)) {
                            throw new Error('Please enter valid numbers');
                        }

                        // Calculate terms and sum of arithmetic series
                        for (let i = 0; i < numTerms; i++) {
                            const term = firstTerm + i * commonRatio;
                            terms.push(term);
                        }
                        result = (numTerms / 2) * (firstTerm + terms[terms.length - 1]);
                        break;
                        
                    case 'geometric':
                        const geoFirstTerm = parseFloat(document.getElementById('series-first-term').value);
                        const geoRatio = parseFloat(document.getElementById('series-common-diff').value);
                        const geoNumTerms = parseInt(document.getElementById('series-terms').value);

                        if (isNaN(geoFirstTerm) || isNaN(geoRatio) || isNaN(geoNumTerms)) {
                            throw new Error('Please enter valid numbers');
                        }

                        // Calculate terms and sum of geometric series
                        let currentTerm = geoFirstTerm;
                        for (let i = 0; i < geoNumTerms; i++) {
                            terms.push(currentTerm);
                            currentTerm *= geoRatio;
                        }
                        if (geoRatio === 1) {
                            result = geoFirstTerm * geoNumTerms;
                        } else {
                            result = geoFirstTerm * (1 - Math.pow(geoRatio, geoNumTerms)) / (1 - geoRatio);
                        }
                        break;
                        
                    default:
                        throw new Error('Invalid series type');
                }

                // Format the result display
                let resultText = '';
                
                // Show individual terms in comma-separated format
                if (terms.length > 0) {
                    resultText += terms.join(', ');
                    resultText += '\nResult: ';
                }
                
                // Show final result
                if (typeof result === 'number') {
                    resultText += result.toFixed(6);
                } else {
                    resultText += result;
                }

                document.getElementById('series-result').textContent = resultText;
                
                // Log the calculation
                console.log('Series calculation:', {
                    type: seriesType,
                    terms,
                    result
                });
            } catch (error) {
                console.error('Series calculation error:', error);
                if (typeof showError === 'function') {
                    showError('series-result', error.message);
                } else {
                    document.getElementById('series-result').textContent = 'Error: ' + error.message;
                }
            }
        });
    }
}); 