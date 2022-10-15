using AbcHealthCareApi.Data;
using AbcHealthCareApi.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using System.Linq;
using AbcHealthCareApi.DTO;

namespace AbcHealthCareApi.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name ="GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            return MapBasketToDto(basket);

        }

        

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemtoBasket(int medicineId,int quantity)

        {
            var basket = await RetrieveBasket();

            if (basket == null) basket = CreateBasket();

            var medicine= await _context.medicines.FindAsync(medicineId);

            if(medicine == null) return NotFound();

            basket.AddItem(medicine, quantity);

            var result=await _context.SaveChangesAsync()>0;

            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

            return BadRequest(new ProblemDetails { Title = "Problem saving item to cart" });

        }

        

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int medicineId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            // remove item or reduce quantity
            basket.RemoveItem(medicineId, quantity);

            // save changes
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem removing item from cart" });
        }
        private async Task<Basket> RetrieveBasket()
        {
            
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(m => m.Medicine)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId",buyerId,cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }
        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    IdMed = item.MedicineId,
                    NameMed = item.Medicine.NameMed,
                   PriceMed = item.Medicine.PriceMed,
                    ImagePathMed = item.Medicine.ImagePathMed,
                    SellerMed = item.Medicine.SellerMed,
                    DescriptionMed = item.Medicine.DescriptionMed,
                    Quantity = item.Quantity,
                    Category = item.Medicine.Category
                }).ToList()
            };
        }
    }
}
