import React, { useState } from 'react';
import axios from 'axios';
import { 
  Cloud, Sun, CloudRain, Wind, Eye, Droplets, Thermometer, 
  MapPin, Clock, Star, CloudSnow, Sunrise, Sunset, Gauge,
  ArrowUp, ArrowDown, Activity, Share2, Loader2, Calendar 
} from 'lucide-react';

const WeatherCard = ({ weather, setViewMode, setForecast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!weather) return null;

  const { name, main, weather: conditions, wind, visibility, sys, coord } = weather;
  const condition = conditions[0].main.toLowerCase();
  const time = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  });

  const getWeatherIcon = (condition, size = 56) => {
    const iconProps = { size, className: "drop-shadow-lg" };
    switch (condition) {
      case 'clear': return <Sun className="text-yellow-500" {...iconProps} />;
      case 'clouds': return <Cloud className="text-slate-500" {...iconProps} />;
      case 'rain': return <CloudRain className="text-blue-500" {...iconProps} />;
      case 'snow': return <CloudSnow className="text-blue-200" {...iconProps} />;
      case 'thunderstorm': return <CloudRain className="text-purple-600" {...iconProps} />;
      case 'drizzle': return <CloudRain className="text-blue-400" {...iconProps} />;
      case 'mist': case 'fog': return <Cloud className="text-gray-400" {...iconProps} />;
      default: return <Sun className="text-yellow-500" {...iconProps} />;
    }
  };

  const getBackgroundGradient = (condition) => {
    switch (condition) {
      case 'clear': return 'from-yellow-100/80 via-orange-50/80 to-yellow-100/80';
      case 'clouds': return 'from-slate-100/80 via-gray-50/80 to-slate-100/80';
      case 'rain': return 'from-blue-100/80 via-indigo-50/80 to-blue-100/80';
      case 'snow': return 'from-blue-50/80 via-white/80 to-blue-50/80';
      default: return 'from-blue-50/80 via-indigo-50/80 to-purple-50/80';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const shareWeather = async () => {
    const shareData = {
      title: `Weather in ${name}`,
      text: `Current weather in ${name}: ${Math.round(main.temp)}°C, ${conditions[0].description}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.text);
    }
  };

  // New function to fetch 7-day forecast
  const handle7DayForecast = async () => {
    setLoading(true);
    try {
      const { lat, lon } = coord;
      const response = await axios.get(`http://localhost:5000/api/forecast/${lat}/${lon}`);
      setForecast(response.data);
      setViewMode('forecast');
    } catch (error) {
      console.error('Error fetching 7-day forecast:', error);
      alert('Failed to fetch 7-day forecast. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleWeatherMaps = () => {
    alert('Weather Maps button clicked! This feature is not yet implemented.');
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-8">
      {/* Main weather card */}
      <div className={`relative glass-strong bg-gradient-to-br ${getBackgroundGradient(condition)} rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 overflow-hidden hover-lift`}>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5 blur-xl animate-float"
              style={{
                width: `${60 + Math.random() * 80}px`,
                height: `${60 + Math.random() * 80}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <MapPin className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-800">
                {name}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock size={16} />
                  <span className="font-medium">{time}</span>
                </div>
                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-600 font-medium">Live</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={shareWeather}
              className="p-3 glass rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105"
            >
              <Share2 className="text-slate-600" size={20} />
            </button>
            <div className="px-4 py-2 glass rounded-full">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500 animate-pulse" size={16} />
                <span className="text-slate-700 font-bold text-sm">LIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main temperature display */}
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
          <div className="flex items-center gap-6">
            {/* Weather icon with enhanced styling */}
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-white/20 to-white/10 rounded-full blur-xl"></div>
              <div className="relative glass-strong p-6 rounded-3xl backdrop-blur-sm animate-float">
                {getWeatherIcon(condition, 64)}
              </div>
            </div>
            
            {/* Temperature and description */}
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-6xl sm:text-8xl font-black text-slate-800">
                  {Math.round(main.temp)}
                </span>
                <div className="flex flex-col">
                  <span className="text-3xl text-slate-600 font-bold">°C</span>
                  <div className="flex items-center gap-2 mt-2">
                    <ArrowUp className="text-red-500" size={16} />
                    <span className="text-sm font-bold text-slate-700">{Math.round(main.temp_max)}°</span>
                    <ArrowDown className="text-blue-500" size={16} />
                    <span className="text-sm font-bold text-slate-700">{Math.round(main.temp_min)}°</span>
                  </div>
                </div>
              </div>
              <p className="text-xl sm:text-2xl text-slate-700 capitalize font-bold mt-3">
                {conditions[0].description}
              </p>
              <p className="text-slate-600 text-sm font-medium mt-1">
                Feels like {Math.round(main.feels_like)}°C
              </p>
            </div>
          </div>
          
          {/* Feels like temperature - moved to mobile-friendly position */}
          <div className="lg:text-right">
            <div className="glass rounded-2xl p-4">
              <p className="text-sm text-slate-600 uppercase tracking-wider font-bold">Feels like</p>
              <p className="text-4xl font-black text-slate-800">{Math.round(main.feels_like)}°C</p>
              <div className="mt-2 flex items-center gap-2">
                <Activity className="text-blue-500" size={16} />
                <span className="text-xs text-slate-500 font-medium">Real feel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced weather details grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { 
              icon: <Wind size={24} />, 
              label: 'Wind Speed', 
              value: `${Math.round((wind?.speed || 0) * 3.6)} km/h`, 
              color: 'text-blue-500',
              bgColor: 'from-blue-100 to-cyan-100' 
            },
            { 
              icon: <Droplets size={24} />, 
              label: 'Humidity', 
              value: `${main.humidity}%`, 
              color: 'text-cyan-500',
              bgColor: 'from-cyan-100 to-blue-100' 
            },
            { 
              icon: <Eye size={24} />, 
              label: 'Visibility', 
              value: `${Math.round((visibility || 10000) / 1000)} km`, 
              color: 'text-green-500',
              bgColor: 'from-green-100 to-emerald-100' 
            },
            { 
              icon: <Gauge size={24} />, 
              label: 'Pressure', 
              value: `${main.pressure} hPa`, 
              color: 'text-orange-500',
              bgColor: 'from-orange-100 to-yellow-100' 
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className={`glass-strong rounded-2xl p-4 sm:p-5 hover:bg-white/30 transition-all duration-300 hover:scale-105 bg-gradient-to-br ${item.bgColor}`}
            >
              <div className={`${item.color} mb-3 flex items-center justify-between`}>
                {item.icon}
                <div className="w-2 h-2 bg-current rounded-full animate-pulse opacity-50"></div>
              </div>
              <p className="text-xs text-slate-600 uppercase tracking-wider font-bold mb-1">
                {item.label}
              </p>
              <p className="text-xl sm:text-2xl font-black text-slate-800">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Additional details - expandable section */}
        {sys && (
          <div className="border-t border-white/20 pt-6">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between p-4 glass rounded-2xl hover:bg-white/30 transition-all duration-300"
            >
              <span className="font-bold text-slate-800">Sun Times & More Details</span>
              <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                <ArrowDown className="text-slate-600" size={20} />
              </div>
            </button>
            
            {isExpanded && (
              <div className="mt-4 grid grid-cols-2 gap-4 animate-fade-in">
                <div className="glass-strong rounded-2xl p-4 bg-gradient-to-br from-yellow-100 to-orange-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Sunrise className="text-orange-500" size={20} />
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Sunrise</span>
                  </div>
                  <p className="text-xl font-black text-slate-800">{formatTime(sys.sunrise)}</p>
                </div>
                
                <div className="glass-strong rounded-2xl p-4 bg-gradient-to-br from-orange-100 to-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Sunset className="text-red-500" size={20} />
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Sunset</span>
                  </div>
                  <p className="text-xl font-black text-slate-800">{formatTime(sys.sunset)}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handle7DayForecast}
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Calendar size={20} />
            )}
            <span>{loading ? 'Fetching...' : 'View 7-Day Forecast'}</span>
          </button>
          
          <button
            onClick={handleWeatherMaps}
            className="px-8 py-4 glass-strong text-slate-700 font-bold rounded-2xl hover:bg-white/40 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
          >
            <MapPin size={20} />
            <span>Weather Maps</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;