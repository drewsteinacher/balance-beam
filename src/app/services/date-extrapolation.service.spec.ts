import { DateExtrapolationService } from './date-extrapolation.service';
import { buildFakeTransaction } from '../transaction.types.fake';
import dayjs, { duration } from 'dayjs';
import durationPlugin from "dayjs/plugin/duration";
import { faker } from '@faker-js/faker';
dayjs.extend(durationPlugin);

interface TestContext {
  service: DateExtrapolationService;
}
describe('DateExtrapolationService', () => {
  beforeEach(function (this: TestContext) {
    this.service = new DateExtrapolationService();
  });
  
  describe('one-time transactions', () => {
    it('should only have the start date', function (this: TestContext) {
      const transaction = buildFakeTransaction();

      const result = this.service.extrapolate(transaction, 10);

      expect(result).toHaveSize(1);
      expect(result[0]).toBe(transaction.start);
    });
  });

  describe('unterminated recurring transactions', () => {
    it('should start with the start date', function (this: TestContext) {
      const transaction = buildFakeTransaction(duration(5, 'days'));

      const result = this.service.extrapolate(transaction, 10);

      expect(result[0]).toBe(transaction.start);
    });
    
    it('should provide the correct number of dates', function (this: TestContext) {
      const transaction = buildFakeTransaction(duration(5, 'days'));

      const result = this.service.extrapolate(transaction, 10);

      expect(result).toHaveSize(10);
    });

    it('should step correctly', function (this: TestContext) {
      const transaction = buildFakeTransaction(duration(5, 'days'));

      const result = this.service.extrapolate(transaction, 10);

      const uniqueDurations = new Set(
        result.flatMap((date, index, array) =>
          index === 0
            ? []
            : [date.diff(array[index - 1], 'days')]
            )
        );
      expect(uniqueDurations).toHaveSize(1);
      expect(uniqueDurations.has(5)).toBeTrue();
    });
  });

  describe('terminated recurring transactions', () => {
    it('should stop providing dates at end date', function (this: TestContext) {
      const start = dayjs(faker.date.recent({ days: 30 }));
      const end = dayjs(faker.date.soon({ days: 30 }));
      const max = 100;
      const transaction = buildFakeTransaction(duration(5, 'days'), start, end);

      const result = this.service.extrapolate(transaction, max);

      expect(result.length).toBeGreaterThan(2);
      expect(result.length).toBeLessThan(max);
      expect(result.at(-1)!.isAfter(transaction.end)).toBeFalse();
    });
  });
});
