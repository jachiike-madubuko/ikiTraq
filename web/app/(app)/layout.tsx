import { Nav } from "@/components/app/nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-app text-fg">
      <Nav />
      <main className="lg:pl-64">
        <div className="mx-auto max-w-5xl px-5 pb-28 pt-6 lg:pb-12 lg:pt-10">{children}</div>
      </main>
    </div>
  );
}
