import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ReadingRoom from "@/components/ReadingRoom";
import Hero from "@/components/home/Hero";
import Catalogue from "@/components/home/Catalogue";
import Work from "@/components/home/Work";
import Figures from "@/components/home/Figures";
import Letters from "@/components/home/Letters";
import Recognition from "@/components/home/Recognition";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Catalogue />
        <Work />
        <Figures />
        <Letters />
        <Recognition />
      </main>
      <ReadingRoom />
      <Footer />
    </>
  );
}
