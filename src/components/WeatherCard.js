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
      case 'mist':
      case 'fog': return <Cloud className="text-gray-400" {...iconProps} />;
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

  const fetchForecast = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/forecast/${coord.lat}/${coord.lon}`);
      setForecast(response.data);
      setViewMode('forecast');
    } catch (error) {
      console.error('Error fetching forecast:', error);
      alert('Failed to fetch 7-day forecast.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative z-20 w-full max-w-2xl mt-8 glass-strong rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-700 ease-in-out hover-lift hover:scale-102 ${isExpanded ? 'scale-105' : ''}`}
      style={{
        background: `linear-gradient(to top right, var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to)), radial-gradient(circle, rgba(255,255,255,0.2) 1%, transparent 100%)`,
        '--tw-gradient-from': `var(--tw-from-color)`,
        '--tw-gradient-via': `var(--tw-via-color)`,
        '--tw-gradient-to': `var(--tw-to-color)`,
        '--tw-from-color': `var(--from-${getBackgroundGradient(condition).split('from-')[1].split('/')[0]})`,
        '--tw-via-color': `var(--via-${getBackgroundGradient(condition).split('via-')[1].split('/')[0]})`,
        '--tw-to-color': `var(--to-${getBackgroundGradient(condition).split('to-')[1].split('/')[0]})`,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
            {name}
          </h2>
          <p className="text-slate-500 font-medium text-lg mt-1">
            <Clock size={16} className="inline-block mr-1" />
            {time}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-3 bg-white/30 backdrop-blur-md rounded-2xl shadow-md border border-white/40">
            {getWeatherIcon(condition)}
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <div>
          <span className="text-7xl sm:text-8xl font-black text-slate-900 drop-shadow-lg">
            {Math.round(main.temp)}°
          </span>
          <p className="text-xl font-semibold text-slate-700 mt-1">
            {conditions[0].description}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-slate-600">
          <div className="flex items-center gap-2">
            <ArrowUp size={16} className="text-red-500" />
            <span className="font-semibold">{Math.round(main.temp_max)}° Max</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowDown size={16} className="text-blue-500" />
            <span className="font-semibold">{Math.round(main.temp_min)}° Min</span>
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass p-4 rounded-xl text-center shadow-md">
          <Droplets size={24} className="text-blue-500 mx-auto mb-2" />
          <p className="text-sm text-slate-500">Humidity</p>
          <p className="text-lg font-bold text-slate-800">{main.humidity}%</p>
        </div>
        <div className="glass p-4 rounded-xl text-center shadow-md">
          <Wind size={24} className="text-sky-500 mx-auto mb-2" />
          <p className="text-sm text-slate-500">Wind</p>
          <p className="text-lg font-bold text-slate-800">{Math.round(wind.speed)} km/h</p>
        </div>
        <div className="glass p-4 rounded-xl text-center shadow-md">
          <Gauge size={24} className="text-indigo-500 mx-auto mb-2" />
          <p className="text-sm text-slate-500">Pressure</p>
          <p className="text-lg font-bold text-slate-800">{main.pressure} hPa</p>
        </div>
        <div className="glass p-4 rounded-xl text-center shadow-md">
          <Eye size={24} className="text-gray-500 mx-auto mb-2" />
          <p className="text-sm text-slate-500">Visibility</p>
          <p className="text-lg font-bold text-slate-800">{visibility / 1000} km</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          onClick={fetchForecast}
          disabled={loading}
          className="flex-1 px-6 py-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full text-lg font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={20} className="animate-spin" /> Loading...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Calendar size={20} /> 7-Day Forecast
            </span>
          )}
        </button>
        <button
          onClick={shareWeather}
          className="p-3 bg-white/20 text-slate-700 rounded-full shadow-md hover:bg-white/40 transition-colors duration-300"
        >
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default WeatherCard;