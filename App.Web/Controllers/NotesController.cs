using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Threading;

namespace App.Web.Controllers
{
    [Route("api/[controller]")]
    public class NotesController : Controller
    {
        private static Random rnd = new Random();
        private static IEnumerable<Note> notes = Enumerable
            .Range(0, 10000)
            .Select(c => CreateNote(c));


        [HttpPost]
        public IEnumerable<Note> Get([FromBody]Filter filter)
        {
            if (filter == null) throw new ArgumentNullException(nameof(filter));

            var result = ApplyFilter(notes, filter)
                .ToList();

            result = result
                .Skip(filter.Pager.Page * filter.Pager.Count)
                .Take(filter.Pager.Count)
                .ToList();

            return result;
        }

        private IEnumerable<Note> ApplyFilter(IEnumerable<Note> notes, Filter filter)
        {
            return notes
                .FilterByComments(filter.OnlyWithComments)
                .FilterByDate(filter.DateRange)
                .FilterByName(filter.NameFilter);
        }

        private static Note CreateNote(int id)
        {
            return new Note
            {
                Id = id,
                Comments = Enumerable.Range(0, rnd.Next(20)).Select(c => new Comment
                {
                    Id = c,
                    CreateDate = DateTime.Now.Date.AddDays(-c),
                    Text = $"Comment {c}"
                }),
                CreateDate = DateTime.Now.AddDays(rnd.Next(-200, 0)).AddHours(rnd.Next(-23, 0)).AddMinutes(rnd.Next(-59, 0)),
                Description = $"Description {id}",
                Name = $"Name {id}"
            };
        }
    }

    public static class NotesExtensions
    {
        public static IEnumerable<Note> FilterByDate(this IEnumerable<Note> notes, DateRange dateRange)
        {
            if (dateRange != null)
            {
                return notes
                    .Where(c => dateRange.InRange(c.CreateDate));
            }

            return notes;
        }

        public static IEnumerable<Note> FilterByComments(this IEnumerable<Note> notes, bool onlyWithComments)
        {
            if (onlyWithComments)
            {
                return notes
                    .Where(c => c.Comments.Any());
            }

            return notes;
        }

        public static IEnumerable<Note> FilterByName(this IEnumerable<Note> notes, string name)
        {
            if (!string.IsNullOrEmpty(name))
            {
                return notes
                    .Where(c => c.Name.Contains(name));
            }

            return notes;
        }
    }

    public class Filter
    {
        public Pager Pager { get; set; }
        public DateRange DateRange { get; set; }
        public bool OnlyWithComments { get; set; }
        public string NameFilter { get; set; }
    }

    public class DateRange
    {
        public DateTime? MinDate { get; set; }
        public DateTime? MaxDate { get; set; }

        public bool InRange(DateTime date)
        {
            if (MinDate.HasValue && MaxDate.HasValue)
            {
                return date >= MinDate.Value && date <= MaxDate.Value;
            }

            if (MinDate.HasValue)
            {
                return date >= MinDate.Value;
            }

            if (MaxDate.HasValue)
            {
                return date <= MaxDate.Value;
            }

            return true;
        }
    }

    public class Pager
    {
        public int Page { get; set; }
        public int Count { get; set; }
    }

    public class Note
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreateDate { get; set; }
        public IEnumerable<Comment> Comments { get; set; }
    }

    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
