"use client";

import { motion } from "framer-motion";
import { DollarSign, Package, HelpCircle, Home } from "lucide-react";

const advantages = [
  {
    icon: DollarSign,
    title: "0% Sales Tax",
    desc: "Oregon no cobra impuesto en compras. Ahorrás 8-10% en cada compra.",
  },
  {
    icon: Package,
    title: "Consolidación gratis",
    desc: "Varios paquetes = 1 solo envío. Ahorrás en costos de envío.",
  },
  {
    icon: HelpCircle,
    title: "Sin complicaciones",
    desc: "No sabés cómo importar? Te ayudamos con todo el proceso.",
  },
  {
    icon: Home,
    title: "Entrega a tu puerta",
    desc: "No tenés que ir a aduanas. Recibís en la puerta de tu casa.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Por qué con <span className="gradient-text">nosotros</span>?
          </h2>
          <p className="text-muted-light max-w-2xl mx-auto">
            Somos tu mejor opción para comprar en USA desde Colombia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-4 bg-surface border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <adv.icon size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{adv.title}</h3>
                <p className="text-muted-light text-sm">{adv.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}