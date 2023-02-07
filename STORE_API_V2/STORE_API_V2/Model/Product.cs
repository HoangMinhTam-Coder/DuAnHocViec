using System.ComponentModel.DataAnnotations;

namespace STORE_API_V2.Model
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string category { get; set; }
        public string Color { get; set; }
        public string Image { get; set; }
        public string Image1 { get; set; }
        public string Image2 { get; set; }
        public string Size { get; set; }
        public int Sale { get; set; }
        public float Price_sale { get; set; }
        public string Description { get; set; }

        public Product(int id, string name, float price, string category, string color, string image, string image1, string image2, string size, int sale, float price_sale, string description)
        {
            Id = id;
            Name = name;
            Price = price;
            this.category = category;
            Color = color;
            Image = image;
            Image1 = image1;
            Image2 = image2;
            Size = size;
            Sale = sale;
            Price_sale = price_sale;
            Description = description;
        }
    }
}
