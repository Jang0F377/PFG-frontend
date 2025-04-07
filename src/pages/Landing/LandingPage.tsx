import Hero from './components/Hero';
import { Header } from './components/Header';
import PrimaryFeatures from './components/PrimaryFeatures';
import Support from './components/Support';
import Contact from './components/Contact';
import { Footer } from './components/Footer';

const LandingPage = () => (
  <main className="w-full">
    <Header />
    <Hero />
    <PrimaryFeatures />
    <Support />
    <Contact />
    <Footer />
  </main>
);

export default LandingPage;
