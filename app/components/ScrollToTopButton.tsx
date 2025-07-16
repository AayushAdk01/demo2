// components/ScrollToTopButton.tsx
"use client";

import React from 'react';

export default function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button 
      onClick={scrollToTop}
      className="underline text-center font-semibold mx-auto px-auto"
    >
      Scroll To Top
    </button>
  );
}