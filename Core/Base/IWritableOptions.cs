using Microsoft.Extensions.Options;
using System;

namespace Core.Base
{
    public interface IWritableOptions<out T> : IOptions<T> where T : class, new()
    {
        void Update(Action<T> applyChanges);
    }
}
