using Core.Purchase.Entities;
using System.Diagnostics.CodeAnalysis;

namespace Core.Purchase
{
    public class BuyerEqualityComparer : IEqualityComparer<Buy>
    {
        public bool Equals(Buy x, Buy y)
        {
            return x.UserId == y.UserId;
        }

        public int GetHashCode([DisallowNull] Buy obj)
        {
            return obj.UserId.GetHashCode();
        }
    }
}
