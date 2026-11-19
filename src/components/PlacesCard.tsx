import { useId, useState } from "react";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";
import type { Category, Place } from "../lib/types";
import { CATEGORIES, categoryOf } from "../lib/categories";
import { CARD, CARD_TITLE, linkBtn, useApp } from "./ui";

const matches = (p: Place, q: string) =>
  [p.name, categoryOf(p.category).label, p.hint, ...p.tags].join(" ").toLowerCase().includes(q);

export function PlacesCard() {
  const { places, openPlace } = useApp();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Set<Category>>(new Set()); // every group starts closed; tap a header to open it
  const id = useId();
  const q = query.trim().toLowerCase();
  const all = [...places.values()];
  const groups = CATEGORIES.map((c) => ({ ...c, items: all.filter((p) => p.category === c.id && (!q || matches(p, q))) })).filter((g) => g.items.length);
  const toggle = (c: Category) => setOpen((s) => { const n = new Set(s); if (!n.delete(c)) n.add(c); return n; });

  return (
    <section className={CARD} aria-labelledby={`${id}-t`}>
      <h2 id={`${id}-t`} className={CARD_TITLE}>Find a place</h2>
      <div className="relative mt-4">
        <label htmlFor={id} className="sr-only">Search places</label>
        <Search size={20} aria-hidden="true" className="pointer-events-none absolute left-[15px] top-4 text-ink-2" />
        <input
          id={id}
          type="search"
          inputMode="search"
          autoComplete="off"
          placeholder="Search places, e.g. lunch"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-h-[52px] w-full appearance-none rounded-md border border-line-strong bg-surface pl-12 pr-[52px] text-body text-ink placeholder:text-ink-2 [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-0.5 top-0.5 grid size-12 cursor-pointer place-items-center rounded-[10px] text-ink-2">
            <X size={20} aria-hidden="true" />
          </button>
        )}
      </div>

      {groups.length === 0 ? (
        <div role="status" className="grid gap-1 px-1 pt-5">
          <p className="m-0">No places match “{query.trim()}”.</p>
          <button type="button" className={linkBtn + " justify-self-start"} onClick={() => setQuery("")}>Clear search</button>
        </div>
      ) : (
        <div className="mt-2">
          {groups.map(({ id: cid, label, icon: Icon, items }) => {
            const isOpen = open.has(cid) || q !== ""; // a search opens every group that has a match
            const panel = `${id}-${cid}`;
            return (
              <div key={cid} className="border-t border-line first:border-t-0">
                <h3 className="m-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => toggle(cid)}
                    className="flex min-h-14 w-full cursor-pointer items-center gap-2.5 bg-transparent px-1 py-2 text-left text-body font-bold text-heading hover:bg-track/60"
                  >
                    <Icon size={24} aria-hidden="true" />
                    <span className="flex-1">{label}{items.length > 1 && <span className="font-normal text-ink-2"> ({items.length})</span>}</span>
                    <ChevronDown size={24} aria-hidden="true" className={`text-ink-2 transition-transform duration-200 ease-out ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </h3>
                <div id={panel} inert={!isOpen} className={`grid transition-[grid-template-rows] duration-200 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <ul className="m-0 min-h-0 list-none overflow-hidden p-0">
                    {items.map((p) => (
                      <li key={p.id}>
                        <button type="button" onClick={() => openPlace(p.id)} className="grid min-h-[60px] w-full cursor-pointer grid-cols-[1fr_20px] items-center gap-3 border-0 border-t border-line bg-transparent px-1 py-2.5 text-left text-ink hover:bg-track/60">
                          <span>
                            <span className="block text-item font-bold text-heading">{p.name}</span>
                            <small className="block text-small text-ink-2">{p.hint}</small>
                          </span>
                          <ChevronRight size={20} aria-hidden="true" className="text-ink-2" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
