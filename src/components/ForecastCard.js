import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets } from 'lucide-react';

const ForecastCard = ({ dailyForecast, setViewMode }) => {
  if (!dailyForecast || dailyForecast.length === 0) {
    return null;
  }

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear': return <Sun size={20} className="text-yellow-500" />;
      case 'Clouds': return <Cloud size={20} className="text-slate-500" />;
      case 'Rain': case 'Drizzle': case 'Thunderstorm': return <CloudRain size={20} className="text-blue-500" />;
      case 'Snow': return <CloudSnow size={20} className="text-blue-200" />;
      default: return <Sun size={20} className="text-gray-400" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-8">
      <div className="relative glass-strong bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-purple-50/80 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 overflow-hidden hover-lift">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-6">
          7-Day Forecast
        </h2>
        
        {/* Forecast Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dailyForecast.map((day, index) => (
            <div key={index} className="glass-strong rounded-2xl p-4 flex flex-col items-center text-center hover:bg-white/30 transition-all duration-300">
              <span className="text-sm font-bold text-slate-600 mb-2">
                {index === 0 ? 'Today' : new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <div className="my-2">{getWeatherIcon(day.weather[0].main)}</div>
              <p className="text-slate-800 font-bold text-xl">
                {Math.round(day.temp.day)}°C
              </p>
              <p className="text-sm text-slate-500 mt-1">
                <span className="text-red-500 font-semibold">{Math.round(day.temp.max)}°</span> /{' '}
                <span className="text-blue-500 font-semibold">{Math.round(day.temp.min)}°</span>
              </p>
              <p className="text-xs text-slate-600 capitalize mt-2">{day.weather[0].description}</p>
              <div className="flex items-center justify-center gap-2 mt-2 text-xs text-slate-500">
                <Droplets size={12} className="text-blue-400" />
                <span>{day.humidity}%</span>
                <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                <Wind size={12} className="text-blue-400" />
                <span>{Math.round(day.wind_speed * 3.6)} km/h</span>
              </div>
            </div>
          ))}
        </div>

        {/* Back to main button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setViewMode('weather')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Back to Current Weather
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;