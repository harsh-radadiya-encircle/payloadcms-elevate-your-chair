import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { FaInstagram, FaTiktok, FaYoutube, FaHeart } from "react-icons/fa";
import type { SiteFooter } from "~/payload-types";
import { getMedia } from "~/_utils/getMedia";

type Props = { siteFooter: SiteFooter };

const PageFooter: FC<Props> = ({ siteFooter }) => {
  if (!siteFooter) return null;

  const {
    followUsHeading,
    instagramHandle,
    feedImages,
    newsletterHeading,
    newsletterDescription,
    emailPlaceholder,
    newsletterCTA,
    logo,
    legalLinks,
    copyright,
    socialLinks,
  } = siteFooter;

  const logoUrl = getMedia(logo);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Failed to subscribe.");

      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }, [email]);

  return (
    <footer className="w-full bg-[#1a1a1a] text-white pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* TOP SECTION: Social Feed */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center text-sm md:text-xl font-bold tracking-widest uppercase">
            <span>{followUsHeading || "FOLLOW US"}</span>
            <span className="text-[#cdbfae]">{instagramHandle || "@ELEVATEYOURCHAIR"}</span>
          </div>
          
          {feedImages && feedImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {feedImages.map((feedItem, idx) => {
                const imgUrl = getMedia(feedItem.image);
                if (!imgUrl || imgUrl === "#") return null;
                return (
                  <div key={idx} className="relative w-full aspect-square bg-gray-800">
                    <Image
                      src={imgUrl}
                      alt="Social Feed Image"
                      fill
                      className="object-cover"
                      unoptimized={imgUrl.includes('localhost') || imgUrl.includes('127.0.0.1')}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 items-stretch">
          
          {/* Left: Newsletter */}
          <div className="flex-1 max-w-md flex flex-col gap-6">
            <h3 className="text-xl md:text-3xl font-bold uppercase tracking-widest">
              {newsletterHeading || "WANT TO ELEVATE YOURSELF?"}
            </h3>
            {newsletterDescription && (
              <p className="text-gray-300 text-sm leading-relaxed">
                {newsletterDescription}
              </p>
            )}
            
            <form className="flex flex-col gap-4 mt-2" onSubmit={handleFormSubmit}>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={emailPlaceholder || "Email"} 
                  disabled={status === "loading"}
                  className="w-full p-3 bg-white text-black placeholder:text-gray-500 focus:outline-none"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={status === "loading"}
                className="bg-[#cdbfae] text-[#1a1a1a] font-bold text-sm tracking-widest uppercase px-6 py-3 w-fit hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === "loading" ? "Submitting..." : (newsletterCTA || "JOIN THE COMMUNITY")}
              </button>
              {message && (
                <p className={`text-sm ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                  {message}
                </p>
              )}
            </form>
          </div>

          {/* Right: Links, Logo, Copyright */}
          <div className="flex-1 flex flex-col items-start lg:items-end w-full lg:max-w-2xl justify-between pt-2">
            
            {/* Logo */}
            {logoUrl && logoUrl !== "#" ? (
              <div className="relative w-64 h-16 lg:w-96 lg:h-20 mb-8 lg:mb-auto">
                <Image
                  src={logoUrl}
                  alt="Elevate Your Chair Logo"
                  fill
                  className="object-contain object-left lg:object-right"
                  unoptimized={logoUrl.includes('localhost') || logoUrl.includes('127.0.0.1')}
                />
              </div>
            ) : (
              <h2 className="text-3xl font-light uppercase tracking-widest">
                ELEVATE <span className="font-bold border-l border-gray-600 pl-4 ml-4">YOUR CHAIR</span>
              </h2>
            )}

            <div className="flex flex-col w-full gap-4 mt-auto">
              {/* Legal Links */}
              {legalLinks && legalLinks.length > 0 && (
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs md:text-sm text-gray-300 justify-start lg:justify-end w-full">
                  {legalLinks.map((item, idx) => {
                    if (!item) return null;
                    const isExternal = item.linkType === 'url';
                    return (
                      <Link 
                        key={idx} 
                        href={item.url || "#"} 
                        target={isExternal && item.newTab ? "_blank" : "_self"}
                        className="hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Divider */}
              <div className="w-full h-[1px] bg-gray-700"></div>

              {/* Bottom Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 text-xs md:text-sm font-bold text-gray-300">
                <span>{copyright || "©2025 Elevate Your Chair"}</span>
                
                <div className="flex items-center gap-2">
                  <FaHeart className="text-gray-400" />
                  <span className="tracking-widest">// TECHYSCOUTS</span>
                </div>

                {socialLinks && socialLinks.length > 0 && (
                  <div className="flex items-center gap-4">
                    {socialLinks.map((social, idx) => {
                      let Icon = null;
                      if (social.platform === 'instagram') Icon = FaInstagram;
                      if (social.platform === 'tiktok') Icon = FaTiktok;
                      if (social.platform === 'youtube') Icon = FaYoutube;

                      return (
                        <Link 
                          key={idx} 
                          href={social.url} 
                          target="_blank" 
                          className="w-8 h-8 rounded-full bg-[#cdbfae] text-[#1a1a1a] flex items-center justify-center hover:opacity-80 transition-opacity"
                        >
                          {Icon && <Icon size={16} />}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default PageFooter;
