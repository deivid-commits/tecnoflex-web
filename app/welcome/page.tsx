"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Copy, Check, ArrowRight, Package, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";

/**
 * Renderiza el código del casillero en dos partes coloreadas.
 * Formato esperado en DB: "O190266 TFX1004"
 * - Parte antes del espacio → texto normal (código Coordinadora, negro/foreground)
 * - Parte después del espacio → texto rojo (código interno TCNOflex)
 * Si no hay espacio, muestra todo en rojo (código interno solo).
 */
function LockerCode({ code }: { code: string }) {
  const idx = code.indexOf(" ");
  if (idx === -1) {
    return <span className="text-danger">{code}</span>;
  }
  const coordinadora = code.slice(0, idx);
  const interno = code.slice(idx + 1);
  return (
    <>
      <span className="text-foreground">{coordinadora}</span>
      {" "}
      <span className="text-danger">{interno}</span>
    </>
  );
}

export default function WelcomePage() {
  const [profile, setProfile] = useState<{ locker_code: string; locker_address: string; full_name: string } | null>(null);
  const [copied, setCopied] = useState<"code" | "address" | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/register"); return; }
      const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
      if (data) setProfile(data);
      setLoading(false);
    };
    load();
  }, [router]);

  const copy = (type: "code" | "address") => {
    if (!profile) return;
    navigator.clipboard.writeText(type === "code" ? profile.locker_code : profile.locker_address);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const addressLines = profile?.locker_address.split("\n") || [];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">

        {/* Header celebratorio */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4 relative">
            <Package size={36} className="text-primary" />
            <span className="absolute -top-1 -right-1 text-2xl">🎉</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            ¡Tu casillero está listo,{" "}
            <span className="gradient-text">{profile?.full_name?.split(" ")[0] || "amigo"}</span>!
          </h1>
          <p className="text-muted-light">
            Esta es tu dirección en Florida para recibir tus paquetes:
          </p>
        </div>

        {/* Casillero code destacado */}
        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-5 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles size={22} className="text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-0.5">Tu código de casillero</p>
              {/* Formato: O190266 TFX1004 — código Coordinadora (negro) + código interno (rojo), sin guion */}
              <p className="text-2xl font-bold font-mono">
                <LockerCode code={profile?.locker_code ?? ""} />
              </p>
            </div>
          </div>
          <button
            onClick={() => copy("code")}
            className="flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            {copied === "code" ? <Check size={15} /> : <Copy size={15} />}
            {copied === "code" ? "Copiado" : "Copiar"}
          </button>
        </div>

        {/* Dirección completa */}
        <div className="bg-surface border border-border rounded-2xl p-5 mb-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-muted-light" />
              <p className="text-sm font-semibold">Dirección de envío completa</p>
            </div>
            <button
              onClick={() => copy("address")}
              className="flex items-center gap-1.5 border border-border text-muted-light px-3 py-1.5 rounded-lg text-xs hover:text-foreground hover:border-primary transition-colors"
            >
              {copied === "address" ? <Check size={13} /> : <Copy size={13} />}
              {copied === "address" ? "Copiada" : "Copiar dirección"}
            </button>
          </div>
          <div className="bg-background rounded-xl p-4 font-mono text-sm leading-relaxed border border-border">
            {addressLines.map((line, i) => (
              <p key={i} className={i === 0 ? "text-primary font-semibold" : "text-muted-light"}>
                {line}
              </p>
            ))}
          </div>
          <p className="text-xs text-muted mt-3">
            Usa esta dirección como destino de envío al comprar en Amazon, Nike, Apple y más.
            Incluye siempre tu código interno{" "}
            <span className="text-danger font-mono font-bold">
              {profile?.locker_code?.split(" ")[1] ?? profile?.locker_code}
            </span>{" "}
            en el nombre del destinatario.
          </p>
        </div>

        {/* Pasos rápidos */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { emoji: "🛒", title: "Compra", desc: "En tus tiendas favoritas de USA" },
            { emoji: "📦", title: "Recibimos", desc: "Llega a tu casillero en Florida" },
            { emoji: "🚚", title: "Enviamos", desc: "Puerta a puerta en Colombia" },
          ].map(({ emoji, title, desc }) => (
            <div key={title} className="bg-surface border border-border rounded-xl p-3 text-center">
              <span className="text-2xl">{emoji}</span>
              <p className="text-sm font-semibold mt-1">{title}</p>
              <p className="text-xs text-muted mt-0.5 leading-tight">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/dashboard"
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 glow-sm hover:glow"
        >
          Ir a mi dashboard <ArrowRight size={18} />
        </Link>

        <p className="text-center text-xs text-muted mt-4">
          También te enviamos un resumen a tu email.
        </p>
      </div>
    </div>
  );
}
