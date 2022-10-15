using AbcHealthCareApi.Entities;
using System.Collections.Generic;
using System.Linq;

namespace AbcHealthCareApi.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            if (context.medicines.Any()) return;
            var medicines = new List<Medicine>
            {
                new Medicine
                {
                    NameMed="First Medicine",
                    PriceMed=10,
                    Category="cat1",
                    SellerMed="Sun Pharma",
                    Quantity=10
                },
                new Medicine
                {
                     NameMed="Second Medicine",
                    PriceMed=20,
                    Category="cat2",
                    SellerMed="Sun Pharma",
                    Quantity=50
                },
                new Medicine
                {
                     NameMed="Third Medicine",
                    PriceMed=30,
                    Category="cat4",
                    SellerMed="Sun Pharma",
                    Quantity=60
                },
                new Medicine
                {
                     NameMed="Fourth Medicine",
                    PriceMed=40,
                    Category="cat5",
                    SellerMed="Moon Pharma",
                    Quantity=60
                },




            };
            foreach(var medicine in medicines)
            {
                context.medicines.Add(medicine);
            }
            context.SaveChanges();
        }
    }
}
