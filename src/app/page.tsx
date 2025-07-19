import HeroSection from './LandingPage/HeroSection';
import Categories from './LandingPage/Categories';
import FeaturedProducts from './LandingPage/FeaturedProducts';
import SellerSpotlight from './LandingPage/SellerSpotlight';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <SellerSpotlight />
    </div>
  );
}
