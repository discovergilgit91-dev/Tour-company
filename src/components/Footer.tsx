import Link from 'next/link'

function PeakMark() {
  return (
    <svg
      width="30"
      height="24"
      viewBox="0 0 34 28"
      fill="none"
      className="shrink-0"
      aria-hidden="true"
    >
      <path
        d="M1 26L11 6L16 15L21 3L33 26H1Z"
        stroke="#F6F1E7"
        strokeOpacity="0.9"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M11 6L16 15L13 18.5L6.5 18.5L11 6Z"
        fill="#D98E3F"
        fillOpacity="0.9"
      />
    </svg>
  )
}

function CompassMark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9.5"
        stroke="#D98E3F"
        strokeWidth="1.5"
      />
      <path
        d="M12 6.5 14 12 12 17.5 10 12 12 6.5Z"
        fill="#D98E3F"
      />
      <circle
        cx="12"
        cy="12"
        r="1"
        fill="#F6F1E7"
      />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12H18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13 7L18 12L13 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="12"
        cy="12"
        r="4.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="17.4"
        cy="6.6"
        r="1.1"
        fill="currentColor"
      />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14.5 21v-7.2h2.4l.4-2.8h-2.8V9.1c0-.8.2-1.4 1.4-1.4h1.5V5.2C16.9 5.1 15.9 5 14.8 5c-2.5 0-4.2 1.5-4.2 4.3v2.7H8.2v2.8h2.4V21h3.9Z"
        fill="currentColor"
      />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.8 20.5l4.4-1.2A8.4 8.4 0 1 0 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 9.6c.1-.6.6-.6 1-.6h.5c.3 0 .5.1.6.4l.6 1.4c.1.2 0 .5-.1.6l-.5.6c-.1.1-.1.3 0 .4.4.9 1.2 1.7 2.1 2.1.1.1.3.1.4 0l.6-.5c.2-.1.4-.2.6-.1l1.4.6c.3.1.4.3.4.6v.5c0 .4 0 .9-.6 1-1 .2-2.4 0-4.2-1.2-1.5-1-2.4-2.2-2.9-3.4-.5-1.1-.5-2-.4-2.4Z"
        fill="currentColor"
      />
    </svg>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex h-8 w-8 items-center justify-center
        rounded-full
        border border-[#F6F1E7]/15
        text-[#F6F1E7]/55
        transition-all duration-200
        hover:border-[#D98E3F]/50
        hover:bg-[#D98E3F]/10
        hover:text-[#D98E3F]
      "
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#071719] text-[#F6F1E7]">

      {/* Very subtle background atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          -top-40
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#236B57]/[0.04]
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-40
          h-[350px]
          w-[350px]
          rounded-full
          bg-[#D98E3F]/[0.025]
          blur-3xl
        "
      />

      {/* Main footer container */}
      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[930px]
          px-5
          py-12
          sm:px-7
          sm:py-14
          md:px-8
          md:py-14
          lg:px-0
        "
      >

        {/* =========================================================
            TOP FOOTER
        ========================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-10
            sm:grid-cols-2
            md:grid-cols-[1.25fr_1fr_1fr]
            md:gap-8
          "
        >

          {/* =====================================================
              BRAND
          ====================================================== */}

          <div
            className="
              border-b
              border-[#F6F1E7]/[0.08]
              pb-9
              sm:col-span-2
              md:col-span-1
              md:border-b-0
              md:border-r
              md:pb-0
              md:pr-8
            "
          >

            {/* Logo */}
            <Link
              href="/"
              className="
                inline-flex
                items-center
                gap-2.5
                transition-opacity
                duration-200
                hover:opacity-80
              "
            >
              <PeakMark />

              <span
                className="
                  font-[family-name:var(--font-fraunces)]
                  text-[23px]
                  font-semibold
                  tracking-[-0.02em]
                "
              >
                Discover Gilgit
              </span>
            </Link>

            {/* Description */}
            <p
              className="
                mt-5
                max-w-[285px]
                text-[12px]
                leading-[1.8]
                text-[#F6F1E7]/50
              "
            >
              Guided journeys through the valleys, rivers, villages,
              and peaks of Gilgit-Baltistan.
            </p>

            {/* Home location box */}
            <div
              className="
                mt-6
                flex
                w-full
                max-w-[302px]
                items-center
                gap-3
                rounded-xl
                border
                border-[#F6F1E7]/[0.09]
                bg-[#F6F1E7]/[0.025]
                px-3.5
                py-3
              "
            >
              <CompassMark />

              <div className="min-w-0">
                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[#D98E3F]
                  "
                >
                  Our Home
                </p>

                <p
                  className="
                    mt-1
                    truncate
                    text-[11px]
                    text-[#F6F1E7]/60
                  "
                >
                  Gilgit-Baltistan, Pakistan
                </p>
              </div>
            </div>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2.5">
              <SocialIcon href="#" label="Instagram">
                <InstagramIcon />
              </SocialIcon>

              <SocialIcon href="#" label="Facebook">
                <FacebookIcon />
              </SocialIcon>

              <SocialIcon href="#" label="WhatsApp">
                <WhatsAppIcon />
              </SocialIcon>
            </div>
          </div>

          {/* =====================================================
              EXPLORE
          ====================================================== */}

          <div>
            <h3
              className="
                inline-block
                border-b
                border-[#D98E3F]/40
                pb-2
                font-[family-name:var(--font-fraunces)]
                text-[13px]
                font-semibold
                text-[#D98E3F]
              "
            >
              Explore
            </h3>

            <ul className="mt-5 space-y-3.5">
              <li>
                <Link
                  href="/destinations"
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    gap-4
                    text-[11px]
                    text-[#F6F1E7]/60
                    transition-colors
                    hover:text-[#F6F1E7]
                  "
                >
                  <span>Destinations</span>
                  <ArrowIcon />
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    gap-4
                    text-[11px]
                    text-[#F6F1E7]/60
                    transition-colors
                    hover:text-[#F6F1E7]
                  "
                >
                  <span>Our Story</span>
                  <ArrowIcon />
                </Link>
              </li>

              <li>
                <Link
                  href="/tours"
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    gap-4
                    text-[11px]
                    text-[#F6F1E7]/60
                    transition-colors
                    hover:text-[#F6F1E7]
                  "
                >
                  <span>Upcoming Tours & Events</span>
                  <ArrowIcon />
                </Link>
              </li>

              <li>
                <Link
                  href="/reviews"
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    gap-4
                    text-[11px]
                    text-[#F6F1E7]/60
                    transition-colors
                    hover:text-[#F6F1E7]
                  "
                >
                  <span>Reviews</span>
                  <ArrowIcon />
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    gap-4
                    text-[11px]
                    text-[#F6F1E7]/60
                    transition-colors
                    hover:text-[#F6F1E7]
                  "
                >
                  <span>Contact</span>
                  <ArrowIcon />
                </Link>
              </li>
            </ul>
          </div>

          {/* =====================================================
              ACCOUNT
          ====================================================== */}

          <div>
            <h3
              className="
                inline-block
                border-b
                border-[#D98E3F]/40
                pb-2
                font-[family-name:var(--font-fraunces)]
                text-[13px]
                font-semibold
                text-[#D98E3F]
              "
            >
              Account
            </h3>

            <ul className="mt-5 space-y-3.5">
              <li>
                <Link
                  href="/sign-in"
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    gap-4
                    text-[11px]
                    text-[#F6F1E7]/60
                    transition-colors
                    hover:text-[#F6F1E7]
                  "
                >
                  <span>Sign In</span>
                  <ArrowIcon />
                </Link>
              </li>

              <li>
                <Link
                  href="/sign-up"
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    gap-4
                    text-[11px]
                    text-[#F6F1E7]/60
                    transition-colors
                    hover:text-[#F6F1E7]
                  "
                >
                  <span>Sign Up</span>
                  <ArrowIcon />
                </Link>
              </li>
            </ul>

            {/* Plan your journey */}
            <Link
              href="/tours"
              className="
                mt-8
                inline-flex
                items-center
                gap-2.5
                text-[11px]
                font-medium
                text-[#D98E3F]
                transition-colors
                hover:text-[#F0B268]
              "
            >
              <PeakMark />

              <span>Plan your journey</span>

              <ArrowIcon />
            </Link>
          </div>
        </div>

        {/* =========================================================
            BOTTOM DIVIDER
        ========================================================== */}

        <div
          className="
            mt-10
            border-t
            border-[#F6F1E7]/[0.08]
            pt-5
            sm:mt-11
          "
        >

          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            {/* Coordinates */}
            <div
              className="
                flex
                items-center
                gap-2.5
                text-[9px]
                text-[#F6F1E7]/35
              "
            >
              <CompassMark />

              <span>
                35.9° N, 74.3° E — Gilgit-Baltistan
              </span>
            </div>

            {/* Copyright */}
            <p
              className="
                text-[9px]
                text-[#F6F1E7]/35
                sm:text-right
              "
            >
              © {new Date().getFullYear()} Discover Gilgit. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
