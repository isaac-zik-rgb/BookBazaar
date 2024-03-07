import HeroImage from 'assets/images/image-hero.png';

const HeroSection = () => {
  return (
    <div className="flex justify-end" id="hero-section">
      <div className="w-full max-w-[48rem] self-center pl-16 text-7xl font-bold">
        APPRECIATE YOUR AUTHOR'S WORK
        <p className="pt-4 text-2xl">
          Find Your Favorite Book and Read It Here for Free
        </p>
      </div>
      <div>
        <img className="" src={HeroImage} alt="hero" />
      </div>
    </div>
  );
};

export default HeroSection;
