import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

function Home() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3');
        if (!response.ok) throw new Error('Failed to fetch data');
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

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === '' || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  if (isLoading) return <div className="text-center mt-20 text-xl">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">Error: {error}</div>;

  return (
    <div className="pb-8">
      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="relative w-full md:w-1/3">
           {/* Search Icon */}
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           </div>
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
        {filteredCountries.map((country) => (
          /* Wrapping the card in a Link component */
          <Link to={`/country/${country.cca3}`} key={country.cca3}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
              <img 
                src={country.flags.png} 
                alt={`Flag of ${country.name.common}`} 
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h2 className="font-bold text-lg mb-4">{country.name.common}</h2>
                <p className="text-sm text-gray-600 mb-1"><span className="font-semibold text-gray-800">Population:</span> {country.population.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mb-1"><span className="font-semibold text-gray-800">Region:</span> {country.region}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;