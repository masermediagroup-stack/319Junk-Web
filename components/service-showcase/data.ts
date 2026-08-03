import { services } from "@/lib/site-config";
import type { ServiceItem } from "./types";

const servicePresentation = [
  {
    id: "residential",
    label: "Residential",
    image: {
      src: "/services/residential-after.jpeg",
      alt: "Cleared residential storage shed after a 319Junk removal job",
    },
    comparison: {
      before: {
        src: "/services/residential-before.jpeg",
        alt: "Cluttered residential storage shed before a 319Junk removal job",
      },
      after: {
        src: "/services/residential-after.jpeg",
        alt: "Cleared residential storage shed after a 319Junk removal job",
      },
    },
  },
  {
    id: "commercial",
    label: "Commercial",
    image: {
      src: "/services/commercial-after.jpg",
      alt: "Cleared commercial storage room after a 319Junk removal job",
    },
    comparison: {
      before: {
        src: "/services/commercial-before.jpg",
        alt: "Crowded commercial storage room before a 319Junk removal job",
      },
      after: {
        src: "/services/commercial-after.jpg",
        alt: "Cleared commercial storage room after a 319Junk removal job",
      },
    },
  },
  {
    id: "trailer-rentals",
    label: "Trailer Rentals",
    image: {
      src: "/services/trailer-rentals.jpg",
      alt: "319Junk rental trailers overlooking an Iowa landscape",
    },
  },
] as const;

export const SERVICE_ITEMS: ServiceItem[] = services.map((service, index) => {
  const presentation = servicePresentation[index];

  if (!presentation) {
    throw new Error(`Missing Service Showcase presentation for service ${index + 1}.`);
  }

  return {
    ...presentation,
    title: service.title,
    description: service.description,
    contactIntent: service.contactIntent,
  };
});
