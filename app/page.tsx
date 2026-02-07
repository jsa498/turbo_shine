import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-24 pt-32">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero.webm"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl text-center text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-white/80">
            Mobile Detailing
          </p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl md:text-6xl">
            Turbo Shine Exotics
          </h1>
          <p className="mt-6 text-base text-white/85 sm:text-lg">
            Luxury-grade detailing delivered to your driveway. Book now for a
            showroom finish.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              className="rounded-full bg-white px-7 py-6 text-base font-semibold text-black hover:bg-white/90"
            >
              <Link href="/#book">Book Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/70 bg-transparent px-7 py-6 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/#services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="border-t border-white/5 bg-black px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            Services
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Signature detailing for exotic vehicles
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/70">
            A curated set of packages designed around high-end finishes, carbon
            fiber, and performance interiors.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Exotic Wash & Gloss",
                description:
                  "Two-bucket wash, wheel decon, glass polish, and a deep gloss finish.",
              },
              {
                title: "Paint Correction",
                description:
                  "Multi-stage polish to remove swirls and restore showroom clarity.",
              },
              {
                title: "Ceramic Shield",
                description:
                  "Long-lasting protection with hydrophobic shine and UV defense.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm text-white/70">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="our-work"
        className="border-t border-white/5 bg-zinc-950 px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            Our Work
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            A gallery of precision and care
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/70">
            Curated transformations across exotics, supercars, and luxury
            vehicles.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {["Ferrari", "Lamborghini", "McLaren", "Porsche", "Aston Martin", "G-Wagon"].map(
              (label) => (
                <div
                  key={label}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="h-40 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-black/40" />
                  <p className="mt-4 text-sm font-medium">{label} Detail</p>
                  <p className="mt-2 text-xs text-white/60">
                    Full exterior & interior refinement.
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section id="book" className="border-t border-white/5 bg-black px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            Book Now
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Reserve your detail in minutes
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/70">
            Select a package, choose a time, and we’ll arrive fully equipped.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Choose a package",
                description: "Signature, Correction, or Ceramic protection.",
              },
              {
                title: "Pick a time",
                description: "We’ll confirm and arrive at your location.",
              },
              {
                title: "Enjoy the finish",
                description: "Your vehicle leaves with a showroom shine.",
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                  Step {index + 1}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button
              asChild
              className="rounded-full bg-white px-7 py-6 text-base font-semibold text-black hover:bg-white/90"
            >
              <Link href="/#contact">Start Booking</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-white/5 bg-zinc-950 px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Let’s detail your vehicle
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/70">
            Share your vehicle details and preferred time. We’ll respond with a
            tailored quote.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-[1.4fr_0.6fr]">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40"
                  placeholder="Name"
                />
                <input
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40"
                  placeholder="Phone"
                />
                <input
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 sm:col-span-2"
                  placeholder="Vehicle (year, make, model)"
                />
                <textarea
                  className="min-h-[120px] w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 sm:col-span-2"
                  placeholder="Tell us about the service you need"
                />
              </div>
              <Button
                className="mt-6 rounded-full bg-white px-7 py-6 text-base font-semibold text-black hover:bg-white/90"
                type="button"
              >
                Send Request
              </Button>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/75">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Details
              </p>
              <p className="mt-4 text-base text-white">
                Los Angeles + Orange County
              </p>
              <p className="mt-2">Mon–Sat · 8am–7pm</p>
              <p className="mt-6">hello@turboshineexotics.com</p>
              <p className="mt-2">(555) 234-7789</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
