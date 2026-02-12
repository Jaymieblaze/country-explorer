import { useState, useEffect } from 'react';

function App() {
  // 1. State Management
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. The Fetch Logic
  useEffect(() => {
    const fetchData = async () => {
      try {
        // We only fetch the fields we need (performance boost!)
        const response = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3'
        );

        if (!response.ok) {
          throw new Error('Something went wrong fetching data');
        }

        const data = await response.json();
        setCountries(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  // 3. Conditional Rendering
  if (isLoading) return <div className="text-center mt-20 text-xl">Loading countries...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">Error: {error}</div>;

  // 4. The UI (Grid Layout)
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Where in the world?</h1>
      
      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {countries.map((country) => (
          <div key={country.cca3} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={country.flags.png} 
              alt={country.name.common} 
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h2 className="font-bold text-lg mb-4">{country.name.common}</h2>
              <p className="text-sm"><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
              <p className="text-sm"><span className="font-semibold">Region:</span> {country.region}</p>
              <p className="text-sm"><span className="font-semibold">Capital:</span> {country.capital?.[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;