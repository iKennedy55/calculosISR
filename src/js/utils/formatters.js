export function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function parseCurrencyMask(value) {
    const numericValue = value.replace(/[^0-9.]/g, '');
    return parseFloat(numericValue) || 0;
}

export function applyCurrencyMask(value) {
    // Remove non-digit characters except for dot
    let cleanValue = value.replace(/[^0-9.]/g, '');

    // Handle multiple dots - keep only the first one
    const parts = cleanValue.split('.');
    if (parts.length > 2) {
        cleanValue = parts[0] + '.' + parts.slice(1).join('');
    }

    // Format to 2 decimal places if it's a valid number and has decimals
    if (cleanValue) {
        if (cleanValue.includes('.')) {
            const [intPart, decPart] = cleanValue.split('.');
            cleanValue = `${intPart}.${decPart.substring(0, 2)}`;
        }
        return `$ ${cleanValue}`;
    }

    return '';
}
