document.addEventListener('DOMContentLoaded', () => {
    // --- VendingOps Core Logic ---
    const FLEET_SIZE = 12; // 8 UVM + 4 UAMP
    const MAX_STOCK = 50; // Max capacity per machine (units)

    // Load or Init State
    let fleet = JSON.parse(localStorage.getItem('vendingFleet')) || initFleet();

    // Render Dashboard
    renderDashboard();

    // --- Functions ---

    function initFleet() {
        const machines = [];
        // 8 UVM Machines
        for (let i = 1; i <= 8; i++) {
            machines.push({
                id: `UVM-0${i}`,
                location: `UVM Piso ${Math.ceil(i / 2)}`, // Fake floor logic
                stock: MAX_STOCK,
                status: 'online',
                lastRefill: new Date().toLocaleDateString()
            });
        }
        // 4 UAMP Machines
        for (let i = 1; i <= 4; i++) {
            machines.push({
                id: `UAMP-0${i}`,
                location: `UAMP Edificio ${String.fromCharCode(64 + i)}`, // Fake Building A, B, C...
                stock: MAX_STOCK,
                status: 'online',
                lastRefill: new Date().toLocaleDateString()
            });
        }
        return machines;
    }

    function saveState() {
        localStorage.setItem('vendingFleet', JSON.stringify(fleet));
        renderDashboard();
    }

    function renderDashboard() {
        const grid = document.getElementById('machine-grid');
        if (!grid) return;

        grid.innerHTML = ''; // Clear
        let totalStock = 0;
        let alertCount = 0;

        fleet.forEach((machine, index) => {
            // Stats Logic
            totalStock += machine.stock;
            const stockPercent = (machine.stock / MAX_STOCK) * 100;
            let statusColor = 'var(--success)';
            let statusBadge = 'ONLINE';

            if (stockPercent < 20) {
                statusColor = 'var(--danger)';
                statusBadge = 'CRITICAL';
                alertCount++;
            } else if (stockPercent < 40) {
                statusColor = 'var(--warning)';
                statusBadge = 'LOW';
            }

            // Create Card
            const card = document.createElement('div');
            card.className = 'card machine-card';
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                    <div>
                        <div style="font-weight:700; font-size:1.1rem;">${machine.id}</div>
                        <div style="font-size:0.8rem; color:var(--text-secondary);">${machine.location}</div>
                    </div>
                    <span class="badge" style="background:${statusColor}20; color:${statusColor}">${statusBadge}</span>
                </div>
                
                <div class="stock-indicator">
                    <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:0.3rem;">
                        <span>Stock Level</span>
                        <span>${machine.stock} / ${MAX_STOCK}</span>
                    </div>
                    <div style="width:100%; height:8px; background:rgba(255,255,255,0.1); border-radius:4px; overflow:hidden;">
                        <div style="width:${stockPercent}%; height:100%; background:${statusColor}; transition:width 0.5s;"></div>
                    </div>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem; padding-top:1rem; border-top:1px solid rgba(255,255,255,0.05);">
                    <div style="font-size:0.7rem; color:var(--text-secondary);">
                        Refilled: ${machine.lastRefill}
                    </div>
                    <button class="btn btn-sm btn-outline" style="border:1px solid var(--glass-border); color:#fff;" onclick="window.refillMachine(${index})">
                        <i class="fa-solid fa-rotate"></i> Restock
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });

        // Update Top Stats
        document.getElementById('total-stock-display').innerText = totalStock;
        document.getElementById('alert-count-display').innerText = alertCount;
    }

    // --- Exposed Global Window Functions (for buttons) ---

    window.simulateSales = () => {
        // Randomly reduce stock from random machines
        fleet.forEach(machine => {
            if (Math.random() > 0.3 && machine.stock > 0) {
                const sold = Math.floor(Math.random() * 5) + 1; // 1-5 sales
                machine.stock = Math.max(0, machine.stock - sold);
            }
        });
        saveState();
        alert('Simulated 1 day of sales!');
    };

    window.refillMachine = (index) => {
        fleet[index].stock = MAX_STOCK;
        fleet[index].lastRefill = new Date().toLocaleDateString();
        saveState();
    };

    window.resetFleet = () => {
        if (confirm('Reset all machine data?')) {
            fleet = initFleet();
            saveState();
        }
    };
});
