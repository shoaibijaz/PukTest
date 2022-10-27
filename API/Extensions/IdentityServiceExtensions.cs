using Domain;
using Persistence;
using Microsoft.AspNetCore.Identity;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static WebApplicationBuilder AddIdentityServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddDefaultIdentity<AppUser>(options =>
            {
                options.SignIn.RequireConfirmedAccount = false;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            }).AddRoles<AppRole>().AddEntityFrameworkStores<DataContext>();

            return builder;
        }

    }
}