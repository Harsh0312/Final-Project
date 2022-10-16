using AbcHealthCareApi.Entities;
using System.Collections.Generic;
using System.Linq;

namespace AbcHealthCareApi.Extensions
{
    public static class MedicineExtensions
    {
        public static IQueryable<Medicine> Sort(this IQueryable<Medicine> query,string orderBy)
        {
            if (string.IsNullOrEmpty(orderBy)) return query.OrderBy(P => P.NameMed);
            query = orderBy switch
            { 
                "priceMed"=> query.OrderBy(p=>p.PriceMed),
                "priceDesc" => query.OrderByDescending(p => p.DescriptionMed),
                _ => query.OrderBy(p => p.NameMed),

            };
            return query;

        }
        public static IQueryable<Medicine> Search(this IQueryable<Medicine> query,string searchTerm)
        {
            if(string.IsNullOrEmpty(searchTerm)) return query;
            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();
            return query.Where(p => p.NameMed.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Medicine> Filter(this IQueryable<Medicine> query,string category,string sellerMed)
        {
            var categoryList = new List<string>();
            var sellerMedList = new List<string>();
            if (!string.IsNullOrEmpty(category))
                categoryList.AddRange(category.ToLower().Split(",").ToList());
            
            if (!string.IsNullOrEmpty(sellerMed))
                sellerMedList.AddRange(sellerMed.ToLower().Split(",").ToList());
            query = query.Where(p => categoryList.Count == 0 || categoryList.Contains(p.Category.ToLower()));
            query = query.Where(p => sellerMedList.Count == 0 || sellerMedList.Contains(p.SellerMed.ToLower()));
            return query;

        }
    }
}
