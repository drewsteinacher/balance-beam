namespace BalanceBeamApp.Models;

public record struct Recurrence() {
    public int Count { get; set; } = 0;
    public RecurrenceUnit Unit { get; set; } = RecurrenceUnit.Days;

    public static DateOnly operator +(Recurrence recurrence, DateOnly date)
        => recurrence switch {
            Recurrence { Unit: RecurrenceUnit.Days, Count: var count } => date.AddDays(count),
            Recurrence { Unit: RecurrenceUnit.Months, Count: var count } => date.AddMonths(count),
            Recurrence { Unit: RecurrenceUnit.Years, Count: var count } => date.AddYears(count),
            _ => throw new NotSupportedException("Unknown unit"),
        };
}

public enum RecurrenceUnit {
    Days,
    Months,
    Years,
}