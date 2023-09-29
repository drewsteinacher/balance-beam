import dayjs, { Dayjs, duration } from 'dayjs';
import durationPlugin, { Duration } from "dayjs/plugin/duration";
dayjs.extend(durationPlugin);

export interface Transaction {
  amount: number;
  start: Dayjs;
  recurrence?: Duration;
  end?: Dayjs;
}
