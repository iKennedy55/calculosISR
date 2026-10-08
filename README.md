# Calculadora Inversa ISR

Herramienta fiscal para calcular el monto bruto a facturar a partir del monto líquido deseado, aplicando retenciones de ISR e IVA según la normativa de El Salvador.

## Objetivo

Dado un monto neto que se desea recibir, la calculadora determina cuánto se debe facturar para que, después de aplicar las retenciones fiscales, el monto recibido sea el deseado.

## Modos

- **Inversa** (por defecto): del monto líquido deseado al devengado a facturar.
- **Normal**: del monto devengado (IVA incluido cuando aplica) al líquido a recibir, desglosando IVA y descontando ISR.

Ambos modos son consistentes entre sí: el devengado que da la inversa, ingresado en la normal, devuelve el mismo líquido.

## Stack

- HTML5
- Vanilla CSS (design tokens + sistema modular)
- Vanilla JavaScript (IIFE, sin bundler)

## Estructura

```
Renta/
├── index.html
├── README.md
├── .gitignore
└── src/
    ├── css/
    │   ├── variables.css
    │   ├── base.css
    │   ├── components.css
    │   ├── utilities.css
    │   └── main.css
    └── js/
        └── main.js
```

## Uso

Abrir `index.html` directamente en el navegador. No requiere servidor local ni dependencias.

1. Elegir el modo: Inversa o Normal.
2. Ingresar el monto (líquido deseado o devengado, según el modo).
3. Seleccionar si aplica IVA o no.
4. El desglose fiscal se calcula en tiempo real.

## Tasas aplicadas

| Concepto | Tasa |
|----------|------|
| ISR      | 10%  |
| IVA      | 13%  |

