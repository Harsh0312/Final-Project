using AbcHealthCareApi.Data;
using AbcHealthCareApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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
        public async Task<ActionResult<List<Medicine>>> GetMedicines()
        {
            var medicines =  await _context.medicines.ToListAsync();
            return Ok(medicines);
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
