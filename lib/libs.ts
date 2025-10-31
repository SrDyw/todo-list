import { TimeType } from "./type";

export function getSplitedTime(seconds: any): TimeType {
  let s = seconds;
  const hours = Math.floor(s / 3600);
  s %= 3600;
  const minutes = Math.floor(s / 60);
  s %= 60;

  console.log(s);
  return { hours, minutes, seconds: s };
}

export function formatTime({ hours, minutes, seconds }: TimeType) {
  const h = hours.toString().padStart(2, "0");
  const m = minutes.toString().padStart(2, "0");
  const s = seconds.toString().padStart(2, "0");
  return `${h}h ${m}m ${s}s`;
}
