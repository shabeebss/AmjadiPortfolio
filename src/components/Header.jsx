import React, { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (mobileMenuOpen) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Smooth threshold to prevent micro-jitter
          if (currentScrollY <= 80) {
            setHeaderHidden(false);
          } else if (currentScrollY < lastScrollY - 15) {
            setHeaderHidden(false);
          } else if (currentScrollY > lastScrollY + 15 && currentScrollY > 160) {
            setHeaderHidden(true);
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 860) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <header id="fixed-header" className={headerHidden ? 'header-hide' : ''}>
        <div id="announcement">
          <p>Accepting new projects, bookings &amp; creative collaborations</p>
        </div>

        <div id="header" className="page-width">
          <div className="header-flex">
            <a id="primary-logo" href="#" className="hover" title="Sabith Studio">
              <img src="/asset-suite/logo-sabith.svg" alt="Muhammed Sabith" />
            </a>

            <nav>
              <ul id="nav">
                <li><a href="#work" className="nav-link">My work</a></li>
                <li><a href="#bio" className="nav-link">About</a></li>
                <li><a href="#services" className="nav-link">Services</a></li>
                <li><a href="#experience" className="nav-link">Experience</a></li>
                <li>
                  <button
                    id="btn-howdy"
                    className="hover"
                    onClick={() => {
                      document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <img id="i-star" src="/asset-suite/icon-star.svg" alt="*" />
                    Say howdy hey
                  </button>
                </li>
              </ul>
            </nav>

            <button
              id="menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={mobileMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
              <span className="menu-btn-text">{mobileMenuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div id="nav-mobile" className={mobileMenuOpen ? 'nav-show' : ''}>
        <ul>
          <li><a href="#work" onClick={closeMobile}>My work</a></li>
          <li><a href="#bio" onClick={closeMobile}>About</a></li>
          <li><a href="#services" onClick={closeMobile}>Services</a></li>
          <li><a href="#experience" onClick={closeMobile}>Experience</a></li>
          <li>
            <button
              className="hover"
              onClick={() => {
                closeMobile();
                window.location.href = 'mailto:kmspallikkunnu@gmail.com';
              }}
            >
              <img id="i-star" src="/asset-suite/icon-star.svg" alt="*" />
              Say howdy hey
            </button>
          </li>
          <li>
            <div className="social-links" style={{ marginTop: '1rem' }}>
              <a href="tel:+919656161319" title="Phone"><i className="fa-solid fa-phone"></i></a>
              <a href="https://wa.me/919656161319" target="_blank" rel="noreferrer" title="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
              <a href="mailto:kmspallikkunnu@gmail.com" title="Email"><i className="fa-solid fa-envelope"></i></a>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
