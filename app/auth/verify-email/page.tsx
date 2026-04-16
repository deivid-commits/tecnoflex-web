"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Mail, CheckCircle, RefreshCw, ArrowLeft } from "lucide-react";

export default function VerifyEmailPage() {
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) {
      await supabase.auth.resend({ type: "signup", email: user.email });
    }
    setLoading(false);
    setResent(true);
    setTimeout(() => setResent(false), 5000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">

        {/* Icono animado */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail size={44} className="text-primary" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-success flex items-center justify-center">
              <CheckCircle size={16} className="text-white" />
            </div>
          </div>
        </div>

        <Link href="/" className="text-2xl font-bold gradient-text block mb-2">
          TCNOflex
        </Link>

        <h1 className="text-2xl font-bold mt-6 mb-3">
          Revisa tu email
        </h1>
        <p className="text-muted-light mb-2">
          Te enviamos un enlace de confirmación. Ábrelo para activar tu casillero virtual.
        </p>
        <p className="text-sm text-muted mb-8">
          Si no lo ves, revisa tu carpeta de spam.
        </p>

        {/* Pasos */}
        <div className="bg-surface border border-border rounded-2xl p-6 mb-6 text-left space-y-4">
          {[
            { n: "1", text: "Abre el email de TCNOflex" },
            { n: "2", text: 'Haz clic en "Confirmar cuenta"' },
            { n: "3", text: "Tu casillero en Florida te espera 🎉" },
          ].map(({ n, text }) => (
            <div key={n} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">
                {n}
              </div>
              <span className="text-sm text-muted-light">{text}</span>
            </div>
          ))}
        </div>

        {/* Reenviar */}
        <button
          onClick={handleResend}
          disabled={loading || resent}
          className="w-full flex items-center justify-center gap-2 border border-border text-foreground py-3 rounded-xl hover:bg-surface transition-colors text-sm font-medium disabled:opacity-50 mb-4"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          {resent ? "Email reenviado ✓" : loading ? "Enviando..." : "Reenviar email de confirmación"}
        </button>

        <Link
          href="/register"
          className="flex items-center justify-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Volver al registro
        </Link>
      </div>
    </div>
  );
}
