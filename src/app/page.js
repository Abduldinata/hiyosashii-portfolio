"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import SideNavigation from "@/components/layout/SideNavigation";
import Footer from "@/components/layout/Footer";
import ScrollRevealClient from "@/components/layout/ScrollRevealClient";
import BackgroundDepthClient from "@/components/layout/BackgroundDepthClient";
import ElasticOverscroll from "@/components/layout/ElasticOverscroll";
import IntroSection from "@/components/sections/IntroSection";
import ProfileSection from "@/components/sections/ProfileSection";
import SkillsSection from "@/components/sections/SkillsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import AchievementSection from "@/components/sections/AchievementSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const [identityMode, setIdentityMode] = useState("student");
  const [triggers, setTriggers] = useState({});

  const getTrigger = useCallback((name) => triggers[name] || 0, [triggers]);

  // Listen for hash changes & custom nav events to force section re-animation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setTriggers((prev) => ({ ...prev, [hash]: (prev[hash] || 0) + 1 }));
      }
    };

    const handleSectionNav = (e) => {
      const hash = e.detail;
      if (hash) {
        setTriggers((prev) => ({ ...prev, [hash]: (prev[hash] || 0) + 1 }));
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("sectionnav", handleSectionNav);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("sectionnav", handleSectionNav);
    };
  }, []);

  return (
    <>
      <Navbar />
      <SideNavigation />
      <main className="relative isolate min-h-screen overflow-x-hidden bg-[#eef3f7] pt-16">
        <ScrollRevealClient />
        <BackgroundDepthClient />
        <div className="hiyo-global-bg" aria-hidden="true">
          <div className="hiyo-bg-paper" />
          <div className="hiyo-bg-shape hiyo-bg-shape-a" />
          <div className="hiyo-bg-shape hiyo-bg-shape-b" />
          <div className="hiyo-bg-shape hiyo-bg-shape-c" />
          <div className="hiyo-bg-stripes" />
          <div className="hiyo-bg-glow hiyo-bg-glow-a" />
          <div className="hiyo-bg-glow hiyo-bg-glow-b" />
        </div>

        <ElasticOverscroll>
          <div className="relative z-20">
            <IntroSection key={`intro-${getTrigger("home")}`} />
            <ProfileSection
              key={`profile-${getTrigger("profile")}`}
              mode={identityMode}
              onModeChange={setIdentityMode}
            />
            <SkillsSection
              key={`skills-${getTrigger("skills")}`}
              mode={identityMode === "student" ? "tech" : "creative"}
              onModeChange={(nextSkillMode) =>
                setIdentityMode(
                  nextSkillMode === "tech" ? "student" : "creator",
                )
              }
            />
            <PortfolioSection key={`portfolio-${getTrigger("portfolio")}`} />
            <AchievementSection
              key={`achievement-${getTrigger("achievement")}`}
            />
            <ContactSection key={`contact-${getTrigger("contact")}`} />
          </div>
        </ElasticOverscroll>
      </main>
      <Footer />
    </>
  );
}
