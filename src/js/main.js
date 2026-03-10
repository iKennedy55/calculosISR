(function () {
    'use strict';

    // -- formatters --

    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }

    function parseNumericInput(value) {
        const cleaned = value.replace(/[^0-9.]/g, '');
        const parts = cleaned.split('.');
        const sanitized = parts.length > 2
            ? parts[0] + '.' + parts.slice(1).join('')
            : cleaned;

        const num = parseFloat(sanitized);
        return isNaN(num) ? 0 : num;
    }

    // -- calculator --

    function calculateTaxes(amount, applyIva) {
        if (isNaN(amount) || amount <= 0) {
            return { base: 0, iva: 0, renta: 0, totalInvoice: 0, liquid: 0 };
        }

        const base = applyIva ? amount / 1.03 : amount / 0.90;
        const iva = applyIva ? base * 0.13 : 0;
        const renta = base * 0.10;
        const totalInvoice = base + iva;
        const liquid = totalInvoice - renta;

        return { base, iva, renta, totalInvoice, liquid };
    }

    // -- app --

    document.addEventListener('DOMContentLoaded', function () {
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
            const amount = parseNumericInput(amountInput.value);
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

            rentaValue.textContent = '-' + formatCurrency(results.renta);
            totalValue.textContent = formatCurrency(results.totalInvoice);
            liquidValue.textContent = formatCurrency(results.liquid);
        }

        function sanitizeInput(e) {
            const raw = e.target.value;
            let cleaned = raw.replace(/[^0-9.]/g, '');
            const parts = cleaned.split('.');
            if (parts.length > 2) {
                cleaned = parts[0] + '.' + parts.slice(1).join('');
            }
            if (parts.length === 2 && parts[1].length > 2) {
                cleaned = parts[0] + '.' + parts[1].slice(0, 2);
            }
            e.target.value = cleaned;
            updateUI();
        }

        amountInput.addEventListener('input', sanitizeInput);

        amountInput.addEventListener('blur', function (e) {
            const amount = parseNumericInput(e.target.value);
            e.target.value = amount > 0 ? formatCurrency(amount) : '';
            updateUI();
        });

        amountInput.addEventListener('focus', function (e) {
            const amount = parseNumericInput(e.target.value);
            e.target.value = amount > 0 ? amount.toString() : '';
        });

        btnConIva.addEventListener('click', function () {
            applyIva = true;
            updateUI();
        });

        btnSinIva.addEventListener('click', function () {
            applyIva = false;
            updateUI();
        });

        updateUI();
    });
})();
