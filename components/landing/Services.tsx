"use client";

import { motion } from "framer-motion";
import { Mail, Package, ShoppingCart, Truck } from "lucide-react";

const services = [
  {
    icon: Mail,
    title: "Casillero Virtual",
    desc: "Dirección en Florida para tus compras USA. Sin impuesto estatal, sin complicaciones.",
  },
  {
    icon: Package,
    title: "Consolidación",
    desc: "Juntamos todos tus paquetes en una sola caja para ahorrar en costos de envío.",
  },
  {
    icon: ShoppingCart,
    title: "Shopping Concierge",
    desc: "Te ayudamos a comprar si no tienes tarjeta internacional. Nosotros hacemos la compra por ti.",
  },
  {
    icon: Truck,
    title: "Envío a Colombia",
    desc: "Entrega puerta a puerta en toda Colombia. Sin ir a aduanas, sin trámites.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Nuestros <span className="gradient-text">Servicios</span>
          </h2>
          <p className="text-muted-light max-w-2xl mx-auto">
            Todo lo que necesitas para comprar en USA y recibir en Colombia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-surface border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-light text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}