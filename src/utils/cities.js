export const CITIES = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "London",
    "New York",
    "Kullu",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Bhopal",
    "Surat",
    "Vadodara",
    "Coimbatore",
   
  ];

  export const getFavorites = () =>
    JSON.parse(localStorage.getItem("favorites")) || [];
  
  export const saveFavorites = (favorites) =>
    localStorage.setItem("favorites", JSON.stringify(favorites));