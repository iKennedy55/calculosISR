import React from 'react';
import Calculator from './components/Calculator';

function App() {
  return (
    <>
      <div className="top">
        <div>
          <div className="eyebrow">Herramienta Fiscal</div>
          <h1>Calculadora Inversa</h1>
        </div>
      </div>

      <main>
        <Calculator />
      </main>

      <footer className="other" style={{ textAlign: 'center', marginTop: '48px', border: 'none' }}>
        <div className="label">Normativa El Salvador • ISR 10% • IVA 13%</div>
      </footer>
    </>
  );
}

export default App;
