// app/fonts.ts

import { Poppins, Playfair_Display } from "next/font/google";

export const HeaderFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

export const BodyFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
