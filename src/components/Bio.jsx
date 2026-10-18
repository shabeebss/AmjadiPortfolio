import React from 'react';

export default function Bio({ data }) {
  const { person, about, education, skills } = data;

  return (
    <section id="bio">
      <div className="page-width">
        <div className="bio-grid">
          {/* Left: Sticker Cloud Cutout Portrait like Vauliys */}
          <div className="bio-left">
            <div className="artist-cloud-wrap hover">
              <div className="artist-cloud-sticker">
                <img
                  id="artist-photo"
                  src="/sabith-portrait-square.jpg"
                  alt={`${person.name} - Portrait`}
                />
              </div>

              {/* Whimsical Sticker Accents */}
              <div className="sticker-badge sticker-palette" title="Creative Direction">
                🎨
              </div>
              <div className="sticker-badge sticker-star" title="Star Designer">
                ★
              </div>
              <div className="sticker-badge sticker-ai" title="Adobe Illustrator & Photoshop">
                <i className="fa-solid fa-pen-nib"></i>
              </div>

              <div className="portrait-location-badge hover">
                <i className="fa-solid fa-location-dot" style={{ marginRight: '6px' }}></i>
                {person.location}
              </div>
            </div>
          </div>

          {/* Right: Bio story, stats, and skills */}
          <div className="bio-right">
            <div className="designer-tag-row">
              <span className="designer-badge-pill hover">
                <span className="dot-indicator"></span>
                GRAPHIC DESIGNER &amp; CREATIVE HEAD
              </span>
              <span className="experience-pill hover">5+ Years • GCC &amp; India</span>
            </div>

            <p className="bio-text hover">{about}</p>

            {/* Behance Stats Counters */}
            <div className="stats-row hover">
              <div className="stat-card">
                <span className="stat-val">2,060+</span>
                <span className="stat-lbl">Project Views</span>
              </div>
              <div className="stat-card">
                <span className="stat-val">55+</span>
                <span className="stat-lbl">Appreciations</span>
              </div>
              <div className="stat-card">
                <span className="stat-val">30+</span>
                <span className="stat-lbl">Brands Built</span>
              </div>
            </div>

            <p className="bio-quote hover">
              “Design is not just what it looks like and feels like. Design is how effectively it connects, communicates, and endures.”
              <span className="hero-quote-author">
                🎓 {education[0]?.degree} • Creative Strategy &amp; Visual Systems
              </span>
            </p>

            <div className="skills-section">
              <p className="caption mb05 opacity50">Software Proficiency &amp; Specializations</p>
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-tag hover">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
