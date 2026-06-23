import { AdminSidebar } from "@/components/admin/Sidebar";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-canvas-soft text-ink">
      <AdminSidebar />
      <div className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">{children}</div>
      </div>
    </div>
  );
}
