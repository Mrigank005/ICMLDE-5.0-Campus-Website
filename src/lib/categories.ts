import { Bed, Building2, ClipboardCheck, Presentation, Utensils, type LucideIcon } from "lucide-react";
import type { Category } from "./types";

/** Display order and labels for Find a place. A place whose category is not listed here is not shown. */
export const CATEGORIES: { id: Category; label: string; icon: LucideIcon }[] = [
  { id: "venue", label: "Session halls", icon: Presentation },
  { id: "registration", label: "Registration", icon: ClipboardCheck },
  { id: "food", label: "Food & drinks", icon: Utensils },
  { id: "stay", label: "Guest house", icon: Bed },
];
const OTHER = { id: "other" as Category, label: "Other", icon: Building2 };

/** Never throws: an unknown category in locations.json falls back to "Other" instead of crashing the sheet. */
export const categoryOf = (c: string) => CATEGORIES.find((x) => x.id === c) ?? OTHER;
