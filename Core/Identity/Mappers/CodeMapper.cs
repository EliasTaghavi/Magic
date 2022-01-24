using Core.Identity.Dto;
using Core.Identity.Entities;

namespace Core.Identity.Mappers
{
    public static class CodeMapper
    {
        public static CodeListDto ToDto(this Code code)
        {
            return new CodeListDto
            {
                CreatedDate = code.CreatedDate,
                Id = code.Id,
                Num = code.Num,
                Times = code.Times,
                Type = code.Type,
                UserName = $"{code.User.Name} {code.User.Surname}",
                UserPhone = code.User.Mobile,
            };
        }

        public static List<CodeListDto> ToDto(this List<Code> codes)
        {
            return codes.Select(x => x.ToDto()).ToList();
        }
    }
}
