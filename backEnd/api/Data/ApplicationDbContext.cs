using api.Models;
using Microsoft.EntityFrameworkCore;
namespace api.Data
{
  public class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
     {
     }
    public DbSet <Course> Course{ get; set; }
  }
}