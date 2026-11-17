import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { clinic } from "@/data/clinic";
import { themeInitScript } from "@/lib/theme";
import { Providers } from "@/components/layout/Providers";

const cormorant = localFont({
  src: [
    { path: "../fonts/cormorant-garamond-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});
const manrope = localFont({
  src: "../fonts/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});

const title = "Sri Arogya Centre | Siddha, Ayurveda & Panchakarma in Adambakkam, Chennai";
const description =
  "Sri Arogya Centre is a Siddha, Ayurveda and Panchakarma centre in Adambakkam, Chennai, under Dr. S. Rajesh MD(s). Book a consultation by WhatsApp or phone.";

export const metadata: Metadata = {
  metadataBase: new URL(clinic.siteUrl),
  title: { default: title, template: "%s | Sri Arogya Centre" },
  description,
  keywords: [
    "Ayurveda centre in Adambakkam",
    "Siddha centre in Adambakkam",
    "Ayurveda clinic in Chennai",
    "Panchakarma centre in Chennai",
    "Sri Arogya Centre",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: clinic.name,
    title,
    description,
    url: "/",
    images: [{ url: "/brand/logo-full.png", width: 1000, height: 806, alt: "Sri Arogya Centre logo" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/brand/logo-full.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F6EF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1711" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning className={`${cormorant.variable} ${manrope.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-forest focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
