// Derives sortable numeric start/end values from a free-text `period` label
// such as "Oct 2024 - Present" or "July 2023 - Sept 2023". Used only as a
// fallback for reverse-chronological ordering when an entry has no structured
// start_date / end_date yet (i.e. before migration 0002 is applied). Once the
// structured columns exist, the queries prefer those instead.

// Larger than any realistic Date value, so an ongoing ("Present") entry always
// sorts to the top.
export const PRESENT = 9e15;

const MONTH: Record<string, number> = {
  jan: 0, january: 0,
  feb: 1, february: 1,
  mar: 2, march: 2,
  apr: 3, april: 3,
  may: 4,
  jun: 5, june: 5,
  jul: 6, july: 6,
  aug: 7, august: 7,
  sep: 8, sept: 8, september: 8,
  oct: 9, october: 9,
  nov: 10, november: 10,
  dec: 11, december: 11,
};

// Parses a single side of a period, e.g. "Oct 2024", "July 2023", "2022",
// "Present". Returns a comparable number, or null if it can't be parsed.
function tokenToTime(token: string): number | null {
  const t = token.trim().toLowerCase();
  if (!t) return null;
  if (t === 'present' || t === 'current' || t === 'now') return PRESENT;

  const parts = t.split(/\s+/);
  if (parts.length === 1) {
    const year = Number(parts[0]);
    return Number.isFinite(year) && year > 1900 ? Date.UTC(year, 11, 31) : null;
  }

  const year = Number(parts[parts.length - 1]);
  if (!Number.isFinite(year)) return null;
  const month = MONTH[parts[0]] ?? MONTH[parts.slice(0, -1).join(' ')];
  if (month == null) return null;
  return Date.UTC(year, month, 1);
}

export function periodRange(period: string): { start: number; end: number } {
  const normalized = (period ?? '').replace(/[–—]/g, '-');
  const segments = normalized.split('-');
  const startToken = segments[0] ?? '';
  const endToken = segments.length > 1 ? segments[segments.length - 1] : segments[0];

  const start = tokenToTime(startToken) ?? -1;
  const end = tokenToTime(endToken ?? '') ?? start;
  return { start, end };
}
