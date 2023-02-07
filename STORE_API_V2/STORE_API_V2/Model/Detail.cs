namespace STORE_API_V2.Model
{
    public class Detail
    {
        public int idOrder { get; set; }
        public int quantity { get; set; }
        public Product products { get; internal set; }
    }
}
