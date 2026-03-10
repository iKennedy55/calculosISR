# Calculadora Inversa ISR

Herramienta fiscal para calcular el monto bruto a facturar a partir del monto líquido deseado, aplicando retenciones de ISR e IVA según la normativa de El Salvador.

## Objetivo

Dado un monto neto que se desea recibir, la calculadora determina cuánto se debe facturar para que, después de aplicar las retenciones fiscales, el monto recibido sea el deseado.

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

1. Ingresar el monto líquido deseado.
2. Seleccionar si aplica IVA o no.
3. El desglose fiscal se calcula en tiempo real.

## Tasas aplicadas

| Concepto | Tasa |
|----------|------|
| ISR      | 10%  |
| IVA      | 13%  |

