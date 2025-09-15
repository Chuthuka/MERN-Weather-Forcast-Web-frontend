import React, { useState, useRef, useEffect } from 'react';
import { Search, Zap, MapPin, Loader2, X } from 'lucide-react';
import axios from 'axios';



const SearchForm = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [suggestions] = useState([
    'Colombo', 'Kandy', 'Galle', 'Matara', 'Jaffna', 'Rathnapura', 'Matale', 'Mannar'
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/api/weather/${city}`);
      onSearch(response.data);
      setCity('');
      setShowSuggestions(false);
      
      // Save to history
      try {
        await axios.post('http://localhost:5000/api/history', { city });
      } catch (historyError) {
        console.error('Error saving to history:', historyError);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'City not found.Check the spelling or try a different city.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const clearInput = () => {
    setCity('');
    setError('');
    inputRef.current?.focus();
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(city.toLowerCase()) && suggestion.toLowerCase() !== city.toLowerCase()
  );

  return (
    <div className="relative w-full max-w-3xl mb-8">
      {/* Floating particles background */}
      <div className="absolute -inset-8 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main search container */}
      <div 
        ref={inputRef}
        className={`relative glass-strong rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-500 hover-lift ${
          focused ? 'scale-102 shadow-glow-lg ring-2 ring-blue-400/50' : ''
        }`}
      >
        
        {/* Search header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <Search className="text-white" size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Search Weather</h2>
        </div>
        
        <div className="relative">
          <div className="relative flex items-center">
            {/* Search icon */}
            <div className={`absolute left-4 z-10 transition-all duration-300 ${
              focused ? 'text-blue-600 scale-110' : 'text-slate-400'
            }`}>
              {loading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <Search size={24} />
              )}
            </div>
            
            {/* Enhanced input field */}
            <input
              ref={inputRef}
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setError('');
                setShowSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => {
                setFocused(true);
                setShowSuggestions(city.length > 0);
              }}
              onBlur={() => {
                setFocused(false);
                // Delay hiding suggestions to allow clicking
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(e);
                } else if (e.key === 'Escape') {
                  setShowSuggestions(false);
                  inputRef.current?.blur();
                }
              }}
              placeholder="Enter city name (e.g., New York, London, Tokyo...)"
              disabled={loading}
              className="w-full pl-14 pr-32 py-5 sm:py-6 bg-white/50 backdrop-blur-sm border-2 border-white/60 rounded-2xl text-slate-800 placeholder-slate-500 text-lg font-medium focus:outline-none focus:border-blue-400 focus:bg-white/70 transition-all duration-300 disabled:opacity-50"
            />
            
            {/* Clear button */}
            {city && !loading && (
              <button
                onClick={clearInput}
                className="absolute right-32 p-2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                <X size={20} />
              </button>
            )}
            
            {/* Enhanced submit button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !city.trim()}
              className="absolute right-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span className="hidden sm:inline">Searching...</span>
                </>
              ) : (
                <>
                  <Zap size={18} />
                  <span className="hidden sm:inline">Search</span>
                </>
              )}
            </button>
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-2xl shadow-xl border border-white/30 z-20 max-h-60 overflow-y-auto">
              <div className="p-2">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold px-4 py-2">
                  Popular Cities
                </p>
                {filteredSuggestions.slice(0, 6).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/30 transition-all duration-200 flex items-center gap-3 group"
                  >
                    <MapPin size={16} className="text-blue-500 group-hover:text-blue-600" />
                    <span className="text-slate-700 font-medium group-hover:text-slate-800">
                      {suggestion}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 backdrop-blur-sm flex items-start gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Quick tips */}
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="text-xs text-slate-500 font-medium">Quick tips:</span>
          {['New York', 'London', 'Tokyo'].map((tip, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(tip)}
              className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-xs font-medium transition-colors duration-200"
            >
              {tip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;