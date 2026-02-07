import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-24 pt-32">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero.webm"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl text-center text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-white/80">
            Mobile Detailing
          </p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl md:text-6xl">
            Turbo Shine Exotics
          </h1>
          <p className="mt-6 text-base text-white/85 sm:text-lg">
            Premium detailing delivered to your driveway. Book now for a
            showroom-grade shine.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              className="rounded-full bg-white px-7 py-6 text-base font-semibold text-black hover:bg-white/90"
            >
              <Link href="/book">Book Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/70 bg-transparent px-7 py-6 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
