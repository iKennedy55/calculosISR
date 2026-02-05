import React from 'react';
import Calculator from './components/Calculator';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <main className="w-full max-w-lg z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
            Calculadora Inversa
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Herramienta fiscal simplificada
          </p>
        </div>

        <Calculator />

        <footer className="mt-12 text-center">
          <p className="text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-widest">
            Normativa El Salvador • ISR 10% • IVA 13%
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
