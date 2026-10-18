import React from 'react';

export default function ServicesExperience({ data }) {
  const { services, work_experience } = data;

  const serviceNumbers = ['01 / CREATIVE DIRECTION', '02 / MOTION & REELS', '03 / BRAND SYSTEMS'];

  return (
    <section id="services">
      <div id="experience-services">
        <div className="page-width">
          <div className="section-head">
            <h2 className="hover">Services &amp; Expertise</h2>
            <p>Delivering high-caliber visual systems, brand strategy, and dynamic video production for global clients.</p>
          </div>

          <div className="services-grid">
            {services.map((service, idx) => (
              <div key={idx} className="service-card hover">
                <span className="service-num">{serviceNumbers[idx] || `0${idx + 1} / SPECIALIZATION`}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>

          {/* Work Experience Timeline */}
          <div id="experience" className="section-head" style={{ marginTop: '5rem', marginBottom: '2.5rem' }}>
            <h2 className="hover">Work Experience</h2>
            <p>A proven track record leading creative direction across India and the GCC.</p>
          </div>

          <div className="timeline-wrap">
            {work_experience.map((exp, idx) => (
              <div key={idx} className="timeline-item hover">
                <div className="timeline-meta">
                  <h4 className="role">{exp.role}</h4>
                  <p className="company">{exp.company || 'Commercial Branding'}</p>
                  <span className="period">{exp.period || 'Professional Period'}</span>
                </div>
                <div className="timeline-content">
                  <p>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
