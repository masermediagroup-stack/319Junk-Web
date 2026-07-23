import Image from "next/image";
import { FAQList, MotionController, SiteHeader } from "@/components/interactive";
import { ContactActions } from "@/components/contact-actions";
import { HeroTitle } from "@/components/hero-title";
import { SiteIcon } from "@/components/site-icon";
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
const marqueeHighlights = [...serviceHighlights, ...serviceHighlights];

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
              <Image className="hero-landscape" data-hero-landscape src="/images/iowa-cornfield-hero.jpg" alt="" width={2160} height={1388} sizes="100vw" priority />
            </div>
            <div className="container hero-grid">
              <div className="hero-copy" data-hero-copy>
                <HeroTitle />
                <p className="hero-deck" data-hero-sequence>
                  <span>Junk removal for homes,</span>{" "}
                  <span>businesses, and industrial properties.</span>{" "}
                  <span>Serving Eastern &amp; Southeast Iowa.</span>{" "}
                  <span>Free estimates available.</span>
                </p>
                <ContactActions location="hero" />
              </div>
              <div className="hero-mark" aria-hidden="true">
                <Image className="hero-logo" data-hero-logo src="/brand/319junk-white.svg" alt="" width={834} height={516} priority />
              </div>
            </div>
          </section>

          <aside className="trust-strip" aria-label="Service highlights">
            <span className="sr-only">{serviceHighlights.join(", ")}</span>
            <div className="trust-track">
              <div className="trust-group" aria-hidden="true">
                {marqueeHighlights.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
              </div>
              <div className="trust-group" aria-hidden="true">
                {marqueeHighlights.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
              </div>
            </div>
          </aside>

          <section id="services" className="section-pad services" aria-labelledby="services-title">
            <div className="container">
              <header className="section-head" data-reveal-group>
                <h2 id="services-title" data-reveal-item>One call. More space.</h2>
                <p data-reveal-item>From a single cleanup to a full property clear-out, 319Junk travels to you and handles the loading.</p>
              </header>
              <div data-scroll-reveal="settle"><ServiceShowcase /></div>
            </div>
          </section>

          <section id="about" className="about section-pad" aria-labelledby="about-title">
            <div className="container about-grid">
              <div className="about-mark" data-scroll-reveal="mark"><Image src="/brand/319junk-black-numb.svg" alt="319Junk, 319-461-6329" width={834} height={715} /></div>
              <div className="about-copy" data-reveal-group>
                <h2 id="about-title" data-reveal-item>Local help without the runaround.</h2>
                <p data-reveal-item>Tell us what needs to go. We’ll talk through the job, provide a free estimate, travel to you, and handle the loading.</p>
                <div className="process-list" role="list">
                  <div className="process-row" data-reveal-item role="listitem"><strong>Tell us what needs to go.</strong><span>Call or text with your location and a description of the job.</span></div>
                  <div className="process-row" data-reveal-item role="listitem"><strong>Receive a free estimate.</strong><span>We’ll talk through the details and give you a clear next step.</span></div>
                  <div className="process-row" data-reveal-item role="listitem"><strong>Let the team handle the loading.</strong><span>319Junk travels to you and moves the items out.</span></div>
                </div>
                <a className="text-link" data-reveal-item href={siteConfig.facebookUrl} target="_blank" rel="noreferrer">Visit us on <span>Facebook</span><SiteIcon name="arrow-up-right" size={18} /></a>
              </div>
            </div>
          </section>

          <section id="faq" className="faq section-pad" aria-labelledby="faq-title">
            <div className="container faq-grid">
              <div className="faq-intro" data-scroll-reveal="rise">
                <h2 id="faq-title"><span>Straight answers,</span> <span>honest work.</span></h2>
              </div>
              <FAQList items={faqItems} />
            </div>
          </section>

          <section id="contact" className="final-cta section-pad" aria-labelledby="contact-title">
            <div className="container" data-reveal-group>
              <h2 id="contact-title" data-reveal-item>Ready to clear it out?</h2>
              <p data-reveal-item>Call or text with your location and what you need removed. We’ll take it from there.</p>
              <div data-reveal-item><ContactActions location="footer" /></div>
              <a className="giant-phone" data-phone-reveal data-reveal-item href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
            </div>
          </section>
        </main>
      <footer className="site-footer">
        <div className="container footer-grid" data-reveal-group>
          <Image data-reveal-item src="/brand/319junk-white.svg" alt="319Junk" width={220} height={136} />
          <p data-reveal-item>Residential, commercial, and industrial junk removal serving Eastern and Southeast Iowa.</p>
          <nav data-reveal-item aria-label="Footer navigation">{siteConfig.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
          <div data-reveal-item><a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a><a href={siteConfig.facebookUrl} target="_blank" rel="noreferrer">Facebook</a><a href="#main">Back to top</a></div>
        </div>
        <div className="container footer-base"><span>© {new Date().getFullYear()} 319Junk</span><span>Eastern &amp; Southeast Iowa</span></div>
      </footer>
      </MotionController>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
