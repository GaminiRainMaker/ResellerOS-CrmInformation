import Header from './layouts/Header';
import SideBar from './layouts/SideBar';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Header />
      <SideBar />
      <nav />

      {children}
    </section>
  );
}
