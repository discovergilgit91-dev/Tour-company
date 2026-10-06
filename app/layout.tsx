import type { Metadata, Viewport } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Discover Gilgit",
  description: "Guided journeys through Gilgit-Baltistan",
  // Defaults for link previews; individual pages inherit these.
  openGraph: { siteName: "Discover Gilgit", type: "website", locale: "en_US" },
};

// viewportFit: "cover" lets the launcher/chat window's safe-area-inset-*
// padding (see ChatWidget.tsx) actually account for the iOS home
// indicator instead of being clamped to 0.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body className="bg-cream font-sans text-forest">
        {children}
        {/* Mounted once at the true app root (not the (marketing) route
            group's layout) so it renders on every route — including
            /sign-in and /sign-up, which live outside that group — and so
            its message/open state survives client-side navigation
            instead of unmounting each time the route changes. */}
        <ChatWidget />
      </body>
    </html>
  );
}
