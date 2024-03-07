import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl">
      <Header />
      <div className="relative">{children}</div>
      <Footer />
    </div>
  );
}

export default MainLayout;
