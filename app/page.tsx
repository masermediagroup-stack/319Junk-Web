import Image from "next/image";
import { FAQList, MotionController, SiteHeader } from "@/components/interactive";
import { ContactActions } from "@/components/contact-actions";
import { ServiceShowcase } from "@/src/components/service-showcase";
import { faqItems, siteConfig } from "@/lib/site-config";

const serviceHighlights = [
  "Residential",
  "Commercial",
  "Industrial",
  "Free estimates",
  "We load it",
  "Fast availability",
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phoneE164,
    areaServed: siteConfig.serviceArea,
    sameAs: [siteConfig.facebookUrl],
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <MotionController>
      <main id="main">
        <section className="hero section-pad" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <Image className="hero-landscape" src="/images/loess-hills.jpg" alt="" width={1280} height={591} sizes="100vw" priority unoptimized />
          </div>
          <Image className="hero-logo" src="/brand/319junk-white.svg" alt="" width={834} height={516} priority />
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal>
              <h1 id="hero-title">You call,<br /><span>We haul!</span></h1>
              <p className="hero-deck">Junk removal for homes, businesses, and industrial properties.<br />Across Eastern and Southeast Iowa. Free estimates available.</p>
              <ContactActions location="hero" />
            </div>
          </div>
        </section>

        <aside className="trust-strip" aria-label="Service highlights">
          <div className="trust-track">
            <div className="trust-group">
              {serviceHighlights.map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="trust-group" aria-hidden="true">
              {serviceHighlights.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </aside>

        <section id="services" className="section-pad services" aria-labelledby="services-title">
          <div className="container">
            <header className="section-head" data-reveal>
              <h2 id="services-title">One call. More space.</h2>
              <p>From a single cleanup to a full property clear-out, 319Junk travels to you and handles the loading.</p>
            </header>
            <ServiceShowcase />
          </div>
        </section>

        <section id="faq" className="faq section-pad" aria-labelledby="faq-title">
          <div className="container faq-grid">
            <div className="faq-intro" data-reveal>
              <h2 id="faq-title">Straight answers, honest work.</h2>
            </div>
            <FAQList items={faqItems} />
          </div>
        </section>

        <section id="about" className="about section-pad" aria-labelledby="about-title">
          <div className="container about-grid">
            <div className="about-mark" data-reveal><Image src="/brand/319junk-white-numb.svg" alt="319Junk, 319-461-6329" width={834} height={715} /></div>
            <div className="about-copy" data-reveal>
              <h2 id="about-title">Local help without the runaround.</h2>
              <p>Tell us what needs to go. We’ll talk through the job, provide a free estimate, travel to you, and handle the loading.</p>
              <ul><li>Direct call or text communication</li><li>Residential through industrial jobs</li><li>Cleanouts and project debris</li><li>Trailer rental inquiries</li></ul>
              <a className="text-link" href={siteConfig.facebookUrl} target="_blank" rel="noreferrer">Visit us on Facebook</a>
            </div>
          </div>
        </section>

        <section id="contact" className="final-cta section-pad" aria-labelledby="contact-title">
          <div className="container" data-reveal>
            <h2 id="contact-title">Ready to clear it out?</h2>
            <p>Call or text with your location and what you need removed. We’ll take it from there.</p>
            <ContactActions location="footer" />
            <a className="giant-phone" href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
          </div>
        </section>
      </main>
      </MotionController>

      <footer className="site-footer">
        <div className="container footer-grid">
          <Image src="/brand/319junk-white.svg" alt="319Junk" width={220} height={136} />
          <p>Residential, commercial, and industrial junk removal serving Eastern and Southeast Iowa.</p>
          <nav aria-label="Footer navigation">{siteConfig.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
          <div><a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a><a href={siteConfig.facebookUrl} target="_blank" rel="noreferrer">Facebook</a><a href="#main">Back to top</a></div>
        </div>
        <div className="container footer-base"><span>© {new Date().getFullYear()} 319Junk</span><span>Eastern &amp; Southeast Iowa</span></div>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
