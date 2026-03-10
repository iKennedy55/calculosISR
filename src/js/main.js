(function () {
    'use strict';

    var TAX_RATES = {
        ISR: 0.10,
        IVA: 0.13
    };

    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }

    function parseNumericInput(value) {
        var cleaned = value.replace(/[^0-9.]/g, '');
        var parts = cleaned.split('.');
        if (parts.length > 2) {
            cleaned = parts[0] + '.' + parts.slice(1).join('');
        }
        var num = parseFloat(cleaned);
        return isNaN(num) ? 0 : num;
    }

    function calculateTaxes(amount, applyIva) {
        if (isNaN(amount) || amount <= 0) {
            return { base: 0, iva: 0, renta: 0, totalInvoice: 0, liquid: 0 };
        }

        var divisor = applyIva ? (1 + TAX_RATES.IVA - TAX_RATES.ISR) : (1 - TAX_RATES.ISR);
        var base = amount / divisor;
        var iva = applyIva ? base * TAX_RATES.IVA : 0;
        var renta = base * TAX_RATES.ISR;
        var totalInvoice = base + iva;
        var liquid = totalInvoice - renta;

        return { base: base, iva: iva, renta: renta, totalInvoice: totalInvoice, liquid: liquid };
    }

    function sanitizeDecimalInput(raw) {
        var cleaned = raw.replace(/[^0-9.]/g, '');
        var parts = cleaned.split('.');
        if (parts.length > 2) {
            cleaned = parts[0] + '.' + parts.slice(1).join('');
        }
        if (parts.length === 2 && parts[1].length > 2) {
            cleaned = parts[0] + '.' + parts[1].slice(0, 2);
        }
        return cleaned;
    }

    document.addEventListener('DOMContentLoaded', function () {
        var amountInput = document.getElementById('amount-input');
        var btnConIva = document.getElementById('btn-con-iva');
        var btnSinIva = document.getElementById('btn-sin-iva');

        var ivaValue = document.getElementById('val-iva');
        var ivaContainer = document.getElementById('container-iva');
        var rentaValue = document.getElementById('val-renta');
        var totalValue = document.getElementById('val-total');
        var liquidValue = document.getElementById('val-liquid');

        var applyIva = true;

        function updateUI() {
            var amount = parseNumericInput(amountInput.value);
            var results = calculateTaxes(amount, applyIva);

            if (applyIva) {
                btnConIva.classList.remove('ghost');
                btnSinIva.classList.add('ghost');
                ivaContainer.style.display = '';
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

        amountInput.addEventListener('input', function (e) {
            e.target.value = sanitizeDecimalInput(e.target.value);
            updateUI();
        });

        amountInput.addEventListener('blur', function (e) {
            var amount = parseNumericInput(e.target.value);
            e.target.value = amount > 0 ? formatCurrency(amount) : '';
            updateUI();
        });

        amountInput.addEventListener('focus', function (e) {
            var amount = parseNumericInput(e.target.value);
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
