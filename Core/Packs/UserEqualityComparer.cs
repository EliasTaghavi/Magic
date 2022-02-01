using Core.Packs.Entities;
using System.Diagnostics.CodeAnalysis;

namespace Core.Packs
{
    public class UserEqualityComparer : IEqualityComparer<PackBuy>
    {
        public bool Equals(PackBuy x, PackBuy y)
        {
            return x.UserId == y.UserId;
        }

        public int GetHashCode([DisallowNull] PackBuy obj)
        {
            return obj.UserId.GetHashCode();
        }
    }
}
