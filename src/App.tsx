import { useMemo, useState } from "react";
import { CloudOff, RefreshCw } from "lucide-react";
import { istTime } from "./lib/time";
import { Header } from "./components/Header";
import { NowCard } from "./components/NowCard";
import { ScheduleCard } from "./components/ScheduleCard";
import { PlacesCard } from "./components/PlacesCard";
import { PlaceSheet } from "./components/PlaceSheet";
import { AppCtx, CARD, CARD_TITLE, WRAP } from "./components/ui";
import { useNow, useOnline, usePlaceHash, usePlaces, useSchedule } from "./lib/useData";

export default function App() {
  const now = useNow();
  const online = useOnline();
  const { schedule, updatedMs, failed, changeTick, retry } = useSchedule();
  const { places, retry: retryPlaces } = usePlaces();
  const { id: placeId, open, close } = usePlaceHash();
  const [seek, setSeek] = useState<{ id: string; n: number } | null>(null);
  const offline = !online || failed;
  const map = useMemo(() => new Map((places ?? []).map((p) => [p.id, p])), [places]);

  if (!schedule || !places) {
    // First load with no network and no cache: say so plainly. Otherwise a quiet frame while it loads.
    return failed ? (
      <main className="mx-auto max-w-[560px] p-4 pt-10">
        <section className={CARD}>
          <h1 className={CARD_TITLE}><CloudOff size={22} aria-hidden="true" />You're offline</h1>
          <p className="mb-4 mt-2 text-ink-2">Connect once to load the schedule. After that, it works without a network.</p>
          <button type="button" onClick={() => { retry(); retryPlaces(); }} className="min-h-12 w-full cursor-pointer rounded-md border border-line-strong bg-surface px-5 text-body font-bold text-btn2">Try again</button>
        </section>
      </main>
    ) : (
      <div className="min-h-dvh bg-[image:var(--gradient-deep)]" aria-busy="true" />
    );
  }

  return (
    <AppCtx.Provider value={{ now, places: map, openPlace: open }}>
      <Header now={now} updatedMs={updatedMs} offline={offline} />
      {/* Phone: one column (Now, Schedule, Places). Desktop: Now + Places on the left, the Schedule beside them. */}
      <main className={`relative -mt-9 grid gap-6 pb-[max(32px,env(safe-area-inset-bottom))] lg:-mt-12 lg:grid-cols-[5fr_7fr] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-8 ${WRAP}`}>
        <div className="min-w-0 lg:col-start-1 lg:row-start-1"><NowCard schedule={schedule} onSeek={(id) => setSeek({ id, n: Date.now() })} /></div>
        <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-stretch lg:[&>section]:h-full"><ScheduleCard schedule={schedule} seek={seek} /></div>
        <div className="min-w-0 lg:col-start-1 lg:row-start-2 lg:self-stretch lg:[&>section]:h-full"><PlacesCard /></div>
        <footer className="grid gap-1 px-1 text-small text-ink-2 lg:col-span-2">
          {updatedMs > 0 && (
            <span className="inline-flex items-center gap-1.5 tnum lg:hidden"> {/* on desktop this lives in the header */}
              <RefreshCw size={16} aria-hidden="true" />
              {offline ? "Offline. Showing" : "Updated"} {istTime(updatedMs)} IST
            </span>
          )}
          <span>ICMLDE 5.0 · School of Computer Science, UPES</span>
        </footer>
      </main>
      <p className="sr-only" role="status">{changeTick ? "The schedule has changed." : ""}</p>
      <PlaceSheet place={placeId ? (map.get(placeId) ?? null) : null} onClose={close} />
    </AppCtx.Provider>
  );
}
