using System.Text;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Monolithic.Infrastructure.Data;
using Monolithic.Infrastructure.Data.Entities;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class XSSDemoController : ControllerBase
{
    private readonly AppDbContext _db;

    public XSSDemoController(AppDbContext db)
    {
        _db = db;
    }

    // 不安全：直接回傳用戶輸入，可能導致 Reflected XSS
    [HttpGet("unsafe/reflect")]
    public IActionResult UnsafeReflect(string userInput)
    {
        var response = $"<h1>您輸入的內容：{userInput}</h1>";
        return Content(response, "text/html", Encoding.UTF8);
    }

    // 安全：HTML 編碼用戶輸入
    [HttpGet("safe/reflect")]
    public IActionResult SafeReflect(string userInput)
    {
        var encodedInput = HtmlEncoder.Default.Encode(userInput);
        var response = $"<h1>您輸入的內容：{encodedInput}</h1>";
        return Content(response, "text/html", Encoding.UTF8);
    }

    // 不安全：儲存用戶評論時不進行清理
    [HttpPost("unsafe/comment")]
    public async Task<IActionResult> UnsafeAddComment([FromBody] CommentRequest request)
    {
        var comment = new Comment
        {
            Content = request.Content, // 直接儲存，可能包含惡意腳本
            UserId = Guid.Empty, // 示範用，實際應用請改為真實用戶
            PostId = Guid.Empty,
        };
        _db.Comments.Add(comment);
        await _db.SaveChangesAsync();
        return Ok(comment);
    }

    // 安全：儲存前進行 HTML 編碼
    [HttpPost("safe/comment")]
    public async Task<IActionResult> SafeAddComment([FromBody] CommentRequest request)
    {
        var comment = new Comment
        {
            Content = HtmlEncoder.Default.Encode(request.Content), // HTML 編碼
            UserId = Guid.Empty,
            PostId = Guid.Empty,
        };
        _db.Comments.Add(comment);
        await _db.SaveChangesAsync();
        return Ok(comment);
    }

    // 取得評論列表
    [HttpGet("comments")]
    public async Task<IActionResult> GetComments()
    {
        var comments = await _db.Comments.OrderByDescending(c => c.CreatedAt).Take(10).ToListAsync();
        return Ok(comments);
    }
}

public class CommentRequest
{
    public string Content { get; set; } = string.Empty;
}
