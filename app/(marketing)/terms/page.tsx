import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — Discover Gilgit",
  description:
    "The terms for using the Discover Gilgit website, creating an account, and sending trip, reservation and custom-trip requests.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="LEGAL"
      title="Terms of Service"
      intro="The plain-language rules for using Discover Gilgit — our website, your account, and the requests you send us."
      updated="October 2026"
      image="/Images/tours/skardu-kaptana(3).png"
      imageAlt="Sunlight breaking over a still mountain lake near Skardu, with a boat on the water"
      sections={[
        {
          heading: "Who we are and what this site does",
          body: (
            <p>
              Discover Gilgit (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a guided-travel company based in Gilgit,
              Gilgit-Baltistan, Pakistan. This website lets you explore destinations, tours and events, and send us trip
              requests, reservation requests and custom-trip requests. By using the site or creating an account you
              agree to these terms.
            </p>
          ),
        },
        {
          heading: "Requests are not bookings",
          body: (
            <>
              <p>
                Sending a trip request, custom-trip request or &ldquo;Reserve your spot&rdquo; form asks our team to
                prepare a plan or hold a place — it is not a confirmed booking and no payment is taken on this website.
              </p>
              <p>
                A booking only exists once our team confirms it to you in writing, with the price, dates and
                inclusions. Prices and dates shown on the site are indicative and may change before then.
              </p>
            </>
          ),
        },
        {
          heading: "Your account",
          body: (
            <p>
              You are responsible for keeping your password secure and for activity under your account. Give us accurate
              details, and tell us if you think someone else has accessed your account. We may suspend accounts that are
              used abusively or unlawfully.
            </p>
          ),
        },
        {
          heading: "Travel in the mountains",
          body: (
            <p>
              Travel in Gilgit-Baltistan involves altitude, weather, road and trail conditions that can change quickly.
              Itineraries may be adjusted or re-routed for safety. Please read each tour&apos;s physical-level
              information and tell us about any health conditions or needs when you make a request.
            </p>
          ),
        },
        {
          heading: "Acceptable use",
          body: (
            <p>
              Don&apos;t misuse the site: no attempts to break or overload it, scrape it at scale, send spam through our
              forms or chat, or submit another person&apos;s details without their permission.
            </p>
          ),
        },
        {
          heading: "Content and ownership",
          body: (
            <p>
              The text, photographs, logos and design on this site belong to Discover Gilgit or its contributors and may
              not be copied or reused without permission. Links to third-party sites are provided for convenience; we
              are not responsible for their content.
            </p>
          ),
        },
        {
          heading: "Liability",
          body: (
            <p>
              The site is provided &ldquo;as is&rdquo;. To the extent the law allows, we are not liable for indirect or
              consequential losses arising from your use of the website. Nothing here limits any rights you have under
              applicable consumer law, or our responsibilities under a written booking confirmation.
            </p>
          ),
        },
        {
          heading: "Changes and governing law",
          body: (
            <p>
              We may update these terms; the date above shows the latest version, and continuing to use the site means
              you accept the update. These terms are governed by the laws of Pakistan.
            </p>
          ),
        },
      ]}
    />
  );
}
