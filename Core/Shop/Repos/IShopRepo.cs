using Core.Base.Repos;

namespace Core.Shop.Repos
{
    public interface IShopRepo : IRepo<Core.Shop.Entities.Shop>
    {
        Entities.Shop ReadByUserId(string userId);
    }
}
