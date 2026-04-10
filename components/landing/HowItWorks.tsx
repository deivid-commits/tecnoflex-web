"use client";

import { motion } from "framer-motion";
import { UserPlus, ShoppingCart, Package, Layers, Truck } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Regístrate gratis",
    desc: "Te damos tu dirección en Oregon al instante",
    step: "01",
  },
  {
    icon: ShoppingCart,
    title: "Compra en USA",
    desc: "Usa nuestra dirección en tus tiendas favoritas",
    step: "02",
  },
  {
    icon: Package,
    title: "Recibe en tu casillero",
    desc: "Te notificamos cuando llegue tu paquete",
    step: "03",
  },
  {
    icon: Layers,
    title: "Consolidamos",
    desc: "Juntamos todos tus paquetes en una sola caja",
    step: "04",
  },
  {
    icon: Truck,
    title: "Te lo enviamos",
    desc: "Entrega a tu puerta en Colombia",
    step: "05",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Cómo <span className="gradient-text">funciona</span>?
          </h2>
          <p className="text-muted-light max-w-2xl mx-auto">
            En 5 simples pasos tienes tus compras de USA en la puerta de tu casa
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary/20 -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-primary/10 border-2 border-primary rounded-2xl flex items-center justify-center mb-4 relative z-10 bg-background">
                  <step.icon size={28} className="text-primary" />
                </div>
                <span className="text-xs font-bold text-primary mb-1">PASO {step.step}</span>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-muted-light text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}