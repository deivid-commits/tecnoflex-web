"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Mail, Lock, User, ArrowRight, Loader2, Shield,
  Package, Zap, CheckCircle, Globe, Star
} from "lucide-react";

const STORE_LOGOS = ["Amazon", "Nike", "Apple", "Best Buy", "Walmart", "Shein"];

const PERKS = [
  { icon: Zap,      text: "Dirección Oregon en 2 minutos" },
  { icon: Shield,   text: "0% Sales Tax garantizado" },
  { icon: Package,  text: "Consolidación de paquetes gratis" },
  { icon: Globe,    text: "Envío puerta a puerta en Colombia" },
];

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const router  = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Step 1: create user (pre-confirmed, no email required)
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fullName }),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "Error al crear la cuenta");
      setLoading(false);
      return;
    }

    // Step 2: sign in immediately → dashboard
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push("/welcome");
  };


  return (
    <div className="min-h-screen flex bg-background">

      {/* ── LEFT PANEL ─────────────────────────────── */}
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-between p-10 relative overflow-hidden"
           style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 60%, #0a0a0a 100%)" }}>

        {/* Ambient glow */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full opacity-20"
             style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/3 right-0 w-56 h-56 rounded-full opacity-15"
             style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }} />

        <div className="relative z-10">
          <Link href="/" className="inline-block">
            <Image src="/logo-tcnoflex.png" alt="TCNOflex" width={200} height={68} priority />
          </Link>
          <p className="text-xs text-muted mt-1 tracking-widest uppercase">Tu casillero en USA</p>
        </div>

        <div className="relative z-10 space-y-8">
          {/* Headline */}
          <div>
            <h2 className="text-3xl font-bold leading-tight text-foreground">
              Compra en USA.<br />
              <span className="gradient-text">Sin impuestos.</span><br />
              Recibe en tu puerta.
            </h2>
            <p className="text-muted-light mt-3 text-sm leading-relaxed">
              Dirección real en Oregon — el estado con 0% Sales Tax.
            </p>
          </div>

          {/* Perks */}
          <ul className="space-y-3">
            {PERKS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-primary" />
                </div>
                <span className="text-sm text-muted-light">{text}</span>
              </li>
            ))}
          </ul>

          {/* Mock address preview */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur">
            <p className="text-xs text-muted uppercase tracking-widest mb-2">Tu dirección en Oregon</p>
            <div className="font-mono text-sm text-foreground leading-relaxed">
              <span className="text-primary font-semibold">
                {fullName ? fullName.split(" ")[0].toUpperCase() : "TU NOMBRE"}
              </span>
              {" "}— TFX1234<br />
              12345 NW 7th St<br />
              Portland, OR 97201<br />
              <span className="text-muted">United States</span>
            </div>
          </div>

          {/* Store logos (text) */}
          <div>
            <p className="text-xs text-muted uppercase tracking-widest mb-3">Compra en tus tiendas favoritas</p>
            <div className="flex flex-wrap gap-2">
              {STORE_LOGOS.map(name => (
                <span key={name}
                  className="text-xs px-3 py-1 rounded-full border border-white/10 text-muted-light bg-white/5">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex -space-x-2">
            {["D","M","A","C"].map(l => (
              <div key={l}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white border-2 border-background">
                {l}
              </div>
            ))}
          </div>
          <div>
            <div className="flex gap-0.5 mb-0.5">
              {[...Array(5)].map((_,i) => <Star key={i} size={10} fill="currentColor" className="text-warning" />)}
            </div>
            <p className="text-xs text-muted-light">+500 colombianos ya ahorraron con Tecnoflex</p>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-block">
              <Image src="/logo-tcnoflex.png" alt="TCNOflex" width={180} height={62} priority />
            </Link>
            <p className="text-muted text-sm mt-1">Crea tu casillero virtual en USA</p>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold">Crear tu casillero</h1>
            <p className="text-muted-light text-sm mt-1">
              Gratis · Dirección Oregon · Lista en minutos
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="bg-danger/10 border border-danger/30 rounded-xl p-3 text-sm text-danger flex items-start gap-2">
                <span className="mt-0.5">⚠</span>
                <span>{error}</span>
              </div>
            )}

            {/* Name */}
            <div className="group">
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={17} />
                <input
                  type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                  placeholder="Ej. Carlos Gómez" required
                  className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={17} />
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com" required
                  className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={17} />
                <input
                  type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres" required minLength={6}
                  className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-surface border border-border rounded-xl p-4 space-y-2">
              {[
                "Dirección Oregon asignada al instante",
                "Panel para rastrear tus paquetes",
                "Consolidación y envío a Colombia",
              ].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-success shrink-0" />
                  <span className="text-xs text-muted-light">{item}</span>
                </div>
              ))}
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 glow-sm hover:glow"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>Crear mi casillero gratis <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <p className="text-center text-muted text-xs mt-5">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-primary hover:text-primary-dark font-medium transition-colors">
              Inicia sesión
            </Link>
          </p>

          <p className="text-center text-muted text-xs mt-3">
            Al registrarte aceptas nuestros{" "}
            <span className="text-muted-light cursor-pointer hover:text-foreground transition-colors">términos</span>
            {" "}y{" "}
            <span className="text-muted-light cursor-pointer hover:text-foreground transition-colors">política de privacidad</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
