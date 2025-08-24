using Microsoft.EntityFrameworkCore;
using Monolithic.Infrastructure.Data.Entities;

namespace Monolithic.Infrastructure.Data;

public static class AppDbInitializer
{
    // 擴充方法：用於遷移資料庫
    public static void MigrateDatabase(this IServiceProvider serviceProvider)
    {
        // 建立一個新的服務範圍
        using var scope = serviceProvider.CreateScope();
        // 從服務範圍中取得 AppDbContext 實例
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        // 執行資料庫遷移
        db.Database.Migrate();
    }

    // 種子資料方法
    public static void SeedData(this IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        // 若已存在資料則不重複新增
        if (db.Users.Any())
            return;

        var user = new User
        {
            UserName = "demo",
            Email = "demo@example.com",
            PasswordHash = "demo123", // 實際專案請加密
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };
        db.Users.Add(user);
        db.SaveChanges();

        var post = new Post
        {
            Title = "Hello World!",
            Content = "這是第一篇貼文。",
            UserId = user.Id,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };
        db.Posts.Add(post);
        db.SaveChanges();

        var comment = new Comment
        {
            Content = "這是第一則留言。",
            UserId = user.Id,
            PostId = post.Id,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };
        db.Comments.Add(comment);
        db.SaveChanges();
    }
}
