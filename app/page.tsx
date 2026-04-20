"use client";

import Link from "next/link";
import { ClerkWaitlist } from "@/components/ClerkWaitlist";
import { LogoMark } from "@/components/LogoMark";
import { DraftingGridArt } from "@/components/waitlist/DraftingGridArt";
import { RuledPaperArt } from "@/components/waitlist/RuledPaperArt";

const muted = "text-[rgba(232,230,224,0.52)]";
const rule = "border-[0.5px] border-[rgba(232,230,224,0.08)]";

export default function Home() {
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between bg-[rgba(11,13,18,0.92)] px-6 py-4 backdrop-blur-md mobile:px-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-relay-cream no-underline"
        >
          <LogoMark variant="nav" className="text-relay-cream" />
          <span className="font-geist text-lg font-bold tracking-[-0.02em]">
            Relay
          </span>
        </Link>
        <a
          href="#waitlist"
          className={`font-mono text-[11px] uppercase tracking-[0.1em] ${muted} transition-colors hover:text-relay-cream`}
        >
          Early access
        </a>
      </header>

      <main>
        <section
          className={`min-h-[100dvh] border-b ${rule} pt-[72px]`}
          aria-labelledby="hero-headline"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-14 lg:grid-cols-[1fr_minmax(300px,440px)] lg:items-start lg:gap-16 lg:py-20 mobile:px-4">
            <div className="order-2 flex flex-col gap-8 lg:order-1 lg:pt-2">
              <div className="flex animate-fade-up items-center gap-2.5 opacity-0">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-relay-accent"
                  aria-hidden
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[rgba(232,230,224,0.42)]">
                  Texas · private beta
                </span>
              </div>
              <h1
                id="hero-headline"
                className="animate-fade-up font-serif text-[clamp(36px,5vw,64px)] leading-[1.06] tracking-[-0.03em] text-relay-cream opacity-0 [animation-delay:50ms]"
              >
                Billable time,
                <br />
                <em className="italic text-[rgba(232,230,224,0.48)]">
                  drafted on your machine.
                </em>
              </h1>
              <p
                className={`max-w-md animate-fade-up text-[15px] leading-[1.7] ${muted} opacity-0 [animation-delay:110ms]`}
              >
                From inbox and calendar to draft entries — local processing. You
                review before anything leaves your device.
              </p>
              <div
                className={`grid max-w-lg animate-fade-up grid-cols-3 gap-6 border-t ${rule} pt-8 opacity-0 [animation-delay:160ms] mobile:grid-cols-1 mobile:gap-5`}
              >
                <StatBlock value="4h" label="lost / mo. reconstructing" />
                <StatBlock value="$1.2k" label="missed billing (avg. solo)" />
                <StatBlock value="87%" label="dread timekeeping" />
              </div>
            </div>

            <aside
              id="waitlist"
              className={`order-1 animate-fade-up rounded-md border ${rule} bg-relay-surface p-6 opacity-0 shadow-none [animation-delay:90ms] lg:order-2 lg:sticky lg:top-28`}
              aria-labelledby="waitlist-heading"
            >
              <h2
                id="waitlist-heading"
                className="font-serif text-xl tracking-[-0.02em] text-relay-cream"
              >
                Request early access
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[rgba(232,230,224,0.48)]">
                Pilot cohort · Texas solos & small firms. No spam.
              </p>
              <div className="mt-6">
                <ClerkWaitlist />
              </div>
            </aside>
          </div>
        </section>

        <section
          className={`border-b ${rule} bg-relay-elevated/40`}
          aria-label="Product context"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 mobile:px-4 mobile:py-12">
            <div className="relative flex min-h-[200px] items-center justify-center lg:min-h-[260px]">
              <DraftingGridArt className="h-auto w-full max-w-[400px] opacity-[0.85]" />
              <RuledPaperArt className="absolute left-1/2 top-1/2 z-[1] w-[55%] max-w-[200px] -translate-x-[20%] -translate-y-1/2 opacity-90" />
            </div>
            <div className="max-w-md lg:justify-self-end">
              <p className="font-serif text-[clamp(20px,2.4vw,26px)] leading-snug tracking-[-0.02em] text-relay-cream">
                Built for attorneys who treat privilege as a workflow, not a
                footer.
              </p>
              <p className="mt-4 text-[13px] leading-[1.75] text-[rgba(232,230,224,0.45)]">
                Processing stays local; export only when you choose. No
                multi-tenant document review — your matters stay on your machine.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer
        className={`flex flex-wrap items-center justify-between gap-6 px-6 py-10 text-[11px] text-[rgba(232,230,224,0.32)] mobile:px-4`}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-relay-cream no-underline"
        >
          <LogoMark variant="footer" className="text-relay-cream" />
          <span className="font-geist text-sm font-bold tracking-[-0.02em] opacity-55">
            Relay
          </span>
        </Link>
        <div className="flex flex-wrap gap-8 font-mono">
          <span>© 2025 Relay LLC · Texas</span>
          <a
            href="mailto:accutime.dev@gmail.com"
            className="text-inherit underline-offset-2 transition-colors hover:text-[rgba(232,230,224,0.55)]"
          >
            accutime.dev@gmail.com
          </a>
        </div>
      </footer>
    </>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-3xl tracking-[-0.02em] text-relay-cream mobile:text-4xl">
        {value}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase leading-snug tracking-[0.06em] text-[rgba(232,230,224,0.38)]">
        {label}
      </p>
    </div>
  );
}
