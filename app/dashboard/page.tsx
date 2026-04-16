"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Copy, Check, Package, Truck, Clock } from "lucide-react";
import Link from "next/link";

type Profile = {
  locker_code: string;
  locker_address: string;
  full_name: string;
  city: string;
};

type PackageItem = {
  id: string;
  tracking_number: string;
  description: string | null;
  status: string;
  weight_lbs: number | null;
  created_at: string;
};

const statusLabels: Record<string, { label: string; color: string }> = {
  received: { label: "Recibido", color: "bg-primary/10 text-primary" },
  consolidated: { label: "Consolidado", color: "bg-accent/10 text-accent" },
  shipped: { label: "Enviado", color: "bg-warning/10 text-warning" },
  delivered: { label: "Entregado", color: "bg-success/10 text-success" },
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, packagesRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", user.id).single(),
        supabase
          .from("packages")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (packagesRes.data) setPackages(packagesRes.data);
      setLoading(false);
    };

    loadData();
  }, []);

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
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          Hola, {profile?.full_name || "Usuario"}
        </h1>
        <p className="text-muted-light mt-1">
          Bienvenido a tu casillero virtual
        </p>
      </div>

      {/* Locker Address Card */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Package size={20} className="text-primary" />
              Tu dirección en Florida
            </h2>
            <span className="text-sm text-primary font-mono">
              Casillero: {profile?.locker_code}
            </span>
          </div>
          <button
            onClick={copyAddress}
            className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copiado!" : "Copiar dirección"}
          </button>
        </div>
        <div className="bg-background border border-border rounded-xl p-4 font-mono text-sm text-muted-light whitespace-pre-line">
          {profile?.locker_address}
        </div>
        <p className="text-xs text-muted mt-3">
          Usá esta dirección como dirección de envío en tus compras en USA.
          Asegurate de incluir tu código de casillero ({profile?.locker_code}) en el nombre.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Package size={20} className="text-primary" />
            <span className="text-sm text-muted-light">Paquetes recibidos</span>
          </div>
          <span className="text-2xl font-bold">
            {packages.filter((p) => p.status === "received").length}
          </span>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Truck size={20} className="text-warning" />
            <span className="text-sm text-muted-light">En tránsito</span>
          </div>
          <span className="text-2xl font-bold">
            {packages.filter((p) => p.status === "shipped").length}
          </span>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Clock size={20} className="text-success" />
            <span className="text-sm text-muted-light">Entregados</span>
          </div>
          <span className="text-2xl font-bold">
            {packages.filter((p) => p.status === "delivered").length}
          </span>
        </div>
      </div>

      {/* Recent packages */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Paquetes recientes</h2>
          <Link
            href="/dashboard/tracking"
            className="text-sm text-primary hover:text-primary-dark transition-colors"
          >
            Ver todos →
          </Link>
        </div>

        {packages.length === 0 ? (
          <div className="bg-surface border border-border rounded-2xl p-12 text-center">
            <Package size={40} className="text-muted mx-auto mb-4" />
            <p className="text-muted-light mb-2">No Tienes paquetes todavía</p>
            <p className="text-sm text-muted">
              Cuando compres en USA y envíes a tu dirección de Florida, los paquetes aparecerán aquí.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {packages.map((pkg) => {
              const status = statusLabels[pkg.status] || statusLabels.received;
              return (
                <div
                  key={pkg.id}
                  className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{pkg.tracking_number}</p>
                    <p className="text-sm text-muted-light">
                      {pkg.description || "Sin descripción"}
                    </p>
                  </div>
                  <span
                    className={`${status.color} px-3 py-1 rounded-full text-xs font-medium`}
                  >
                    {status.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}