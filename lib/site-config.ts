export interface NavigationItem { label: string; href: string }
export interface SiteConfig {
  name: string; description: string; phoneDisplay: string; phoneE164: string; phoneHref: string;
  contactEmail?: string; facebookUrl: string; serviceArea: string; minimumPrice: number; siteUrl: string;
  navigation: NavigationItem[]; sms: { general: string; removal: string; trailer: string };
  smsGeneralHref: string; smsRemovalHref: string; smsTrailerHref: string;
}
export type ContactIntent = "estimate" | "general" | "trailer";
export interface ContactAction {
  label: string;
  phoneFallbackLabel: string;
  mobileHref: string;
  desktopHref: string;
}
export interface Service { title: string; description: string; contactIntent: ContactIntent }
export interface FAQItem { question: string; answer: string }
export interface WorkItem { title: string; description: string; image?: string; beforeImage?: string; afterImage?: string }

const phoneDisplay = "319-461-6329";
const phoneE164 = "+13194616329";
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://319-junk-web.vercel.app";
const sms = {
  general: "Hi 319Junk, I have a question about your services. My location is ____ and I need help with ____.",
  removal: "Hi 319Junk, I’d like to request a junk-removal estimate. My location is ____ and I need removed ____.",
  trailer: "Hi 319Junk, I’m interested in renting a trailer. My location is ____ and the project dates are ____.",
};
const smsHref = (body: string) => `sms:${phoneE164}?&body=${encodeURIComponent(body)}`;
const mailHref = (subject: string, body: string) => contactEmail ? `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` : `tel:${phoneE164}`;

export const siteConfig: SiteConfig = {
  name: "319Junk",
  description: "Residential, commercial, and industrial junk removal, cleanouts, and trailer rentals serving Eastern and Southeast Iowa.",
  phoneDisplay, phoneE164, phoneHref: `tel:${phoneE164}`, contactEmail,
  facebookUrl: "https://www.facebook.com/people/319Junk/61572221901573/",
  serviceArea: "Eastern and Southeast Iowa", minimumPrice: 140, siteUrl,
  navigation: [{ label: "Services", href: "#services" }, { label: "About", href: "#about" }, { label: "FAQ", href: "#faq" }],
  sms, smsGeneralHref: smsHref(sms.general), smsRemovalHref: smsHref(sms.removal), smsTrailerHref: smsHref(sms.trailer),
};

export const contactIntentActions: Record<ContactIntent, ContactAction> = {
  estimate: {
    label: "Get a free estimate",
    phoneFallbackLabel: "Call for a free estimate",
    mobileHref: siteConfig.smsRemovalHref,
    desktopHref: mailHref("Junk-removal estimate request", sms.removal),
  },
  general: {
    label: "Ask about a job",
    phoneFallbackLabel: "Call about a job",
    mobileHref: siteConfig.smsGeneralHref,
    desktopHref: mailHref("319Junk service inquiry", sms.general),
  },
  trailer: {
    label: "Rent a trailer",
    phoneFallbackLabel: "Call about trailer rentals",
    mobileHref: siteConfig.smsTrailerHref,
    desktopHref: mailHref("Trailer-rental inquiry", sms.trailer),
  },
};
export const primaryContactIntents: ContactIntent[] = ["estimate", "trailer"];
export const services: Service[] = [
  { title: "Residential Junk Removal", description: "Clear unwanted items, clutter, and project debris without doing the heavy lifting yourself.", contactIntent: "estimate" },
  { title: "Commercial & Industrial", description: "Practical removal support for businesses, facilities, job sites, and larger cleanup needs.", contactIntent: "estimate" },
  { title: "Trailer Rentals", description: "Ask about a trailer for a cleanup or project on your schedule. Availability and details are confirmed directly.", contactIntent: "trailer" },
];
export const faqItems: FAQItem[] = [
  { question: "What is the minimum junk removal charge?", answer: "Junk removal jobs have a $140 minimum. Final pricing depends on the details of the job. Contact 319Junk for a free estimate." },
  { question: "How do I get an estimate?", answer: "Call or text 319-461-6329 with your location and a description of what needs to go. Photos can help the team understand the job. Estimates are free." },
  { question: "Do you handle the loading?", answer: "Yes. 319Junk handles the loading so you do not have to move everything to the curb first." },
  { question: "Do you offer same-day service?", answer: "Same-day or next-day service may be available depending on the schedule and job. Contact 319Junk to confirm current availability." },
  { question: "Where do you travel?", answer: "319Junk serves Eastern and Southeast Iowa and travels to jobs. Send your location to confirm service for your property." },
  { question: "How does trailer rental work?", answer: "Call or text with your location and project dates. 319Junk will confirm current availability and rental details directly." },
  { question: "What items can you take?", answer: "Send photos or a description of the items so 319Junk can confirm what can be handled. No unverified accepted-item or prohibited-item list is published here." },
];
export const workItems: WorkItem[] = [
  { title: "Property cleanouts", description: "Future owner-approved project photography" },
  { title: "Trailer in the field", description: "Future owner-approved trailer photography" },
  { title: "Before / after", description: "Future verified same-project image pair" },
];
