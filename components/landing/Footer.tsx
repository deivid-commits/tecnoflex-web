"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-surface border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <Image src="/logo-tcnoflex.png" alt="TCNOflex" width={180} height={62} />
            </Link>
            <p className="text-muted-light text-sm mt-3 leading-relaxed">
              Tu casillero virtual en USA. Compra en Estados Unidos y recibí en Colombia fácil y rápido.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li><a href="#servicios" className="text-muted-light hover:text-foreground text-sm transition-colors">Casillero Virtual</a></li>
              <li><a href="#servicios" className="text-muted-light hover:text-foreground text-sm transition-colors">Consolidación</a></li>
              <li><a href="#servicios" className="text-muted-light hover:text-foreground text-sm transition-colors">Shopping Concierge</a></li>
              <li><a href="#servicios" className="text-muted-light hover:text-foreground text-sm transition-colors">Envío a Colombia</a></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Compañía</h3>
            <ul className="space-y-2">
              <li><a href="#como-funciona" className="text-muted-light hover:text-foreground text-sm transition-colors">Cómo funciona</a></li>
              <li><a href="#" className="text-muted-light hover:text-foreground text-sm transition-colors">Términos de servicio</a></li>
              <li><a href="#" className="text-muted-light hover:text-foreground text-sm transition-colors">Política de privacidad</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-light text-sm">
                <MapPin size={16} className="text-primary shrink-0" />
                Portland, OR, USA
              </li>
              <li className="flex items-center gap-2 text-muted-light text-sm">
                <Mail size={16} className="text-primary shrink-0" />
                info@tecnoflex.com
              </li>
              <li className="flex items-center gap-2 text-muted-light text-sm">
                <Phone size={16} className="text-primary shrink-0" />
                WhatsApp disponible
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted text-sm">
            &copy; {new Date().getFullYear()} TCNOflex. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}