"use client";

import { Waitlist } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const ink = "#E8E6E0";
const surface = "#11141C";

export function ClerkWaitlist() {
  return (
    <div className="w-full max-w-full">
      <Waitlist
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "#5B7A9E",
            colorText: ink,
            colorTextSecondary: "rgba(232,230,224,0.55)",
            colorBackground: surface,
            colorInputBackground: "#161A24",
            colorInputText: ink,
          },
        }}
      />
    </div>
  );
}
