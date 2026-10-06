import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Discover Gilgit",
  description:
    "What personal information Discover Gilgit collects through its website, accounts, forms and chat assistant, how it is used, and your choices.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="LEGAL"
      title="Privacy Policy"
      intro="What we collect when you use Discover Gilgit, why we collect it, and the choices you have."
      updated="October 2026"
      sections={[
        {
          heading: "What we collect",
          body: (
            <>
              <p>
                <strong className="font-semibold text-forest">Account details</strong> — your name and email, and a
                password (stored securely by our sign-in provider, never in readable form). If you use Google sign-in we
                receive your name and email from Google.
              </p>
              <p>
                <strong className="font-semibold text-forest">Requests you send us</strong> — the details you type into
                the Plan Your Trip, Build Your Own Trip and Reserve Your Spot forms: name, email, phone or WhatsApp
                number, destinations, dates, group size, budget, and any notes.
              </p>
              <p>
                <strong className="font-semibold text-forest">Chat messages</strong> — what you type to our chat
                assistant, so it can answer you and pass on a request if you ask us to.
              </p>
            </>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <p>
              To run your account, to reply to your requests and prepare itineraries and quotes, to show you your own
              trip requests, to answer questions in chat, and to keep the site secure. We don&apos;t sell your personal
              information, and we only contact you about the things you asked us about.
            </p>
          ),
        },
        {
          heading: "Who handles it",
          body: (
            <p>
              We use service providers to operate the site: a sign-in and database provider for accounts, workflow and
              spreadsheet tools that deliver your requests to our team, and an AI-assisted chat workflow. They process
              data only to provide those services to us.
            </p>
          ),
        },
        {
          heading: "Cookies and local storage",
          body: (
            <p>
              We use cookies to keep you signed in. Your browser may also temporarily keep a half-finished request so it
              isn&apos;t lost when you sign in or sign up mid-way; it is cleared once restored. We don&apos;t use
              advertising cookies.
            </p>
          ),
        },
        {
          heading: "How long we keep it",
          body: (
            <p>
              We keep account details while your account is open, and request details for as long as needed to serve
              you and meet our legal and accounting obligations, then delete or anonymise them.
            </p>
          ),
        },
        {
          heading: "Your choices",
          body: (
            <p>
              You can ask us to see, correct or delete the personal information we hold about you, or to close your
              account, at any time by emailing us. You can also stop marketing-style messages by telling us.
            </p>
          ),
        },
        {
          heading: "Changes",
          body: (
            <p>
              If we change this policy we will update the date above. For anything not covered here, contact us at the
              address below.
            </p>
          ),
        },
      ]}
    />
  );
}
