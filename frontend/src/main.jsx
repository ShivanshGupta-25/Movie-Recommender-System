import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FavoritesProvider } from './Context/FavoritesContext.jsx';
import { WatchlistProvider } from "./Context/WatchlistContext";
import { RecentlyViewedProvider } from "./Context/RecentlyViewedContext";
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <FavoritesProvider>
      <WatchlistProvider>
        <RecentlyViewedProvider>
          <App />
        </RecentlyViewedProvider>
      </WatchlistProvider>
    </FavoritesProvider>
  </StrictMode>,
);
