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

                    NameMed="Avil 25 Tablet",
                    PriceMed=10,
                    Category="Tablets",
                    SellerMed="Sun Pharma",
                    Quantity=10,
                    ImagePathMed="https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/mmsye6bf97tkcocat24j.jpg",
                    DescriptionMed="Avil 25 Tablet is an antiallergic medication used in the treatment of various allergic conditions. It provides relief from runny nose, sneezing, congestion, itching, and watery eyes."
                },
                new Medicine
                {
                     NameMed="Crocin",
                    PriceMed=20,
                    Category="Tablets",
                    SellerMed="Sun Pharma",
                    Quantity=50,
                    ImagePathMed="https://onemg.gumlet.io/f_auto,c_fit,h_150,w_150,q_auto/huamtvxifr3gyeeg0rrg.jpg",
                    DescriptionMed="Crocin Advance Tablet helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain. It is used to treat headaches, migraine, nerve pain, toothache, sore throat, period (menstrual) pains, arthritis, muscle aches, and the common cold.\n"
                },
                new Medicine
                {
                     NameMed="Azithral 500 Tablet",
                    PriceMed=30,
                    Category="Tablets",
                    SellerMed="Sun Pharma",
                    Quantity=60,
                    ImagePathMed="https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/kqkouvaqejbyk47dvjfu.jpg",
                    DescriptionMed="Azithral 500 Tablet is an antibiotic used to treat various types of bacterial infections of the respiratory tract, ear, nose, throat, lungs, skin, and eye in adults and children. It is also effective in typhoid fever and some sexually transmitted diseases like gonorrhea."
                },
                new Medicine
                {
                     NameMed="Azithral 200 Liquid",
                    PriceMed=40,
                    Category="Liquid",
                    SellerMed="Moon Pharma",
                    Quantity=60,
                    ImagePathMed="https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/mbdxk2kboh3llijyaao2.jpg",
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
                    ImagePathMed="https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/r22ftufqfbkaxevlo6wn.jpg"
                },
                new Medicine
                {
                    NameMed="Anovate Cream",
                    PriceMed=120,
                    Category="Cream",
                    SellerMed="Moon Pharma",
                    Quantity=100,
                    DescriptionMed="Anovate Cream is a combination medicine used for the treatment of piles (hemorrhoids). It relieves the pain, swelling, itching, and discomfort associated with passing of stools in people who suffer this problem in the anal area.",
                    ImagePathMed="https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/gnsem6ircqxmwmjkprkw.jpg"

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
