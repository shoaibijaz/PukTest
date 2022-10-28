using Application.DTOs;
using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class UserValidator : AbstractValidator<UserDto>
    {
        public UserValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(50);
            RuleFor(x => x.Email).NotEmpty().EmailAddress();

            RuleSet("Password", () =>
            {
                RuleFor(x => x.Password).NotEmpty().MaximumLength(42).MinimumLength(6);
            });

            RuleSet("Id", () =>
            {
                RuleFor(x => x.Id).GreaterThan(0);
            });

        }
    }
}
