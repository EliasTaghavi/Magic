namespace Core.Comments.Dto
{
    public class CommentListDto
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public DateTime AddDate { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}
