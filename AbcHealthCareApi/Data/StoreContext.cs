using AbcHealthCareApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace AbcHealthCareApi.Data
{
    public class StoreContext:DbContext
    {
        public StoreContext(DbContextOptions options):base(options)
        { }
        public DbSet<Medicine> medicines { get; set; }
        public DbSet<Basket> Baskets { get; set; }
    }
}
