import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import ActivityMarquee from "./components/ActivityMarquee";
import Space from "./components/Space";
import SectionDivider from "./components/SectionDivider";
import Services from "./components/Services";
import PlaylistSection from "./components/PlaylistSection";
import Events from "./components/Events";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import DialogProvider from "./components/DialogProvider";

export default function Home() {
  return (
    <DialogProvider>
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <ActivityMarquee />
        <Space />
        <SectionDivider
          pattern="/images/elements/MaM-padrao-01.jpg"
          variant="dark"
        />
        <Services />
        <SectionDivider
          pattern="/images/elements/MaM-padrao-03.jpg"
          variant="light"
        />
        <PlaylistSection />
        <SectionDivider
          pattern="/images/elements/MaM-padrao-02.jpg"
          variant="dark"
        />
        <Events />
        <SectionDivider
          pattern="/images/elements/MaM-padrao-06.jpg"
          variant="light"
        />
        <Contact />
      </main>
      <Footer />
    </DialogProvider>
  );
}
