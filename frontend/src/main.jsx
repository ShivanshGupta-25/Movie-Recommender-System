import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FavoritesProvider } from './Context/FavoritesContext.jsx';
import { WatchlistProvider } from "./Context/WatchlistContext";
import { RecentlyViewedProvider } from "./Context/RecentlyViewedContext";
import { SearchHistoryProvider } from "./Context/SearchHistoryContext";
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <FavoritesProvider>
      <WatchlistProvider>
        <RecentlyViewedProvider>
          <SearchHistoryProvider>
            <App />
          </SearchHistoryProvider>
        </RecentlyViewedProvider>
      </WatchlistProvider>
    </FavoritesProvider>
  </StrictMode>,
);
