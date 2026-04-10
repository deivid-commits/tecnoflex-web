"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Package, Calculator, Info } from "lucide-react";

const features = [
  "Casillero virtual en Oregon",
  "0% Sales Tax en compras",
  "Consolidación gratis",
  "Tracking en tiempo real",
  "Fotos de tus paquetes",
  "Seguro de envío incluido",
  "Entrega puerta a puerta",
  "Soporte por WhatsApp",
  "60 días de almacenamiento",
  "Reempaque gratuito",
];

const weightSteps = [
  { lbs: 1, priceMonthly: 15, priceYearly: 12 },
  { lbs: 2, priceMonthly: 25, priceYearly: 20 },
  { lbs: 5, priceMonthly: 45, priceYearly: 36 },
  { lbs: 10, priceMonthly: 75, priceYearly: 60 },
  { lbs: 20, priceMonthly: 120, priceYearly: 96 },
  { lbs: 50, priceMonthly: 200, priceYearly: 160 },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [weightIndex, setWeightIndex] = useState(3); // Default 10 lbs

  const currentStep = weightSteps[weightIndex];
  const price = isYearly ? currentStep.priceYearly : currentStep.priceMonthly;
  const savings = currentStep.priceMonthly - currentStep.priceYearly;

  return (
    <section id="precios" className="py-24 bg-surface/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Precios <span className="gradient-text">simplificados</span>
          </h2>
          <p className="text-muted-light max-w-xl mx-auto">
            Sin planes confusos. Pagás por el peso que enviés. Todo incluido.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-surface border border-border rounded-3xl p-8 md:p-12"
        >
          {/* Weight Slider */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-muted-light flex items-center gap-2">
                <Package size={16} className="text-primary" />
                Peso del envío
              </label>
              <span className="text-xs text-muted">Envío mensual estimado</span>
            </div>

            <input
              type="range"
              min={0}
              max={weightSteps.length - 1}
              step={1}
              value={weightIndex}
              onChange={(e) => setWeightIndex(parseInt(e.target.value))}
              className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-primary"
            />

            <div className="flex justify-between mt-2 text-xs text-muted">
              {weightSteps.map((step) => (
                <span key={step.lbs}>{step.lbs} lbs</span>
              ))}
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isYearly ? "text-foreground" : "text-muted"}`}>
              Mensual
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 bg-border rounded-full transition-colors"
            >
              <motion.div
                className="absolute top-1 w-5 h-5 bg-primary rounded-full"
                animate={{ x: isYearly ? 32 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm ${isYearly ? "text-foreground" : "text-muted"}`}>
              Anual
            </span>
            {isYearly && (
              <span className="bg-success/10 text-success text-xs px-2 py-1 rounded-full font-medium">
                -20%
              </span>
            )}
          </div>

          {/* Price Display */}
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-6xl md:text-7xl font-bold gradient-text">
                {currentStep.lbs} lbs
              </span>
            </div>
            <div className="flex items-baseline justify-center gap-1 mb-4">
              <span className="text-4xl md:text-5xl font-bold">
                ${price}
              </span>
              <span className="text-muted-light">/envío</span>
            </div>
            {isYearly && (
              <p className="text-sm text-success">
                Ahorrás ${savings} por envío
              </p>
            )}
          </div>

          {/* CTA */}
          <div className="text-center mb-10">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Crear casillero gratis
            </Link>
            <p className="text-xs text-muted mt-3">
              Cambiá o cancelá en cualquier momento
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 py-2">
                <Check size={18} className="text-success shrink-0" />
                <span className="text-sm text-muted-light">{feature}</span>
              </div>
            ))}
          </div>

          {/* Simulated preview */}
          <div className="mt-10 pt-8 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted mb-4">
              <Calculator size={14} />
              Calculadora de envío para {currentStep.lbs} lbs
            </div>
            <div className="bg-background border border-border rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Envío a Colombia</p>
                  <p className="text-xs text-muted">3-5 días hábiles</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${price}</p>
                <p className="text-xs text-muted">USD</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
