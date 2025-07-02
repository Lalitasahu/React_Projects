import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebsiteListPage from './pages/WebsiteListPage';
import WebsiteDetailsPage from './pages/WebsiteDetailsPage';
import useWebsiteStore from './store/websiteStore';

function App() {
  const init = useWebsiteStore(state => state.init);
  
  useEffect(() => {
    init();
  }, [init]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-bold text-gray-900">Backlink Marketplace</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<WebsiteListPage />} />
              <Route path="/website/new" element={<WebsiteDetailsPage />} />
              <Route path="/website/:id" element={<WebsiteDetailsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;