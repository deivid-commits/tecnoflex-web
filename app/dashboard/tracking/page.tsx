"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Package, Search } from "lucide-react";

type PackageItem = {
  id: string;
  tracking_number: string;
  description: string | null;
  status: string;
  weight_lbs: number | null;
  dimensions: string | null;
  received_at: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  created_at: string;
};

const statusFlow = ["received", "consolidated", "shipped", "delivered"] as const;

const statusInfo: Record<string, { label: string; color: string; icon: string }> = {
  received: { label: "Recibido en bodega", color: "text-primary", icon: "1" },
  consolidated: { label: "Consolidado", color: "text-accent", icon: "2" },
  shipped: { label: "Enviado a Colombia", color: "text-warning", icon: "3" },
  delivered: { label: "Entregado", color: "text-success", icon: "4" },
};

export default function TrackingPage() {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("packages")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) setPackages(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const filtered = packages.filter(
    (p) =>
      p.tracking_number.toLowerCase().includes(search.toLowerCase()) ||
      (p.description?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

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
        <h1 className="text-2xl font-bold">Tracking de paquetes</h1>
        <p className="text-muted-light mt-1">
          Seguí el estado de todos tus paquetes
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por tracking o descripción..."
          className="w-full bg-surface border border-border rounded-xl pl-11 pr-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        />
      </div>

      {/* Packages list with timeline */}
      {filtered.length === 0 ? (
        <div className="bg-surface border border-border rounded-2xl p-12 text-center">
          <Package size={40} className="text-muted mx-auto mb-4" />
          <p className="text-muted-light">
            {search ? "No se encontraron paquetes" : "No Tienes paquetes todavía"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((pkg) => {
            const currentStep = statusFlow.indexOf(pkg.status as typeof statusFlow[number]);
            return (
              <div key={pkg.id} className="bg-surface border border-border rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="font-semibold text-lg">{pkg.tracking_number}</h3>
                    <p className="text-sm text-muted-light">{pkg.description || "Sin descripción"}</p>
                    {pkg.weight_lbs && (
                      <p className="text-xs text-muted mt-1">{pkg.weight_lbs} lbs {pkg.dimensions ? `· ${pkg.dimensions}` : ""}</p>
                    )}
                  </div>
                  <span className={`${statusInfo[pkg.status]?.color || "text-primary"} text-sm font-semibold`}>
                    {statusInfo[pkg.status]?.label || "Desconocido"}
                  </span>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-2 mt-4">
                  {statusFlow.map((step, i) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                            i <= currentStep
                              ? "bg-primary border-primary text-white"
                              : "bg-surface border-border text-muted"
                          }`}
                        >
                          {i + 1}
                        </div>
                        <span className={`text-[10px] mt-1 text-center ${i <= currentStep ? "text-primary" : "text-muted"}`}>
                          {statusInfo[step].label.split(" ").slice(0, 2).join(" ")}
                        </span>
                      </div>
                      {i < statusFlow.length - 1 && (
                        <div className={`h-0.5 flex-1 ${i < currentStep ? "bg-primary" : "bg-border"}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}