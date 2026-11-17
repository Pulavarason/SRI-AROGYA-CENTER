/**
 * Service copy is deliberately general and makes no medical or outcome claims.
 * CONFIRM: have the clinic review/replace every description before launch,
 * and add specific therapies only if they are actually offered.
 */
export type ServiceId = "siddha" | "ayurveda" | "panchakarma";

export interface Service {
  id: ServiceId;
  number: string;
  title: string;
  kicker: string;
  summary: string;
  detail: string;
}

export const services: Service[] = [
  {
    id: "siddha",
    number: "01",
    title: "Siddha",
    kicker: "The Tamil healing tradition",
    summary:
      "A traditional system of medicine from South India, practised with patience and close attention to the individual.",
    detail:
      "Siddha is among the oldest healing traditions of Tamil Nadu. At Sri Arogya Centre it is offered under the guidance of Dr. S. Rajesh MD(s). Speak with the centre to learn how it may suit you.",
  },
  {
    id: "ayurveda",
    number: "02",
    title: "Ayurveda",
    kicker: "The science of life",
    summary:
      "The classical Indian approach to health, rooted in balance between body, mind and the natural world.",
    detail:
      "Ayurveda looks at wellness as a whole, not a single symptom. Reach out to the centre to ask how its Ayurvedic care is offered and what a first visit involves.",
  },
  {
    id: "panchakarma",
    number: "03",
    title: "Panchakarma",
    kicker: "Cleansing & renewal",
    summary:
      "A traditional Ayurvedic approach centred on cleansing and restoring balance, undertaken with professional guidance.",
    detail:
      "Panchakarma is a classical Ayurvedic discipline. Which therapies are available and appropriate is a matter for consultation, so please contact the centre to discuss.",
  },
];

export const serviceOptions: { value: string; label: string }[] = [
  ...services.map((s) => ({ value: s.id, label: s.title })),
  { value: "not-sure", label: "Not sure yet — general consultation" },
];
