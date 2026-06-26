import HeroBanner from "@/Components/Banner/Banner";
import CommunityImpactStats from "@/Components/CommunityImpact/CommunityImpact";
import ContactSection from "@/Components/ContactUs/Contactus";
import DonorMarquee from "@/Components/DonorMarquee/DonorMarquee";
import FeaturedSection from "@/Components/Featuredsection/Featuredesction";


export  default function Home() {
  return (
    <>
    <HeroBanner></HeroBanner>
    <DonorMarquee></DonorMarquee>
    <CommunityImpactStats></CommunityImpactStats>
    <FeaturedSection></FeaturedSection>
    <ContactSection></ContactSection>
    </>
  );
}
