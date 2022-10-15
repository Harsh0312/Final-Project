

namespace AbcHealthCareApi.DTO
{
    public class BasketItemDto
    {
        public int IdMed { get; set; }
        public string NameMed { get; set; }
        public int PriceMed { get; set; }
        public string DescriptionMed { get; set; }
        public string Category { get; set; }
        public string SellerMed { get; set; }
        public string ImagePathMed { get; set; }
        public int Quantity { get; set; }
    }
}
