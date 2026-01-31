export const CITIES = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "London",
    "New York",
    "Kullu"
   
  ];

  export const getFavorites = () =>
    JSON.parse(localStorage.getItem("favorites")) || [];
  
  export const saveFavorites = (favorites) =>
    localStorage.setItem("favorites", JSON.stringify(favorites));