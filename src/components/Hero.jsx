import React from 'react';
import SketchDrawErase from './SketchDrawErase';

export default function Hero({ data }) {
  const { person } = data;

  return (
    <section id="welcome">
      <div className="page-width">
        <div className="welcome-grid">
          <div className="welcome-left">
            <div className="welcome-badge hover">
              <i className="fa-solid fa-sparkles" style={{ color: 'var(--gold)' }}></i>
              <span>{person.titles.join(' • ')}</span>
            </div>

            <h1 className="hover">Reading for the details, doodling in the margins.</h1>

            <div id="welcome-socials">
              <button
                id="btn-email"
                className="hover"
                onClick={() => (window.location.href = `mailto:${person.email}`)}
              >
                <img id="i-star" src="/asset-suite/icon-star.svg" alt="*" />
                {person.email}
              </button>

              <div className="social-links">
                <a
                  href="https://www.behance.net/sabithamjadi"
                  target="_blank"
                  rel="noreferrer"
                  className="hover"
                  title="Behance Portfolio"
                >
                  <i className="fa-brands fa-behance"></i>
                </a>
                <a
                  href={`https://wa.me/${person.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover"
                  title="WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
                <a href={`tel:${person.phone}`} className="hover" title="Call Sabith">
                  <i className="fa-solid fa-phone"></i>
                </a>
                <a href={`mailto:${person.email}`} className="hover" title="Email">
                  <i className="fa-solid fa-envelope"></i>
                </a>
              </div>
            </div>

            <p className="hero-quote hover">
              "Your professionalism, speed, and creative brand execution have been top-tier."
              <span className="hero-quote-author">
                Partner Testimonial • GCC &amp; India Brand Collaborations
              </span>
            </p>

            <div className="client-row-preview">
              <p className="client-row-label">Selected Clients &amp; Brand Collaborations</p>
              <div className="client-mini-grid">
                <img src="/client-logos-transparent/01-osmc.png" alt="OSMC" className="hover" />
                <img src="/client-logos-transparent/02-rakw.png" alt="RAKW" className="hover" />
                <img src="/client-logos-transparent/03-spark-academy.png" alt="Spark Academy" className="hover" />
                <img src="/client-logos-transparent/10-dream-realty.png" alt="Dream Realty" className="hover" />
                <img src="/client-logos-transparent/16-ibas.png" alt="IBAS" className="hover" />
                <img src="/client-logos-transparent/29-azure-avenue.png" alt="Azure Avenue" className="hover" />
              </div>
            </div>
          </div>

          <div className="welcome-right">
            <SketchDrawErase />
          </div>
        </div>
      </div>
    </section>
  );
}
