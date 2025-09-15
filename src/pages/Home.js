import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, MapPin, Sparkles, TrendingUp, Trash2 } from 'lucide-react';
import SearchForm from '../components/SearchForm';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('weather');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/history');
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
        // Set mock data for demonstration
        setHistory([
          { city: 'Colombo', timestamp: new Date(Date.now() - 1000000) },
          { city: 'Galle', timestamp: new Date(Date.now() - 2000000) },
          { city: 'Matara', timestamp: new Date(Date.now() - 3000000) },
          { city: 'Kandy', timestamp: new Date(Date.now() - 4000000) },
          { city: 'Jaffna', timestamp: new Date(Date.now() - 5000000) }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);
  const handleHistoryClick = async (cityName) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/weather/${cityName}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather for history item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    try {
      await axios.delete('http://localhost:5000/api/history');
      setHistory([]);
      alert('Search history cleared!');
    } catch (error) {
      console.error('Error clearing history:', error);
      alert('Failed to clear history.');
    }
  };

   return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
           {/* Sparkle effects */}
        {[...Array(25)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
 {/* Content */}
      <div className="relative z-10 flex flex-col items-center py-8 px-4 sm:py-12">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Sparkles className="text-white" size={32} />
            </div>
            <h1 className="text-5xl sm:text-7xl font-black bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Skyline
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Weather
              </span>
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Discover real-time weather insights with our advanced forecasting technology
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-500">
            <TrendingUp size={16} />
            <span>Powered by global weather stations</span>
          </div>
        </div>
        

  {/* Search Form */}
        <SearchForm onSearch={setWeather} />
        
        {/* Conditionally render the correct card */}
        {weather && (
          viewMode === 'weather' ? (
            <WeatherCard 
              weather={weather} 
              setViewMode={setViewMode} 
              setForecast={setForecast}
            />
          ) : (
            <ForecastCard 
              dailyForecast={forecast.daily}
              setViewMode={setViewMode}
            />
          )
        )}

  

      

        {/* Enhanced History Section */}
        {history.length > 0 && (
          <div className="w-full max-w-6xl">
            <div className="glass-strong rounded-3xl p-6 sm:p-8 shadow-2xl hover-lift">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                    <Clock className="text-white" size={24} />
                  </div>
                  Recent Searches
                </h3>
                {/* New Clear History Button */}
                <button
                  onClick={handleClearHistory}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-semibold hover:bg-red-200 transition-colors"
                >
                  <Trash2 size={16} />
                  Clear All
                </button>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-slate-600">Loading history...</span>
                </div>
              ) : (
                <div className="grid gap-3 sm:gap-4">
                  {history.map((item, index) => (
                    <div 
                      key={index} 
                      onClick={() => handleHistoryClick(item.city)}
                      className="group glass rounded-2xl p-4 sm:p-5 hover:bg-white/30 transition-all duration-300 hover:scale-102 cursor-pointer hover-glow border-l-4 border-transparent hover:border-l-blue-500"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                            <MapPin className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300" size={20} />
                          </div>
                          <div>
                            <span className="text-slate-800 font-bold text-lg group-hover:text-blue-700 transition-colors duration-300">
                              {item.city}
                            </span>
                            <p className="text-slate-500 text-sm">Click to view weather</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-500 text-sm font-medium">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                          <p className="text-slate-400 text-xs">
                            {new Date(item.timestamp).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                      
                      {/* Hover indicator */}
                      <div className="mt-3 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Footer */}
      <div className="relative z-10 text-center py-8 border-t border-white/20">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-slate-600 font-medium">Live Weather Data</span>
        </div>
        <p className="text-slate-500 text-sm">
          Created By Chuthuka Dedunu-Undergraduate Student at  Sabaragamuwa University Faculty of Computing
        </p>
      </div>
    </div>
  );
};

export default Home;      
