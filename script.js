document.addEventListener('DOMContentLoaded', () => {
    // Business Case Agent Logic
    const initBtn = document.getElementById('init-system-btn');
    const npvValue = document.getElementById('npv-value');
    const roiValue = document.getElementById('roi-value');

    console.log('--- System Active: Business Case Agent ---');
    console.log('Mode: Capital Preservation & Alpha Generation');

    // Simulate Initialization
    if (initBtn) {
        initBtn.addEventListener('click', () => {
            initBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Validating Assets...';
            initBtn.disabled = true;

            setTimeout(() => {
                // Mock Data Calculation
                const simulatedNPV = (Math.random() * 50000 + 10000).toFixed(2);
                const simulatedROI = (Math.random() * 15 + 5).toFixed(1);

                npvValue.innerText = simulatedNPV;
                roiValue.innerText = simulatedROI;

                npvValue.parentElement.nextElementSibling.classList.replace('status-warning', 'status-success');
                npvValue.parentElement.nextElementSibling.innerText = 'Calculated';

                roiValue.parentElement.nextElementSibling.classList.replace('status-warning', 'status-success');
                roiValue.parentElement.nextElementSibling.innerText = 'Projected';
                
                initBtn.innerHTML = '<i class="fa-solid fa-check"></i> System Online';
                initBtn.classList.replace('btn-primary', 'status-success');
                initBtn.style.color = '#fff'; // Ensure text is visible
                
                console.log(`[VERDICT]: PROCEED. NPV: $${simulatedNPV}, ROI: ${simulatedROI}%`);
            }, 1500);
        });
    }
});
