export function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function parseCurrencyMask(value) {
    // Strip all non-digits
    const digits = value.replace(/\D/g, '');
    if (!digits) return 0;
    // Divide by 100 because the input is in cents
    return parseInt(digits, 10) / 100;
}

export function applyCurrencyMask(value) {
    const amount = parseCurrencyMask(value);
    if (amount === 0) return '';
    return formatCurrency(amount);
}
