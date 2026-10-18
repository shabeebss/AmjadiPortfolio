import React, { useState, useEffect, useRef } from 'react';

export default function Work({ data }) {
  const [activeFolder, setActiveFolder] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  // Show remaining projects in batches of 12 (divisible by 3 columns so rows are always complete)
  const [visibleRemaining, setVisibleRemaining] = useState(12);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const projects = data?.projects || [];

  const handleFolderChange = (folder) => {
    setActiveFolder(folder);
    setVisibleRemaining(12);
  };

  const handleOpenProject = (project) => {
    setSelectedProject(project);
    setActiveSlide(0);
  };

  // Keyboard navigation for multi-slide modal (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    if (!selectedProject) return;

    const slides = selectedProject.images && selectedProject.images.length > 0
      ? selectedProject.images
      : [selectedProject.image];

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      } else if (e.key === 'ArrowRight' && slides.length > 1) {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      } else if (e.key === 'ArrowLeft' && slides.length > 1) {
        setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  useEffect(() => {
    setVisibleRemaining(12);
  }, [searchQuery]);

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeFolder === 'all' || p.category === activeFolder;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query ||
      p.title.toLowerCase().includes(query) ||
      (p.categoryLabel && p.categoryLabel.toLowerCase().includes(query)) ||
      (p.client && p.client.toLowerCase().includes(query)) ||
      (p.tools && p.tools.some((t) => t.toLowerCase().includes(query)));
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = filteredProjects.slice(0, 2);
  const allRemaining = filteredProjects.slice(2);

  // Avoid showing a single card alone in a row unless it is the final card of the collection
  const effectiveVisibleRemaining = (allRemaining.length - visibleRemaining === 1)
    ? allRemaining.length
    : visibleRemaining;

  const remainingProjects = allRemaining.slice(0, effectiveVisibleRemaining);
  const hasMore = effectiveVisibleRemaining < allRemaining.length;
  const totalVisible = featuredProjects.length + remainingProjects.length;

  return (
    <section id="work">
      <div className="page-width">
        {/* Header with flower doodle and serif title */}
        <div id="work-home">
          <img id="flower" src="/asset-suite/imagery/flower-fy.png" alt="Flower accent" />
          <h2 className="hover">My works </h2>

          {/* Folder tabs inspired by vauliys.com */}
          <div id="folder-grid">
            <div
              id="fld-all"
              className={`folder hover ${activeFolder === 'all' ? 'active-folder' : ''}`}
              onClick={() => handleFolderChange('all')}
              title="All Works"
            >
              <img src="/asset-suite/imagery/folder-beige.png" alt="All Projects" />
              <p>All Works</p>
            </div>

            <div
              id="fld-branding"
              className={`folder hover ${activeFolder === 'branding' ? 'active-folder' : ''}`}
              onClick={() => handleFolderChange('branding')}
              title="Branding & Identity"
            >
              <img src="/asset-suite/imagery/folder-green.png" alt="Branding" />
              <p>Branding </p>
            </div>

            <div
              id="fld-posters"
              className={`folder hover ${activeFolder === 'posters' ? 'active-folder' : ''}`}
              onClick={() => handleFolderChange('posters')}
              title="Posters & Campaigns"
            >
              <img src="/asset-suite/imagery/folder-brown.png" alt="Posters" />
              <p>Posters </p>
            </div>

            <div
              id="fld-packaging"
              className={`folder hover ${activeFolder === 'packaging' ? 'active-folder' : ''}`}
              onClick={() => handleFolderChange('packaging')}
              title="Packaging & Print"
            >
              <img src="/asset-suite/imagery/folder-beige.png" alt="Packaging & Print" />
              <p>Packaging </p>
            </div>

            <div
              id="fld-social"
              className={`folder hover ${activeFolder === 'social' ? 'active-folder' : ''}`}
              onClick={() => handleFolderChange('social')}
              title="Social Media & Motion"
            >
              <img src="/asset-suite/imagery/folder-green.png" alt="Social Media" />
              <p>Social </p>
            </div>

            <div
              id="fld-drawings"
              className={`folder hover ${activeFolder === 'drawings' ? 'active-folder' : ''}`}
              onClick={() => handleFolderChange('drawings')}
              title="Drawings & Art"
            >
              <img src="/asset-suite/imagery/folder-brown.png" alt="Drawings" />
              <p>Drawings </p>
            </div>
          </div>
        </div>

        {/* Top 2 Featured Large Cards */}
        {featuredProjects.length > 0 && (
          <div className="row-2-cols" style={{ marginBottom: '2.5rem' }}>
            {featuredProjects.map((project) => (
              <div key={project.id} className="work-item hover">
                <div
                  className="work-card-media hover"
                  onClick={() => handleOpenProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="work-thumb-img"
                    loading="lazy"
                  />
                  <span className="work-tag-badge">{project.tag || project.categoryLabel}</span>
                  {project.images && project.images.length > 1 && (
                    <span className="work-multi-badge" title={`${project.images.length} slides`}>
                      <i className="fa-solid fa-layer-group"></i> {project.images.length}
                    </span>
                  )}
                  <div className="work-hover-overlay">
                    <span className="btn-quick-view">
                      <i className="fa-solid fa-expand"></i> Quick View
                    </span>
                  </div>
                </div>

                <div className="work-meta">
                  <div className="meta-top">
                    <p className="category">
                      {project.client} <span>| {project.categoryLabel}</span>
                    </p>
                    <a
                      href={project.behanceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="behance-direct-link hover"
                      title="View on Behance"
                    >
                      <i className="fa-brands fa-behance"></i> <span className="behance-text">Behance </span><span>↗</span>
                    </a>
                  </div>
                  <h4 className="hover" onClick={() => handleOpenProject(project)}>
                    {project.title}
                  </h4>
                  <div className="star-rating">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <span className="tools-badge-list">
                      {project.tools?.join(' • ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Remaining Works Grid */}
        {remainingProjects.length > 0 && (
          <div className="row-3-cols">
            {remainingProjects.map((project) => (
              <div key={project.id} className="work-item hover">
                <div
                  className="work-card-media hover"
                  onClick={() => handleOpenProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="work-thumb-img"
                    loading="lazy"
                  />
                  <span className="work-tag-badge">{project.tag || project.categoryLabel}</span>
                  {project.images && project.images.length > 1 && (
                    <span className="work-multi-badge" title={`${project.images.length} slides`}>
                      <i className="fa-solid fa-layer-group"></i> {project.images.length}
                    </span>
                  )}
                  <div className="work-hover-overlay">
                    <span className="btn-quick-view">
                      <i className="fa-solid fa-expand"></i> Quick View
                    </span>
                  </div>
                </div>

                <div className="work-meta">
                  <div className="meta-top">
                    <p className="category">
                      {project.client} <span>| {project.categoryLabel}</span>
                    </p>
                    <a
                      href={project.behanceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="behance-direct-link hover"
                      title="View on Behance"
                    >
                      <i className="fa-brands fa-behance"></i> <span className="behance-text">Behance </span><span>↗</span>
                    </a>
                  </div>
                  <h4 className="hover" onClick={() => handleOpenProject(project)}>
                    {project.title}
                  </h4>
                  <div className="star-rating">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <span className="tools-badge-list">
                      {project.tools?.[0]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Works Interactive Button */}
        {hasMore && (
          <div className="load-more-wrap" style={{ marginTop: '2.5rem', marginBottom: '2.5rem', textAlign: 'center' }}>
            <button
              className="btn btn-load-more hover"
              onClick={() => setVisibleRemaining((prev) => prev + 12)}
            >
              <i className="fa-solid fa-plus" style={{ marginRight: '8px' }}></i>
              Load More Projects ({filteredProjects.length - totalVisible} remaining)
            </button>
            <p className="load-more-counter">
              Showing <strong>{totalVisible}</strong> of <strong>{filteredProjects.length}</strong>
            </p>
          </div>
        )}

        {/* Behance Callout Ribbon */}
        <div className="behance-callout-wrap hover">
          <div className="behance-callout-inner">
            <div className="behance-callout-text">
              <i className="fa-brands fa-behance behance-giant-icon"></i>
              <div>
                <h3>Explore 100+ Projects &amp; Case Studies on Behance</h3>
                <p>Browse the complete archive including brand systems, luxury packaging, event posters, broadsheets, and illustrations.</p>
              </div>
            </div>
            <a
              href="https://www.behance.net/sabithamjadi"
              target="_blank"
              rel="noreferrer"
              className="btn btn-behance hover"
            >
              <img id="i-star" src="/asset-suite/icon-star.svg" alt="*" />
              behance.net/sabithamjadi ↗
            </a>
          </div>
        </div>

        {/* Back to Top Button */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button
            id="btn-back-top"
            className="hover"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img id="i-star" src="/asset-suite/icon-star.svg" alt="*" />
            Back to top
          </button>
        </div>
      </div>

      {/* Quick View Modal - Multi-Image Showcase */}
      {selectedProject && (() => {
        const slides = selectedProject.images && selectedProject.images.length > 0
          ? selectedProject.images
          : [selectedProject.image];
        const currentSlideImg = slides[activeSlide] || selectedProject.image;
        const whatsappMsg = encodeURIComponent(
          `Hi Sabith! I saw your "${selectedProject.title}" project on your portfolio and would like to discuss working together.`
        );

        const handleTouchStart = (e) => {
          touchStartX.current = e.targetTouches[0].clientX;
          touchEndX.current = e.targetTouches[0].clientX;
        };

        const handleTouchMove = (e) => {
          touchEndX.current = e.targetTouches[0].clientX;
        };

        const handleTouchEnd = () => {
          if (touchStartX.current === null || touchEndX.current === null) return;
          const distance = touchStartX.current - touchEndX.current;
          const minSwipeDistance = 40;
          if (distance > minSwipeDistance && slides.length > 1) {
            // Swiped Left -> Next Slide
            setActiveSlide((prev) => (prev + 1) % slides.length);
          } else if (distance < -minSwipeDistance && slides.length > 1) {
            // Swiped Right -> Prev Slide
            setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
          }
          touchStartX.current = null;
          touchEndX.current = null;
        };

        return (
          <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close hover"
                onClick={() => setSelectedProject(null)}
                aria-label="Close"
                title="Close (Esc)"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <div className="modal-grid">
                {/* Left Column: Multi-Image Carousel & Thumbnail Strip */}
                <div className="modal-media-col">
                  <div
                    className="modal-carousel-stage"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <img
                      key={currentSlideImg}
                      src={currentSlideImg}
                      alt={`${selectedProject.title} - Slide ${activeSlide + 1}`}
                      className="modal-img fade-in"
                    />

                    {/* Slide Counter Badge */}
                    {slides.length > 1 && (
                      <span className="modal-slide-counter">
                        <i className="fa-regular fa-images"></i> Slide {activeSlide + 1} of {slides.length}
                      </span>
                    )}

                    {/* Navigation Arrows */}
                    {slides.length > 1 && (
                      <>
                        <button
                          className="modal-nav-arrow modal-nav-prev hover"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
                          }}
                          aria-label="Previous Slide (←)"
                          title="Previous Slide (←)"
                        >
                          <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <button
                          className="modal-nav-arrow modal-nav-next hover"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSlide((prev) => (prev + 1) % slides.length);
                          }}
                          aria-label="Next Slide (→)"
                          title="Next Slide (→)"
                        >
                          <i className="fa-solid fa-chevron-right"></i>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Row */}
                  {slides.length > 1 && (
                    <div className="modal-thumbnail-strip">
                      {slides.map((thumb, idx) => (
                        <button
                          key={idx}
                          className={`modal-thumb-btn hover ${activeSlide === idx ? 'active-thumb' : ''}`}
                          onClick={() => setActiveSlide(idx)}
                          aria-label={`Jump to slide ${idx + 1}`}
                          title={`Slide ${idx + 1}`}
                        >
                          <img src={thumb} alt={`Thumbnail ${idx + 1}`} loading="lazy" />
                          <span className="modal-thumb-idx">{idx + 1}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Project Details & Quick Actions */}
                <div className="modal-info">
                  <div className="modal-badge-row">
                    <span className="modal-badge">{selectedProject.categoryLabel}</span>
                    {slides.length > 1 && (
                      <span className="modal-slides-count-pill">
                        <i className="fa-solid fa-layer-group" style={{ marginRight: '5px' }}></i>
                        {slides.length} Presentation Slides
                      </span>
                    )}
                  </div>

                  <h2>{selectedProject.title}</h2>
                  <p className="modal-client">
                    <strong>Client:</strong> {selectedProject.client} ({selectedProject.year})
                  </p>

                  <p className="modal-desc">{selectedProject.description}</p>

                  <div className="modal-tools">
                    <span className="tools-label">Software &amp; Tools:</span>
                    <div className="tools-pills">
                      {selectedProject.tools?.map((tool, idx) => (
                        <span key={idx} className="tool-pill">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="modal-actions">
                    <a
                      href={`https://wa.me/919656161319?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-whatsapp-modal hover"
                      title="Chat directly with Sabith on WhatsApp"
                    >
                      <i className="fa-brands fa-whatsapp"></i> Inquire on WhatsApp
                    </a>
                    <a
                      href={selectedProject.behanceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary-modal hover"
                      title="View full project on Behance"
                    >
                      <i className="fa-brands fa-behance"></i> Behance ↗
                    </a>
                    <button
                      className="btn btn-secondary-modal hover"
                      onClick={() => setSelectedProject(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
