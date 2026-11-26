import { describe, expect, it } from "vitest";
import { groupTracks, istDate, istTime, minutesUntil, nowNext, sessionsOn, todayTab, windowAround } from "./time";
import type { Schedule, Session } from "./types";

const at = (d: string, hm: string) => Date.parse(`${d}T${hm}:00+05:30`);
const mk = (id: string, day: string, d: string, a: string, b: string, extra: Partial<Session> = {}): Session => ({
  id, day, title: id, type: "session", start: `${d}T${a}:00+05:30`, end: `${d}T${b}:00+05:30`,
  locationId: "x", speakers: [], status: "scheduled", note: "", ...extra,
});
const sched: Schedule = {
  timezone: "Asia/Kolkata",
  days: [{ id: "d1", label: "Fri", date: "2026-11-27" }, { id: "d2", label: "Sat", date: "2026-11-28" }],
  sessions: [
    mk("open", "d1", "2026-11-27", "09:30", "10:30"),
    mk("keynote", "d1", "2026-11-27", "10:30", "11:30"),
    mk("pA", "d1", "2026-11-27", "11:50", "13:20"),
    mk("pB", "d1", "2026-11-27", "11:50", "13:20"),
    mk("late", "d1", "2026-11-27", "14:30", "16:00", { status: "delayed", delayMin: 15 }),
    mk("panel", "d1", "2026-11-27", "16:15", "17:15", { status: "cancelled" }),
    mk("k2", "d2", "2026-11-28", "09:00", "10:00"),
    mk("close", "d2", "2026-11-28", "15:30", "16:30"),
  ],
};
const ids = (r: ReturnType<typeof nowNext>) => ("sessions" in r ? r.sessions.map((s) => s.id) : []);

describe("nowNext", () => {
  it("before the event shows the opening session", () => {
    const r = nowNext(sched, at("2026-11-26", "18:00"));
    expect(r.kind).toBe("before");
    expect(ids(r)).toEqual(["open"]);
  });
  it("morning of day 1 before the first session says next, not before", () => {
    expect(nowNext(sched, at("2026-11-27", "08:00")).kind).toBe("next");
  });
  it("shows the running session", () => {
    const r = nowNext(sched, at("2026-11-27", "10:50"));
    expect(r.kind).toBe("now");
    expect(ids(r)).toEqual(["keynote"]);
  });
  it("a session ends exactly at its end time and the next one is live", () => {
    expect(ids(nowNext(sched, at("2026-11-27", "10:30")))).toEqual(["keynote"]);
  });
  it("lists all parallel sessions", () => {
    const r = nowNext(sched, at("2026-11-27", "12:10"));
    expect(r.kind).toBe("now");
    expect(ids(r).sort()).toEqual(["pA", "pB"]);
  });
  it("between sessions shows the next one, and parallel sessions together", () => {
    const r = nowNext(sched, at("2026-11-27", "11:40"));
    expect(r.kind).toBe("next");
    expect(ids(r).sort()).toEqual(["pA", "pB"]);
  });
  it("a delayed session is not live at its planned start, and is live at its expected start", () => {
    expect(ids(nowNext(sched, at("2026-11-27", "14:35")))).toEqual(["late"]);
    expect(nowNext(sched, at("2026-11-27", "14:35")).kind).toBe("next");
    expect(nowNext(sched, at("2026-11-27", "14:45")).kind).toBe("now");
  });
  it("skips cancelled sessions (the 16:15 panel is cancelled, so 16:20 goes to day 2)", () => {
    const r = nowNext(sched, at("2026-11-27", "16:20"));
    expect(r.kind).toBe("later");
    expect(ids(r)).toEqual(["k2"]);
  });
  it("after the last session of day 1 shows the first session of day 2", () => {
    const r = nowNext(sched, at("2026-11-27", "18:30"));
    expect(r.kind).toBe("later");
    expect(ids(r)).toEqual(["k2"]);
  });
  it("after the conference ends is over", () => {
    expect(nowNext(sched, at("2026-11-28", "17:00")).kind).toBe("over");
  });
});

describe("IST handling", () => {
  it("computes the IST date and time whatever the device timezone is", () => {
    const ms = Date.parse("2026-11-27T20:00:00Z"); // 01:30 on the 28th in India
    expect(istDate(ms)).toBe("2026-11-28");
    expect(istTime(ms)).toBe("01:30");
  });
  it("a phone on US time just before midnight in India is still 'today' in India", () => {
    const ms = Date.parse("2026-11-27T18:29:00Z"); // 23:59 IST on the 27th
    expect(istDate(ms)).toBe("2026-11-27");
    expect(nowNext(sched, ms).kind).toBe("later");
  });
});

describe("todayTab", () => {
  it("opens today's tab", () => expect(todayTab(sched, at("2026-11-28", "09:00"))).toBe(1));
  it("opens day 1 before the event", () => expect(todayTab(sched, at("2026-11-20", "09:00"))).toBe(0));
  it("opens the last day after the event", () => expect(todayTab(sched, at("2026-12-05", "09:00"))).toBe(1));
});

describe("windowAround", () => {
  const day1 = sessionsOn(sched, "d1"); // open, keynote, pA, pB, late(delayed), panel(cancelled)
  const win = (hm: string, rows = day1, date = "2026-11-27") => windowAround(rows, date, at("2026-11-27", hm));
  it("holds one before and one after the running session", () => expect(win("10:50")).toEqual([0, 2]));
  it("slides to hold three at the first session of the day", () => expect(win("09:40")).toEqual([0, 2]));
  it("slides to hold three at the last session of the day", () => expect(win("23:00")).toEqual([3, 5]));
  it("anchors on the next session between sessions", () => expect(win("11:40")).toEqual([1, 4])); // pA+pB parallel: one before, one after
  it("keeps all parallel sessions in the window", () => expect(win("12:10")).toEqual([1, 4]));
  it("a future day starts at its first session", () => expect(win("10:00", sessionsOn(sched, "d2"), "2026-11-28")).toEqual([0, 1]));
  it("size 4 (desktop): one before and two after the running session", () => {
    expect(windowAround(sessionsOn(sched, "d1"), "2026-11-27", at("2026-11-27", "10:50"), 4)).toEqual([0, 3]);
  });
  it("size 4 slides to hold four at the last session of the day", () => {
    expect(windowAround(sessionsOn(sched, "d1"), "2026-11-27", at("2026-11-27", "23:00"), 4)).toEqual([2, 5]);
  });
  it("size 5: two before and two after the running session", () => {
    const rows = sessionsOn(sched, "d1");
    expect(windowAround(rows, "2026-11-27", at("2026-11-27", "10:50"), 5)).toEqual([0, 4]);
  });
  it("size 5 slides to hold five at the last session of the day", () => {
    expect(windowAround(sessionsOn(sched, "d1"), "2026-11-27", at("2026-11-27", "23:00"), 5)).toEqual([1, 5]);
  });
  it("size 5 on a day of five or fewer shows everything", () => {
    expect(windowAround(sessionsOn(sched, "d1").slice(0, 5), "2026-11-27", at("2026-11-27", "10:50"), 5)).toEqual([0, 4]);
  });
  it("a day of three or fewer shows everything", () => expect(windowAround(day1.slice(0, 2), "2026-11-27", 0)).toEqual([0, 1]));
});

describe("groupTracks", () => {
  it("folds parallel technical tracks with the same start into one row, and leaves everything else alone", () => {
    const tech = (id: string, a: string) => mk(id, "d1", "2026-11-27", a, "16:30", { type: "technical" });
    const rows = [mk("lunch", "d1", "2026-11-27", "13:00", "14:00"), tech("t1", "14:15"), tech("t2", "14:15"), tech("t3", "14:15"),
      mk("ws", "d1", "2026-11-27", "16:00", "17:00"), tech("u1", "17:00"), tech("u2", "17:00")];
    expect(groupTracks(rows).map((g) => g.map((s) => s.id))).toEqual([["lunch"], ["t1", "t2", "t3"], ["ws"], ["u1", "u2"]]);
  });
});

describe("helpers", () => {
  it("sessionsOn returns one day in order", () => {
    expect(sessionsOn(sched, "d2").map((s) => s.id)).toEqual(["k2", "close"]);
  });
  it("minutesUntil rounds up and never goes negative", () => {
    expect(minutesUntil(1_000, 0)).toBe(1);
    expect(minutesUntil(0, 5_000)).toBe(0);
  });
});
