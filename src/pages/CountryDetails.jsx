import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function CountryDetails() {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
        
        if (!response.ok) {
          throw new Error('Country not found');
        }

        const data = await response.json();
        setCountry(data[0]); // The API returns an array with one item
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCountryData();
  }, [id]);

  if (isLoading) return <div className="text-center mt-20 text-xl">Loading details...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
  if (!country) return null;

  return (
    <div className="p-8">
      {/* Back Button */}
      <Link to="/" className="inline-block bg-white dark:bg-gray-800 px-8 py-2 shadow-md rounded-md mb-12 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white transition-colors">
        &larr; Back
      </Link>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Flag Image */}
        <img 
          src={country.flags.svg} 
          alt={country.name.common} 
          className="w-full max-w-lg shadow-lg rounded-md"
        />

        {/* Details Text */}
        <div>
          <h1 className="text-3xl font-bold mb-8">{country.name.common}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <p><span className="font-semibold">Native Name:</span> {Object.values(country.name.nativeName || {})[0]?.common || 'N/A'}</p>
              <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
              <p><span className="font-semibold">Region:</span> {country.region}</p>
              <p><span className="font-semibold">Sub Region:</span> {country.subregion}</p>
              <p><span className="font-semibold">Capital:</span> {country.capital?.[0]}</p>
            </div>
            
            <div className="space-y-2">
              <p><span className="font-semibold">Top Level Domain:</span> {country.tld?.[0]}</p>
              <p><span className="font-semibold">Currencies:</span> {Object.values(country.currencies || {}).map(c => c.name).join(', ')}</p>
              <p><span className="font-semibold">Languages:</span> {Object.values(country.languages || {}).join(', ')}</p>
            </div>
          </div>

          {/* Border Countries */}
          {country.borders && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <span className="font-semibold text-lg whitespace-nowrap">Border Countries:</span>
              <div className="flex flex-wrap gap-2">
                {country.borders.map((borderCode) => (
                  <Link 
                    key={borderCode}
                    to={`/country/${borderCode}`}
                    className="bg-white dark:bg-gray-800 px-4 py-1 shadow-sm rounded text-sm hover:shadow-md dark:hover:bg-gray-700 transition-shadow"
                  >
                    {borderCode}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;