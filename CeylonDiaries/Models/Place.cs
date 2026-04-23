namespace CeylonDiaries.Models
{
    public class Place
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string OpeningHours { get; set; }
        public string Distance { get; set; }
        public string ImageUrl { get; set; }
        public string LocationUrl { get; set; } // Google Maps link
    }
}
