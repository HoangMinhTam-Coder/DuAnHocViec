namespace STORE_API_V2.Model
{
    public class InitCart
    {
        //public int Id { get; set; }

        //public int products { get; set; }
        public int userId { get; set; }
        public Product products { get; internal set; }
    }
}
