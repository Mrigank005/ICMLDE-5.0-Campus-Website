import type { Schedule, Session } from "./types";

// All schedule logic runs on instants in ms plus a fixed IST offset, never on the device's timezone.
const IST_MS = 5.5 * 3600_000;

/** "YYYY-MM-DD" of an instant, in India time. */
export const istDate = (ms: number) => new Date(ms + IST_MS).toISOString().slice(0, 10);

/** "HH:MM" of an instant, in India time. */
export const istTime = (ms: number) => new Date(ms + IST_MS).toISOString().slice(11, 16);

export const plannedStartMs = (s: Session) => Date.parse(s.start);
export const startMs = (s: Session) => plannedStartMs(s) + (s.delayMin ?? 0) * 60_000;
export const endMs = (s: Session) => Date.parse(s.end) + (s.delayMin ?? 0) * 60_000;

export const isCancelled = (s: Session) => s.status === "cancelled";
export const isLive = (s: Session, now: number) => !isCancelled(s) && startMs(s) <= now && now < endMs(s);
export const isEnded = (s: Session, now: number) => endMs(s) <= now;

export type NowNext =
  | { kind: "now"; sessions: Session[] }
  | { kind: "next"; sessions: Session[] } // later today
  | { kind: "before"; sessions: Session[] } // event not started: the opening session
  | { kind: "later"; sessions: Session[] } // today is done: the next day's first session(s)
  | { kind: "over" };

export function nowNext(schedule: Schedule, now: number): NowNext {
  const active = schedule.sessions.filter((s) => !isCancelled(s)).sort((a, b) => startMs(a) - startMs(b));
  const live = active.filter((s) => isLive(s, now));
  if (live.length) return { kind: "now", sessions: live };
  const upcoming = active.filter((s) => startMs(s) > now);
  if (!upcoming.length) return { kind: "over" };
  const sessions = upcoming.filter((s) => startMs(s) === startMs(upcoming[0])); // parallel sessions share a start
  if (istDate(startMs(sessions[0])) === istDate(now)) return { kind: "next", sessions };
  return { kind: upcoming.length === active.length ? "before" : "later", sessions };
}

/** Index of the day tab to open: today's, else the first day before the event, else the last day after it. */
export function todayTab(schedule: Schedule, now: number): number {
  const today = istDate(now);
  const i = schedule.days.findIndex((d) => d.date === today);
  if (i >= 0) return i;
  return today < schedule.days[0].date ? 0 : schedule.days.length - 1;
}

/** Sessions on a day, in planned order. */
export const sessionsOn = (schedule: Schedule, dayId: string) =>
  schedule.sessions.filter((s) => s.day === dayId).sort((a, b) => plannedStartMs(a) - plannedStartMs(b));

/**
 * The sessions to show for one day: the session(s) running now (else the next one), with about half of the rest before and after.
 * Size 3 is the phone, 4 the desktop. At the first or last session of the day the window slides so it still holds `size`.
 * Returns [start, end] indexes.
 * A future day anchors on its first session, a past day on its last.
 */
export function windowAround(rows: Session[], dayDate: string, now: number, size = 3): [number, number] {
  const n = rows.length;
  if (n <= size) return [0, n - 1];
  const today = istDate(now);
  let a = n - 1, b = n - 1;
  if (dayDate > today) a = b = 0;
  else if (dayDate === today) {
    const live = rows.flatMap((s, i) => (isLive(s, now) ? [i] : []));
    if (live.length) { a = live[0]; b = live[live.length - 1]; }
    else {
      const next = rows.findIndex((s) => !isCancelled(s) && startMs(s) > now);
      if (next >= 0) { a = next; b = rows.reduce((last, s, i) => (!isCancelled(s) && startMs(s) === startMs(rows[next]) ? i : last), next); }
    }
  }
  const side = (size - 1) >> 1; // for an even size the extra session goes after, because what is next matters more
  let start = Math.max(0, a - side), end = Math.min(n - 1, b + side);
  while (end - start + 1 < size) (end < n - 1 ? end++ : start--);
  return [start, end];
}

/** Schedule rows: parallel technical tracks that start together become one row, so 16 tracks don't bury the day. */
export function groupTracks(rows: Session[]): Session[][] {
  const out: Session[][] = [];
  for (const s of rows) {
    const g = out[out.length - 1];
    if (g && s.type === "technical" && g[0].type === "technical" && g[0].start === s.start) g.push(s);
    else out.push([s]);
  }
  return out;
}

/** Whole minutes from now, rounded up, so "in 1 min" never reads "in 0 min". */
export const minutesUntil = (target: number, now: number) => Math.max(0, Math.ceil((target - now) / 60_000));

export function formatDuration(min: number) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60), m = min % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}
