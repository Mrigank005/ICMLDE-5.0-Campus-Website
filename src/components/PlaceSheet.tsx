import { useEffect, useRef, useState } from "react";
import { Building2, Footprints, Navigation } from "lucide-react";
import type { Place } from "../lib/types";
import { categoryOf } from "../lib/categories";
import { useOnline } from "../lib/useData";
import { MAPS_KEY, PlaceMap } from "./PlaceMap";

/**
 * Opens the Google Maps app in walking navigation to the entrance's exact lat/lng (never a place name, which can
 * resolve to the wrong side of a building). Live, position-following guidance has to happen in the Maps app:
 * Google's terms don't allow building it on the embedded map.
 */
const mapsUrl = ({ lat, lng }: { lat: number; lng: number }) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking&dir_action=navigate`;

/**
 * Bottom sheet on a native <dialog> (focus trap, Esc and top-layer for free). On phones the bar at the top is a
 * drag handle: up makes the sheet full screen (the map fills it), down shrinks it, then closes it; a tap toggles.
 * shortcut: the sheet snaps between sizes on release instead of animating, fine unless it feels abrupt on devices.
 */
export function PlaceSheet({ place, onClose }: { place: Place | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const last = useRef<Place | null>(null); // keep content on screen while the closing animation runs
  const opener = useRef<Element | null>(null);
  const drag = useRef<{ y: number; h: number } | null>(null);
  const lastGesture = useRef(0);
  const [full, setFull] = useState(false);
  if (place) last.current = place;
  const p = place ?? last.current;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (place && !d.open) {
      opener.current = document.activeElement;
      d.classList.remove("closing");
      d.showModal();
      d.querySelector("h2")?.focus({ preventScroll: true }); // not the Close button, which would show a focus ring on open
    } else if (!place && d.open) {
      d.classList.add("closing");
      d.addEventListener("animationend", () => { d.close(); d.classList.remove("closing"); setFull(false); (opener.current as HTMLElement | null)?.focus?.(); }, { once: true });
    }
  }, [place]);

  const steps = p ? (Array.isArray(p.indoor) ? p.indoor : p.indoor ? [p.indoor] : []) : [];
  const Icon = p ? categoryOf(p.category).icon : Building2;
  const online = useOnline();
  // The map lives in the app. Without a key or a connection it can't load, so the sheet falls back to a Google Maps link.
  const mapOn = !!MAPS_KEY && online && !!p?.entrance;

  const resetDrag = () => {
    drag.current = null;
    const d = ref.current;
    if (d) d.style.height = d.style.maxHeight = d.style.transform = "";
  };
  const onDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = ref.current!;
    drag.current = { y: e.clientY, h: d.getBoundingClientRect().height };
    e.currentTarget.setPointerCapture(e.pointerId);
    d.style.maxHeight = "100dvh";
  };
  const onMove = (e: React.PointerEvent) => {
    const s = drag.current, d = ref.current;
    if (!s || !d) return;
    const dy = e.clientY - s.y;
    if (dy < 0 || full) d.style.height = `${Math.min(innerHeight, Math.max(160, s.h - dy))}px`; // grows with the finger
    else d.style.transform = `translateY(${dy}px)`; // pulling the small sheet down heads towards closing
  };
  const onUp = (e: React.PointerEvent) => {
    const s = drag.current;
    if (!s) return;
    const dy = e.clientY - s.y;
    resetDrag();
    lastGesture.current = Date.now();
    if (Math.abs(dy) < 8) setFull((f) => !f); // a tap toggles
    else if (dy < -60) setFull(true);
    else if (dy > 60) (full ? setFull(false) : onClose());
  };

  return (
    <dialog
      ref={ref}
      className={full ? "sheet full" : "sheet"}
      aria-label={p?.name ?? "Place details"}
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      // A touch's follow-up click lands after the sheet has resized and can hit the backdrop: ignore it.
      onClick={(e) => { if (e.target === ref.current && Date.now() - lastGesture.current > 500) onClose(); }}
    >
      {p && (
        <>
          <button
            type="button"
            aria-label={full ? "Make the map smaller" : "Make the map full screen"}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={resetDrag}
            onClick={(e) => { if (e.detail === 0) setFull((f) => !f); }} // keyboard only; taps are handled on pointer up
            className="-mt-2 mb-1.5 flex h-8 w-full cursor-grab touch-none items-center justify-center bg-transparent md:hidden"
          >
            <span className="h-[5px] w-10 rounded-full bg-line-strong" />
          </button>
          {mapOn && p.entrance && <PlaceMap entrance={p.entrance} name={p.name} full={full} />}
          <h2 tabIndex={-1} className="mb-0.5 mt-4 text-title font-bold text-heading outline-none">{p.name}</h2>
          <p className="m-0 flex items-center gap-1.5 text-small text-ink-2">
            <Icon size={16} aria-hidden="true" />{categoryOf(p.category).label} · {p.hint}
          </p>
          {steps.length > 0 && (<>
          <h3 className="mb-2.5 mt-5 flex items-center gap-2 text-body font-bold text-heading">
            <Footprints size={20} aria-hidden="true" />Inside the building
          </h3>
          <ol className="m-0 grid list-none gap-3 p-0 [counter-reset:step]">
            {steps.map((s, i) => (
              <li key={i} className="grid grid-cols-[28px_1fr] items-start gap-3">
                <span aria-hidden="true" className="grid size-7 place-items-center rounded-full bg-step text-small font-bold text-heading">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          </>)}
          {p.entrance && (
            <>
              <a
                href={mapsUrl(p.entrance)}
                target="_blank"
                rel="noopener"
                className="mt-[22px] flex min-h-[52px] items-center justify-center gap-2.5 rounded-md bg-primary px-5 py-3.5 text-body font-bold text-on-primary no-underline hover:bg-primary-hover active:bg-primary-press"
              >
                <Navigation size={20} aria-hidden="true" />{mapOn ? "Start navigation" : "Open in Google Maps"}
              </a>
              <p className="mb-0 mt-2 text-center text-small text-ink-2">
                {!online ? "You're offline. This opens Google Maps when you have a connection."
                  : mapOn ? "Live walking directions in the Google Maps app" : "Walking directions from where you are"}
              </p>
            </>
          )}
          <button type="button" onClick={onClose} className="mt-3 min-h-12 w-full cursor-pointer rounded-md border border-line-strong bg-surface px-5 text-body font-bold text-btn2 hover:bg-track">
            Close
          </button>
        </>
      )}
    </dialog>
  );
}
