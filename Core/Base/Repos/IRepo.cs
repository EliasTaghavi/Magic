using Core.Base.Entities;

namespace Core.Base.Repos
{
    public interface IRepo<T> where T : BaseEntity
    {
        T Create(T t);
        T Read(string id);
        void Update(T t);
        T Delete(string id);
        void Toggle(string id);
        void Enable(string id);
        void Disable(string id);
        IQueryable<T> GetSet();
        List<bool> Save(List<T> set);
        bool Save(T set);
        IQueryable<T> Bucket();
    }
}
