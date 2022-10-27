using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.AddApplicationServices();
builder.AddIdentityServices();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.AddDataSeedService();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
