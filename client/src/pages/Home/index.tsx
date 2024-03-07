import BookCatalog from 'containers/Home/BookCatalog';
import HeroSection from 'containers/Home/HeroSection';
import MainLayout from 'layouts/MainLayout';
function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <BookCatalog />
    </MainLayout>
  );
}

export default Home;
