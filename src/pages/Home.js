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
}