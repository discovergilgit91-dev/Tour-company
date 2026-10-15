/**
 * Date helpers for the navbar's tours and events menus. Tours store their dates
 * as display text ("25 May – 29 May, 2027"); this turns that into real dates so
 * the menus can hide what has already finished and sort what's left. All dates
 * are calendar days in UTC, so server and browser always agree.
 */

export type DayRange = { start: Date; end: Date };

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function monthIndex(name: string): number {
  return MONTHS.indexOf(name.slice(0, 3).toLowerCase());
}

function utcDay(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month, day));
}

/**
 * "25 May – 29 May, 2027" → May 25 to May 29, 2027. A single day ("12 Aug, 2027")
 * works too, and a range that crosses New Year ("28 Dec – 02 Jan, 2028") puts
 * the start in the previous year. Anything unreadable returns null.
 */
export function parseDateRange(text: string): DayRange | null {
  const match = text
    .trim()
    .match(/^(\d{1,2})\s+([A-Za-z]{3,})(?:\s*[–—-]\s*(\d{1,2})\s+([A-Za-z]{3,}))?,?\s+(\d{4})$/);
  if (!match) return null;

  const year = Number(match[5]);
  const startMonth = monthIndex(match[2]);
  const startDay = Number(match[1]);
  if (startMonth < 0) return null;

  if (!match[3]) {
    const day = utcDay(year, startMonth, startDay);
    return { start: day, end: day };
  }

  const endMonth = monthIndex(match[4]);
  if (endMonth < 0) return null;
  const startYear = startMonth > endMonth ? year - 1 : year;
  return { start: utcDay(startYear, startMonth, startDay), end: utcDay(year, endMonth, Number(match[3])) };
}

/** "2027-08-12" → that day in UTC, or null. */
export function parseIsoDay(text: string): Date | null {
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? utcDay(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : null;
}

/** Today as a UTC calendar day (time of day dropped). */
export function today(): Date {
  const now = new Date();
  return utcDay(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
}

/** Still ahead or underway: its last day hasn't passed yet. */
export function isUpcoming(range: DayRange, now: Date = today()): boolean {
  return range.end.getTime() >= now.getTime();
}

const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_YEAR = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

function dayAndMonth(date: Date): string {
  return `${date.getUTCDate()} ${SHORT_MONTHS[date.getUTCMonth()]}`;
}

/** "25 May", or "25 May 2027" when it isn't this year. */
export function formatDay(date: Date, now: Date = today()): string {
  const text = dayAndMonth(date);
  return date.getUTCFullYear() === now.getUTCFullYear() ? text : `${text} ${date.getUTCFullYear()}`;
}

/** "25 May – 29 May" / "12 Aug" — the year is added (once, at the end) only when it isn't the current year. */
export function formatRange(range: DayRange, now: Date = today()): string {
  if (range.start.getTime() === range.end.getTime()) return formatDay(range.start, now);
  if (range.start.getUTCFullYear() !== range.end.getUTCFullYear()) {
    return `${formatDay(range.start, now)} – ${formatDay(range.end, now)}`;
  }
  const year = range.end.getUTCFullYear() === now.getUTCFullYear() ? "" : ` ${range.end.getUTCFullYear()}`;
  return `${dayAndMonth(range.start)} – ${dayAndMonth(range.end)}${year}`;
}

/** "August 2027" */
export function formatMonth(date: Date): string {
  return MONTH_YEAR.format(date);
}

/** "2027-08" — sortable key for grouping by month. */
export function monthKey(date: Date): string {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}
