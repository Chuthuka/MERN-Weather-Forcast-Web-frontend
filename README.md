# Weather Forecast App

A responsive weather forecast web application built with the **MERN** stack (MongoDB, Express.js, React, Node.js) and styled with **Tailwind CSS**. Users can search for real-time weather data by city, including temperature, conditions, and humidity, using the OpenWeatherMap API. Optional MongoDB integration stores search history.

---

## Project Structure

```
weather-forecast-app/
├── backend/
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── models/
│       └── SearchHistory.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchForm.js
│   │   │   └── WeatherCard.js
│   │   ├── pages/
│   │   │   └── Home.js
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── README.md
```

---

## Prerequisites

* Node.js (v14+ recommended)
* npm or yarn
* MongoDB (optional, only required if you want to store search history)
* OpenWeatherMap API key (free tier available)

---

## Installation & Setup

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `backend/` folder with your credentials (example below).

4. Start the server:

```bash
npm start
```

The server will run (by default) on port `5000` or the `PORT` you set in `.env`.

### Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React app:

```bash
npm start
```

The app will open at `http://localhost:3000` by default.

---

## Environment Variables

Create a `.env` file in the `backend/` directory with the following values:

```
OPENWEATHER_API_KEY=your_api_key
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

> `MONGO_URI` is optional — omit if you do not want to persist search history.

---

## Available Scripts

### Backend

* `npm start` — Start the backend server.

### Frontend

* `npm start` — Start the React development server.
* `npm run build` — Build production assets.

---

## Features

* Search for weather by city using the OpenWeatherMap API.
* Display temperature, weather conditions, humidity, and icons.
* Optionally save and view search history with MongoDB.
* Responsive UI styled with Tailwind CSS.

---

## Technologies

* **Frontend:** React, Tailwind CSS, Axios
* **Backend:** Node.js, Express.js
* **Database (optional):** MongoDB / Mongoose
* **API:** OpenWeatherMap

---

## Future Enhancements

* Add 5-day forecast and hourly charts.
* Allow users to save favorite cities.
* Implement loading spinners and improved error handling.
* Add unit tests and CI pipeline.
* Deploy to Vercel/Netlify (frontend) and Heroku/Render (backend) or a single-platform solution.

---

## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/name`.
3. Commit your changes: `git commit -m "feat: description"`.
4. Push to the branch: `git push origin feature/name`.
5. Open a Pull Request.

Please follow standard git commit conventions and include clear descriptions.

---

## Acknowledgements

* OpenWeatherMap for the weather API.
* Tailwind CSS for utility-first styling.

