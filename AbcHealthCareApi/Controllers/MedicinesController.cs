using AbcHealthCareApi.Data;
using AbcHealthCareApi.Entities;
using AbcHealthCareApi.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AbcHealthCareApi.Controllers
{

   
    public class MedicinesController : BaseApiController
    {
        public readonly StoreContext _context;
        public MedicinesController(StoreContext context)
        {
            _context = context;
        }
        //public IActionResult Index()
        //{
        //    return View();
        //}
        [HttpGet]
        public async Task<ActionResult<List<Medicine>>> GetMedicines(string orderBy,string searchTerm,string categories,string sellerMeds)
        {
            var query = _context.medicines
                .Sort(orderBy)
                .Search(searchTerm)
                .Filter(categories,sellerMeds)
                .AsQueryable();
            return await query.ToListAsync();
        }
        [HttpGet("{IdMed}")]
        public async Task<ActionResult<Medicine>> GetMedicine(int IdMed)
        {
            var medicine = await _context.medicines.FindAsync(IdMed);
            if (medicine == null) return NotFound();
            return medicine;
            //return await _context.medicines.FindAsync(IdMed);   
        }
    }
}
