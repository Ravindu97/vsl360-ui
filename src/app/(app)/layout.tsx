import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BottomNav } from "@/components/BottomNav";
import { WhatsAppFab } from "@/components/WhatsApp";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="flex-1 pb-28 lg:pb-0">{children}</main>
      <SiteFooter />
      <WhatsAppFab />
      <BottomNav />
    </div>
  );
}
