import { Injectable } from '@angular/core';
import { Transaction } from '../transaction.types';
import dayjs, { Dayjs, duration } from 'dayjs';
import durationPlugin from "dayjs/plugin/duration";
dayjs.extend(durationPlugin);

const MAX_DATE = dayjs(new Date(8640000000000000)); // https://stackoverflow.com/a/43794682
const MAX_DURATION = duration(Number.MAX_VALUE, 'milliseconds');

@Injectable({
  providedIn: 'root'
})
export class DateExtrapolationService {
  constructor() { }
  
  public extrapolate(transaction: Transaction, count?: number): Dayjs[] {
    const max = count ?? Number.MAX_SAFE_INTEGER;
    const end = transaction.end ?? MAX_DATE;
    const step = transaction.recurrence ?? MAX_DURATION;
    const extrapolatedDates: Dayjs[] = [];
    let date = transaction.start;
    while (date.isValid() && date.isBefore(end) && extrapolatedDates.length < max) {
      extrapolatedDates.push(date);
      date = date.add(step);
    }
    return extrapolatedDates;
  }
}
