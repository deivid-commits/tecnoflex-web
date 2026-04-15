"use client";

import { motion } from "framer-motion";
import { MapPin, Shield, Truck, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-surface-light border border-border rounded-full px-4 py-2 mb-8">
            <MapPin size={16} className="text-primary" />
            <span className="text-sm text-muted-light">Oregon, USA — Casillero disponible</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Tu casillero virtual
            <br />
            <span className="gradient-text">en USA</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-light max-w-2xl mx-auto mb-10">
            Compra en Estados Unidos y recibe en Colombia sin complicaciones.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#como-funciona"
              className="bg-surface-light hover:bg-border-light border border-border text-foreground font-medium px-8 py-4 rounded-xl transition-colors text-lg"
            >
              Cómo funciona
            </a>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: Truck, text: "3-5 días hábiles" },
            { icon: Shield, text: "100% seguro" },
            { icon: MapPin, text: "Tracking en tiempo real" },
            { icon: ArrowRight, text: "Cobertura toda Colombia" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 bg-surface/50 border border-border rounded-lg px-4 py-3">
              <Icon size={18} className="text-primary" />
              <span className="text-sm text-muted-light">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}