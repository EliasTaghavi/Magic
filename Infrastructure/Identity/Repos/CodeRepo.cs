using Core.Identity.Entities;
using Core.Identity.Enums;
using Core.Identity.Repos;
using Infrastructure.Data;

namespace Infrastructure.Identity.Repos
{
    public class CodeRepo : ICodeRepo
    {
        private readonly DbSet<Code> Codes;

        private readonly OffDbContext Context;

        public CodeRepo(OffDbContext context)
        {
            Context = context;
            Codes = Context.Codes;
        }

        public void Create(Code newCode)
        {
            Codes.Add(newCode);
            Save();
        }

        public Code Create(string id)
        {
            Random random = new();
            int num = random.Next(1000, 10000);
            Code code = new()
            {
                CreatedDate = DateTime.UtcNow,
                Num = num,
                Type = TokenType.SMS,
                UserId = id,
                Times = 1
            };
            Create(code);
            return code;
        }

        public IEnumerable<Code> GetSet()
        {
            return Codes;
        }

        public Code ReadByUserId(string Id, TokenType Type)
        {
            return Codes.FirstOrDefault(x => x.UserId == Id && x.Type == Type);
        }

        public void Remove(Code code)
        {
            Codes.Remove(code);
            Save();
        }

        public void Save()
        {
            Context.SaveChanges();
        }

        public void Update(Code code)
        {
            Codes.Update(code);
            Save();
        }
    }
}
