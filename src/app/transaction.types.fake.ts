import { faker } from '@faker-js/faker';
import { Transaction } from './transaction.types';
import dayjs, { Dayjs } from 'dayjs';
import durationPlugin, { Duration } from 'dayjs/plugin/duration';
dayjs.extend(durationPlugin);

export function buildFakeTransaction(recurrence?: Duration, start?: Dayjs, end?: Dayjs): Transaction {
  return {
    amount: Number(faker.commerce.price({min: -100, max: 100})),
    start: start ?? dayjs(faker.date.recent({ days: 10 })),
    ...(recurrence ? { recurrence } : {}),
    ...(end ? { end } : {})
  };
}