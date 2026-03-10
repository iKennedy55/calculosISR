import React, { useState, useEffect } from 'react';

const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
};

export default function Calculator() {
    const [amount, setAmount] = useState('');
    const [applyIva, setApplyIva] = useState(true);
    const [results, setResults] = useState({
        base: 0,
        iva: 0,
        renta: 0,
        totalInvoice: 0,
        liquid: 0
    });

    useEffect(() => {
        const val = parseFloat(amount);
        if (isNaN(val) || val <= 0) {
            setResults({ base: 0, iva: 0, renta: 0, totalInvoice: 0, liquid: 0 });
            return;
        }

        let base;
        if (applyIva) {
            base = val / 1.03;
        } else {
            base = val / 0.90;
        }

        const iva = applyIva ? base * 0.13 : 0;
        const renta = base * 0.10;
        const totalInvoice = base + iva;
        const liquid = totalInvoice - renta;

        setResults({
            base,
            iva,
            renta,
            totalInvoice,
            liquid
        });
    }, [amount, applyIva]);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    return (
        <div className="card">
            <div className="panel-head">
                <div>
                    <div className="panel-title">Monto Líquido Deseado</div>
                    <div className="panel-sub">Ingrese el monto final que desea recibir</div>
                </div>
            </div>

            <input
                type="number"
                className="search-bar"
                style={{ width: '100%', maxWidth: '100%', fontSize: '24px', padding: '16px', boxSizing: 'border-box' }}
                placeholder="$ 0.00"
                value={amount}
                onChange={handleAmountChange}
            />

            <div className="actions" style={{ marginTop: '24px', marginBottom: '32px', display: 'flex' }}>
                <button
                    className={applyIva ? "" : "ghost"}
                    onClick={() => setApplyIva(true)}
                    style={{ flex: 1 }}
                >
                    Con IVA
                </button>
                <button
                    className={!applyIva ? "" : "ghost"}
                    onClick={() => setApplyIva(false)}
                    style={{ flex: 1 }}
                >
                    Sin IVA
                </button>
            </div>

            <div className="other">
                <div className="label">Desglose Fiscal</div>
            </div>

            <div className="metrics">
                {applyIva && (
                    <div className="metric">
                        <div className="label">IVA (13%)</div>
                        <div className="value">{formatCurrency(results.iva)}</div>
                    </div>
                )}
                <div className="metric">
                    <div className="label">ISR (10%)</div>
                    <div className="value" style={{ color: 'var(--error)' }}>
                        -{formatCurrency(results.renta)}
                    </div>
                </div>
                <div className="metric">
                    <div className="label">Devengado</div>
                    <div className="value">{formatCurrency(results.totalInvoice)}</div>
                </div>
            </div>

            <div className="panel" style={{ marginTop: '32px', padding: '20px', backgroundColor: 'var(--card-hover)' }}>
                <div className="panel-head" style={{ marginBottom: 0 }}>
                    <div className="panel-title">Fondo a Recibir</div>
                    <div className="value" style={{ fontSize: '32px', fontWeight: 700, color: 'var(--ok)' }}>
                        {formatCurrency(results.liquid)}
                    </div>
                </div>
            </div>
        </div>
    );
}
