import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TechnologyStack from "@/components/TechnologyStack";
import Statistics from "@/components/Statistics";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import ScrollAnimation from "@/components/ScrollAnimation";

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <Navigation />
      <Hero />
      <ScrollAnimation>
        <TechnologyStack />
      </ScrollAnimation>
      <ScrollAnimation delay={100}>
        <Statistics />
      </ScrollAnimation>
      <ScrollAnimation delay={200}>
        <Services />
      </ScrollAnimation>
      <ScrollAnimation delay={100}>
        <About />
      </ScrollAnimation>
      <ScrollAnimation delay={200}>
        <Portfolio />
      </ScrollAnimation>
      <ScrollAnimation delay={100}>
        <Testimonials />
      </ScrollAnimation>
      <ScrollAnimation delay={200}>
        <FAQ />
      </ScrollAnimation>
      <ScrollAnimation delay={100}>
        <Contact />
      </ScrollAnimation>
      <Footer />
      <BackToTop />
    </main>
  );
}
