namespace Core.Identity.Repos
{
    public interface ICacheRepo
    {
        void Create(string JWT);

        void Delete(string JWT);

        bool Exist(string JWT);
    }
}
