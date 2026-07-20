import React, { useState, useEffect } from "react";
import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import type { SiteHeader } from "~/payload-types";
import { getMedia } from "~/_utils/getMedia";

type Props = { 
  siteHeader: SiteHeader;
  forceDarkBg?: boolean;
};

// Helper for NavLink URL
const getUrl = (link: any) => {
  if (link.linkType === "url") return link.url || "#";
  if (link.linkType === "reference" && link.pageReference) {
    const page = link.pageReference.value;
    if (typeof page === "object" && page !== null && "slug" in page) {
      return page.slug === "home" || page.slug === "/" ? "/" : `/${page.slug}`;
    }
  }
  return "#";
};

const PageHeader: FC<Props> = ({ siteHeader, forceDarkBg = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Handle background opacity/color based on scroll
    setIsScrolled(latest > 50);

    // Handle header visibility (hide on scroll down, show on scroll up)
    if (latest < 50) {
      setIsVisible(true);
    } else if (latest > lastScrollY && latest > 50) {
      // Don't hide if menu or search is open
      if (!isMobileMenuOpen && !isSearchOpen) {
        setIsVisible(false);
      }
    } else {
      setIsVisible(true);
    }
    setLastScrollY(latest);
  });

  // Close menus on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logoUrl = getMedia(siteHeader.logo);
  const noticeText = siteHeader.noticeText;
  const cta = siteHeader.primaryCTA;
  
  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          forceDarkBg || isScrolled || isMobileMenuOpen || isSearchOpen
            ? "bg-[#1a1a1a] shadow-md" 
            : "bg-transparent"
        }`}
      >
        {/* Top Notice Bar */}
        {(noticeText || cta) && (
          <div className="w-full bg-[#1e1e1e] border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-center md:justify-between text-center md:text-left">
              {noticeText && (
                <span className="text-white/80 text-xs md:text-sm">
                  {noticeText}
                </span>
              )}
              {cta && (
                <Link
                  href={cta.url || "#"}
                  target={cta.newTab ? "_blank" : "_self"}
                  className="hidden md:block bg-[#cdbfae] text-black font-semibold text-xs tracking-wider uppercase px-4 py-1.5 rounded-sm hover:bg-[#bbaea0] transition-colors"
                >
                  {cta.label}
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Mobile Menu Toggle (Left) */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              if (isSearchOpen) setIsSearchOpen(false);
            }}
            className="lg:hidden text-white/90 hover:text-white transition-colors p-2 -ml-2"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-50 p-2 flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
            {logoUrl && logoUrl !== "#" ? (
              <div className="relative h-8 md:h-10 w-48">
                <Image
                  src={logoUrl}
                  alt="Site Logo"
                  fill
                  className="object-contain object-center lg:object-left" 
                  unoptimized={logoUrl.includes('localhost') || logoUrl.includes('127.0.0.1')}
                />
              </div>
            ) : (
              <span className="text-xl md:text-2xl font-light text-white tracking-widest uppercase">
                ELEVATE <span className="font-semibold">YOUR CHAIR</span>
              </span>
            )}
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {siteHeader.navigationLinks?.map((link, idx) => (
              <div key={link.id || idx} className="relative group">
                <Link
                  href={getUrl(link)}
                  target={link.newTab ? "_blank" : "_self"}
                  className="text-white/80 font-medium text-xs tracking-widest uppercase hover:text-white transition-colors py-2 block"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
                
                {/* Dropdown */}
                {link.dropdownLinks && link.dropdownLinks.length > 0 && (
                  <div className="absolute top-full left-0 mt-4 w-56 bg-white shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                    <div className="flex flex-col py-2">
                      {link.dropdownLinks.map((dropLink, dIdx) => (
                        <Link
                          key={dropLink.id || dIdx}
                          href={getUrl(dropLink)}
                          target={dropLink.newTab ? "_blank" : "_self"}
                          className="px-6 py-3 text-sm text-gray-800 hover:text-black hover:bg-gray-50 transition-colors uppercase tracking-wider"
                        >
                          {dropLink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search Toggle (Right) */}
          <div className="flex items-center">
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isMobileMenuOpen) setIsMobileMenuOpen(false);
              }}
              className="text-white/90 hover:text-white transition-colors p-2 rounded-md"
              aria-label="Toggle Search"
            >
              {isSearchOpen ? <FiX size={20} /> : <FiSearch size={20} />}
            </button>
          </div>
        </div>

        {/* Expandable Search Bar (Desktop & Mobile) */}
        <div 
          className={`w-full bg-white transition-all duration-300 overflow-hidden ${
            isSearchOpen ? "max-h-24 py-4 border-b border-gray-200" : "max-h-0 py-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative flex items-center">
              <FiSearch className="absolute left-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search"
                className="w-full py-3 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-800"
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          (noticeText || cta) ? "top-[90px] md:top-[100px]" : "top-[64px] md:top-[80px]"
        } ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Container */}
        <div 
          className={`absolute inset-0 bg-[#f8f8f8] shadow-2xl transition-transform duration-300 flex flex-col ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex flex-col flex-1 py-4 overflow-y-auto">
            {siteHeader.navigationLinks?.map((link, idx) => (
              <div key={link.id || idx}>
                <Link
                  href={getUrl(link)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-4 text-sm font-medium text-gray-800 tracking-widest uppercase hover:bg-gray-100"
                >
                  {link.label}
                </Link>
                {link.dropdownLinks && link.dropdownLinks.length > 0 && (
                  <div className="bg-white px-8 py-2 border-y border-gray-100">
                    {link.dropdownLinks.map((dropLink, dIdx) => (
                      <Link
                        key={dropLink.id || dIdx}
                        href={getUrl(dropLink)}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 text-sm text-gray-600 hover:text-black tracking-wider uppercase"
                      >
                        {dropLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Actions (Pinned to Bottom) */}
          {cta && (
            <div className="px-8 py-6 border-t border-gray-200 bg-[#f8f8f8] mt-auto flex flex-col items-center">
              <Link
                href={cta.url || "#"}
                target={cta.newTab ? "_blank" : "_self"}
                className="block text-center w-full bg-[#cdbfae] text-black font-semibold text-sm tracking-wider uppercase px-4 py-3 rounded-sm hover:bg-[#bbaea0] transition-colors"
              >
                {cta.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PageHeader;
