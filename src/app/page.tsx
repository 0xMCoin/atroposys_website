import { BottomBlur } from "@/components/landing/bottom-blur";
import { Contact } from "@/components/landing/contact";
import { Cursor } from "@/components/landing/cursor";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Manifesto } from "@/components/landing/manifesto";
import { Nav } from "@/components/landing/nav";
import { Process } from "@/components/landing/process";
import { Services } from "@/components/landing/services";
import { SmoothScroll } from "@/components/landing/smooth-scroll";
import { Stack } from "@/components/landing/stack";
import { Ticker } from "@/components/landing/ticker";
import { Work } from "@/components/landing/work";

export default function Home() {
  return (
    <main className="landing-root landing-grain relative">
      <SmoothScroll />
      <Cursor />
      <Nav />
      <Hero />
      <Ticker />
      <Manifesto />
      <Services />
      <Work />
      <Process />
      <Stack />
      <Contact />
      <Footer />
      <BottomBlur />
    </main>
  );
}
