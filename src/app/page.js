"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import SideNavigation from "@/components/layout/SideNavigation";
import Footer from "@/components/layout/Footer";
import ScrollRevealClient from "@/components/layout/ScrollRevealClient";
import BackgroundDepthClient from "@/components/layout/BackgroundDepthClient";
import Transition3DDecor from "@/components/ui/Transition3DDecor";
import CursorGlow from "@/components/layout/CursorGlow";
import LoadingScreen from "@/components/ui/LoadingScreen";
import LagPopup from "@/components/ui/LagPopup";
import ChibiMascot from "@/components/ui/ChibiMascot";
import { useTheme } from "@/components/layout/ThemeProvider";
import IntroSection from "@/components/sections/IntroSection";
import ProfileSection from "@/components/sections/ProfileSection";
import SkillsSection from "@/components/sections/SkillsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import AchievementSection from "@/components/sections/AchievementSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [identityMode, setIdentityMode] = useState("student");
  const [triggers, setTriggers] = useState({});
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
      {/* Page content — always renders at full opacity behind loading screen */}
      <div>
        <Navbar />
        <SideNavigation />
        <main className="relative isolate min-h-screen overflow-x-hidden bg-[#ece6dc] dark:bg-transparent pt-16 transition-colors duration-300">
          <ScrollRevealClient />
          <BackgroundDepthClient />
          <Transition3DDecor />
          <div className="hiyo-global-bg" aria-hidden="true">
            <div className="hiyo-bg-paper" />
            <div className="hiyo-bg-shape hiyo-bg-shape-a" />
            <div className="hiyo-bg-shape hiyo-bg-shape-b" />
            <div className="hiyo-bg-shape hiyo-bg-shape-c" />
            <div className="hiyo-bg-stripes" />
            <div className="hiyo-bg-glow hiyo-bg-glow-a" />
            <div className="hiyo-bg-glow hiyo-bg-glow-b" />
            <div className="hiyo-fluid-mesh hiyo-fluid-mesh-a">
              <div className="hiyo-fluid-glow hiyo-fluid-glow-a" />
            </div>
            <div className="hiyo-fluid-mesh hiyo-fluid-mesh-b">
              <div className="hiyo-fluid-glow hiyo-fluid-glow-b" />
              <div className="hiyo-fluid-glow hiyo-fluid-glow-c" />
            </div>
          </div>

          <CursorGlow />
          <div className="relative z-20">
            <IntroSection key={`intro-${getTrigger("home")}-${showContent}`} />
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
          <LagPopup />
          <ChibiMascot />
        </main>
        <Footer />
      </div>

      {/* Loading screen — visible initially, exits with dissolve effect */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            key="loading-overlay"
            exit={{ opacity: 0, scale: 1.05, filter: "blur(3px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-0 z-[9999] flex items-center justify-center ${
              isDark
                ? "bg-gradient-to-b from-[#0a1e30] via-[#0f2a42] to-[#061424]"
                : "bg-gradient-to-b from-[#f5f0ea] via-[#ece6dc] to-[#e5ddd2]"
            }`}
          >
            <LoadingScreen
              onFinish={() => setShowContent(true)}
              isDark={isDark}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
