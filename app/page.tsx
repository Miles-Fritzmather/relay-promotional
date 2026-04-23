"use client";

import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import Image from "next/image";

/** Brand-adjacent bursts from both bottom corners after waitlist signup (`canvas-confetti`). */
function fireWaitlistConfetti() {
	const colors = [
		"#ff5a3c",
		"#22d3ee",
		"#fde047",
		"#fffef5",
		"#c4f464",
		"#ff7eb9",
	];
	const burst = {
		particleCount: 175,
		spread: 78,
		startVelocity: 48,
		gravity: 0.88,
		ticks: 260,
		colors,
		disableForReducedMotion: true,
		zIndex: 9999,
	};
	void confetti({
		...burst,
		origin: { x: 0.02, y: 0.98 },
		angle: 58,
	});
	void confetti({
		...burst,
		origin: { x: 0.98, y: 0.98 },
		angle: 122,
	});
}

function useScrollReveal() {
	useEffect(() => {
		const reveals = document.querySelectorAll(".reveal");
		const obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry, i) => {
					if (entry.isIntersecting) {
						setTimeout(() => entry.target.classList.add("visible"), i * 60);
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		reveals.forEach((el) => obs.observe(el));
		return () => obs.disconnect();
	}, []);
}

function WaitlistForm({
	pill = false,
	buttonLabel = "Request Access",
	noteText,
}: {
	pill?: boolean;
	buttonLabel?: string;
	noteText?: string;
}) {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		try {
			await fetch("/api/waitlist", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
		} catch {
			// best-effort — still show success
		}
		void fireWaitlistConfetti();
		setSubmitted(true);
		setLoading(false);
	}

	if (submitted) {
		return (
			<div
				className="flex items-center gap-2.5 font-medium"
				style={{ color: "var(--coral)" }}
			>
				<div
					className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[13px]"
					style={{
						background: "color-mix(in srgb, var(--coral) 15%, transparent)",
					}}
				>
					✓
				</div>
				{"Glad to see you're interested! We'll be in touch soon enough."}
			</div>
		);
	}

	if (pill) {
		return (
			<div className="relative z-10 w-full px-4 sm:px-0" style={{ maxWidth: "clamp(300px, 50vw, 560px)" }}>
				<form onSubmit={handleSubmit}>
					{/* On small screens, separate the button from the text field */}
					<div
						className="
							flex flex-col sm:flex-row
							overflow-hidden rounded-full bg-white
						"
						style={{
							border: "1.5px solid var(--coral)",
							boxShadow:
								"0 4px 32px color-mix(in srgb, var(--coral) 18%, transparent)",
						}}
					>
						<input
							type="email"
							placeholder="your@firm.com"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="min-w-0 flex-1 bg-transparent px-5 py-3.5 font-sans text-[clamp(0.85rem,1.2vw,1rem)] text-relay-ink outline-none placeholder:text-relay-ink-3"
						/>
						{/* Show button inline on sm+ screens only */}
						<button
							type="submit"
							disabled={loading}
							className="
								hidden sm:inline-block m-1 rounded-full px-6 py-3 font-sans text-[0.9rem] font-medium text-white
								transition-all disabled:opacity-70
								w-auto
							"
							style={{ background: "var(--coral)" }}
							onMouseEnter={(e) =>
								((e.target as HTMLElement).style.background =
									"oklch(54% 0.195 30)")
							}
							onMouseLeave={(e) =>
								((e.target as HTMLElement).style.background = "var(--coral)")
							}
						>
							{loading ? "Joining…" : buttonLabel}
						</button>
					</div>
					{/* Button as its own row on small screens only */}
					<button
						type="submit"
						disabled={loading}
						className="
							mt-2 sm:hidden w-full rounded-full px-6 py-3 font-sans text-[0.9rem] font-medium text-white
							transition-all disabled:opacity-70
							block
						"
						style={{ background: "var(--coral)" }}
						onMouseEnter={(e) =>
							((e.target as HTMLElement).style.background =
								"oklch(54% 0.195 30)")
						}
						onMouseLeave={(e) =>
							((e.target as HTMLElement).style.background = "var(--coral)")
						}
					>
						{loading ? "Joining…" : buttonLabel}
					</button>
				</form>
				{noteText && (
					<p className="mt-4 text-[0.78rem] text-relay-ink-3 text-center">{noteText}</p>
				)}
			</div>
		);
	}

	// Responsive layout for main form: stack vertically on small screens
	return (
		<form onSubmit={handleSubmit} className="mx-auto w-full max-w-[480px]">
			<div className="flex flex-col sm:flex-row gap-2.5">
				<input
					type="email"
					placeholder="your@firm.com"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="
						flex-1 rounded-[6px] bg-white px-5 py-3.5 font-sans text-[0.95rem]
						text-relay-ink outline-none transition-colors placeholder:text-relay-ink-3
						border-[1.5px]
						border-solid
						border-[color-mix(in_srgb,var(--ink)_18%,transparent)]
						sm:mb-0 mb-2
					"
					style={{
						border:
							"1.5px solid color-mix(in srgb, var(--ink) 18%, transparent)",
					}}
					onFocus={(e) => (e.target.style.borderColor = "var(--coral)")}
					onBlur={(e) =>
						(e.target.style.borderColor =
							"color-mix(in srgb, var(--ink) 18%, transparent)")
					}
				/>
				<button
					type="submit"
					disabled={loading}
					className="
						whitespace-nowrap rounded-[6px] px-7 py-3.5 font-sans text-[0.95rem] font-medium text-white
						transition-all disabled:opacity-70
						w-full sm:w-auto
					"
					style={{ background: "var(--coral)" }}
					onMouseEnter={(e) =>
						((e.target as HTMLElement).style.background = "oklch(54% 0.195 30)")
					}
					onMouseLeave={(e) =>
						((e.target as HTMLElement).style.background = "var(--coral)")
					}
				>
					{loading ? "Joining…" : buttonLabel}
				</button>
			</div>
		</form>
	);
}

const features = [
	{
		num: "01",
		accent: "var(--coral)",
		title: "Filing Confidence",
		body: "Check citations, generate tables of contents and authorities, and evaluate argument strength — all in one place. File with confidence.",
		tag: "Smart Filing",
		tagBg: "color-mix(in srgb, var(--coral) 12%, transparent)",
		tagColor: "var(--coral)",
	},
	{
		num: "02",
		accent: "var(--gold)",
		title: "Case Analysis",
		body: "Upload and analyze documents in a secure, local system — not the cloud. Generate charts and visualizations for presentations, and extract insights from deposition transcripts.",
		tag: "Document Analysis",
		tagBg: "color-mix(in srgb, var(--gold) 12%, transparent)",
		tagColor: "var(--gold)",
	},
	{
		num: "03",
		accent: "var(--teal)",
		title: "Case Research",
		body: "AI-powered legal research that understands jurisdiction, precedent, and the nuances of your matter. Find relevant cases and statutes without leaving your desk.",
		tag: "Legal Research",
		tagBg: "color-mix(in srgb, var(--teal) 12%, transparent)",
		tagColor: "var(--teal)",
	},
	{
		num: "04",
		accent: "var(--ink-3)",
		title: "Automatic Time Tracking",
		body: "Passive, always-on billing capture. Relay watches your activity across matters and builds accurate time entries in the background — reviewed and billed on your schedule.",
		tag: "Billing",
		tagBg: "color-mix(in srgb, var(--ink) 8%, transparent)",
		tagColor: "var(--ink-2)",
	},
];

const privacyPillars = [
	{
		title: "No cloud processing",
		accent: "var(--coral)",
		body: "Every AI inference runs on your local hardware. Documents never travel over a network to reach a model.",
	},
	{
		title: "No training on your data",
		accent: "var(--teal)",
		body: "Your briefs, contracts, and research are never used to train or improve any external model. Ever.",
	},
	{
		title: "Bar-compliant by default",
		accent: "var(--gold)",
		body: "Your work stays yours: designed with confidentiality in mind. Relay is the AI that keeps your data on your machine.",
	},
];

const planFeatures = [
	"Table of contents generation",
	"Table of authorities",
	"Unlimited case research",
	"Automatic time tracking & billing export",
	"Unlimited document uploads",
	"Matter-level workspaces",
	"Access to future features at competitive pricing",
];

export default function Home() {
	useScrollReveal();

	return (
		<>
			{/* ── NAV ── */}
			<nav
				className="fixed left-0 right-0 top-0 z-[100] flex h-16 items-center justify-between px-6 sm:px-12"
				style={{
					background: "color-mix(in srgb, var(--cream) 88%, transparent)",
					backdropFilter: "blur(12px)",
					borderBottom:
						"1px solid color-mix(in srgb, var(--ink) 8%, transparent)",
				}}
			>
				<a href="#" className="no-underline flex items-center">
					<Image
						src="/relay-logos/black_relay.svg"
						alt="Relay"
						width={110}
						height={28}
						priority
					/>
				</a>
				<div className="flex items-center gap-4 sm:gap-8">
					<a
						href="#features"
						className="hidden sm:block text-sm text-relay-ink-2 transition-colors hover:text-relay-ink"
					>
						Features
					</a>
					<a
						href="#pricing"
						className="hidden sm:block text-sm text-relay-ink-2 transition-colors hover:text-relay-ink"
					>
						Pricing
					</a>
					<a
						href="#waitlist"
						className="rounded-[6px] px-4 sm:px-5 py-1.5 text-sm font-medium transition-all no-underline"
						style={{
							border: "1.5px solid var(--coral)",
							color: "var(--coral)",
							background: "transparent",
						}}
						onMouseEnter={(e) => {
							const el = e.currentTarget;
							el.style.background = "var(--coral)";
							el.style.color = "#fff";
						}}
						onMouseLeave={(e) => {
							const el = e.currentTarget;
							el.style.background = "transparent";
							el.style.color = "var(--coral)";
						}}
					>
						Join Waitlist
					</a>
				</div>
			</nav>

			{/* ── HERO ── */}
			<section className="hero-bg relative overflow-hidden flex min-h-screen flex-col items-center justify-center px-6 pb-12 pt-[100px] sm:px-12 sm:pb-20 sm:pt-[120px] text-center">
				<h1
					className="relative z-10 font-serif font-medium leading-[1.1] tracking-[-0.02em]"
					style={{
						fontSize: "clamp(2.6rem, 5.5vw, 6rem)",
						maxWidth: "920px",
						width: "100%",
					}}
				>
					<span
						className="block text-right opacity-0"
						style={{
							animation: "fadeUp 0.8s 0.25s ease forwards",
						}}
					>
						Upload
					</span>
					<em
						className="block text-left font-semibold italic opacity-0"
						style={{
							color: "var(--coral)",
							animation: "fadeUp 0.8s 0.25s ease forwards",
						}}
					>
						Anything.
					</em>
					<span
						className="block text-right opacity-0"
						style={{
							animation: "fadeUp 0.9s 0.35s ease forwards",
						}}
					>
						Track
					</span>
					<em
						className="block text-left font-semibold italic opacity-0"
						style={{
							color: "var(--coral)",
							animation: "fadeUp 0.9s 0.35s ease forwards",
						}}
					>
						Everything.
					</em>
					<span
						className="block text-right opacity-0"
						style={{
							animation: "fadeUp 1s 0.45s ease forwards",
						}}
					>
						Share
					</span>
					<em
						className="block text-left font-semibold italic opacity-0"
						style={{
							color: "var(--coral)",
							animation: "fadeUp 1s 0.45s ease forwards",
						}}
					>
						Nothing.
					</em>
				</h1>

				<p
					className="relative z-10 mt-7 max-w-[560px] font-light leading-[1.7] text-relay-ink-2 opacity-0"
					style={{
						fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
						animation: "fadeUp 0.8s 0.4s ease forwards",
					}}
				>
					Relay is the AI legal assistant that runs entirely on your machine. No
					cloud. No compromise.
				</p>

				<div
					className="relative z-10 mt-12 opacity-0"
					style={{ animation: "fadeUp 0.8s 0.55s ease forwards" }}
				>
					<WaitlistForm
						pill
						buttonLabel="Join the Waitlist"
						noteText="No commitment. Early access pricing guaranteed."
					/>
				</div>

				{/* <div
					className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 opacity-0"
					style={{ animation: "fadeUp 0.8s 1.1s ease forwards" }}
				>
					<div
						className="h-10 w-px"
						style={{
							background:
								"linear-gradient(to bottom, var(--ink-3), transparent)",
							animation: "scrollPulse 2s 1.5s ease infinite",
						}}
					/>
				</div> */}
			</section>

			<div
				className="h-px"
				style={{
					background: "color-mix(in srgb, var(--ink) 10%, transparent)",
				}}
			/>

			{/* ── MISSION ── */}
			<section className="mx-auto grid max-w-[1200px] grid-cols-1 sm:grid-cols-2 items-center gap-10 sm:gap-20 px-6 sm:px-12 py-16 sm:py-[120px]">
				<div className="reveal">
					<p
						className="mb-5 text-[0.75rem] font-medium uppercase tracking-[0.12em]"
						style={{ color: "var(--coral)" }}
					>
						Our mission
					</p>
					<h2
						className="font-serif font-normal leading-[1.15] tracking-[-0.015em]"
						style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
					>
						<strong
							className="font-semibold not-italic"
							style={{ color: "var(--coral)" }}
						>
							Your
						</strong>{" "}
						AI assistant,
						<br />
						not ours.
					</h2>
				</div>
				<div className="reveal space-y-5">
					<p className="text-[1.1rem] font-light leading-[1.8] text-relay-ink-2">
						Every document you upload, every research query you run, every hour
						you log — it all{" "}
						<mark
							className="rounded-sm px-1 py-0.5"
							style={{
								background: "color-mix(in srgb, var(--coral) 15%, transparent)",
								color: "inherit",
							}}
						>
							stays on your hardware
						</mark>
						. Relay runs entirely on your local machine.
					</p>
					<p className="text-[1.1rem] font-light leading-[1.8] text-relay-ink-2">
						We built Relay with one constraint that can never be negotiated:{" "}
						<mark
							className="rounded-sm px-1 py-0.5"
							style={{
								background: "color-mix(in srgb, var(--coral) 15%, transparent)",
								color: "inherit",
							}}
						>
							we never see anything
						</mark>
						. No data ever reaches our servers. No third-party models are
						trained on your briefs. No cloud logs exist to subpoena.
					</p>
					<p className="text-[1.1rem] font-light leading-[1.8] text-relay-ink-2">
						Just a faster, smarter practice — on your terms.
					</p>
				</div>
			</section>

			<div
				className="h-px"
				style={{
					background: "color-mix(in srgb, var(--ink) 10%, transparent)",
				}}
			/>

			{/* ── FEATURES ── */}
			<section
				className="py-16 sm:py-[120px]"
				id="features"
				style={{ background: "#F3EFE4" }}
			>
				<div className="mx-auto max-w-[1200px] px-6 sm:px-12">
					<div className="reveal mb-10 sm:mb-14 flex flex-col sm:flex-row items-start sm:items-end gap-6 sm:gap-0 justify-between">
						<h2
							className="max-w-[480px] font-serif font-normal leading-[1.15] tracking-[-0.015em]"
							style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
						>
							Everything your practice
							<br />
							needs to move{" "}
							<em className="italic" style={{ color: "var(--coral)" }}>
								faster
							</em>
							.
						</h2>
						<p className="max-w-[260px] text-[0.95rem] font-light leading-[1.7] text-relay-ink-2">
							Four tools, built for the documents and workflows lawyers actually
							deal with every day.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
						{features.map((f) => (
							<div
								key={f.num}
								className="reveal group relative overflow-hidden rounded-[14px] bg-relay-cream p-6 sm:p-10 transition-all duration-300"
								style={{
									border:
										"1.5px solid color-mix(in srgb, var(--ink) 10%, transparent)",
								}}
								onMouseEnter={(e) => {
									const el = e.currentTarget;
									el.style.borderColor = "var(--coral)";
									el.style.transform = "translateY(-4px)";
									el.style.boxShadow =
										"0 16px 48px color-mix(in srgb, var(--coral) 10%, transparent)";
								}}
								onMouseLeave={(e) => {
									const el = e.currentTarget;
									el.style.borderColor =
										"color-mix(in srgb, var(--ink) 10%, transparent)";
									el.style.transform = "translateY(0)";
									el.style.boxShadow = "none";
								}}
							>
								<span
									className="absolute right-8 top-6 font-serif text-[4.5rem] font-light leading-none"
									style={{
										color: "color-mix(in srgb, var(--ink) 5%, transparent)",
									}}
								>
									{f.num}
								</span>
								<div
									className="mb-8 h-[3px] w-10 rounded-full"
									style={{ background: f.accent }}
								/>
								<h3 className="mb-3.5 font-serif text-[1.85rem] font-medium leading-[1.2] text-relay-ink">
									{f.title}
								</h3>
								<p className="text-[1rem] font-light leading-[1.8] text-relay-ink-2">
									{f.body}
								</p>
								<span
									className="mt-7 inline-block rounded-full px-3 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.08em]"
									style={{ background: f.tagBg, color: f.tagColor }}
								>
									{f.tag}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── PRIVACY ── */}
			<section className="mx-auto max-w-[1200px] px-6 sm:px-12 py-16 sm:py-[120px] text-center">
				<p
					className="reveal mb-5 text-[0.75rem] font-medium uppercase tracking-[0.12em]"
					style={{ color: "var(--coral)" }}
				>
					Why local matters
				</p>
				<h2
					className="reveal mx-auto mb-5 max-w-[600px] font-serif font-normal leading-[1.15] tracking-[-0.015em]"
					style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
				>
					Your clients trust you.
					<br />
					You should trust your tools.
				</h2>
				<p className="reveal mx-auto mb-[60px] max-w-[540px] text-[1.05rem] font-light leading-[1.8] text-relay-ink-2">
					Relay&apos;s architecture is built from the ground up to keep
					everything in your office.
				</p>
				<div className="reveal grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-7">
					{privacyPillars.map((p) => (
						<div
							key={p.title}
							className="rounded-[14px] bg-relay-cream p-6 sm:p-10 text-left transition-all duration-300"
							style={{
								border:
									"1.5px solid color-mix(in srgb, var(--ink) 10%, transparent)",
							}}
							onMouseEnter={(e) => {
								const el = e.currentTarget;
								el.style.borderColor = "var(--coral)";
								el.style.transform = "translateY(-4px)";
								el.style.boxShadow =
									"0 16px 48px color-mix(in srgb, var(--coral) 10%, transparent)";
							}}
							onMouseLeave={(e) => {
								const el = e.currentTarget;
								el.style.borderColor =
									"color-mix(in srgb, var(--ink) 10%, transparent)";
								el.style.transform = "translateY(0)";
								el.style.boxShadow = "none";
							}}
						>
							<h3 className="mb-5 font-serif text-[1.85rem] font-medium leading-[1.2] text-relay-ink">
								{p.title}
							</h3>
							<div
								className="mb-5 h-[3px] w-10 rounded-full"
								style={{ background: p.accent }}
							/>
							<p className="text-[1rem] font-light leading-[1.8] text-relay-ink-2">
								{p.body}
							</p>
						</div>
					))}
				</div>
			</section>

			<div
				className="h-px"
				style={{
					background: "color-mix(in srgb, var(--ink) 10%, transparent)",
				}}
			/>

			{/* ── PRICING ── */}
			<section
				className="px-6 sm:px-12 py-16 sm:py-[120px]"
				id="pricing"
				style={{ background: "#F3EFE4" }}
			>
				<div className="mx-auto max-w-[1200px]">
					<div className="reveal mb-[60px] text-center">
						<h2
							className="mb-4 font-serif font-normal leading-[1.15] tracking-[-0.015em]"
							style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
						>
							Simple, honest pricing.
						</h2>
						<p className="text-[1.05rem] font-light text-relay-ink-2">
							No usage fees. No per-query charges. Everything included.
						</p>
					</div>

					<div className="reveal mx-auto max-w-[860px]">
						<div
							className="flex flex-col sm:grid items-start gap-8 sm:gap-12 rounded-2xl bg-relay-cream p-8 sm:p-[52px_56px]"
							style={{
								gridTemplateColumns: "1fr auto 1fr",
								border: "1.5px solid var(--coral)",
							}}
						>
							{/* Left: pricing columns */}
							<div>
								<span
									className="mb-7 inline-block rounded-full px-3.5 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.08em] text-white"
									style={{ background: "var(--coral)" }}
								>
									Early Adopter
								</span>
								<div className="flex">
									<div className="flex-1">
										<p
											className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.1em]"
											style={{ color: "var(--coral)" }}
										>
											Early Adopter Price
										</p>
										<div
											className="font-serif text-[2.6rem] font-medium leading-[1.1]"
											style={{ color: "var(--coral)" }}
										>
											<sup className="align-super text-[1.1rem]">$</sup>0
										</div>
										<div className="mb-1 text-[0.8rem] font-light text-relay-ink-2">
											setup fee
										</div>
										<div
											className="mt-3 font-serif text-[2.6rem] font-medium leading-[1.1]"
											style={{ color: "var(--coral)" }}
										>
											<sup className="align-super text-[1.1rem]">$</sup>50
										</div>
										<div className="text-[0.8rem] font-light text-relay-ink-2">
											/ user / month
										</div>
									</div>
									<div
										className="mx-6 self-stretch"
										style={{
											width: "1px",
											background:
												"color-mix(in srgb, var(--ink) 12%, transparent)",
										}}
									/>
									<div className="flex-1">
										<p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-relay-ink-3">
											Standard Price
										</p>
										<div className="font-serif text-[2.2rem] font-light leading-[1.1] text-relay-ink-3 line-through">
											<sup className="align-super text-[1rem]">$</sup>2,000
										</div>
										<div className="mb-1 text-[0.8rem] font-light text-relay-ink-3">
											setup fee
										</div>
										<div className="mt-3 font-serif text-[2.2rem] font-light leading-[1.1] text-relay-ink-3 line-through">
											<sup className="align-super text-[1rem]">$</sup>200
										</div>
										<div className="text-[0.8rem] font-light text-relay-ink-3">
											/ user / month
										</div>
									</div>
								</div>
								<p className="mt-5 text-[0.82rem] font-light leading-[1.7] text-relay-ink-3">
									Lock in early adopter pricing by joining the waitlist. Pricing
									guaranteed for the lifetime of your subscription.
								</p>
							</div>

							{/* Divider */}
							<div
								className="hidden sm:block self-stretch"
								style={{
									width: "1px",
									background: "color-mix(in srgb, var(--ink) 10%, transparent)",
								}}
							/>

							{/* Right: features list */}
							<div>
								<ul className="space-y-3">
									{planFeatures.map((item) => (
										<li
											key={item}
											className="flex items-start gap-2.5 text-[0.9rem] font-light text-relay-ink-2"
										>
											<span
												className="mt-0.5 shrink-0 text-[0.75rem] font-medium"
												style={{ color: "var(--coral)" }}
											>
												✓
											</span>
											{item}
										</li>
									))}
								</ul>
								<a
									href="#waitlist"
									className="mt-7 block w-full rounded-[6px] py-3.5 text-center font-sans text-[0.9rem] font-medium text-white no-underline transition-all"
									style={{ background: "var(--coral)" }}
									onMouseEnter={(e) =>
										((e.currentTarget as HTMLElement).style.background =
											"oklch(54% 0.195 30)")
									}
									onMouseLeave={(e) =>
										((e.currentTarget as HTMLElement).style.background =
											"var(--coral)")
									}
								>
									Join the Waitlist
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── BOTTOM CTA ── */}
			<section
				className="bottom-cta-bg relative overflow-hidden px-6 py-20 sm:px-12 sm:py-[140px] text-center"
				id="waitlist"
			>
				<p
					className="reveal mb-4 text-[0.75rem] font-medium uppercase tracking-[0.12em]"
					style={{ color: "var(--coral)" }}
				>
					Early access
				</p>
				<h2
					className="reveal mx-auto mb-4 max-w-[560px] font-serif font-normal leading-[1.15] tracking-[-0.015em]"
					style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
				>
					Be first in line.
				</h2>
				<p className="reveal mx-auto mb-12 max-w-[400px] text-[1.05rem] font-light leading-relaxed text-relay-ink-2">
					We&apos;re rolling out to a small group of attorneys and support
					staff. Join the waitlist and lock in early access pricing.
				</p>
				<div className="reveal flex justify-center">
					<WaitlistForm buttonLabel="Request Access" />
				</div>
			</section>

			{/* ── FOOTER ── */}
			<footer
				className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 justify-between px-6 sm:px-12 py-8 sm:py-10 text-center sm:text-left"
				style={{
					borderTop:
						"1px solid color-mix(in srgb, var(--ink) 10%, transparent)",
				}}
			>
				<div className="flex items-center">
					<Image
						src="/relay-logos/black_relay.svg"
						alt="Relay"
						width={90}
						height={22}
					/>
				</div>
				<p className="text-[0.8rem] text-relay-ink-3">
					© 2026 Relay Legal Technologies, Inc.
				</p>
				<div className="flex gap-6">
					<a
						href="mailto:support@relay-law.com"
						className="text-[0.8rem] text-relay-ink-3 no-underline transition-colors hover:text-relay-ink"
					>
						Contact
					</a>
				</div>
			</footer>
		</>
	);
}
