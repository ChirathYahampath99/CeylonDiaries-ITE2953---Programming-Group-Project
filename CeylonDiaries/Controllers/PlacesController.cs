using CeylonDiaries.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CeylonDiaries.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlacesController : ControllerBase
    {
        private readonly Data.AppDbContext _context;

        public PlacesController(Data.AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Places.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(Place place)
        {
            _context.Places.Add(place);
            await _context.SaveChangesAsync();
            return Ok(place);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Place place)
        {
            var existing = await _context.Places.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Name = place.Name;
            existing.Category = place.Category;
            existing.Description = place.Description;
            existing.OpeningHours = place.OpeningHours;
            existing.Distance = place.Distance;
            existing.ImageUrl = place.ImageUrl;
            existing.LocationUrl = place.LocationUrl;

            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var place = await _context.Places.FindAsync(id);
            if (place == null) return NotFound();

            _context.Places.Remove(place);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
