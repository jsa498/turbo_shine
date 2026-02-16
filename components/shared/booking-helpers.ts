export type BookingPackage = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight: boolean;
  cta: string;
  durationLabel: string;
  durationMinutes: number;
};

export const bookingPackages: BookingPackage[] = [
  {
    id: "signature-refresh",
    name: "Signature Refresh",
    price: "$120–160",
    description:
      "Ideal for well-kept exotics needing a luxury wash and gloss.",
    features: [
      "Hand wash & foam pre-soak",
      "Wheel, tire & trim clean",
      "Interior vacuum + wipe down",
      "Glass cleaned inside & out",
      "Spray sealant protection",
    ],
    cta: "Select Package",
    highlight: false,
    durationLabel: "Approx. 2–3 hours",
    durationMinutes: 180,
  },
  {
    id: "performance-detail",
    name: "Performance Detail",
    price: "$220–280",
    description:
      "Most popular. Deeper interior clean and enhanced exterior finish.",
    features: [
      "Everything in Signature",
      "Door jambs & crevices detailed",
      "Clay bar decontamination",
      "Deep interior clean",
      "Tire gloss + exterior trim restore",
    ],
    cta: "Select Package",
    highlight: true,
    durationLabel: "Approx. 3.5–5 hours",
    durationMinutes: 300,
  },
  {
    id: "exotic-restoration",
    name: "Exotic Restoration",
    price: "$360–520",
    description: "Correction-ready detail with premium protection.",
    features: [
      "Multi-step wash & decon",
      "Interior shampoo (as needed)",
      "Paint correction (light polish)",
      "Longer-lasting sealant",
      "Engine bay detail (light)",
    ],
    cta: "Select Package",
    highlight: false,
    durationLabel: "Approx. 5–7 hours",
    durationMinutes: 420,
  },
];

export type TimeSlot = {
  value: string;
  label: string;
  totalMinutes: number;
};

export function getPackageById(
  packages: BookingPackage[],
  id?: string | null,
) {
  if (!id) {
    return packages[0];
  }

  return packages.find((pkg) => pkg.id === id) ?? packages[0];
}

export function formatTimeLabel(totalMinutes: number) {
  const hours24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = ((hours24 + 11) % 12) + 1;

  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function buildTimeSlots({
  openHour,
  closeHour,
  stepMinutes,
  durationMinutes,
}: {
  openHour: number;
  closeHour: number;
  stepMinutes: number;
  durationMinutes: number;
}): TimeSlot[] {
  const startMinutes = openHour * 60;
  const endMinutes = closeHour * 60;
  const lastStartMinutes = endMinutes - durationMinutes;

  if (lastStartMinutes < startMinutes) {
    return [];
  }

  const slots: TimeSlot[] = [];

  for (
    let totalMinutes = startMinutes;
    totalMinutes <= lastStartMinutes;
    totalMinutes += stepMinutes
  ) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const value = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    slots.push({
      value,
      label: formatTimeLabel(totalMinutes),
      totalMinutes,
    });
  }

  return slots;
}

export function formatSummaryDate(date: Date, timeZone: string) {
  return date.toLocaleDateString("en-CA", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}
