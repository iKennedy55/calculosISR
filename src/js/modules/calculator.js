export function calculateTaxes(amount, applyIva) {
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
