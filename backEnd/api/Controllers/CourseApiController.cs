using System.Data;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

    [Route("api/courseapi")]
    [ApiController]
    public class CourseApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CourseApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CourseApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
            return await _context.Course.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var course = await _context.Course.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            return course;
        }

        [HttpGet("search")] 
        public async Task<ActionResult<IEnumerable<Course>>> SearchCourses(string description)
        {
            var courses = await _context.Course
                .Where(c => c.Description.Contains(description))
                .ToListAsync();

            if (courses == null)
            {
                return NotFound();
            }

            return courses;
        }

        [HttpPost]
        public async Task<ActionResult<Course>> PostCourse(Course course)
        {
            var courseInDb = await _context.Course.FirstOrDefaultAsync(c => c.CourseNumber == course.CourseNumber || c.Subject == course.Subject);
            if (courseInDb != null)
            {
                 return Conflict("A course with the same information already exists.");
            }

            if(course.CourseNumber.Length < 3)
            {
                course.CourseNumber = course.CourseNumber.PadLeft(3, '0');
            }

            var newCourse = new Course
            {
                Subject = course.Subject,
                CourseNumber = course.CourseNumber,
                Description = course.Description
            };

            try
            {
                 _context.Course.Add(newCourse);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetCourse", new { id = newCourse.Id }, course);
            }
            catch (DBConcurrencyException)
            {
                return BadRequest();
            }   
        }

        [HttpPut]
        public async Task<ActionResult> PutCourse(Course course)
        {
            var courseInDb = await _context.Course.FirstOrDefaultAsync(c => c.CourseNumber == course.CourseNumber);

            if (courseInDb == null)
            {
                return NotFound();
            }

            courseInDb.Description = course.Description;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(await _context.Course.ToListAsync());
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(ex.InnerException?.Message);
            }
        }

        [HttpDelete("{courseNumber}")]
        public async Task<ActionResult> DeleteCourse(string CourseNumber)
        {
            var course = await _context.Course.FirstOrDefaultAsync(c => c.CourseNumber == CourseNumber);
            if (course == null)
            {
                return NotFound();
            }

            _context.Course.Remove(course);
            await _context.SaveChangesAsync();

            return Ok(await _context.Course.ToListAsync());
        }

    }