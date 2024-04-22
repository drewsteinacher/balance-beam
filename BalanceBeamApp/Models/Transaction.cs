namespace BalanceBeamApp.Models;

public class Transaction {
    public Guid Id { get; init; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public decimal Amount { get; set;}
    public DateOnly StartDate {get; set; } = DateOnly.FromDateTime(DateTime.Today);
    public Recurrence Recurrence { get; set; }
}