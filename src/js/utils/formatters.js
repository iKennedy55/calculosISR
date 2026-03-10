export function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function parseNumericInput(value) {
    const cleaned = value.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    const sanitized = parts.length > 2
        ? parts[0] + '.' + parts.slice(1).join('')
        : cleaned;

    const num = parseFloat(sanitized);
    return isNaN(num) ? 0 : num;
}
