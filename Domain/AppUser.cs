using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser<int>
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public DateTime LastLogin { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public bool Suspended { get; set; } = false;


    }
}