"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/auth/verify-email");
  };

  const handleGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) { setError(error.message); setLoading(false); }
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
          <Link href="/" className="text-2xl font-bold gradient-text">TECNOFLEX</Link>
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
              {" "}— TFX-1234<br />
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
            <Link href="/" className="text-2xl font-bold gradient-text">TECNOFLEX</Link>
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

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-4 text-muted">o continúa con</span>
            </div>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle} disabled={loading}
            className="w-full bg-surface hover:bg-surface-light border border-border text-foreground font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-3 text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>

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
