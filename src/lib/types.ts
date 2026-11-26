export type Status = "scheduled" | "delayed" | "moved" | "cancelled";
export type Category = "venue" | "registration" | "food" | "stay" | "other";

export interface Session {
  id: string;
  day: string;
  title: string;
  type: string;
  start: string; // ISO with +05:30
  end: string;
  locationId: string;
  speakers: string[];
  status: Status;
  note: string;
  delayMin?: number; // optional, whole minutes; moves the expected start and end
  papers?: number[]; // optional paper IDs presented in a technical session
}
export interface Day { id: string; label: string; date: string } // date = YYYY-MM-DD in IST
export interface Schedule { timezone: string; days: Day[]; sessions: Session[] }
export interface Place {
  id: string;
  name: string;
  category: Category;
  hint: string;
  entrance: { lat: number; lng: number } | null; // null until the OC collects it
  indoor?: string | string[]; // optional indoor steps; the section is hidden when empty
  tags: string[];
}
