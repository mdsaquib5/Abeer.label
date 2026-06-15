import Category from "@/components/ui/Category";
import Collection from "@/components/ui/Collection";
import FounderMessage from "@/components/ui/FounderMessage";
import Hero from "@/components/ui/Hero";
import Instagram from "@/components/ui/Instagram";
import OurProduct from "@/components/ui/OurProduct";
import Services from "@/components/ui/Services";
import Testimonial from "@/components/ui/Testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <Category />
      <Collection />
      <OurProduct />
      <Instagram />
      <Testimonial />
      <FounderMessage />
      <Services />
    </>
  );
}
