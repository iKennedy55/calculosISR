import { calculateTaxes } from './modules/calculator.js';
import { formatCurrency, applyCurrencyMask, parseCurrencyMask } from './utils/formatters.js';

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
        // Parser for the custom masked input
        const amount = parseCurrencyMask(amountInput.value);
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

    function handleInput(e) {
        // Update the input mask formatting
        const masked = applyCurrencyMask(e.target.value);
        e.target.value = masked;
        updateUI();
    }

    amountInput.addEventListener('input', handleInput);

    amountInput.addEventListener('blur', (e) => {
        const amount = parseCurrencyMask(e.target.value);
        if (amount > 0) {
            e.target.value = formatCurrency(amount);
        } else {
            e.target.value = '';
        }
        updateUI();
    });

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
