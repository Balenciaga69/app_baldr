using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Monolithic.Infrastructure.Data.Entities;

public class User : BaseEntity
{
    public User()
    {
        Posts = new List<Post>();
        Comments = new List<Comment>();
    }

    [Required]
    [MaxLength(50)]
    public string UserName { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string PasswordHash { get; set; } = string.Empty;
    public ICollection<Post> Posts { get; set; }
    public ICollection<Comment> Comments { get; set; }
}

public class Post : BaseEntity
{
    public Post()
    {
        Comments = new List<Comment>();
    }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Content { get; set; } = string.Empty;

    [ForeignKey("User")]
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public ICollection<Comment> Comments { get; set; }
}

public class Comment : BaseEntity
{
    [Required]
    public string Content { get; set; } = string.Empty;

    [ForeignKey("User")]
    public Guid UserId { get; set; }
    public User? User { get; set; }

    [ForeignKey("Post")]
    public Guid PostId { get; set; }
    public Post? Post { get; set; }
}
