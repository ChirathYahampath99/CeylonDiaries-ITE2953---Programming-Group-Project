using CeylonDiaries.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace CeylonDiaries.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Place> Places { get; set; }
    }
}