import { createContext, useContext } from "react";
import { ArrowRightLeft, Ban, Clock, MapPin, Navigation, type LucideIcon } from "lucide-react";
import type { Place, Session, Status } from "../lib/types";

interface Ctx {
  now: number;
  places: Map<string, Place>;
  openPlace: (id: string) => void;
}
export const AppCtx = createContext<Ctx>(null as unknown as Ctx);
export const useApp = () => useContext(AppCtx);

/** Page width: phone-width column, wider on tablet, a two-column page on desktop. Header and main share it. */
export const WRAP = "mx-auto w-full max-w-[560px] px-4 sm:px-6 md:max-w-[720px] lg:max-w-[1120px] lg:px-8";
export const CARD = "min-w-0 rounded-card border border-card-border bg-surface p-5 shadow-card";
export const CARD_TITLE = "flex items-center gap-2.5 text-title font-bold text-heading";

const CHIPS: Record<Exclude<Status, "scheduled">, { label: string; icon: LucideIcon; cls: string }> = {
  delayed: { label: "Delayed", icon: Clock, cls: "bg-delayed-tint text-delayed-ink" },
  moved: { label: "Room changed", icon: ArrowRightLeft, cls: "bg-moved-tint text-moved-ink" },
  cancelled: { label: "Cancelled", icon: Ban, cls: "bg-cancelled-tint text-cancelled-ink" },
};

/** Status is always an icon plus a word, never colour alone. */
export function StatusChip({ status }: { status: Status }) {
  if (status === "scheduled") return null;
  const { label, icon: Icon, cls } = CHIPS[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-small ${cls}`}>
      <Icon size={16} strokeWidth={2} aria-hidden="true" />
      {label}
    </span>
  );
}

export function NowChip() {
  return (
    <span className="inline-flex items-center gap-1.5 text-small font-bold text-accent">
      <span className="size-[9px] rounded-full bg-accent" aria-hidden="true" />
      Happening now
    </span>
  );
}

export function GoButton({ placeId, secondary }: { placeId: string; secondary?: boolean }) {
  const { places, openPlace } = useApp();
  const name = places.get(placeId)?.name;
  if (!name) return null; // a typo in locationId would otherwise give a button that does nothing
  return (
    <button
      type="button"
      onClick={() => openPlace(placeId)}
      aria-label={`Take me there: ${name}`}
      className={
        "flex w-full cursor-pointer select-none items-center justify-center gap-2.5 rounded-md px-5 py-3.5 text-body font-bold leading-tight transition-[transform,background-color] duration-150 ease-out active:scale-[0.98] " +
        (secondary
          ? "min-h-12 border border-line-strong bg-surface text-btn2 hover:bg-track"
          : "min-h-[52px] bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-press")
      }
    >
      <Navigation size={20} strokeWidth={2} aria-hidden="true" />
      Take me there
    </button>
  );
}

/** Venue line: pin, place name (bold when the room changed) and its floor hint. */
export function VenueLine({ session, compact }: { session: Session; compact?: boolean }) {
  const place = useApp().places.get(session.locationId);
  if (!place) return null;
  return (
    <span className={`flex items-start gap-2 ${compact ? "mt-1 text-small text-ink-2" : "mt-2.5 text-ink"}`}>
      <MapPin size={compact ? 16 : 20} className={`mt-[3px] shrink-0 ${compact ? "" : "text-ink-2"}`} aria-hidden="true" />
      <span>
        <span className={compact && session.status !== "moved" ? "" : "font-bold"}>{place.name}</span>
        {!compact && <small className="block text-small text-ink-2">{place.hint}</small>}
      </span>
    </span>
  );
}

export const linkBtn =
  "mt-1.5 inline-flex min-h-12 cursor-pointer items-center bg-transparent p-0 text-body font-bold text-btn2 underline underline-offset-[3px]";
