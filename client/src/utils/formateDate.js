import { format, formatDistanceToNow } from "date-fns";

export function cleanDate(date) {
  return format(new Date(date), "dd MMM yyy, hh:mm a");
}

export function relativeTime(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
