using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Monolithic.Infrastructure.Data;
using Monolithic.Infrastructure.Data.Entities;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SQLInjectionDemoController : ControllerBase
{
    private readonly AppDbContext _db;

    public SQLInjectionDemoController(AppDbContext db)
    {
        _db = db;
    }

    // 演示 SQL Injection 漏洞（錯誤示範）
    [HttpGet("unsafe")]
    public async Task<IActionResult> UnsafeGetUser(string userName)
    {
        // 錯誤用法：直接拼接字串進 SQL，EF Core 仍會執行原生 SQL
        var sql = $"SELECT * FROM \"Users\" WHERE \"UserName\" = '{userName}'";
        var users = await _db.Users.FromSqlRaw(sql).ToListAsync();
        return Ok(users);
    }

    // 修正版：安全查詢（參數化）
    [HttpGet("safe")]
    public async Task<IActionResult> SafeGetUser(string userName)
    {
        // 正確用法：使用參數化查詢或 LINQ，避免 SQL Injection
        var users = await _db.Users.Where(u => u.UserName == userName).ToListAsync();
        return Ok(users);
    }
}
