"use client";

import Link from "next/link";
import { ClerkWaitlist } from "@/components/ClerkWaitlist";
import { LogoMark } from "@/components/LogoMark";
import { DraftingGridArt } from "@/components/waitlist/DraftingGridArt";
import { RuledPaperArt } from "@/components/waitlist/RuledPaperArt";

const muted = "text-[rgba(26,24,21,0.55)]";
const dim = "text-[rgba(26,24,21,0.38)]";
const rule = "border-[0.5px] border-[rgba(26,24,21,0.1)]";

function KnowledgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="4.5" cy="6" r="1.75" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19.5" cy="6" r="1.75" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="4.5" cy="18" r="1.75" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19.5" cy="18" r="1.75" stroke="currentColor" strokeWidth="1.5" />
      <line x1="6.2" y1="6.8" x2="10.5" y2="10.6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="17.8" y1="6.8" x2="13.5" y2="10.6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="6.2" y1="17.2" x2="10.5" y2="13.4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="17.8" y1="17.2" x2="13.5" y2="13.4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function BillingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="13" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 8h6M7 11.5h4M7 15h3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="18.5" cy="18.5" r="3.5" fill="white" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18.5 16.8v1.7l1 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ResearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.5 10.5h6M10.5 7.5v6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function WorkflowsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="9" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="1.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="16.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="17" y="9" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 11.75h2M15 11.75h2M11.75 7v2M11.75 15v2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

const securityCards = [
  {
    title: "Local AI",
    body: "All inference runs on your hardware. No API calls, no external requests — compute never leaves your machine.",
  },
  {
    title: "Zero Telemetry",
    body: "No usage analytics, no behavioral data, no crash reports. Nothing is reported back.",
  },
  {
    title: "Always Encrypted",
    body: "All stored data is AES-256 encrypted at rest. Your documents are unreadable to anyone without the key.",
  },
  {
    title: "No Model Training",
    body: "Your documents and queries are never used to train or fine-tune any model.",
  },
  {
    title: "Offline Capable",
    body: "Once installed, Relay runs without an internet connection. A network outage does not interrupt your work.",
  },
  {
    title: "Audit Log",
    body: "Every action taken by an AI agent — query made, document accessed, entry drafted — is logged and reviewable.",
  },
];

export default function Home() {
  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[100] flex items-center justify-between border-b ${rule} bg-[rgba(236,234,227,0.92)] px-6 py-4 backdrop-blur-md mobile:px-4`}
      >
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
          className={`font-mono text-[11px] uppercase tracking-[0.1em] ${dim} transition-colors hover:text-relay-cream`}
        >
          Early access
        </a>
      </header>

      <main>
        {/* Hero */}
        <section className={`border-b ${rule} pt-[72px]`} aria-labelledby="hero-headline">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-10 pt-8 lg:grid-cols-[1fr_minmax(300px,440px)] lg:gap-16 lg:pb-14 lg:pt-12 mobile:px-4">
            <div className="order-2 flex flex-col lg:order-1 lg:pt-2">
              <div className="flex animate-fade-up items-center gap-2.5 opacity-0">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-relay-accent" aria-hidden />
                <span className={`font-mono text-[10px] uppercase tracking-[0.14em] ${dim}`}>
                  Private Beta · Texas
                </span>
              </div>

              <h1
                id="hero-headline"
                className="mt-3 animate-fade-up font-serif text-[clamp(40px,5vw,68px)] leading-[1.04] tracking-[-0.03em] text-relay-cream opacity-0 [animation-delay:50ms]"
              >
                Legal AI.
                <br />
                <em className={`italic ${muted}`}>Private by default.</em>
              </h1>

              <p
                className={`mt-4 max-w-md animate-fade-up text-[15px] leading-[1.7] ${muted} mb-auto opacity-0 [animation-delay:110ms]`}
              >
                Relay is a fully local AI platform for law firms that keeps all
                client data on your own server — never ours — while giving
                attorneys an intelligent assistant with full context of their
                uploaded files to automate billing, accelerate research, and
                handle day-to-day tasks without ever compromising
                confidentiality.
              </p>

              <div
                className="mt-8 animate-fade-up rounded-sm border border-[rgba(26,24,21,0.22)] bg-relay-elevated shadow-[0_1px_3px_rgba(26,24,21,0.07)] opacity-0 [animation-delay:160ms]"
              >
                <div className="grid grid-cols-3 gap-4 px-6 py-5 mobile:grid-cols-1 mobile:gap-5">
                  <StatBlock value="10h" label="reconstructing per month" />
                  <StatBlock value="$1.2k" label="missed billing, avg. solo" />
                  <StatBlock value="0" label="data sent externally" />
                </div>
              </div>
            </div>

            <aside
              id="waitlist"
              className={`order-1 animate-fade-up rounded-lg border ${rule} bg-relay-elevated p-6 opacity-0 shadow-[0_2px_8px_rgba(26,24,21,0.06)] [animation-delay:90ms] lg:order-2 lg:sticky lg:top-28`}
              aria-labelledby="waitlist-heading"
            >
              <h2
                id="waitlist-heading"
                className="font-serif text-xl tracking-[-0.02em] text-relay-cream"
              >
                Request early access
              </h2>
              <p className={`mt-1.5 text-[13px] leading-relaxed ${muted}`}>
                Pilot cohort · Texas solos & small firms. No spam.
              </p>
              <div className="mt-5">
                <ClerkWaitlist />
              </div>
            </aside>
          </div>
        </section>

        {/* Platform / Bento */}
        <section className={`border-b ${rule} py-16 mobile:py-12`} aria-label="Platform features">
          <div className="mx-auto max-w-6xl px-6 mobile:px-4">
            <span className={`font-mono text-[10px] uppercase tracking-[0.14em] ${dim}`}>
              Platform
            </span>

            <div className="mt-6 grid grid-cols-3 gap-3 mobile:grid-cols-1">
              {/* Knowledge — col-span-2 */}
              <div className="relative col-span-2 overflow-hidden rounded-sm border-t-[3px] border-t-relay-accent bg-relay-elevated p-7 ring-1 ring-inset ring-[rgba(26,24,21,0.1)] mobile:col-span-1">
                <div className="pointer-events-none absolute right-0 top-0 opacity-[0.18]">
                  <RuledPaperArt className="h-auto w-[220px]" />
                </div>
                <div className="relative">
                  <KnowledgeIcon className="h-9 w-9 text-relay-accent" />
                  <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.1em] text-relay-accent">
                    Knowledge
                  </span>
                  <h3 className="mt-2 font-serif text-xl leading-snug tracking-[-0.02em] text-relay-cream">
                    Your firm&apos;s expertise, instantly searchable
                  </h3>
                  <p className={`mt-3 text-[14px] leading-[1.7] ${muted}`}>
                    Your firm accumulates expertise with every matter — research
                    memos, successful arguments, precedent analysis. Relay
                    indexes all of it. When you open a new matter, relevant
                    precedents surface automatically. Ask a question and Relay
                    searches every document your firm has ever produced, ranked
                    by relevance to the query.
                  </p>
                </div>
              </div>

              {/* Billing — col-span-1 */}
              <div className="relative col-span-1 overflow-hidden rounded-sm border-t-[3px] border-t-relay-rose bg-relay-elevated p-7 ring-1 ring-inset ring-[rgba(26,24,21,0.1)]">
                <div className="pointer-events-none absolute right-0 top-0 opacity-[0.14]">
                  <DraftingGridArt className="h-auto w-[260px]" />
                </div>
                <div className="relative">
                  <BillingIcon className="h-9 w-9 text-relay-rose" />
                  <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.1em] text-relay-rose">
                    Billing
                  </span>
                  <h3 className="mt-2 font-serif text-xl leading-snug tracking-[-0.02em] text-relay-cream">
                    Billing entries that write themselves
                  </h3>
                  <p className={`mt-3 text-[14px] leading-[1.7] ${muted}`}>
                    Relay captures activity from documents you edited, research
                    you ran, and meetings you logged — and converts that into
                    draft billing entries formatted to ABA standards. Review and
                    approve entries in bulk. Nothing is submitted until you
                    confirm it.
                  </p>
                </div>
              </div>

              {/* Research — col-span-1 */}
              <div className="col-span-1 rounded-sm border-t-[3px] border-t-[#3D6B52] bg-relay-elevated p-7 ring-1 ring-inset ring-[rgba(26,24,21,0.1)]">
                <ResearchIcon className="h-9 w-9 text-[#3D6B52]" />
                <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.1em] text-[#3D6B52]">
                  Research
                </span>
                <h3 className="mt-2 font-serif text-xl leading-snug tracking-[-0.02em] text-relay-cream">
                  Case law and precedent on demand
                </h3>
                <p className={`mt-3 text-[14px] leading-[1.7] ${muted}`}>
                  Ask in plain language. Relay searches across your uploaded
                  case files, firm documents, and connected legal databases,
                  returning cited analysis you can drop directly into a brief.
                </p>
              </div>

              {/* Workflows — col-span-2 */}
              <div className="col-span-2 rounded-sm border-t-[3px] border-t-[#1E3A5F] bg-relay-elevated p-7 ring-1 ring-inset ring-[rgba(26,24,21,0.1)] mobile:col-span-1">
                <WorkflowsIcon className="h-9 w-9 text-[#1E3A5F]" />
                <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.1em] text-[#1E3A5F]">
                  Workflows
                </span>
                <h3 className="mt-2 font-serif text-xl leading-snug tracking-[-0.02em] text-relay-cream">
                  Multi-step tasks, executed without hand-holding
                </h3>
                <p className={`mt-3 text-[14px] leading-[1.7] ${muted}`}>
                  Define a process once — intake a new matter, prepare a
                  filing, review a contract — and Relay runs it step by step.
                  Every action is logged and reversible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className={`border-b ${rule} py-16 mobile:py-12`} aria-label="Security">
          <div className="mx-auto max-w-6xl px-6 mobile:px-4">
            <span className={`font-mono text-[10px] uppercase tracking-[0.14em] ${dim}`}>
              Security
            </span>
            <h2 className="mt-3 font-serif text-[clamp(24px,2.8vw,36px)] leading-snug tracking-[-0.025em] text-relay-cream">
              Built for privilege. Not just policy.
            </h2>
            <p className={`mt-3 max-w-xl text-[15px] leading-[1.7] ${muted}`}>
              Every architectural decision prioritizes confidentiality. There is
              no version of Relay that phones home — it is not a design
              constraint, it is a design choice.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4 mobile:grid-cols-1">
              {securityCards.map((card) => (
                <div
                  key={card.title}
                  className={`rounded-sm border-l-[2px] border-l-relay-accent/60 bg-relay-elevated px-5 py-4 ring-1 ring-inset ring-[rgba(26,24,21,0.08)]`}
                >
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-relay-cream">
                    {card.title}
                  </p>
                  <p className={`mt-2 text-[13px] leading-[1.7] ${muted}`}>
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer
        className={`flex flex-wrap items-center justify-between gap-6 px-6 py-10 text-[11px] ${dim} mobile:px-4`}
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
            className="text-inherit underline-offset-2 transition-colors hover:text-relay-cream"
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
      <p className="font-serif text-3xl tracking-[-0.02em] text-relay-cream">
        {value}
      </p>
      <p className={`mt-1 font-mono text-[10px] uppercase leading-snug tracking-[0.06em] ${dim}`}>
        {label}
      </p>
    </div>
  );
}
