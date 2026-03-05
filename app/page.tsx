import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import ActivityMarquee from "./components/ActivityMarquee";
import Space from "./components/Space";
import SectionDivider from "./components/SectionDivider";
import Services from "./components/Services";
import Artists from "./components/Artists";
import PlaylistSection from "./components/PlaylistSection";
import Events from "./components/Events";
import Education from "./components/Education";
import Press from "./components/Press";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
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
        <Artists />
        <SectionDivider
          pattern="/images/elements/MaM-padrao-02.jpg"
          variant="dark"
        />
        <PlaylistSection />
        <SectionDivider
          pattern="/images/elements/MaM-padrao-06.jpg"
          variant="light"
        />
        <Events />
        <SectionDivider
          pattern="/images/elements/MaM-padrao-04.jpg"
          variant="dark"
        />
        <Education />
        <SectionDivider
          pattern="/images/elements/MaM-padrao-05.jpg"
          variant="light"
        />
        <Press />
        <SectionDivider
          pattern="/images/elements/MaM-padrao-01.jpg"
          variant="dark"
        />
        <Gallery />
        <SectionDivider
          pattern="/images/elements/MaM-padrao-06.jpg"
          variant="light"
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
