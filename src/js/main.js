import { calculateTaxes, formatCurrency } from './modules/calculator.js';
import '../css/main.css';

document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount-input');
    const btnConIva = document.getElementById('btn-con-iva');
    const btnSinIva = document.getElementById('btn-sin-iva');

    const ivaValue = document.getElementById('val-iva');
    const ivaContainer = document.getElementById('container-iva');
    const rentaValue = document.getElementById('val-renta');
    const totalValue = document.getElementById('val-total');
    const liquidValue = document.getElementById('val-liquid');

    let applyIva = true;

    function updateUI() {
        const amount = parseFloat(amountInput.value) || 0;
        const results = calculateTaxes(amount, applyIva);

        if (applyIva) {
            btnConIva.classList.remove('ghost');
            btnSinIva.classList.add('ghost');
            ivaContainer.style.display = 'block';
            ivaValue.textContent = formatCurrency(results.iva);
        } else {
            btnConIva.classList.add('ghost');
            btnSinIva.classList.remove('ghost');
            ivaContainer.style.display = 'none';
        }

        rentaValue.textContent = `-${formatCurrency(results.renta)}`;
        totalValue.textContent = formatCurrency(results.totalInvoice);
        liquidValue.textContent = formatCurrency(results.liquid);
    }

    amountInput.addEventListener('input', updateUI);

    btnConIva.addEventListener('click', () => {
        applyIva = true;
        updateUI();
    });

    btnSinIva.addEventListener('click', () => {
        applyIva = false;
        updateUI();
    });

    updateUI();
});
