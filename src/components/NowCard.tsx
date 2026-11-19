import type { Schedule, Session } from "../lib/types";
import { endMs, formatDuration, istDate, istTime, minutesUntil, nowNext, startMs } from "../lib/time";
import { CARD, CARD_TITLE, GoButton, StatusChip, VenueLine, linkBtn, useApp } from "./ui";

const range = (s: Session) =>
  s.delayMin
    ? `Expected ${istTime(startMs(s))}–${istTime(endMs(s))} IST (planned ${istTime(Date.parse(s.start))})`
    : `${istTime(startMs(s))}–${istTime(endMs(s))} IST`;

function Status({ s }: { s: Session }) {
  if (s.status === "scheduled") return null;
  return (
    <>
      <div className="mt-2 flex flex-wrap gap-1.5"><StatusChip status={s.status} /></div>
      {s.note && <p className="mt-2 text-small">{s.note}</p>}
    </>
  );
}

export function NowCard({ schedule, onSeek }: { schedule: Schedule; onSeek: (id: string) => void }) {
  const { now } = useApp();
  const r = nowNext(schedule, now);

  if (r.kind === "over") {
    return (
      <section aria-label="Conference finished" className="relative overflow-hidden rounded-card bg-[image:var(--gradient-deep)] px-5 py-7 text-white">
        <svg viewBox="0 0 24 24" className="absolute right-5 top-5 size-10 fill-lavender" aria-hidden="true">
          <path d="M12 0C12.9 6.6 17.4 11.1 24 12 17.4 12.9 12.9 17.4 12 24 11.1 17.4 6.6 12.9 0 12 6.6 11.1 11.1 6.6 12 0Z" />
        </svg>
        <h2 className="max-w-[14ch] text-headline font-bold">Thank you for joining ICMLDE 5.0</h2>
        <p className="mt-2.5 text-[#e6e2fb]">The schedule stays here if you need it.</p>
      </section>
    );
  }

  const [first] = r.sessions;
  const dayLabel = schedule.days.find((d) => d.id === first.day)?.label ?? "";
  const tomorrow = istDate(startMs(first)) === istDate(now + 86_400_000);
  const title =
    r.kind === "now" ? <><span className="size-2.5 rounded-full bg-accent" aria-hidden="true" />Happening now</>
    : r.kind === "next" ? `Up next · in ${formatDuration(minutesUntil(startMs(first), now))}`
    : r.kind === "before" ? "First session"
    : tomorrow ? `Tomorrow · ${dayLabel}` : `Next · ${dayLabel}`;
  const ends = (s: Session) => (r.kind === "now" ? ` · ends in ${formatDuration(minutesUntil(endMs(s), now))}` : "");
  const prefix = r.kind === "before" || r.kind === "later" ? `${dayLabel} · ` : "";

  return (
    <section className={CARD} aria-label={r.kind === "now" ? "Happening now" : "Next session"}>
      <h2 className={CARD_TITLE}>{title}</h2>
      {r.sessions.length > 1 ? (
        <>
          <p className="mt-1.5 text-small text-ink-2 tnum">
            {r.sessions.length} sessions at the same time · {prefix}{range(first)}{ends(first)}
          </p>
          <ul className="mt-3.5 grid list-none gap-3 p-0">
            {r.sessions.map((s) => (
              <li key={s.id} className="rounded-md border border-line p-3.5">
                <span className="text-item font-bold text-heading [overflow-wrap:anywhere]">{s.title}</span>
                <VenueLine session={s} />
                <Status s={s} />
                <div className="mt-3"><GoButton placeId={s.locationId} secondary /></div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="mb-2 mt-3.5 text-headline font-bold text-heading [overflow-wrap:anywhere]">{first.title}</p>
          <p className="m-0 text-body text-ink tnum">{prefix}{range(first)}{ends(first)}</p>
          <Status s={first} />
          <VenueLine session={first} />
          <div className="mt-[18px]"><GoButton placeId={first.locationId} /></div>
        </>
      )}
      <button type="button" className={linkBtn} onClick={() => onSeek(first.id)}>See it in the schedule</button>
    </section>
  );
}
