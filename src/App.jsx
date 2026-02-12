import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      {/* The Header sits outside the Routes so it stays visible */}
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:id" element={<CountryDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;