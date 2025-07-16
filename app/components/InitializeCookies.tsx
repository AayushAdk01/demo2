"use client";

import { useEffect } from "react";
import { cookies } from "next/headers";

export default function InitializeCookies() {
  useEffect(() => {
    if (!document.cookie.includes('tempScore')) {
      // Set cookie client-side
      document.cookie = "tempScore=0; path=/; max-age=31536000";
    }
  }, []);

  return null; // This component doesn't render anything
}