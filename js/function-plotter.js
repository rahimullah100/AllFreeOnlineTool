// Function Plotter (Modularized)
document.addEventListener('DOMContentLoaded', function() {
    const plotBtn = document.getElementById('plot-function');
    if (!plotBtn) return;
    plotBtn.addEventListener('click', function() {
        const funcInput = document.getElementById('function-input');
        const xMinInput = document.getElementById('x-min');
        const xMaxInput = document.getElementById('x-max');
        const yMinInput = document.getElementById('y-min');
        const yMaxInput = document.getElementById('y-max');
        const plotContainer = document.getElementById('plot-container');
        if (!funcInput || !xMinInput || !xMaxInput || !yMinInput || !yMaxInput || !plotContainer) return;
        const expr = funcInput.value.trim();
        if (!expr) {
            plotContainer.innerHTML = '<div class="error">Please enter a function to plot.</div>';
            return;
        }
        // DO NOT replace ^ with ** for function-plot!
        // Only replace implicit multiplication (e.g., 2x -> 2*x)
        let plotExpr = expr.replace(/(\d)([a-zA-Z])/g, '$1*$2');
        // Remove previous plot
        plotContainer.innerHTML = '';
        try {
            functionPlot({
                target: plotContainer,
                width: plotContainer.offsetWidth || 600,
                height: 400,
                grid: true,
                xAxis: {
                    domain: [parseFloat(xMinInput.value), parseFloat(xMaxInput.value)]
                },
                yAxis: {
                    domain: [parseFloat(yMinInput.value), parseFloat(yMaxInput.value)]
                },
                data: [{
                    fn: plotExpr,
                    sampler: 'builtIn',
                    graphType: 'polyline'
                }]
            });
        } catch (error) {
            plotContainer.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        }
    });
}); 