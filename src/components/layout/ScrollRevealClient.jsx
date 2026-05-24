"use client";

import { useEffect } from "react";

const revealSelector =
  ".hiyo-section-reveal, .hiyo-reveal, .hiyo-reveal-stagger, .reveal-on-scroll, .reveal-card, .reveal-title, .reveal-copy, .reveal-icon, .reveal-text, .reveal-text-down, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-pop, .reveal-zoom, .split-reveal";

function isElementReadyToReveal(element) {
  const rect = element.getBoundingClientRect();

  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.top < window.innerHeight * 0.92
  );
}

export default function ScrollRevealClient() {
  useEffect(() => {
    const observedElements = new WeakSet();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else if (entry.intersectionRatio < 0.03) {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: [0, 0.03, 0.16],
        rootMargin: "0px 0px -18% 0px",
      },
    );

    const observeElement = (element) => {
      if (observedElements.has(element)) return;

      observedElements.add(element);
      observer.observe(element);

      // Make elements that are already visible on load/state changes appear
      // immediately instead of waiting for the next scroll event.
      if (isElementReadyToReveal(element)) {
        element.classList.add("is-visible");
      }
    };

    const observeRevealElements = (root = document) => {
      if (root instanceof Element && root.matches(revealSelector)) {
        observeElement(root);
      }

      root.querySelectorAll?.(revealSelector).forEach(observeElement);
    };

    const timer = setTimeout(() => {
      observeRevealElements();
    }, 50);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            observeRevealElements(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
