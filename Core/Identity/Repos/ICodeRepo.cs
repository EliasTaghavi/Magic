using Core.Identity.Entities;
using Core.Identity.Enums;

namespace Core.Identity.Repos
{
    public interface ICodeRepo
    {
        void Create(Code newCode);

        Code ReadByUserId(string Id, TokenType Type);

        void Remove(Code code);

        void Save();

        void Update(Code code);
        IEnumerable<Code> GetSet();
        Code Create(string id);
    }
}
