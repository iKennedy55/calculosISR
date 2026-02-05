function testCalc(liquid, applyIva) {
    let base;

    if (applyIva) {
        base = liquid / 1.03;
    } else {
        base = liquid / 0.90;
    }

    const iva = applyIva ? base * 0.13 : 0;
    const renta = base * 0.10;
    const totalInvoice = base + iva;
    const liquidResult = totalInvoice - renta;

    return {
        inputLiquid: liquid,
        base: parseFloat(base.toFixed(2)),
        iva: parseFloat(iva.toFixed(2)),
        renta: parseFloat(renta.toFixed(2)),
        totalInvoice: parseFloat(totalInvoice.toFixed(2)),
        liquidResult: parseFloat(liquidResult.toFixed(2))
    };
}

console.log("Test 1: Want $103 Liquid, With IVA (Expect Base 100)");
const res1 = testCalc(103, true);
console.log(res1);
if (Math.abs(res1.base - 100) < 0.1 && Math.abs(res1.liquidResult - 103) < 0.1) {
    console.log("PASS");
} else {
    console.log("FAIL");
}

console.log("\nTest 2: Want $90 Liquid, No IVA (Expect Base 100)");
const res2 = testCalc(90, false);
console.log(res2);
if (Math.abs(res2.base - 100) < 0.1 && Math.abs(res2.liquidResult - 90) < 0.1) {
    console.log("PASS");
} else {
    console.log("FAIL");
}
