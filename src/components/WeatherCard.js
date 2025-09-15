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

  
}