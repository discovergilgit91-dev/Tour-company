'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const navLinks = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Our Story', href: '/about' },
  { label: 'Tours & Events', href: '/tours' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const [prevPathname, setPrevPathname] = useState(pathname)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'bg-[#F6F1E7]/95 backdrop-blur-lg shadow-[0_8px_30px_-14px_rgba(20,35,31,0.22)] border-b border-[#14231F]/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className={`flex items-center justify-between transition-all duration-500 ease-in-out ${
            scrolled
              ? 'h-14 sm:h-16 md:h-[72px]'
              : 'h-16 sm:h-20 md:h-24'
          }`}
        >

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3.5 group min-w-0"
          >
            <div
              className={`shrink-0 relative flex items-center justify-center transition-all duration-500 ease-in-out group-hover:scale-105 ${
                scrolled
                  ? 'w-12 h-12 sm:w-14 sm:h-14'
                  : 'w-14 h-14 sm:w-16 sm:h-16'
              }`}
            >
              <Image
                src="/Images/tours/logo.png"
                alt="Discover Gilgit logo"
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col justify-center min-w-0">
              <span
                className={`text-[17px] sm:text-[21px] md:text-[23px] font-bold tracking-tight leading-none truncate transition-colors duration-300 ${
                  scrolled
                    ? 'text-[#14231F]'
                    : 'text-white'
                }`}
              >
                Discover
                <span className="text-[#1F6A4C]">
                  Gilgit
                </span>
              </span>

              <span
                className={`block text-[9px] sm:text-[10px] font-semibold tracking-[0.28em] uppercase overflow-hidden transition-all duration-500 ease-in-out ${
                  scrolled
                    ? 'text-[#8A8377]'
                    : 'text-white/75'
                } ${
                  scrolled
                    ? 'max-h-0 opacity-0 mt-0'
                    : 'max-h-4 opacity-100 mt-1'
                }`}
              >
                Gilgit-Baltistan
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative px-3.5 xl:px-4 py-2 text-[13px] xl:text-[13.5px] font-medium transition-colors duration-300 ease-out whitespace-nowrap ${
                    scrolled
                      ? active
                        ? 'text-[#1F6A4C]'
                        : 'text-[#14231F]/65 hover:text-[#14231F]'
                      : active
                        ? 'text-white'
                        : 'text-white/85 hover:text-white'
                  }`}
                >
                  {link.label}

                  <span
                    className={`pointer-events-none absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] origin-left rounded-full transition-transform duration-300 ease-out ${
                      scrolled
                        ? 'bg-[#1F6A4C]'
                        : 'bg-white'
                    } ${
                      active
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
            <Link
              href="/sign-in"
              className={`text-[13px] xl:text-[13.5px] font-medium px-3.5 xl:px-4 py-2.5 rounded-full transition-all duration-300 ease-out whitespace-nowrap ${
                scrolled
                  ? 'text-[#14231F]/80 hover:text-[#14231F] hover:bg-[#14231F]/[0.06]'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="text-[13px] xl:text-[13.5px] font-semibold text-white bg-[#1F6A4C] px-4 xl:px-5 py-2.5 rounded-full shadow-[0_2px_8px_-2px_rgba(31,106,76,0.4)] transition-all duration-300 ease-out hover:bg-[#16503A] hover:shadow-[0_10px_24px_-4px_rgba(31,106,76,0.6)] hover:-translate-y-[2px] hover:scale-[1.03] active:scale-[0.97] active:translate-y-0 whitespace-nowrap"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ease-out shrink-0 ${
              scrolled
                ? 'hover:bg-[#14231F]/[0.06]'
                : 'hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="flex flex-col gap-[5px] items-center justify-center w-5">
              <span
                className={`w-5 h-[1.5px] rounded-full transition-all duration-300 ${
                  scrolled ? 'bg-[#14231F]' : 'bg-white'
                } ${
                  open
                    ? 'rotate-45 translate-y-[6.5px]'
                    : ''
                }`}
              />

              <span
                className={`w-5 h-[1.5px] rounded-full transition-all duration-300 ${
                  scrolled ? 'bg-[#14231F]' : 'bg-white'
                } ${
                  open ? 'opacity-0' : ''
                }`}
              />

              <span
                className={`w-5 h-[1.5px] rounded-full transition-all duration-300 ${
                  scrolled ? 'bg-[#14231F]' : 'bg-white'
                } ${
                  open
                    ? '-rotate-45 -translate-y-[6.5px]'
                    : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#F6F1E7] border-t border-[#14231F]/10 ${
          open
            ? 'max-h-[500px] opacity-100'
            : 'max-h-0 opacity-0 border-t-0'
        }`}
      >
        <div className="px-4 sm:px-6 py-5 flex flex-col gap-1">
          {navLinks.map((link, i) => {
            const active = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center justify-between text-[15px] font-medium px-3.5 py-3 rounded-xl transition-colors duration-300 ease-out ${
                  active
                    ? 'bg-[#1F6A4C] text-white'
                    : 'text-[#14231F] hover:bg-[#14231F]/[0.05]'
                }`}
                style={{
                  transitionDelay: open
                    ? `${i * 30}ms`
                    : '0ms',
                }}
              >
                {link.label}

                <span
                  className={`transition-transform duration-300 ease-out group-hover:translate-x-1 ${
                    active
                      ? 'text-white/70'
                      : 'text-[#14231F]/30'
                  }`}
                >
                  →
                </span>
              </Link>
            )
          })}

          <div className="flex items-center gap-2 mt-3 pt-4 border-t border-[#14231F]/10">
            <Link
              href="/sign-in"
              className="flex-1 text-center text-[14px] font-medium text-[#14231F] px-4 py-3 rounded-xl border border-[#14231F]/15 transition-all duration-300 ease-out hover:bg-[#14231F]/[0.05] active:scale-[0.97]"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="flex-1 text-center text-[14px] font-semibold text-white bg-[#1F6A4C] px-4 py-3 rounded-xl transition-all duration-300 ease-out hover:bg-[#16503A] hover:shadow-[0_6px_16px_-4px_rgba(31,106,76,0.5)] active:scale-[0.97]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
