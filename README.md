# Countries Information Web App

This web application allows users to view information about different countries, including their weather and bordering countries.

## Table of Contents

- [Features](#features)
- [File Structure](#file-structure)
- [Installation and Usage](#installation-and-usage)
- [Contributing](#contributing)
- [License](#license)
- [Live URL](#live-url)

## Features

- **Country Information:** View detailed information about a selected country, including its name, capital, weather, and bordering countries.
- **Weather Display:** See the current weather in the capital city of the selected country.
- **Navigation:** Navigate to bordering countries to explore more information about them.
- **Responsive Design:** A responsive layout that works well on both desktop and mobile devices.

## File Structure

- **`README.md`:** This file contains documentation about the project.
- **`index.html`:** HTML file serving as the entry point for the application.
- **`package-lock.json` and `package.json`:** Files containing npm package information and dependencies.
- **`public/vite.svg`:** Static assets used in the application.
- **`src/`:** Main source code directory containing JavaScript files for the application.
  - **`App.jsx`:** Main React component for rendering the application.
  - **`auth/`:** Directory containing authentication-related components and Firebase configuration.
    - **`ProtectedRoute.jsx`:** React component for creating protected routes.
    - **`ProtectedRouteWrapper.jsx`:** React component for wrapping protected routes.
    - **`firebase.js`:** Firebase configuration file.
  - **`components/`:** Directory containing reusable UI components.
    - **`Header.jsx`:** Header component for displaying navigation links.
  - **`index.css`:** CSS file containing global styles for the application.
  - **`main.jsx`:** Main JavaScript file for rendering the React application.
  - **`routes/`:** Directory containing React components for different routes/pages.
    - **`Countries.jsx`:** React component for displaying a list of countries.
    - **`CountriesSingle.jsx`:** React component for displaying detailed information about a single country.
    - **`Favourites.jsx`:** React component for displaying a user's favorite countries.
    - **`Home.jsx`:** React component for the home page.
    - **`Login.jsx`:** React component for user login.
    - **`Register.jsx`:** React component for user registration.
    - **`Root.jsx`:** Root React component for routing.
  - **`services/`:** Directory containing service files for interacting with external APIs or data sources.
    - **`countries.js`:** Service file for fetching country data.
  - **`store/`:** Directory containing Redux store configuration and slice files.
    - **`countriesSlice.js`:** Redux slice file for managing country-related state.
    - **`favouritesSlice.js`:** Redux slice file for managing favorite countries state.
    - **`store.js`:** Redux store configuration file.

## Installation and Usage

1. Clone the repository: `git clone https://github.com/maheshbhandari433/countries-nextjs-starter.git`
2. Navigate to the project directory: `cd countries-web-app`
3. Install dependencies: `npm install`
4. Run the application: `npm start`

The application will be running on [http://localhost:5173](http://localhost:5173)

## Live URL

Visit the live version of the application at: [https://your-live-url.com](https://your-live-url.com)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.










