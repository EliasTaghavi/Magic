using Core.Base.Entities;
using Core.Base.Enums;
using Core.Base.Repos;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Infrastructure.Base.Repos
{
    public class Repo<T> : IRepo<T> where T : BaseEntity
    {
        private readonly OffDbContext Context;
        private readonly DbSet<T> Set;
        public Repo(OffDbContext context)
        {
            Context = context;
            if (Context != null)
            {
                Set = Context.Set<T>();
            }
        }
        public T Create(T Model)
        {
            EntityEntry<T> t = Set.Add(Model);
            Context.SaveChanges();
            return t.Entity;
        }
        public T Read(string Id)
        {
            return Set.Find(Id);
        }
        public void Update(T Model)
        {
            Context.Set<T>().Update(Model);
            Context.SaveChanges();
        }
        public T Delete(string Id)
        {
            T t = Read(Id);
            Set.Remove(t);
            Context.SaveChanges();
            return t;
        }
        public void Toggle(string id)
        {
            T t = Read(id);
            t.Enable = !t.Enable;
            Update(t);
        }
        public void Enable(string id)
        {
            T t = Read(id);
            t.Enable = true;
            Update(t);
        }
        public void Disable(string id)
        {
            T t = Read(id);
            t.Enable = false;
            Update(t);
        }
        public IQueryable<T> GetSet()
        {
            return Set;
        }

        public List<bool> Save(List<T> set)
        {
            List<bool> result = new();
            foreach (T item in set)
            {
                try
                {
                    ObjectState state = item.ObjectState;
                    switch (state)
                    {
                        case ObjectState.Added:
                            Create(item);
                            break;
                        case ObjectState.Changed:
                            Update(item);
                            break;
                        case ObjectState.Deleted:
                            Delete(item.Id);
                            break;
                        default:
                            break;
                    }
                    result.Add(true);
                }
                catch (Exception)
                {
                    result.Add(false);
                }
            }
            return result;
        }
        public IQueryable<T> Bucket()
        {
            return Set;
        }
    }
}
