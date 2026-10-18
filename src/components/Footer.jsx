import React, { useState } from 'react';

export default function Footer({ data }) {
  const { person } = data;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <footer id="footer">
      <div className="page-width">
        <div className="footer-grid">
          <div className="footer-left">
            <h3 className="hover">Send a letter</h3>
            <p className="hover">
              If you liked what you read and want to enquire about working with me, send me a letter and let's see where the story takes us.
            </p>

            <div className="contact-quick">
              <a href={`mailto:${person.email}`} className="hover">
                <i className="fa-solid fa-envelope" style={{ color: 'var(--gold)' }}></i> {person.email}
              </a>
              <a href={`tel:${person.phone}`} className="hover">
                <i className="fa-solid fa-phone" style={{ color: 'var(--gold)' }}></i> {person.phone}
              </a>
              <span style={{ opacity: 0.75, fontSize: '0.88rem' }}>
                <i className="fa-solid fa-location-dot" style={{ color: 'var(--gold)', marginRight: '4px' }}></i> {person.location}
              </span>
            </div>

            <div id="footer-socials">
              <a
                href={`https://wa.me/${person.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="hover"
                title="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a href={`tel:${person.phone}`} className="hover" title="Phone">
                <i className="fa-solid fa-phone"></i>
              </a>
              <a href={`mailto:${person.email}`} className="hover" title="Email">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>

            <p className="text-sm opacity50" style={{ marginTop: '1rem' }}>
              Website designed and coded for {person.name}.
            </p>
          </div>

          <div className="footer-right">
            <form id="form" onSubmit={handleSubmit}>
              <div id="frm-contact">
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="hover"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="hover"
                />
              </div>

              <textarea
                name="message"
                rows="5"
                placeholder="write your letter"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="hover"
              ></textarea>

              <div id="frm-submit">
                <button id="btn-submit" className="hover" type="submit">
                  <img id="i-star" src="/asset-suite/icon-star.svg" alt="*" />
                  Post
                </button>
                {submitted && (
                  <div id="success-message">
                    Thank you! Your letter has been posted.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
