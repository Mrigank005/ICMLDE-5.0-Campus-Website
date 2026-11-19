import { CloudOff, RefreshCw } from "lucide-react";
import logo from "../assets/logo.webp";
import upes from "../assets/upes.webp";
import { istTime } from "../lib/time";
import { WRAP } from "./ui";

const SPARKLE = "M12 0C12.9 6.6 17.4 11.1 24 12 17.4 12.9 12.9 17.4 12 24 11.1 17.4 6.6 12.9 0 12 6.6 11.1 11.1 6.6 12 0Z";
const Sparkle = ({ className }: { className: string }) => (
  <svg viewBox="0 0 24 24" className={`absolute fill-lavender ${className}`} aria-hidden="true"><path d={SPARKLE} /></svg>
);

// Decorative dot-wave from the posters, drawn once, at most 14% opacity.
const DOTS = Array.from({ length: 5 }, (_, r) =>
  Array.from({ length: 46 }, (_, i) => ({
    x: i * 6.4 + 4, y: 66 + Math.sin(i / 7 + r * 0.5) * 26 + r * 6, r: 1 + r * 0.18,
  })),
).flat();

export function Header({ now, updatedMs, offline }: { now: number; updatedMs: number; offline: boolean }) {
  return (
    <header className="relative overflow-hidden bg-[image:var(--gradient-deep)] pb-16 pt-[max(24px,env(safe-area-inset-top))] text-white lg:pb-20 lg:pt-8">
      <div className={`relative ${WRAP}`}>
      <div className="relative z-10 flex items-center justify-between gap-4">
        {/* Both logos sit on the same centre line; heights are tuned so the wordmarks read at the same weight. */}
        <img src={upes} alt="UPES, School of Computer Science" width={394} height={54} className="h-[26px] w-auto min-w-0 object-contain object-left lg:h-9" />
        <img src={logo} alt="ICMLDE" width={116} height={35} className="h-9 w-auto shrink-0 lg:h-12" />
      </div>
      <div className="relative z-10 mt-4 flex items-end justify-between gap-4 lg:mt-6">
      <div>
        {offline && updatedMs > 0 && (
          <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-small tnum lg:hidden" role="status">
            <CloudOff size={16} aria-hidden="true" />Offline · schedule from {istTime(updatedMs)} IST
          </p>
        )}
        <p className="m-0 font-bold tnum">Now {istTime(now)} · India time (IST)</p>
        <p className="m-0 text-small">UPES Dehradun</p>
        <p className="m-0 text-small font-bold text-cyan">27–28 November 2026</p>
      </div>
      {/* Desktop only: under the ICMLDE logo, opposite the date block. On phones this stays in the footer. */}
      {updatedMs > 0 && (
        <p className={`m-0 hidden items-center gap-1.5 whitespace-nowrap text-small tnum lg:inline-flex ${offline ? "rounded-full bg-white/15 px-2.5 py-1 text-white" : "text-lavender"}`} role="status">
          {offline ? <CloudOff size={16} aria-hidden="true" /> : <RefreshCw size={16} aria-hidden="true" />}
          {offline ? `Offline · schedule from ${istTime(updatedMs)} IST` : `Updated ${istTime(updatedMs)} IST`}
        </p>
      )}
      </div>
      <svg viewBox="0 0 300 120" className="pointer-events-none absolute -bottom-16 right-0 w-72 sm:right-2 lg:-bottom-20 lg:w-96" aria-hidden="true">
        <g fill="#d2c6ff" opacity="0.14">{DOTS.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} />)}</g>
      </svg>
      <Sparkle className="right-6 top-24 size-4 lg:right-[230px] lg:top-24 lg:size-5" />
      <Sparkle className="right-[60px] top-32 size-2.5 lg:right-[270px] lg:top-32 lg:size-3" />
      </div>
    </header>
  );
}
