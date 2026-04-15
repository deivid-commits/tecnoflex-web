import type { Metadata } from "next";
import DashboardClientLayout from "@/components/dashboard/DashboardClientLayout";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard — TCNOflex",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}