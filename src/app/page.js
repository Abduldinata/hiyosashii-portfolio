"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import SideNavigation from "@/components/layout/SideNavigation";
import Footer from "@/components/layout/Footer";
import ProfileSection from "@/components/sections/ProfileSection";
import SkillsSection from "@/components/sections/SkillsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import AchievementSection from "@/components/sections/AchievementSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const [identityMode, setIdentityMode] = useState("student");

  return (
    <>
      <Navbar />
      <SideNavigation />
      <main className="relative min-h-screen overflow-hidden bg-[#eef3f7] pt-16">
        <div className="hiyo-global-bg" aria-hidden="true">
          <div className="hiyo-bg-paper" />
          <div className="hiyo-bg-shape hiyo-bg-shape-a" />
          <div className="hiyo-bg-shape hiyo-bg-shape-b" />
          <div className="hiyo-bg-shape hiyo-bg-shape-c" />
          <div className="hiyo-bg-stripes" />
          <div className="hiyo-bg-glow hiyo-bg-glow-a" />
          <div className="hiyo-bg-glow hiyo-bg-glow-b" />
        </div>

        <div className="relative z-10">
          <ProfileSection mode={identityMode} onModeChange={setIdentityMode} />
          <SkillsSection
            mode={identityMode === "student" ? "tech" : "creative"}
            onModeChange={(nextSkillMode) =>
              setIdentityMode(nextSkillMode === "tech" ? "student" : "creator")
            }
          />
          <PortfolioSection />
          <AchievementSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
