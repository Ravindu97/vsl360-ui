import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { WhatsAppFab } from "@/components/WhatsApp";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="app-shell">
      <TopBar />
      <main className="pb-28">{children}</main>
      <WhatsAppFab />
      <BottomNav />
    </div>
  );
}
