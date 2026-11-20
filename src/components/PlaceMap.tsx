import { useState } from "react";
import { LocateFixed } from "lucide-react";
import { linkBtn } from "./ui";

export const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY as string | undefined;
const EMBED = "https://www.google.com/maps/embed/v1";
type Pt = { lat: number; lng: number };
const pt = ({ lat, lng }: Pt) => `${lat.toFixed(6)},${lng.toFixed(6)}`;

/**
 * Google Maps (Embed API) inside the sheet. It opens on the entrance pin. Tapping the button asks for the
 * phone's location once, only then, and switches the map to walking directions to that exact entrance.
 * The reading is used for this one request and is not stored by us.
 */
export function PlaceMap({ entrance, name, full }: { entrance: Pt; name: string; full?: boolean }) {
  const [origin, setOrigin] = useState<Pt | null>(null);
  const [state, setState] = useState<"idle" | "locating" | "denied" | "failed">("idle");

  const src = origin
    ? `${EMBED}/directions?key=${MAPS_KEY}&origin=${pt(origin)}&destination=${pt(entrance)}&mode=walking`
    : `${EMBED}/place?key=${MAPS_KEY}&q=${pt(entrance)}&zoom=18`;

  const locate = () => {
    setState("locating");
    navigator.geolocation.getCurrentPosition(
      (p) => { setOrigin({ lat: p.coords.latitude, lng: p.coords.longitude }); setState("idle"); },
      (e) => setState(e.code === e.PERMISSION_DENIED ? "denied" : "failed"),
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 30_000 },
    );
  };

  return (
    <div className={full ? "flex flex-1 flex-col" : ""}>
      <iframe
        key={src}
        title={origin ? `Walking route to ${name}` : `Map of the entrance to ${name}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade" // the key is restricted to our address, so Google needs the referrer
        className={`w-full rounded-lg border border-line bg-track ${full ? "min-h-[50dvh] flex-1" : "aspect-[4/3]"}`}
      />
      {origin ? (
        <button type="button" className={linkBtn} onClick={() => setOrigin(null)}>Show the entrance only</button>
      ) : (
        <button
          type="button"
          onClick={locate}
          disabled={state === "locating"}
          className="mt-3 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-md border border-line-strong bg-surface px-5 text-body font-bold text-btn2 hover:bg-track disabled:cursor-wait disabled:text-ink-2"
        >
          <LocateFixed size={20} aria-hidden="true" />
          {state === "locating" ? "Finding where you are…" : "Show walking route"}
        </button>
      )}
      <p role="status" className="m-0 mt-2 text-small text-ink-2">
        {state === "denied" && "Location is turned off for this site. Turn it on in your browser settings, then try again."}
        {state === "failed" && "Couldn't find where you are. Try again, or move outdoors."}
      </p>
    </div>
  );
}
