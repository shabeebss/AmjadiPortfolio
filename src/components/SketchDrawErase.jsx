import React, { useEffect, useRef } from 'react';
import sketchData from '../data/sketchPaths.json';

export default function SketchDrawErase() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    const { paths } = sketchData;

    // Load full authentic pencil sketch image for master reveal
    const finalPencilImg = new Image();
    finalPencilImg.src = '/sabith-pencil-transparent.png';

    // Canvas native dimensions matching sketch-timelapse.png (2040 x 1800)
    const cw = 2040;
    const ch = 1800;

    // Base paths extracted at 650x650; pre-scale points once for extreme performance
    const targetX = 660;
    const targetY = 250;
    const targetSize = 1120;
    const scale = targetSize / 650.0;

    // Separate paths into Tier 1 (major outlines) and Tier 2 (details/hatching)
    // Pre-calculate scaled coordinates so render loop does 0 arithmetic
    const preScaleList = (rawList) =>
      rawList.map((p) => ({
        pts: p.pts.map((pt) => [targetX + pt[0] * scale, targetY + pt[1] * scale]),
      }));

    const tier1 = preScaleList(paths.filter((p) => p.tier === 1));
    const tier2 = preScaleList(paths.filter((p) => p.tier === 2));

    let animationFrameId = null;
    let startTime = null;
    let isVisible = true;

    // Timing Architecture:
    const T_T1 = 2000;
    const T_T2 = 4000;
    const T_TONAL = 5000;
    const T_HOLD = 7200;
    const T_REV_TONAL = 8000;
    const T_REV_T2 = 9800;
    const T_REV_T1 = 11600;
    const T_CYCLE = 12200;

    // Optimized batch renderer: batches all paths into a SINGLE draw call
    const renderPathListBatched = (pathList, lineWidth, fractionalCount) => {
      const total = pathList.length;
      const clampedCount = Math.max(0, Math.min(total, fractionalCount));
      const fullCount = Math.floor(clampedCount);
      const subProg = clampedCount - fullCount;

      if (fullCount === 0 && subProg <= 0) return null;

      ctx.lineWidth = lineWidth;
      ctx.beginPath();

      // Batch all completed paths into one continuous path
      for (let i = 0; i < fullCount; i++) {
        const pts = pathList[i].pts;
        if (pts.length < 2) continue;
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let j = 1; j < pts.length; j++) {
          ctx.lineTo(pts[j][0], pts[j][1]);
        }
      }

      // Draw active in-progress path
      let tip = null;
      if (fullCount < total && subProg > 0) {
        const pts = pathList[fullCount].pts;
        if (pts.length >= 2) {
          const ptCount = Math.max(2, Math.floor(subProg * pts.length));
          ctx.moveTo(pts[0][0], pts[0][1]);
          for (let j = 1; j < ptCount; j++) {
            ctx.lineTo(pts[j][0], pts[j][1]);
          }
          const tipPt = pts[ptCount - 1];
          tip = { x: tipPt[0], y: tipPt[1] };
        }
      }

      // Single GPU stroke call for entire batch!
      ctx.stroke();
      return tip;
    };

    const render = (timestamp) => {
      if (!isVisible) return;

      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % T_CYCLE;

      // Clear canvas
      ctx.clearRect(0, 0, cw, ch);
      ctx.save();

      // Configure authentic pencil stroke styling
      ctx.strokeStyle = '#252526';
      ctx.fillStyle = '#252526';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (elapsed < T_T1) {
        // --- FORWARD 1: Tier 1 Structural Outlines ---
        const prog = elapsed / T_T1;
        const tip = renderPathListBatched(tier1, 2.4, prog * tier1.length);
        if (tip) {
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }

      } else if (elapsed < T_T2) {
        // --- FORWARD 2: Tier 2 Details & Cross-Hatching ---
        const prog = (elapsed - T_T1) / (T_T2 - T_T1);
        renderPathListBatched(tier1, 2.4, tier1.length);
        const tip = renderPathListBatched(tier2, 1.5, prog * tier2.length);

        if (finalPencilImg.complete && finalPencilImg.naturalWidth > 0) {
          ctx.globalAlpha = prog * 0.40;
          ctx.drawImage(finalPencilImg, targetX, targetY, targetSize, targetSize);
          ctx.globalAlpha = 1.0;
        }

        if (tip) {
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

      } else if (elapsed < T_TONAL) {
        // --- FORWARD 3: Tonal Depth Integration ---
        const prog = (elapsed - T_T2) / (T_TONAL - T_T2);
        renderPathListBatched(tier1, 2.4, tier1.length);
        renderPathListBatched(tier2, 1.5, tier2.length);

        if (finalPencilImg.complete && finalPencilImg.naturalWidth > 0) {
          ctx.globalAlpha = 0.40 + 0.60 * prog;
          ctx.drawImage(finalPencilImg, targetX, targetY, targetSize, targetSize);
          ctx.globalAlpha = 1.0;
        }

      } else if (elapsed < T_HOLD) {
        // --- PHASE 4: 100% Masterpiece Hold ---
        if (finalPencilImg.complete && finalPencilImg.naturalWidth > 0) {
          ctx.drawImage(finalPencilImg, targetX, targetY, targetSize, targetSize);
        }

      } else if (elapsed < T_REV_TONAL) {
        // --- REVERSE 1: Tonal Depth Smoothly Reverses ---
        const revProg = (elapsed - T_HOLD) / (T_REV_TONAL - T_HOLD);
        renderPathListBatched(tier1, 2.4, tier1.length);
        renderPathListBatched(tier2, 1.5, tier2.length);

        if (finalPencilImg.complete && finalPencilImg.naturalWidth > 0) {
          ctx.globalAlpha = 1.0 - 0.60 * revProg;
          ctx.drawImage(finalPencilImg, targetX, targetY, targetSize, targetSize);
          ctx.globalAlpha = 1.0;
        }

      } else if (elapsed < T_REV_T2) {
        // --- REVERSE 2: Tier 2 Details Erased in Reverse Order ---
        const revProg = (elapsed - T_REV_TONAL) / (T_REV_T2 - T_REV_TONAL);
        const remProg = 1.0 - revProg;
        renderPathListBatched(tier1, 2.4, tier1.length);
        const tip = renderPathListBatched(tier2, 1.5, remProg * tier2.length);

        if (finalPencilImg.complete && finalPencilImg.naturalWidth > 0) {
          ctx.globalAlpha = remProg * 0.40;
          ctx.drawImage(finalPencilImg, targetX, targetY, targetSize, targetSize);
          ctx.globalAlpha = 1.0;
        }

        if (tip) {
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#8c6a49';
          ctx.fill();
        }

      } else if (elapsed < T_REV_T1) {
        // --- REVERSE 3: Tier 1 Outlines Erased in Reverse Order ---
        const revProg = (elapsed - T_REV_T2) / (T_REV_T1 - T_REV_T2);
        const remProg = 1.0 - revProg;
        const tip = renderPathListBatched(tier1, 2.4, remProg * tier1.length);

        if (tip) {
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, 2.8, 0, Math.PI * 2);
          ctx.fillStyle = '#8c6a49';
          ctx.fill();
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    // Pause animation when hero is offscreen to preserve 100% silky smooth 60fps scrolling
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startTime = null;
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="sketch-timelapse-wrap hover"
      title="Hand-drawn Pencil Sketch Timelapse"
    >
      {/* Base Margin Doodles */}
      <img
        className="sketch-hero-doodles"
        src="/asset-suite/imagery/sketch-timelapse.png"
        alt="Muhammed Sabith - Margin Doodles"
        loading="eager"
      />

      {/* High-Performance Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="sketch-hero-canvas"
        width={2040}
        height={1800}
      />
    </div>
  );
}
