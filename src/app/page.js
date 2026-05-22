import Navbar from "@/components/layout/Navbar";
import SideNavigation from "@/components/layout/SideNavigation";
import Footer from "@/components/layout/Footer";
import ProfileSection from "@/components/sections/ProfileSection";
import SkillsSection from "@/components/sections/SkillsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import AchievementSection from "@/components/sections/AchievementSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <SideNavigation />
      <main className="pt-16">
        <ProfileSection />
        <SkillsSection />
        <PortfolioSection />
        <AchievementSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
