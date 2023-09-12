import moment from "moment";

export function older_than_days(updated_at: string, days: number) {
  return moment().diff(updated_at, "days") > days;
}
