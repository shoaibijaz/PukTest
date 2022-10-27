﻿
using Application.DTOs;
using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class MappingUser : Profile
    {
        public MappingUser()
        {
            CreateMap<AppUser, UserDto>();
        }
    }
}
