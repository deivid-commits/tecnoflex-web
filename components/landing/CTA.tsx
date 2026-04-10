"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Empezá a comprar en USA
            <br />
            <span className="gradient-text">sin impuestos</span>
          </h2>
          <p className="text-lg text-muted-light mb-10 max-w-2xl mx-auto">
            Creá tu casillero virtual en Oregon en menos de 2 minutos. Sin costo de registro.
          </p>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-10 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-primary/25 text-lg"
          >
            Regístrate gratis <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}