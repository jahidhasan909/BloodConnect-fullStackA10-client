import HeroBanner from "@/Components/Banner/Banner";
import CommunityImpactStats from "@/Components/CommunityImpact/CommunityImpact";
import ContactSection from "@/Components/ContactUs/Contactus";
import FeaturedSection from "@/Components/Featuredsection/Featuredesction";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <HeroBanner></HeroBanner>
    <CommunityImpactStats></CommunityImpactStats>
    <FeaturedSection></FeaturedSection>
    <ContactSection></ContactSection>
    </>
  );
}
