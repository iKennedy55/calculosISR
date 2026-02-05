import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, ArrowRight } from 'lucide-react';

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
        if (isNaN(val) || val < 0) {
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

    return (
        <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all duration-300">

            <div className="space-y-8">
                {/* Input Section */}
                <div className="space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Monto Líquido Deseado
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="text-slate-400 text-lg">$</span>
                        </div>
                        <input
                            type="number"
                            className="block w-full pl-8 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 focus:border-transparent outline-none transition-all text-xl font-medium text-slate-900 dark:text-white placeholder-slate-300"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>

                {/* Toggle */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        Persona Natural inscrita en IVA
                    </span>
                    <button
                        onClick={() => setApplyIva(!applyIva)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 ${applyIva ? 'bg-slate-800 dark:bg-slate-200' : 'bg-slate-200 dark:bg-slate-700'
                            }`}
                    >
                        <span
                            className={`${applyIva ? 'translate-x-5' : 'translate-x-1'
                                } inline-block h-3 w-3 transform rounded-full bg-white dark:bg-slate-900 transition-transform`}
                        />
                    </button>
                </div>

                {/* Results Section */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    {/* Detailed Breakdown */}
                    <div className="space-y-3">
                        {applyIva && <ResultRow label="IVA (13%)" value={results.iva} />}
                        <ResultRow label="ISR (10%)" value={results.renta} />
                        <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
                        <ResultRow label="Devengado" value={results.totalInvoice} type="highlight" />
                    </div>

                    <div className="flex justify-center py-2 opacity-20">
                        <ArrowRight size={16} className="transform rotate-90 text-slate-900 dark:text-white" />
                    </div>

                    <div className="flex justify-between items-end p-4 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                            Líquido
                        </span>
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                            {formatCurrency(results.liquid)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ResultRow({ label, value, type }) {
    const isHighlight = type === 'highlight';

    return (
        <div className={`flex justify-between items-center ${isHighlight ? 'font-semibold text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400 metric-row'}`}>
            <span className="text-sm">{label}</span>
            <span className="text-sm tabular-nums">
                {formatCurrency(value)}
            </span>
        </div>
    );
}
