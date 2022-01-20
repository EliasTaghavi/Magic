using Core.Base.Entities;
using Core.Base.Repos;
using Infrastructure.Data;

namespace Infrastructure.Base.Repos
{
    public class SettingRepo : Repo<Setting>, ISettingRepo
    {
        public SettingRepo(OffDbContext offDbContext) : base(offDbContext)
        {

        }

        public T GetByName<T>(string name)
        {
            var setting = GetSet().FirstOrDefault(x => x.Name.ToLower() == name);
            try
            {
                return (T)Convert.ChangeType(setting?.Value ?? "", typeof(T));
            }
            catch (Exception)
            {

                return default;
            }
        }

        public T Save<T>(string name, T newValue)
        {
            var setting = GetSet().FirstOrDefault(x => x.Name.ToLower() == name);
            if (setting != null)
            {
                setting.Value = newValue.ToString();
                Update(setting);
            }
            else
            {
                setting = new Setting
                {
                    Name = name,
                    Value = newValue.ToString(),
                    Type = typeof(T).Name,
                };
                Create(setting);
            }
            try
            {
                return (T)Convert.ChangeType(setting?.Value ?? "", typeof(T));
            }
            catch (Exception)
            {

                return default;
            }
        }
    }
}
