"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Save, Copy, Check } from "lucide-react";

type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  city: string | null;
  locker_code: string;
  locker_address: string;
};

export default function PerfilPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    city: "",
  });

  useEffect(() => {
    const supabase = createClient();
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || "",
          phone: data.phone || "",
          city: data.city || "",
        });
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update(formData)
      .eq("user_id", user.id);

    if (error) {
      setMessage("Error al guardar. Intentá de nuevo.");
    } else {
      setMessage("Perfil actualizado correctamente.");
    }
    setSaving(false);
  };

  const copyAddress = () => {
    if (profile) {
      navigator.clipboard.writeText(profile.locker_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Mi perfil</h1>
        <p className="text-muted-light mt-1">Actualizá tu información personal</p>
      </div>

      {/* Locker info */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <div className="flex items-start justify-between mb-3">
          <h2 className="font-semibold">Mi casillero: {profile?.locker_code}</h2>
          <button
            onClick={copyAddress}
            className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg transition-colors text-sm"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>
        <div className="bg-background border border-border rounded-xl p-4 font-mono text-sm text-muted-light whitespace-pre-line">
          {profile?.locker_address}
        </div>
      </div>

      {/* Edit form */}
      <form onSubmit={handleSave} className="bg-surface border border-border rounded-2xl p-6 space-y-5">
        <h2 className="font-semibold">Información personal</h2>

        {message && (
          <div
            className={`rounded-lg p-3 text-sm ${
              message.includes("Error")
                ? "bg-danger/10 border border-danger/30 text-danger"
                : "bg-success/10 border border-success/30 text-success"
            }`}
          >
            {message}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-muted-light mb-2">
            Nombre completo
          </label>
          <input
            type="text"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-light mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            placeholder="+57 300 123 4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-light mb-2">
            Ciudad de entrega
          </label>
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          >
            <option value="">Seleccioná tu ciudad</option>
            <option value="Bogotá">Bogotá</option>
            <option value="Medellín">Medellín</option>
            <option value="Cali">Cali</option>
            <option value="Barranquilla">Barranquilla</option>
            <option value="Cartagena">Cartagena</option>
            <option value="Bucaramanga">Bucaramanga</option>
            <option value="Pereira">Pereira</option>
            <option value="Manizales">Manizales</option>
            <option value="Otra">Otra ciudad</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <Save size={18} /> Guardar cambios
            </>
          )}
        </button>
      </form>
    </div>
  );
}