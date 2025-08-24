using Monolithic.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 加入 PostgreSQL DbContext
builder.Services.AddPostgresDbContext(builder.Configuration);

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:7414").AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// 自動遷移與種子資料
app.Services.MigrateDatabase();
app.Services.SeedData();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(); // 加在 UseAuthorization 之前
app.UseAuthorization();

app.MapControllers();

app.Run();
