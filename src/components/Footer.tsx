import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Destinations", href: "/destinations" },
  { label: "Tours & Events", href: "/tours" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#14231F] text-[#F6F1E7]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 sm:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="text-lg font-semibold tracking-tight">
              Discover<span className="text-[#1F6A4C]">Gilgit</span>
            </span>
            <p className="mt-2 max-w-xs text-sm text-[#F6F1E7]/60">
              Guided journeys through Gilgit-Baltistan, the land of giants.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#F6F1E7]/75">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[#F6F1E7]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-[#F6F1E7]/10 pt-6 text-xs text-[#F6F1E7]/50">
          © {new Date().getFullYear()} Discover Gilgit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
