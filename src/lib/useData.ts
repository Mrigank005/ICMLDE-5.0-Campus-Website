import { useCallback, useEffect, useRef, useState } from "react";
import type { Place, Schedule } from "./types";

const REFRESH_MS = 60_000;

/** Current instant. `?now=2026-11-27T10:50:00+05:30` fakes the clock (it keeps ticking) for review and QA. */
export function useNow() {
  const [now, setNow] = useState(() => start());
  useEffect(() => {
    const t = setInterval(() => setNow(start()), 15_000);
    return () => clearInterval(t);
  }, []);
  return now;
}
const fake = Date.parse(new URLSearchParams(location.search).get("now") ?? "");
const t0 = Date.now();
const start = () => (Number.isNaN(fake) ? Date.now() : fake + (Date.now() - t0));

/** True while the screen matches a CSS media query, e.g. useMediaQuery("(min-width: 1024px)"). */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const mq = matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}

export function useOnline() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false);
    addEventListener("online", on);
    addEventListener("offline", off);
    return () => { removeEventListener("online", on); removeEventListener("offline", off); };
  }, []);
  return online;
}

/**
 * Schedule, re-fetched every minute while the tab is visible. `updatedMs` is the server's own Date header,
 * which a cached copy keeps, so the "Updated" stamp stays honest when the service worker answers offline.
 */
export function useSchedule() {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [updatedMs, setUpdatedMs] = useState(0);
  const [failed, setFailed] = useState(false);
  const [changeTick, setChangeTick] = useState(0);
  const last = useRef<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/data/schedule.json", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const text = await res.text();
      if (last.current !== null && last.current !== text) setChangeTick((n) => n + 1);
      last.current = text;
      setSchedule(JSON.parse(text));
      setUpdatedMs(Date.parse(res.headers.get("date") ?? "") || Date.now());
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }, []);

  useEffect(() => {
    load();
    const tick = () => document.visibilityState === "visible" && load();
    const t = setInterval(tick, REFRESH_MS);
    document.addEventListener("visibilitychange", tick);
    return () => { clearInterval(t); document.removeEventListener("visibilitychange", tick); };
  }, [load]);

  return { schedule, updatedMs, failed, changeTick, retry: load };
}

/** Places never change during the event, so one fetch (it is precached for offline). */
export function usePlaces() {
  const [places, setPlaces] = useState<Place[] | null>(null);
  const load = useCallback(() => {
    fetch("/data/locations.json").then((r) => r.json()).then(setPlaces).catch(() => {});
  }, []);
  useEffect(load, [load]);
  return { places, retry: load };
}

/** The open place lives in the URL hash (#place=id), so reload and the back gesture both behave. */
export function usePlaceHash() {
  const read = () => new URLSearchParams(location.hash.slice(1)).get("place");
  const [id, setId] = useState(read);
  useEffect(() => {
    const sync = () => setId(read());
    addEventListener("popstate", sync);
    addEventListener("hashchange", sync);
    return () => { removeEventListener("popstate", sync); removeEventListener("hashchange", sync); };
  }, []);
  const open = (placeId: string) => { history.pushState({ sheet: true }, "", `#place=${encodeURIComponent(placeId)}`); setId(placeId); };
  const close = () => {
    if (history.state?.sheet) history.back();
    else { history.replaceState(null, "", location.pathname + location.search); setId(null); }
  };
  return { id, open, close };
}
