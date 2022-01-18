using Core.Base.Entities;

namespace Core.Base.Repos
{
    public interface ISettingRepo : IRepo<Setting>
    {
        T GetByName<T>(string name);
        T Save<T>(string name, T newValue);
    }
}
