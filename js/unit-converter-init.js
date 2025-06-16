function reinitUnitConverter() {
    // Unit options for each type
    const unitOptions = {
        length: ['m', 'km', 'cm', 'mm', 'mi', 'yd', 'ft', 'in'],
        weight: ['kg', 'g', 'mg', 'lb', 'oz'],
        temperature: ['C', 'F', 'K'],
        area: ['m²', 'km²', 'cm²', 'mm²', 'ft²', 'in²', 'ac', 'ha'],
        volume: ['m³', 'l', 'ml', 'ft³', 'in³', 'gal', 'qt'],
        time: ['s', 'min', 'h', 'd'],
        speed: ['m/s', 'km/h', 'mi/h', 'ft/s']
    };
    function populateUnitSelects(type) {
        const fromUnit = document.getElementById('from-unit');
        const toUnit = document.getElementById('to-unit');
        if (!fromUnit || !toUnit) return;
        fromUnit.innerHTML = '';
        toUnit.innerHTML = '';
        unitOptions[type].forEach(unit => {
            const option1 = document.createElement('option');
            option1.value = unit;
            option1.textContent = unit;
            fromUnit.appendChild(option1);
            const option2 = document.createElement('option');
            option2.value = unit;
            option2.textContent = unit;
            toUnit.appendChild(option2);
        });
    }
    const typeSelect = document.getElementById('conversion-type');
    if (typeSelect) {
        typeSelect.addEventListener('change', function() {
            populateUnitSelects(this.value);
        });
        populateUnitSelects(typeSelect.value);
    }
    const convertBtn = document.getElementById('convert-unit');
    if (convertBtn) {
        convertBtn.addEventListener('click', function() {
            try {
                const type = typeSelect.value;
                const value = parseFloat(document.getElementById('conversion-value').value);
                const from = document.getElementById('from-unit').value;
                const to = document.getElementById('to-unit').value;
                if (isNaN(value)) throw new Error('Please enter a valid value');
                // Conversion logic (copied from main unit-converter.js)
                const unitFactors = {
                    length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254 },
                    weight: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495 },
                    temperature: {},
                    area: { 'm²': 1, 'km²': 1e6, 'cm²': 0.0001, 'mm²': 0.000001, 'ft²': 0.092903, 'in²': 0.00064516, 'ac': 4046.86, 'ha': 10000 },
                    volume: { 'm³': 1, 'l': 0.001, 'ml': 0.000001, 'ft³': 0.0283168, 'in³': 0.0000163871, 'gal': 0.00378541, 'qt': 0.000946353 },
                    time: { s: 1, min: 60, h: 3600, d: 86400 },
                    speed: { 'm/s': 1, 'km/h': 0.277778, 'mi/h': 0.44704, 'ft/s': 0.3048 }
                };
                function convertUnits(type, value, from, to) {
                    if (type === 'temperature') {
                        if (from === to) return value;
                        let celsius;
                        if (from === 'C') celsius = value;
                        else if (from === 'F') celsius = (value - 32) * 5/9;
                        else if (from === 'K') celsius = value - 273.15;
                        else throw new Error('Invalid temperature unit');
                        if (to === 'C') return celsius;
                        if (to === 'F') return celsius * 9/5 + 32;
                        if (to === 'K') return celsius + 273.15;
                        throw new Error('Invalid temperature unit');
                    } else {
                        const baseValue = value * unitFactors[type][from];
                        return baseValue / unitFactors[type][to];
                    }
                }
                const result = convertUnits(type, value, from, to);
                document.getElementById('unit-result').textContent = `${value} ${from} = ${result} ${to}`;
            } catch (error) {
                document.getElementById('unit-result').textContent = 'Error: ' + error.message;
            }
        });
    }
}
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    reinitUnitConverter();
} else {
    window.addEventListener('DOMContentLoaded', reinitUnitConverter);
} 