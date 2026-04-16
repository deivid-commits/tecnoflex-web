"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { History, Package } from "lucide-react";

type Shipment = {
  id: string;
  tracking_number: string;
  status: string;
  estimated_delivery: string | null;
  actual_delivery: string | null;
  total_weight_lbs: number | null;
  total_cost_usd: number | null;
  created_at: string;
};

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendiente", color: "bg-muted/10 text-muted-light" },
  in_transit: { label: "En tránsito", color: "bg-warning/10 text-warning" },
  customs: { label: "En aduanas", color: "bg-accent/10 text-accent" },
  delivered: { label: "Entregado", color: "bg-success/10 text-success" },
};

export default function HistorialPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("shipments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) setShipments(data);
      setLoading(false);
    };
    loadData();
  }, []);

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
        <h1 className="text-2xl font-bold">Historial de envíos</h1>
        <p className="text-muted-light mt-1">
          Todos tus envíos consolidados
        </p>
      </div>

      {shipments.length === 0 ? (
        <div className="bg-surface border border-border rounded-2xl p-12 text-center">
          <History size={40} className="text-muted mx-auto mb-4" />
          <p className="text-muted-light mb-2">No Tienes envíos todavía</p>
          <p className="text-sm text-muted">
            Cuando consolidemos tus paquetes y los enviemos a Colombia, aparecerán aquí.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {shipments.map((shipment) => {
            const status = statusLabels[shipment.status] || statusLabels.pending;
            return (
              <div key={shipment.id} className="bg-surface border border-border rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <Package size={18} className="text-primary" />
                      <h3 className="font-semibold">{shipment.tracking_number}</h3>
                    </div>
                    <p className="text-sm text-muted-light mt-1">
                      Creado: {new Date(shipment.created_at).toLocaleDateString("es-CO")}
                    </p>
                  </div>
                  <span className={`${status.color} px-3 py-1 rounded-full text-xs font-medium`}>
                    {status.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted">Peso total</p>
                    <p className="font-medium">{shipment.total_weight_lbs ? `${shipment.total_weight_lbs} lbs` : "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Costo</p>
                    <p className="font-medium">{shipment.total_cost_usd ? `USD $${shipment.total_cost_usd}` : "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Entrega estimada</p>
                    <p className="font-medium">
                      {shipment.estimated_delivery
                        ? new Date(shipment.estimated_delivery).toLocaleDateString("es-CO")
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Entrega real</p>
                    <p className="font-medium">
                      {shipment.actual_delivery
                        ? new Date(shipment.actual_delivery).toLocaleDateString("es-CO")
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}