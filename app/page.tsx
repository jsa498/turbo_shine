import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookingDialogProvider,
  BookingDialogTrigger,
} from "@/components/shared/booking-dialog";
import { bookingPackages } from "@/components/shared/booking-helpers";

export default function HomePage() {
  const mostPopularPackageId = bookingPackages.find(
    (plan) => plan.highlight
  )?.id;

  return (
    <BookingDialogProvider packages={bookingPackages}>
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
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black"
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
                <Link href="/#pricing">Book Now</Link>
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

        <section id="pricing" className="bg-black px-6 py-24">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Pricing
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Select your premium detailing package
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/70">
              Mobile car detailing for exotic and performance vehicles with
              paint correction, ceramic coating options, and interior/exterior
              care. Final pricing varies by size and condition.
            </p>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {bookingPackages.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border bg-white/5 p-8 text-left backdrop-blur ${
                    plan.highlight
                      ? "border-white/40 shadow-[0_0_45px_rgba(255,255,255,0.08)]"
                      : "border-white/10"
                  }`}
                >
                  {plan.highlight ? (
                    <Badge
                      variant="outline"
                      className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 border-white/30 bg-black/90 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80 ring-8 ring-black"
                    >
                      Most Popular
                    </Badge>
                  ) : null}
                  <h3 className="text-lg font-semibold text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {plan.price}
                  </p>
                  <p className="mt-3 text-sm text-white/70">
                    {plan.description}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-white/70">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <BookingDialogTrigger
                    packageId={plan.id}
                    className={`mt-8 w-full rounded-full px-6 py-5 text-sm font-semibold ${
                      plan.highlight
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-transparent text-white ring-1 ring-white/25 hover:bg-white/10"
                    }`}
                  >
                    {plan.cta}
                  </BookingDialogTrigger>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs text-white/50">
              Ceramic coating and paint correction quotes are customized after
              a quick vehicle assessment.
            </p>
          </div>
        </section>

        <section id="our-work" className="bg-black px-6 py-24">
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
            <div
              className="relative mt-12 overflow-hidden"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            >
              <div className="flex w-max animate-marquee items-center gap-6">
                {[
                  "Ferrari",
                  "Lamborghini",
                  "McLaren",
                  "Porsche",
                  "Aston Martin",
                  "G-Wagon",
                  "Bentley",
                  "Rolls-Royce",
                ]
                  .concat([
                    "Ferrari",
                    "Lamborghini",
                    "McLaren",
                    "Porsche",
                    "Aston Martin",
                    "G-Wagon",
                    "Bentley",
                    "Rolls-Royce",
                  ])
                  .map((label, index) => (
                    <div
                      key={`${label}-${index}`}
                      className="h-40 w-64 shrink-0 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-black/40"
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="bg-black px-6 pb-24 pt-10 sm:pt-16">
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.16),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-7 sm:p-10 md:p-12">
              <div
                className="pointer-events-none absolute -left-24 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-24 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative flex flex-col gap-6">
                <div className="max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/65">
                    Ready When You Are
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                    The shine you want is one package away
                  </h2>
                  <p className="mt-4 text-sm text-white/70 sm:text-base">
                    Pick the package that fits your vehicle and lock in your
                    appointment in under two minutes.
                  </p>
                </div>
                <div className="flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
                  <Button
                    asChild
                    className="rounded-full bg-white px-7 py-6 text-sm font-semibold text-black hover:bg-white/90 sm:text-base"
                  >
                    <Link href="/#pricing">Choose Package</Link>
                  </Button>
                  <BookingDialogTrigger
                    packageId={mostPopularPackageId}
                    className="rounded-full bg-transparent px-7 py-6 text-sm font-semibold text-white ring-1 ring-white/35 transition hover:bg-white/10 sm:text-base"
                  >
                    Start With Most Popular
                  </BookingDialogTrigger>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </BookingDialogProvider>
  );
}
