using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Name = "Admin Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    }
                };

                foreach (var user in users)
                {
                     userManager.CreateAsync(user, "Pa$$w0rd");
                }

                context.SaveChanges();
            }
        }
    }
}
