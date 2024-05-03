using System.Runtime.CompilerServices;

namespace BalanceBeamApp.Helpers;

// https://stackoverflow.com/a/74149364
public static class FullName
{
    public static string Of<T>( T _, [CallerArgumentExpression(nameof(_))] string fullName = "")
        => fullName; 
}