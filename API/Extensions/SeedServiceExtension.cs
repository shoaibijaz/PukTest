using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class SeedServiceExtensions
    {
        public static WebApplication AddDataSeedService(this WebApplication app)
        {
            var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;

            try
            {
                var context = services.GetRequiredService<DataContext>();
                var userManager = services.GetRequiredService<UserManager<AppUser>>();
                context.Database.Migrate();
                Seed.SeedData(context, userManager);
            }
            catch (Exception)
            {
                // Exception handling
            }

            return app;
        }
    }
}
