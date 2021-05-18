export function toISOShortDate(date: Date): string {
  // quickest/simplest way to get date in ISO 8601 format
  // decided to not waste time trying to understand how to get such format with Intl or Luxon (moment.js is not recommended anymore)
  return date.toISOString().substring(0, 10);
}
