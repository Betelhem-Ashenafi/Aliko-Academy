"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut, ChevronDown, Shield, CreditCard, BellRing, Settings, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoLms from "@/assets/logo-lms.png";

const lmsLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Explore", href: "/lms/explore" },
  { label: "My Learning", href: "/lms/my-learning" },
  { label: "Certifications", href: "/lms/certifications" },
  { label: "Career Hub", href: "https://career.alikohub.com/", external: true },
];

const LmsNavbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 nav-solid border-b border-border shadow-sm">
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        <Link href="/lms" className="flex items-center">
          <img src={(logoLms as any).src || logoLms} alt="Aliko Academy LMS" className="h-20 md:h-28 w-auto object-contain" style={{ imageRendering: 'auto' }} />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {lmsLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Student</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-card rounded-lg border shadow-lg py-2 z-[100]">
                <div className="px-4 py-3 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">BA</div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Boni Birassa Aliko</p>
                      <p className="text-xs text-muted-foreground">Student</p>
                    </div>
                  </div>
                </div>

                <div className="py-1">
                  <Link href="/lms/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <Link href="/lms/photo" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                    <Camera className="w-4 h-4" /> Photo
                  </Link>
                  <Link href="/lms/account-security" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                    <Shield className="w-4 h-4" /> Account Security
                  </Link>
                  <Link href="/lms/subscriptions" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                    <CreditCard className="w-4 h-4" /> Subscriptions
                  </Link>
                  <Link href="/lms/notifications" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                    <BellRing className="w-4 h-4" /> Notification Preferences
                  </Link>
                  <Link href="/lms/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                </div>

                <div className="border-t py-1">
                  <Link href="/" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors">
                    <LogOut className="w-4 h-4" /> Back to Website
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t px-4 pb-4 space-y-3">
          {lmsLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            )
          )}
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:text-primary" asChild>
              <Link href="/">Back to Website</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LmsNavbar;
