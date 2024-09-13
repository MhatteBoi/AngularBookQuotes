using AngularBookQuotes.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AngularBookQuotes.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private static readonly List<Book> books = new List<Book>()
        {
        new Book { Id = 1, Title = "The Great Gatsby", Author = "F. Scott Fitzgerald", PublishedDate = DateTime.Now.AddYears(-95) },
        new Book { Id = 2, Title = "1984", Author = "George Orwell", PublishedDate = DateTime.Now.AddYears(-75) }
        };


        [Authorize]
        [HttpGet]
        public IActionResult GetBooks()
        {
            return Ok(books);
        }

        [Authorize]
        [HttpPost]
        public IActionResult AddBook(Book newBook)
        {
            books.Add(newBook);
            return Ok(books);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, [FromBody] Book updatedBook)

        {
            var book = books.FirstOrDefault(b => b.Id == id);
            if (book == null)
            {
                return BadRequest();
            }

            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.PublishedDate = updatedBook.PublishedDate;

            return Ok(books);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult RemoveBook(int id)
        {
            var book = books.FirstOrDefault(b => b.Id == id);
            if (book == null)
            {
                return NotFound();
            }
            books.Remove(book);
            return NoContent();

        }

    }
}
