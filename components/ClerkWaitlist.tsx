"use client";

import { Waitlist } from "@clerk/nextjs";

const ink = "#1A1815";
const surface = "#F5F2EA";

export function ClerkWaitlist() {
  return (
    <div className="w-full max-w-full">
      <Waitlist
        appearance={{
          variables: {
            colorPrimary: "#3A5F82",
            colorText: ink,
            colorTextSecondary: "rgba(26,24,21,0.55)",
            colorBackground: surface,
            colorInputBackground: "#FDFBF7",
            colorInputText: ink,
          },
        }}
      />
    </div>
  );
}
