using System.ComponentModel.DataAnnotations.Schema;

namespace AbcHealthCareApi.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; } 
        public int Quantity { get; set; }
        public int MedicineId { get; set; }
        public Medicine Medicine { get; set; }
        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}