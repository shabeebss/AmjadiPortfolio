import React from 'react';

const clientLogos = [
  { file: '01-osmc.png', name: 'OSMC' },
  { file: '02-rakw.png', name: 'RAKW' },
  { file: '03-spark-academy.png', name: 'Spark Academy' },
  { file: '04-zexim.png', name: 'Zexim' },
  { file: '05-air-box.png', name: 'Air Box' },
  { file: '06-dawrae-hadith.png', name: 'Dawrae Hadith' },
  { file: '07-muziris-junior-business-school.png', name: 'Muziris Junior Business School' },
  { file: '08-bishara-muallim-conference.png', name: 'Bishara Muallim Conference' },
  { file: '09-arwah-unani-clinic.png', name: 'Arwah Unani Clinic' },
  { file: '10-dream-realty.png', name: 'Dream Realty' },
  { file: '11-haflinger.png', name: 'Haflinger' },
  { file: '12-trace.png', name: 'Trace' },
  { file: '13-life-path.png', name: 'Life Path' },
  { file: '14-amar-becha.png', name: 'Amar Becha' },
  { file: '15-jamia-nasrus-sunnah.png', name: 'Jamia Nasrus Sunnah' },
  { file: '16-ibas.png', name: 'IBAS' },
  { file: '17-spin-zone.png', name: 'Spin Zone' },
  { file: '18-leap.png', name: 'Leap' },
  { file: '19-renklerin.png', name: 'Renklerin' },
  { file: '20-markaz-ul-sunnah.png', name: 'Markaz Ul Sunnah' },
  { file: '21-thaiba-model-school.png', name: 'Thaiba Model School' },
  { file: '22-ruhi.png', name: 'Ruhi' },
  { file: '23-educom.png', name: 'Educom' },
  { file: '24-sukoon.png', name: 'Sukoon' },
  { file: '25-ummis-pickles.png', name: 'Ummi\'s Pickles' },
  { file: '26-candle-of-hope.png', name: 'Candle of Hope' },
  { file: '27-quran-memorization-center.png', name: 'Quran Memorization Center' },
  { file: '28-markaz-mueeniyya.png', name: 'Markaz Mueeniyya' },
  { file: '29-azure-avenue.png', name: 'Azure Avenue' },
];

export default function Marquee() {
  return (
    <section className="marquee" aria-label="Clients and Collaborations">
      <div className="marquee-track">
        {/* Set 1 */}
        {clientLogos.map((client, idx) => (
          <div key={`c1-${idx}`} className="marquee-item">
            <img src={`/client-logos-transparent/${client.file}`} alt={client.name} />
          </div>
        ))}
        {/* Set 2 (Infinite duplicate loop) */}
        {clientLogos.map((client, idx) => (
          <div key={`c2-${idx}`} className="marquee-item">
            <img src={`/client-logos-transparent/${client.file}`} alt={client.name} />
          </div>
        ))}
      </div>
    </section>
  );
}
