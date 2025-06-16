// Re-initialize the Series Calculator after the debug script
function reinitSeriesCalculator() {
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
                let resultText = '';
                if (terms.length > 0) {
                    resultText += terms.join(', ');
                    resultText += '\nResult: ';
                }
                if (typeof result === 'number') {
                    resultText += result.toFixed(6);
                } else {
                    resultText += result;
                }
                document.getElementById('series-result').textContent = resultText;
            } catch (error) {
                document.getElementById('series-result').textContent = 'Error: ' + error.message;
            }
        });
    }
}
// Call after DOMContentLoaded and after debug script
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    reinitSeriesCalculator();
} else {
    window.addEventListener('DOMContentLoaded', reinitSeriesCalculator);
} 