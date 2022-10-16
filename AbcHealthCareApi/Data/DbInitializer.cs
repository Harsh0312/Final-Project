using AbcHealthCareApi.Entities;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AbcHealthCareApi.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context,UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "Vinod",
                    Email = "Vinod@dekhraha.com"
                };
                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");
            }
                

            if (context.medicines.Any()) return;
            var medicines = new List<Medicine>
            {
                new Medicine
                {

                    NameMed="Avil 25 Tablet",
                    PriceMed=10,
                    Category="Tablets",
                    SellerMed="Sun Pharma",
                    Quantity=10,
                    ImagePathMed="https://5.imimg.com/data5/SELLER/Default/2021/6/WG/XO/GA/40528257/pheniramine-maleate-tablets-500x500.jpg",
                    DescriptionMed="Avil 25 Tablet is an antiallergic medication used in the treatment of various allergic conditions. It provides relief from runny nose, sneezing, congestion, itching, and watery eyes."
                },
                new Medicine
                {
                     NameMed="Crocin",
                    PriceMed=20,
                    Category="Tablets",
                    SellerMed="Sun Pharma",
                    Quantity=50,
                    ImagePathMed="https://5.imimg.com/data5/SELLER/Default/2022/2/UZ/QE/SS/46939218/crocin-500x500.jpg",
                    DescriptionMed="Crocin Advance Tablet helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain. It is used to treat headaches, migraine, nerve pain, toothache, sore throat, period (menstrual) pains, arthritis, muscle aches, and the common cold.\n"
                },
                new Medicine
                {
                     NameMed="Azithral 500 Tablet",
                    PriceMed=30,
                    Category="Tablets",
                    SellerMed="Sun Pharma",
                    Quantity=60,
                    ImagePathMed="https://davai24.com/wp-content/uploads/2021/05/azithral-500-azithromycin-tablets-500x500-1.jpg",
                    DescriptionMed="Azithral 500 Tablet is an antibiotic used to treat various types of bacterial infections of the respiratory tract, ear, nose, throat, lungs, skin, and eye in adults and children. It is also effective in typhoid fever and some sexually transmitted diseases like gonorrhea."
                },
                new Medicine
                {
                     NameMed="Azithral 200 Liquid",
                    PriceMed=40,
                    Category="Liquid",
                    SellerMed="Moon Pharma",
                    Quantity=60,
                    ImagePathMed="data:image/jpeg;base64,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",
                    DescriptionMed="Azithral 200 Liquid is an antibiotic medication. It is commonly given to children for the treatment of a wide range of bacterial infections targeting the ear, eyes, nose, throat, lungs, skin, and gastrointestinal tract."
                },
                new Medicine
                {
                    NameMed="Ascoril LS Junior Syrup",
                    PriceMed=80,
                    Category="Liquid",
                    SellerMed="Moon Pharma",
                    Quantity=100,
                    DescriptionMed="Ascoril LS Junior Syrup is a combination medicine used in the treatment of cough with mucus. It thins mucus in the nose, windpipe, and lungs, making it easier to cough out. It also provides relief from runny nose, sneezing, itching, and watery eyes.",
                    ImagePathMed="https://cpimg.tistatic.com/06587918/b/4/Ambroxol-levosalbutamol-Guaiphenesin-Syrup.jpg"
                },
                new Medicine
                {
                    NameMed="Anovate Cream",
                    PriceMed=120,
                    Category="Cream",
                    SellerMed="Moon Pharma",
                    Quantity=100,
                    DescriptionMed="Anovate Cream is a combination medicine used for the treatment of piles (hemorrhoids). It relieves the pain, swelling, itching, and discomfort associated with passing of stools in people who suffer this problem in the anal area.",
                    ImagePathMed="https://5.imimg.com/data5/SELLER/Default/2022/4/BY/WT/CE/46046389/annovate-cream-500x500.jpeg"

                }


            };
            foreach(var medicine in medicines)
            {
                context.medicines.Add(medicine);
            }
            context.SaveChanges();
        }
    }
}
