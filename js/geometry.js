// Geometry Calculator (Modularized)
function showGeometryInputs() {
    const shapeType = document.getElementById('geometry-shape').value;
    const inputSections = document.querySelectorAll('.geometry-inputs > div');
    // Hide all input sections first
    inputSections.forEach(section => {
        section.style.display = 'none';
    });
    // Show the relevant input section
    switch (shapeType) {
        case 'circle':
            document.querySelector('.circle-inputs').style.display = 'block';
            break;
        case 'rectangle':
            document.querySelector('.rectangle-inputs').style.display = 'block';
            break;
        case 'triangle':
            document.querySelector('.triangle-inputs').style.display = 'block';
            break;
        case 'square':
            document.querySelector('.square-inputs').style.display = 'block';
            break;
        case 'parallelogram':
            document.querySelector('.parallelogram-inputs').style.display = 'block';
            break;
        case 'trapezoid':
            document.querySelector('.trapezoid-inputs').style.display = 'block';
            break;
        case 'sphere':
            document.querySelector('.sphere-inputs').style.display = 'block';
            break;
        case 'cube':
            document.querySelector('.cube-inputs').style.display = 'block';
            break;
        case 'cylinder':
            document.querySelector('.cylinder-inputs').style.display = 'block';
            break;
        case 'cone':
            document.querySelector('.cone-inputs').style.display = 'block';
            break;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const calculateGeometryBtn = document.getElementById('calculate-geometry');
    if (calculateGeometryBtn) {
        calculateGeometryBtn.addEventListener('click', function() {
            try {
                const shapeType = document.getElementById('geometry-shape').value;
                let result = {};

                switch (shapeType) {
                    case 'circle':
                        const radius = parseFloat(document.getElementById('radius').value);
                        if (isNaN(radius)) throw new Error('Please enter a valid radius');
                        
                        result.area = Math.PI * radius * radius;
                        result.perimeter = 2 * Math.PI * radius;
                        break;

                    case 'rectangle':
                        const length = parseFloat(document.getElementById('length').value);
                        const width = parseFloat(document.getElementById('width').value);
                        if (isNaN(length) || isNaN(width)) throw new Error('Please enter valid dimensions');
                        
                        result.area = length * width;
                        result.perimeter = 2 * (length + width);
                        break;

                    case 'triangle':
                        const base = parseFloat(document.getElementById('base').value);
                        const height = parseFloat(document.getElementById('height').value);
                        if (isNaN(base) || isNaN(height)) throw new Error('Please enter valid dimensions');
                        
                        result.area = 0.5 * base * height;
                        // For perimeter, we need all three sides
                        const sideA = parseFloat(document.getElementById('side-a').value);
                        const sideB = parseFloat(document.getElementById('side-b').value);
                        const sideC = parseFloat(document.getElementById('side-c').value);
                        if (isNaN(sideA) || isNaN(sideB) || isNaN(sideC)) throw new Error('Please enter all side lengths');
                        result.perimeter = sideA + sideB + sideC;
                        break;

                    case 'square':
                        const side = parseFloat(document.getElementById('side').value);
                        if (isNaN(side)) throw new Error('Please enter a valid side length');
                        
                        result.area = side * side;
                        result.perimeter = 4 * side;
                        break;

                    case 'parallelogram':
                        const basePar = parseFloat(document.getElementById('base-par').value);
                        const heightPar = parseFloat(document.getElementById('height-par').value);
                        if (isNaN(basePar) || isNaN(heightPar)) throw new Error('Please enter valid dimensions');
                        
                        result.area = basePar * heightPar;
                        result.perimeter = 2 * (basePar + heightPar);
                        break;

                    case 'trapezoid':
                        const base1 = parseFloat(document.getElementById('base1').value);
                        const base2 = parseFloat(document.getElementById('base2').value);
                        const heightTrap = parseFloat(document.getElementById('height-trap').value);
                        if (isNaN(base1) || isNaN(base2) || isNaN(heightTrap)) throw new Error('Please enter valid dimensions');
                        
                        result.area = 0.5 * (base1 + base2) * heightTrap;
                        result.perimeter = base1 + base2 + 2 * Math.sqrt(Math.pow((base2 - base1) / 2, 2) + Math.pow(heightTrap, 2));
                        break;

                    case 'sphere':
                        const radiusSphere = parseFloat(document.getElementById('radius-sphere').value);
                        if (isNaN(radiusSphere)) throw new Error('Please enter a valid radius');
                        
                        result.volume = (4/3) * Math.PI * Math.pow(radiusSphere, 3);
                        result.surfaceArea = 4 * Math.PI * Math.pow(radiusSphere, 2);
                        break;

                    case 'cube':
                        const edge = parseFloat(document.getElementById('edge').value);
                        if (isNaN(edge)) throw new Error('Please enter a valid edge length');
                        
                        result.volume = Math.pow(edge, 3);
                        result.surfaceArea = 6 * Math.pow(edge, 2);
                        break;

                    case 'cylinder':
                        const radiusCyl = parseFloat(document.getElementById('radius-cyl').value);
                        const heightCyl = parseFloat(document.getElementById('height-cyl').value);
                        if (isNaN(radiusCyl) || isNaN(heightCyl)) throw new Error('Please enter valid dimensions');
                        
                        result.volume = Math.PI * Math.pow(radiusCyl, 2) * heightCyl;
                        result.surfaceArea = 2 * Math.PI * radiusCyl * (radiusCyl + heightCyl);
                        break;

                    case 'cone':
                        const radiusCone = parseFloat(document.getElementById('radius-cone').value);
                        const heightCone = parseFloat(document.getElementById('height-cone').value);
                        if (isNaN(radiusCone) || isNaN(heightCone)) throw new Error('Please enter valid dimensions');
                        
                        result.volume = (1/3) * Math.PI * Math.pow(radiusCone, 2) * heightCone;
                        const slantHeight = Math.sqrt(Math.pow(radiusCone, 2) + Math.pow(heightCone, 2));
                        result.surfaceArea = Math.PI * radiusCone * (radiusCone + slantHeight);
                        break;

                    default:
                        throw new Error('Invalid shape type');
                }

                // Update results
                const resultElement = document.getElementById('geometry-result');
                if (resultElement) {
                    let resultHTML = '<div class="result-group">';
                    
                    if (result.area !== undefined) {
                        resultHTML += `<div class="result-item">
                            <span class="result-label">Area:</span>
                            <span class="result-value">${result.area.toFixed(6)}</span>
                        </div>`;
                    }
                    
                    if (result.perimeter !== undefined) {
                        resultHTML += `<div class="result-item">
                            <span class="result-label">Perimeter:</span>
                            <span class="result-value">${result.perimeter.toFixed(6)}</span>
                        </div>`;
                    }
                    
                    if (result.volume !== undefined) {
                        resultHTML += `<div class="result-item">
                            <span class="result-label">Volume:</span>
                            <span class="result-value">${result.volume.toFixed(6)}</span>
                        </div>`;
                    }
                    
                    if (result.surfaceArea !== undefined) {
                        resultHTML += `<div class="result-item">
                            <span class="result-label">Surface Area:</span>
                            <span class="result-value">${result.surfaceArea.toFixed(6)}</span>
                        </div>`;
                    }
                    
                    resultHTML += '</div>';
                    resultElement.innerHTML = resultHTML;
                }
                
                // Log the calculation
                console.log('Geometry calculation:', {
                    type: shapeType,
                    result
                });
            } catch (error) {
                console.error('Geometry calculation error:', error);
                const resultElement = document.getElementById('geometry-result');
                if (resultElement) {
                    resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
                }
            }
        });
    }

    // Add event listener for geometry shape type change
    const geometryShapeSelect = document.getElementById('geometry-shape');
    if (geometryShapeSelect) {
        geometryShapeSelect.addEventListener('change', showGeometryInputs);
        showGeometryInputs(); // Set initial state
    }
}); 