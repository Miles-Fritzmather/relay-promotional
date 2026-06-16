"use client";

import confetti from "canvas-confetti";
import { useEffect, useRef, useState } from "react";

/* ─── Confetti ─── */
function fireConfetti() {
  const colors = ["#d9743f", "#e89866", "#faf7f0", "#b85a28", "#c79a4a"];
  const common = { particleCount: 60, spread: 70, startVelocity: 55, ticks: 200, colors, scalar: 0.9 };
  confetti({ ...common, origin: { x: 0, y: 1 }, angle: 60 });
  confetti({ ...common, origin: { x: 1, y: 1 }, angle: 120 });
  setTimeout(() => {
    confetti({ ...common, particleCount: 40, origin: { x: 0, y: 1 }, angle: 60 });
    confetti({ ...common, particleCount: 40, origin: { x: 1, y: 1 }, angle: 120 });
  }, 180);
}

/* ─── Scroll Reveal ─── */
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Hero anim trigger ─── */
function useHeroAnim() {
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => document.body.setAttribute("data-anim-ready", ""))
    );
    return () => {
      cancelAnimationFrame(id);
      document.body.removeAttribute("data-anim-ready");
    };
  }, []);
}

/* ─── Live "0 KB sent" status counter ─── */
function useLiveStatus() {
  const [uptime, setUptime] = useState("00:00");
  useEffect(() => {
    let secs = 0;
    const id = setInterval(() => {
      secs++;
      const mm = String(Math.floor(secs / 60)).padStart(2, "0");
      const ss = String(secs % 60).padStart(2, "0");
      setUptime(`${mm}:${ss}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return uptime;
}

/* ─── SVG helpers ─── */
const CheckSmSvg = () => (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8.5l3.2 3L13 5" />
  </svg>
);
const MailSvg = () => (
  <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="4" width="13" height="10" rx="1.5" />
    <path d="M3 5.5l6 4 6-4" />
  </svg>
);
const WebSvg = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.6 2.5 2.6 15.5 0 18" />
    <path d="M12 3c-2.6 2.5-2.6 15.5 0 18" />
  </svg>
);
const MacSvg = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="4.5" />
    <path d="M12 3.5v8" />
    <path d="M7 8.5v1.4" />
    <path d="M16 8.5v1.4" />
    <path d="M8 14.5c1.6 1.7 6.4 1.7 8 0" />
  </svg>
);
const WindowsSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="8" height="8" />
    <rect x="13" y="3" width="8" height="8" />
    <rect x="3" y="13" width="8" height="8" />
    <rect x="13" y="13" width="8" height="8" />
  </svg>
);

/* ─── Brand mark ─── */
const Brand = ({ className = "brand" }: { className?: string }) => (
  <a className={className} href="#top" aria-label="Relay">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className="brand-mark" src="/relay-logos/white_relay.svg" alt="Relay" />
  </a>
);

/* ─── Waitlist Form ─── */
function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const val = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.style.transition = "box-shadow 200ms";
        inputRef.current.style.boxShadow = "0 0 0 2px rgba(217,116,63,0.5)";
        setTimeout(() => { if (inputRef.current) inputRef.current.style.boxShadow = ""; }, 900);
      }
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: val }),
      });
    } catch {}
    setName(val.split("@")[0]);
    setSent(true);
    setLoading(false);
    setEmail("");
    fireConfetti();
  }

  return (
    <form
      ref={formRef}
      id="cta-form"
      className={`cmd-input reveal${sent ? " sent" : ""}`}
      style={{ ["--delay" as string]: "180ms" }}
      onSubmit={handleSubmit}
      noValidate
    >
      <span className="cmd-icon" aria-hidden="true"><MailSvg /></span>
      <input
        ref={inputRef}
        type="email"
        placeholder={sent ? `See you soon, ${name}` : "you@yourfirm.com"}
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
      />
      <span className="kbd-hint">↵ to send</span>
      <button type="submit" disabled={loading}>
        {sent ? (
          <>On the list <CheckSmSvg /></>
        ) : loading ? (
          "Joining…"
        ) : (
          <>Join the Waitlist <span className="arr">→</span></>
        )}
      </button>
    </form>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  useHeroAnim();
  useScrollReveal();
  const uptime = useLiveStatus();

  return (
    <>
      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <Brand />
          <div className="nav-links">
            <a href="#features"><span className="num">i.</span>Practice</a>
            <a href="#privacy"><span className="num">ii.</span>Doctrine</a>
            <a href="#pricing"><span className="num">iii.</span>Retainer</a>
            <a href="#waitlist"><span className="num">iv.</span>Access</a>
          </div>
          <div className="nav-right">
            <a href="#waitlist" className="nav-cta">
              Join the Waitlist <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="top">
        <div className="wrap hero-inner">
          <div className="lockup">
            <div className="kicker">
              <span className="dot" />
              Now in early access · Web, macOS &amp; Windows
            </div>

            <h1 className="display h1">
              Counsel<br />
              that <em>never</em> leaves<br />
              your machine.
              <span className="smalls">A local-first AI &nbsp;§&nbsp; for the practice of law</span>
            </h1>

            <p className="lede">
              Relay runs entirely on your hardware. Upload anything. Track everything.
              Share nothing. Built for attorneys who truly care about their client&apos;s privacy.
            </p>

            <div className="hero-ctas">
              <a href="#waitlist" className="btn-primary">
                Join the Waitlist
                <span className="arr">→</span>
              </a>
            </div>

            <div className="platforms" aria-label="Available on Web, macOS, and Windows">
              <span className="lbl">Available on</span>
              <span className="plat"><WebSvg />Web</span>
              <span className="plat"><MacSvg />macOS</span>
              <span className="plat"><WindowsSvg />Windows</span>
            </div>
          </div>
        </div>

        <div className="showcase">
          {/* floating sub-cards */}
          <div className="float float-cite" aria-hidden="true">
            <div className="float-head"><span>Citation</span><span className="badge">Check Passed</span></div>
            <div className="float-body">
              <p className="cite-name">City of Paris v. Abbott,<br />360 S.W.3d 567, 580–81</p>
              <span className="cite-check">
                <CheckSmSvg />
                Verified locally
              </span>
            </div>
          </div>

          <div className="float float-billing" aria-hidden="true">
            <div className="fb-head"><span>Today&apos;s tracking</span><span className="live-dot">● LIVE</span></div>
            <div className="fb-rows">
              <div className="fb-row"><span className="matter">Thorngate v. Meridian</span><span className="hrs">2.4h</span><span className="amt">$840</span></div>
              <div className="fb-row"><span className="matter">Rivera Estate</span><span className="hrs">1.1h</span><span className="amt">$385</span></div>
              <div className="fb-row"><span className="matter">Jones Patent</span><span className="hrs">0.6h</span><span className="amt">$210</span></div>
            </div>
          </div>

          <div className="float-status" aria-hidden="true">
            <span className="ok-dot" />
            0 KB sent · uptime {uptime} · local model
          </div>

          <div className="showcase-main">
            <div className="showcase-bar">
              <div className="lights"><span /><span /><span /></div>
              <div className="showcase-title">relay · Thorngate v. Meridian</div>
              <div style={{ width: 50 }} />
            </div>
            <div className="showcase-screen">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/showcase/showcase-main.png" alt="Relay matter workspace for Thorngate v. Meridian, with a sidebar of matters, recent chats, knowledge base, and document library." />
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="strip" aria-hidden="true">
        <div className="strip-inner">
          {[0, 1].map((dup) => (
            <span key={dup} style={{ display: "inline-flex", alignItems: "center" }}>
              <span className="item serif">Local-first.</span><span className="dot">❦</span>
              <span className="item mono">Bar-compliant by default</span><span className="dot">·</span>
              <span className="item serif">No cloud, ever.</span><span className="dot">❦</span>
              <span className="item mono">Privileged by design</span><span className="dot">·</span>
              <span className="item serif">Runs on your hardware.</span><span className="dot">❦</span>
              <span className="item mono">Built for civil litigation</span><span className="dot">·</span>
              <span className="item serif">Discovery-safe.</span><span className="dot">❦</span>
              <span className="item mono">Air-gapped capable</span><span className="dot">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className="features" id="features">
        <div className="wrap">
          <div className="orn reveal" style={{ marginBottom: 96 }}>
            <span className="glyph">§</span>
            <span className="mono">The Practice</span>
            <span className="glyph">§</span>
          </div>

          {/* BOOK I — Filing Confidence */}
          <div className="feature-row reveal">
            <div className="feature-copy">
              <div className="feature-meta">
                <span className="roman">I.</span>
                <div className="meta-text">
                  <div className="book">Book I &nbsp;·&nbsp; Of Filings</div>
                  <div className="tag">Smart filing</div>
                </div>
              </div>
              <h2 className="display h2">File with <em>confidence.</em></h2>
              <p className="lede">Check every citation. Generate tables of contents and authorities in seconds. Evaluate argument strength before opposing counsel does, all without leaving your draft.</p>
              <ul className="feature-bullets">
                <li><span className="marker">¶ 1</span><span><b>Citation verification</b> flags shepardized changes against the offline reporter snapshot bundled with Relay.</span></li>
                <li><span className="marker">¶ 2</span><span><b>One-click TOA &amp; TOC</b>, extracted in your firm&apos;s house style. Export to .docx with formatting intact.</span></li>
                <li><span className="marker">¶ 3</span><span><b>Argument strength scoring</b> gives an objective read on which arguments carry weight, computed locally.</span></li>
              </ul>
            </div>
            <div className="feature-art">
              <div className="stamp" aria-hidden="true"><div className="inner">Relay<b>§ I</b>Filings</div></div>
              <div className="feature-art-bar">
                <div className="lights"><span /><span /><span /></div>
                <span className="label">citation check · Thorngate v. Meridian</span>
              </div>
              <div className="feature-art-screen" style={{ background: "#fff" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/showcase/citation.png" alt="Citation check panel showing case citation City of Paris v. Abbott alongside brief excerpt." style={{ top: 0, left: 0, width: "100%" }} />
              </div>
            </div>
          </div>

          {/* BOOK II — Document Analysis */}
          <div className="feature-row flip reveal">
            <div className="feature-copy">
              <div className="feature-meta">
                <span className="roman">II.</span>
                <div className="meta-text">
                  <div className="book">Book II &nbsp;·&nbsp; Of Matters</div>
                  <div className="tag">Document analysis</div>
                </div>
              </div>
              <h2 className="display h2">A matter that <em>thinks</em> with you.</h2>
              <p className="lede">Drop in a complaint, a deposition, a 4,000-page production. Relay reads it where it sits, on your own disk, and surfaces what changes the case.</p>
              <ul className="feature-bullets">
                <li><span className="marker">¶ 1</span><span><b>Deposition inconsistency detection</b> surfaces conflicts with documented timelines.</span></li>
                <li><span className="marker">¶ 2</span><span><b>Visualizations on demand</b> generate timelines, party diagrams, and demonstratives from extracted facts.</span></li>
                <li><span className="marker">¶ 3</span><span><b>Matter-level memory</b> means Relay remembers parties, deadlines, and strategy across every chat.</span></li>
              </ul>
            </div>
            <div className="feature-art">
              <div className="stamp gold" aria-hidden="true"><div className="inner">Relay<b>§ II</b>Matters</div></div>
              <div className="feature-art-bar">
                <div className="lights"><span /><span /><span /></div>
                <span className="label">matter workspace · ask anything</span>
              </div>
              <div className="feature-art-screen" style={{ background: "#f3efe4" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/showcase/matter.png" alt="Relay 'Ask me anything about your matter' prompt with first-upload suggestions and reminders." style={{ top: "5%", left: "4%", width: "92%" }} />
              </div>
            </div>
          </div>

          {/* BOOK III — Billing */}
          <div className="feature-row reveal">
            <div className="feature-copy">
              <div className="feature-meta">
                <span className="roman">III.</span>
                <div className="meta-text">
                  <div className="book">Book III &nbsp;·&nbsp; Of Hours</div>
                  <div className="tag">Billing</div>
                </div>
              </div>
              <h2 className="display h2">Passive billing that <em>finds the hours</em> you lost.</h2>
              <p className="lede">Relay watches your work across matters, quietly and locally, and builds accurate time entries in the background. Review weekly. Bill on your schedule.</p>
              <ul className="feature-bullets">
                <li><span className="marker">¶ 1</span><span><b>Activity capture</b> matches windows, files, and email subjects to matters automatically.</span></li>
                <li><span className="marker">¶ 2</span><span><b>Confidence flags</b> surface low-confidence entries for your review before export.</span></li>
                <li><span className="marker">¶ 3</span><span><b>Export-ready entries</b> push to Clio, PracticePanther, or a clean CSV.</span></li>
              </ul>
            </div>
            <div className="feature-art">
              <div className="stamp gold" aria-hidden="true"><div className="inner">Relay<b>§ III</b>Billing</div></div>
              <div className="feature-art-bar">
                <div className="lights"><span /><span /><span /></div>
                <span className="label">billing · review &amp; approve</span>
              </div>
              <div className="feature-art-screen" style={{ background: "#f3efe4" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/showcase/billing.png" alt="Billing review screen showing tracked time entries grouped by matter with hours, rate, and amount." style={{ top: "-4%", left: 0, width: "100%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRIVACY DOCTRINE ── */}
      <section className="privacy" id="privacy">
        <div className="privacy-inner">
          <div className="wrap privacy-head reveal">
            <span className="mono">The Privacy Doctrine</span>
            <h2 className="display h2">
              We never see <em>anything.</em>
              <br />
              <span style={{ opacity: 0.45 }}>By design, not by policy.</span>
            </h2>
            <p>Every guarantee below is enforced at the <em>architecture</em> layer, not the contract layer. Pull the network cable and Relay still works.</p>
          </div>

          <div className="doctrine reveal" style={{ ["--delay" as string]: "100ms" }}>
            <div className="article">
              <div className="num">I.<small>Inference</small></div>
              <div className="copy">
                <h4>Inference is <em>local.</em></h4>
                <p>Every AI inference runs on the computer in your office. No prompt, no document, no thought leaves the machine. <strong>Verify with your own packet capture.</strong></p>
              </div>
            </div>
            <div className="article">
              <div className="num">II.<small>Storage</small></div>
              <div className="copy">
                <h4>Storage is <em>local.</em></h4>
                <p>Briefs, contracts, depositions, and the matter knowledge base live in an encrypted vault on your disk. <strong>We don&apos;t have credentials, and we couldn&apos;t decrypt them if subpoenaed.</strong></p>
              </div>
            </div>
            <div className="article">
              <div className="num">III.<small>Training</small></div>
              <div className="copy">
                <h4>Training is <em>not</em> on your data.</h4>
                <p>Your work product is never used to train, fine-tune, or evaluate any model, whether ours or anyone else&apos;s. <strong>Telemetry is opt-in, anonymous, and limited to crash reports.</strong></p>
              </div>
            </div>
            <div className="article">
              <div className="num">IV.<small>Compliance</small></div>
              <div className="copy">
                <h4>Compliance is the <em>default</em> state.</h4>
                <p>Relay&apos;s architecture maps cleanly to ABA Model Rule 1.6 and the analogous state rules. <strong>No additional configuration, no enterprise plan, no &ldquo;private mode&rdquo; toggle to forget.</strong></p>
              </div>
            </div>

            <div className="affidavit reveal" style={{ ["--delay" as string]: "200ms" }}>
              <span className="sig">Enforced in code, not in a contract.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING / RETAINER ── */}
      <section className="pricing" id="pricing">
        <div className="wrap">
          <div className="pricing-head reveal">
            <span className="mono coral">The Retainer</span>
            <h2 className="display h2">One price. <em>No usage games.</em></h2>
            <p>No per-query charges. No contacting sales. Unlimited everything, forever at an affordable price.</p>
          </div>

          <div className="retainer reveal" style={{ ["--delay" as string]: "100ms" }}>
            <div className="retainer-head">
              <div className="doc-no">Early adopter pricing <b>№ 2026-EA-001</b></div>
              <div className="seal-mini">Limited time</div>
            </div>
            <div className="retainer-grid">
              <div className="retainer-left">
                <h3>Simple <em>pricing.</em></h3>
                <div className="sub">Per user &nbsp;·&nbsp; billed monthly</div>

                <div className="price-rows">
                  <div>
                    <div className="label">Early adopter</div>
                    <div className="amount"><em>$50</em><span className="per">/mo</span></div>
                    <div className="unit">per user · $0 setup</div>
                  </div>
                  <div>
                    <div className="label strike">Standard</div>
                    <div className="amount muted"><span className="crossit">$200</span><span className="per">/mo</span></div>
                    <div className="unit">per user · $2,000 setup</div>
                  </div>
                </div>

                <div className="terms">
                  <p>Lock in early adopter pricing today. <em>Held for the life of your subscription</em>. No annual price hikes, no surprise tiering.</p>
                </div>
              </div>

              <div className="retainer-right">
                <div className="feat-list-label">What&apos;s included</div>
                <ul className="feat-list">
                  <li><span className="num">a.</span><span><em>Tables</em> of contents &amp; authorities, generated</span></li>
                  <li><span className="num">b.</span><span><em>Unlimited</em> case queries</span></li>
                  <li><span className="num">c.</span><span><em>Automatic</em> time tracking &amp; billing export</span></li>
                  <li><span className="num">d.</span><span><em>Unlimited</em> document uploads</span></li>
                  <li><span className="num">e.</span><span><em>Matter-level</em> workspaces</span></li>
                  <li><span className="num">f.</span><span><em>Future</em> features at competitive pricing</span></li>
                </ul>
                <a href="/billing" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Get started
                  <span className="arr">→</span>
                </a>
                <a href="#waitlist" className="retainer-secondary">or join the waitlist</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="cta" id="waitlist">
        <div className="wrap cta-inner">
          <div className="orn reveal" style={{ marginBottom: 28 }}>
            <span className="mono coral">Early Access</span>
          </div>
          <h2 className="display h2 reveal" style={{ ["--delay" as string]: "60ms" }}>Be <em>first</em> in line.</h2>
          <p className="lede reveal" style={{ ["--delay" as string]: "120ms" }}>
            Rolling out to a small group of attorneys and support staff.
            Join the waitlist and lock in <em>early access</em> pricing.
          </p>
          <WaitlistForm />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <div>
              <Brand />
              <p className="footer-tagline">The AI counsel that runs entirely on your machine.</p>
            </div>
            <div>
              <h5>Practice</h5>
              <ul>
                <li><a href="#features">Filings</a></li>
                <li><a href="#features">Matters</a></li>
                <li><a href="#features">Research</a></li>
                <li><a href="#features">Billing</a></li>
              </ul>
            </div>
            <div>
              <h5>Company</h5>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="mailto:support@relay-law.com">Contact</a></li>
                <li><a href="#">Security</a></li>
                <li><a href="#privacy">Doctrine</a></li>
              </ul>
            </div>
            <div>
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">System requirements</a></li>
                <li><a href="#">Privacy whitepaper</a></li>
                <li><a href="#pricing">Retainer</a></li>
              </ul>
            </div>
          </div>

          <div className="colophon">
            {/* <div className="megabrand" aria-hidden="true">Relay.</div> */}
            <div className="colophon-bar">
              <span>© 2026 · Relay Legal Technologies, Inc.</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
