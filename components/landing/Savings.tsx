"use client";

import { motion } from "framer-motion";

const comparisons = [
  { product: "iPhone", price: "$999", withTax: "$1,098.90", withoutTax: "$999.00", savings: "$99.90" },
  { product: "Consola PS5", price: "$499", withTax: "$548.90", withoutTax: "$499.00", savings: "$49.90" },
  { product: "Laptop", price: "$1,299", withTax: "$1,428.90", withoutTax: "$1,299.00", savings: "$129.90" },
];

export default function Savings() {
  return (
    <section id="ahorro" className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            El <span className="gradient-text">ahorro</span>
          </h2>
          <p className="text-muted-light max-w-2xl mx-auto">
            Mira cuánto te ahorrás en cada compra usando tu casillero en Oregon
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Desktop table */}
          <div className="hidden md:block bg-surface border border-border rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-5 text-muted-light font-medium">Producto</th>
                  <th className="text-left p-5 text-muted-light font-medium">Precio base</th>
                  <th className="text-left p-5 text-danger font-medium">Florida (+10% tax)</th>
                  <th className="text-left p-5 text-success font-medium">Oregon (sin tax)</th>
                  <th className="text-left p-5 text-primary font-medium">Ahorro</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item) => (
                  <tr key={item.product} className="border-b border-border/50 last:border-0">
                    <td className="p-5 font-semibold">{item.product}</td>
                    <td className="p-5 text-muted-light">{item.price}</td>
                    <td className="p-5 text-danger">{item.withTax}</td>
                    <td className="p-5 text-success">{item.withoutTax}</td>
                    <td className="p-5">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                        {item.savings}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {comparisons.map((item) => (
              <div key={item.product} className="bg-surface border border-border rounded-xl p-5">
                <h3 className="font-semibold mb-3">{item.product} {item.price}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-light text-sm">Florida (+10% tax)</span>
                    <span className="text-danger text-sm font-medium">{item.withTax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-light text-sm">Oregon (sin tax)</span>
                    <span className="text-success text-sm font-medium">{item.withoutTax}</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Ahorro</span>
                    <span className="text-primary font-semibold">{item.savings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-light mt-8">
            Ahorrá 8-10% en cada compra + costos de envío reducidos con consolidación
          </p>
        </motion.div>
      </div>
    </section>
  );
}