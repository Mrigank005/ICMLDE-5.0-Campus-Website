import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Schedule, Session } from "../lib/types";
import { endMs, isEnded, isLive, istTime, sessionsOn, startMs, todayTab, windowAround } from "../lib/time";
import { useMediaQuery } from "../lib/useData";
import { CARD, CARD_TITLE, GoButton, NowChip, StatusChip, VenueLine, linkBtn, useApp } from "./ui";

function Row({ s, ended, live }: { s: Session; ended: boolean; live: boolean }) {
  const { places } = useApp();
  const [open, setOpen] = useState(false);
  const panel = useId();
  const place = places.get(s.locationId);
  const cancelled = s.status === "cancelled";
  const time = `${istTime(startMs(s))}–${istTime(endMs(s))}`;
  return (
    <li
      data-session={s.id}
      className={
        "scroll-mt-24 " +
        (live ? "my-1.5 rounded-md border-2 border-accent bg-accent-tint" : "border-t border-line first:border-t-0")
      }
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panel}
        onClick={() => setOpen(!open)}
        className="grid min-h-16 w-full cursor-pointer grid-cols-[1fr_24px] gap-3 rounded-[10px] bg-transparent px-2 py-3.5 text-left text-ink"
      >
        <span>
          <span className="flex flex-wrap items-center gap-x-2.5 text-small text-ink-2 tnum">
            <span>{time}{s.delayMin ? " (expected)" : ""}</span>
            {live && <NowChip />}
            {ended && !live && <span>· Ended</span>}
          </span>
          <span className={`mt-0.5 block text-item font-bold [overflow-wrap:anywhere] ${cancelled ? "text-ink-2 line-through" : ended ? "text-ink-2" : "text-heading"}`}>
            {s.title}
          </span>
          <VenueLine session={s} compact />
          {s.status !== "scheduled" && <span className="mt-2 flex flex-wrap gap-1.5"><StatusChip status={s.status} /></span>}
          {s.note && <span className="mt-1.5 block text-small text-ink">{s.note}</span>}
        </span>
        <ChevronDown size={24} aria-hidden="true" className={`mt-0.5 text-ink-2 transition-transform duration-200 ease-out ${open ? "rotate-180" : ""}`} />
      </button>
      <div id={panel} inert={!open} className={`grid transition-[grid-template-rows] duration-200 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="min-h-0 overflow-hidden">
          <dl className="m-0 grid gap-1 px-2 pb-1 text-body">
            <dt className="text-small text-ink-2">When</dt>
            <dd className="m-0 mb-1.5 tnum">{time} IST</dd>
            {place && (<><dt className="text-small text-ink-2">Where</dt><dd className="m-0 mb-1.5">{place.name}, {place.hint}</dd></>)}
            {s.speakers.length > 0 && (<><dt className="text-small text-ink-2">{s.speakers.length > 1 ? "Speakers" : "Speaker"}</dt><dd className="m-0 mb-1.5">{s.speakers.join(", ")}</dd></>)}
          </dl>
          {!cancelled && <div className="px-2 pb-4 pt-1.5"><GoButton placeId={s.locationId} /></div>}
        </div>
      </div>
    </li>
  );
}

export function ScheduleCard({ schedule, seek }: { schedule: Schedule; seek: { id: string; n: number } | null }) {
  const { now } = useApp();
  const [day, setDay] = useState(() => todayTab(schedule, now));
  const [all, setAll] = useState(false); // false: only the sessions around now
  const wide = useMediaQuery("(min-width: 1024px)"); // desktop and tablet landscape show 4, phones and tablet portrait 3
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const list = useId();

  // "See it in the schedule": switch to that session's day, then scroll to its row.
  useEffect(() => {
    if (!seek) return;
    const target = schedule.sessions.find((s) => s.id === seek.id);
    const i = schedule.days.findIndex((d) => d.id === target?.day);
    if (i >= 0) setDay(i);
    const go = () => {
      const row = document.querySelector<HTMLElement>(`[data-session="${seek.id}"]`);
      if (!row) return false;
      row.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      row.querySelector("button")?.focus({ preventScroll: true });
      return true;
    };
    const t = setTimeout(() => { if (!go()) { setAll(true); setTimeout(go, 50); } }, 30); // row outside the window: show all, then go
    return () => clearTimeout(t);
  }, [seek, schedule]);

  const rows = sessionsOn(schedule, schedule.days[day].id);
  const [from, to] = windowAround(rows, schedule.days[day].date, now, wide ? 4 : 3);
  const shown = all ? rows : rows.slice(from, to + 1);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = schedule.days.length;
    const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i + n - 1) % n : -1;
    if (next < 0) return;
    setDay(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className={`${CARD} lg:flex lg:flex-col`} aria-labelledby={`${list}-t`}>
      <h2 id={`${list}-t`} className={CARD_TITLE}>Schedule</h2>
      <p className="m-0 mt-1 text-small text-ink-2">All times are India time (IST)</p>
      <div className="sticky top-0 z-10 -mx-5 mt-3 bg-surface px-5 pb-3 pt-2.5">
        <div
          role="tablist"
          aria-label="Conference day"
          className="relative grid rounded-[14px] bg-track p-1"
          style={{ gridTemplateColumns: `repeat(${schedule.days.length}, 1fr)` }}
        >
          <span
            aria-hidden="true"
            className="absolute bottom-1 left-1 top-1 rounded-[10px] border-2 border-accent bg-raised shadow-tab transition-transform duration-200 ease-out"
            style={{ width: `calc((100% - 8px) / ${schedule.days.length})`, transform: `translateX(${day * 100}%)` }}
          />
          {schedule.days.map((d, i) => (
            <button
              key={d.id}
              ref={(el) => { tabs.current[i] = el; }}
              role="tab"
              type="button"
              aria-selected={i === day}
              aria-controls={list}
              tabIndex={i === day ? 0 : -1}
              onClick={() => setDay(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`relative z-10 min-h-12 cursor-pointer rounded-[10px] text-body tnum ${i === day ? "font-bold text-accent" : "text-ink-2"}`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
      <div id={list} role="tabpanel" className="flex flex-1 flex-col">
        {rows.length === 0 ? (
          <p className="m-0 px-1 pt-5">Nothing scheduled on this day.</p>
        ) : (
          <>
            <ul className="m-0 mt-1 list-none p-0">
              {shown.map((s) => (
                <Row key={s.id} s={s} live={isLive(s, now)} ended={isEnded(s, now)} />
              ))}
            </ul>
            {rows.length > shown.length || all ? (
              <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 border-t border-line pt-1 text-small text-ink-2">
                <span>Showing {shown.length} of {rows.length} sessions</span>
                <button type="button" className={linkBtn} onClick={() => setAll(!all)} aria-expanded={all}>
                  {all ? (wide ? "See fewer" : "Show fewer") : wide ? "See more" : `Show all ${rows.length}`}
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
