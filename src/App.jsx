import React from 'react';
import portfolioData from '../portfolio-content.json';
import HoverOverlay from './components/HoverOverlay';
import Header from './components/Header';
import Hero from './components/Hero';
import Bio from './components/Bio';
import Marquee from './components/Marquee';
import Work from './components/Work';
import ServicesExperience from './components/ServicesExperience';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <HoverOverlay />
      <Header />
      <main id="page-content">
        <Hero data={portfolioData} />
        <Bio data={portfolioData} />
        <Marquee />
        <Work data={portfolioData} />
        <ServicesExperience data={portfolioData} />
      </main>
      <Footer data={portfolioData} />
    </>
  );
}
