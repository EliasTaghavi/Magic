using System.Collections.Generic;

namespace Core.Base.Entities
{
    public class ManagerResult<T>
    {
        public bool Success { get; set; }
        public T Result { get; set; }
        public List<string> Errors { get; set; }
        public string Message { get; set; } = "Successful";
        public int Code { get; set; } = 200;
        public ManagerResult()
        {

        }
        public ManagerResult(T result)
        {
            Result = result;
            Success = Result != null;
        }

        public ManagerResult(T result, bool success) : this(result)
        {
            Success = success;
        }
    }
}
