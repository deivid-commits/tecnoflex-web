"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold gradient-text">
            TECNOFLEX
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#servicios" className="text-sm text-muted-light hover:text-foreground transition-colors">
              Servicios
            </a>
            <a href="#como-funciona" className="text-sm text-muted-light hover:text-foreground transition-colors">
              Cómo funciona
            </a>
            <a href="#precios" className="text-sm text-muted-light hover:text-foreground transition-colors">
              Precios
            </a>
            <a href="#ahorro" className="text-sm text-muted-light hover:text-foreground transition-colors">
              Ahorro
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-muted-light hover:text-foreground transition-colors px-4 py-2"
            >
              Ingresar
            </Link>
            <Link
              href="/register"
              className="text-sm bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg transition-colors font-medium"
            >
              Crear casillero
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-b border-border px-4 pb-4">
          <div className="flex flex-col gap-3">
            <a href="#servicios" onClick={() => setOpen(false)} className="text-muted-light hover:text-foreground py-2">Servicios</a>
            <a href="#como-funciona" onClick={() => setOpen(false)} className="text-muted-light hover:text-foreground py-2">Cómo funciona</a>
            <a href="#precios" onClick={() => setOpen(false)} className="text-muted-light hover:text-foreground py-2">Precios</a>
            <a href="#ahorro" onClick={() => setOpen(false)} className="text-muted-light hover:text-foreground py-2">Ahorro</a>
            <a href="#contacto" onClick={() => setOpen(false)} className="text-muted-light hover:text-foreground py-2">Contacto</a>
            <hr className="border-border" />
            <Link href="/login" className="text-muted-light hover:text-foreground py-2">Ingresar</Link>
            <Link href="/register" className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg text-center font-medium">
              Crear casillero
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}