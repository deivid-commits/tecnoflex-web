"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Package,
  History,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/tracking", icon: Package, label: "Tracking" },
  { href: "/dashboard/historial", icon: History, label: "Historial" },
  { href: "/dashboard/perfil", icon: User, label: "Perfil" },
];

export default function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-surface border-r border-border">
        <div className="p-6 border-b border-border">
          <Link href="/" className="text-xl font-bold gradient-text">
            TECNOFLEX
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                pathname === href
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-light hover:text-foreground hover:bg-surface-light"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted-light hover:text-danger hover:bg-danger/5 transition-colors w-full"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <aside className="w-64 h-full bg-surface border-r border-border" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border flex items-center justify-between">
              <Link href="/" className="text-xl font-bold gradient-text">
                TECNOFLEX
              </Link>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {navItems.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                    pathname === href
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-light hover:text-foreground hover:bg-surface-light"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted-light hover:text-danger hover:bg-danger/5 transition-colors w-full"
              >
                <LogOut size={18} />
                Cerrar sesión
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar - Mobile */}
        <header className="lg:hidden bg-surface border-b border-border px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <Link href="/" className="text-lg font-bold gradient-text">
            TECNOFLEX
          </Link>
          <div className="w-6" />
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}