import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SkeletonDetails from '../components/SkeletonDetails';

function CountryDetails() {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setIsLoading(true);
        
        // 1. Fetch the main country data
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
        if (!response.ok) throw new Error('Country not found');
        const data = await response.json();
        const countryData = data[0];

        // 2. If borders exist, fetch their full names
        if (countryData.borders) {
          // Create a string of codes like "ESP,FRA,DEU"
          const codes = countryData.borders.join(',');
          const borderRes = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes}`);
          const borderData = await borderRes.json();
          
          // Replace the simple codes with objects containing the name and code
          countryData.borders = borderData.map(b => ({
            name: b.name.common,
            cca3: b.cca3
          }));
        }

        setCountry(countryData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCountryData();
  }, [id]);

  if (error) return <div className="text-center mt-20 text-red-500">Error: {error}</div>;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
        <SkeletonDetails />
      </div>
    );
  }

  if (!country) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 text-gray-800 dark:text-white transition-colors duration-300">
      <Link to="/" className="inline-block bg-white dark:bg-gray-800 px-8 py-2 shadow-md rounded-md mb-12 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        &larr; Back
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <img 
          src={country.flags.svg} 
          alt={country.name.common} 
          className="w-full max-w-lg shadow-lg rounded-md"
        />

        <div>
          <h1 className="text-3xl font-bold mb-8">{country.name.common}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Native Name:</span> {Object.values(country.name.nativeName || {})[0]?.common || 'N/A'}</p>
              <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
              <p><span className="font-semibold">Region:</span> {country.region}</p>
              <p><span className="font-semibold">Sub Region:</span> {country.subregion}</p>
              <p><span className="font-semibold">Capital:</span> {country.capital?.[0]}</p>
            </div>
            
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Top Level Domain:</span> {country.tld?.[0]}</p>
              <p><span className="font-semibold">Currencies:</span> {Object.values(country.currencies || {}).map(c => c.name).join(', ')}</p>
              <p><span className="font-semibold">Languages:</span> {Object.values(country.languages || {}).join(', ')}</p>
            </div>
          </div>

          {country.borders && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <span className="font-semibold text-lg whitespace-nowrap">Border Countries:</span>
              <div className="flex flex-wrap gap-2">
                {country.borders.map((border) => (
                  <Link 
                    /* We now use border.cca3 for the link, but border.name for the text */
                    key={border.cca3}
                    to={`/country/${border.cca3}`}
                    className="bg-white dark:bg-gray-800 px-4 py-1 shadow-sm rounded text-sm hover:shadow-md transition-shadow"
                  >
                    {border.name}
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