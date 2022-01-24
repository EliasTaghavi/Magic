using Core.Base.Dto;
using Core.Identity.Dto;
using Core.Identity.Entities;
using Core.Identity.Enums;
using Core.Identity.Mappers;
using Core.Identity.Repos;
using Infrastructure.Data;
using System.Linq.Dynamic.Core;

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

        public IQueryable<Code> GetSet()
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

        public PagedListDto<CodeListDto> Search(PageRequestDto<CodeListFilterDto> dto)
        {
            var query = GetSet();
            if (dto.MetaData.Type.HasValue)
            {
                query = query.Where(x => x.Type == dto.MetaData.Type.Value);
            }
            if (!string.IsNullOrEmpty(dto.MetaData.Keyword.Keyword))
            {
                query = query.Where(x => x.User.Mobile.Contains(dto.MetaData.Keyword.Keyword));
            }
            if (!string.IsNullOrEmpty(dto.SortField))
            {
                query = query.OrderBy(dto.SortField);
            }
            int count = query.Count();
            var result = query.Include(x => x.User).Skip((dto.Index - 1) * dto.Size).Take(dto.Size).ToList();
            return new PagedListDto<CodeListDto>
            {
                Count = count,
                Items = result.ToDto()
            };
        }

        public void Update(Code code)
        {
            Codes.Update(code);
            Save();
        }
    }
}
