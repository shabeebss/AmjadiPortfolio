import React, { useEffect, useRef, useState } from 'react';

export default function HoverOverlay() {
  const [style, setStyle] = useState({ display: 'none', top: 0, left: 0, width: 0, height: 0 });
  const [visible, setVisible] = useState(false);
  const currentTargetRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const PADDING = 4;

  useEffect(() => {
    function positionOverlay(el) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setStyle({
        display: 'block',
        left: window.scrollX + rect.left - PADDING,
        top: window.scrollY + rect.top - PADDING,
        width: rect.width + PADDING * 2,
        height: rect.height + PADDING * 2,
      });
      setVisible(true);
    }

    function handleMouseOver(e) {
      const target = e.target.closest('.hover');
      if (!target) return;
      // Do not draw selection box over fixed header navigation or mobile menu drawer
      if (target.closest('#fixed-header') || target.closest('#nav-mobile')) return;
      const rect = target.getBoundingClientRect();
      if (rect.width < 6 || rect.height < 6) return;

      clearTimeout(hideTimeoutRef.current);
      currentTargetRef.current = target;
      positionOverlay(target);
    }

    function handleMouseOut(e) {
      if (!currentTargetRef.current) return;
      hideTimeoutRef.current = setTimeout(() => {
        if (!currentTargetRef.current?.matches(':hover')) {
          setVisible(false);
          currentTargetRef.current = null;
        }
      }, 120);
    }

    let scrollDebounce = null;
    function handleScroll() {
      if (currentTargetRef.current) {
        setVisible(false);
        clearTimeout(scrollDebounce);
        scrollDebounce = setTimeout(() => {
          if (currentTargetRef.current?.matches(':hover')) {
            positionOverlay(currentTargetRef.current);
          }
        }, 120);
      }
    }

    function handleResize() {
      if (currentTargetRef.current) {
        positionOverlay(currentTargetRef.current);
      }
    }

    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(scrollDebounce);
    };
  }, []);

  return (
    <div
      className={`hover-selection-overlay ${visible ? 'visible' : ''}`}
      style={{
        position: 'absolute',
        top: `${style.top}px`,
        left: `${style.left}px`,
        width: `${style.width}px`,
        height: `${style.height}px`,
        display: style.display,
        pointerEvents: 'none',
      }}
    >
      {/* 4 corners */}
      <div className="handle tl"></div>
      <div className="handle tr"></div>
      <div className="handle bl"></div>
      <div className="handle br"></div>
      {/* 4 mid-edge handles */}
      <div className="handle tm"></div>
      <div className="handle bm"></div>
      <div className="handle ml"></div>
      <div className="handle mr"></div>
    </div>
  );
}
