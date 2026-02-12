import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SkeletonCard from "../components/SkeletonCard";

function Home() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3",
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Show back to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === "" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  if (error)
    return <div className="text-center mt-20 text-red-500">Error: {error}</div>;

  return (
    <div className="pb-8">
      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        
        <div className="relative w-full md:w-1/3">
          {/* Search Icon (Absolute Positioned) */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          {/* Input Field (Sibling to the icon div, not child) */}
          <input
            type="text"
            placeholder="Search for a country..."
            className="pl-10 p-4 w-full rounded-md shadow-sm border-none bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        

        <select
          className="p-4 w-48 rounded-md shadow-sm border-none bg-white dark:bg-gray-800 dark:text-white cursor-pointer"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {isLoading ? (
          /* Show 8 Skeleton Cards while loading */
          Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))
        ) : (
          /* Show Real Data */
          filteredCountries.map((country) => (
            <Link to={`/country/${country.cca3}`} key={country.cca3}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full hover:-translate-y-1 transition-transform duration-300">
                <img
                  src={country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h2 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">
                    {country.name.common}
                  </h2>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-semibold text-gray-800 dark:text-white">
                        Population:
                      </span>{" "}
                      {country.population.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-semibold text-gray-800 dark:text-white">
                        Region:
                      </span>{" "}
                      {country.region}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-semibold text-gray-800 dark:text-white">
                        Capital:
                      </span>{" "}
                      {country.capital?.[0] || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Home;