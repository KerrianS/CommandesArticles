// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailsCommandesPage from './pages/DetailsCommandePage';
import CommandesPage from './pages/CommandesPage';
import ArticlesPage from './pages/ArticlesPage';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <HeaderComponent /> 
        <Routes>
          <Route path="/" element={<CommandesPage />} />
          <Route path="/commandes" element={<CommandesPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<DetailsCommandesPage />} />
        </Routes>
        <FooterComponent /> 
      </div>
    </Router>
  );
}

export default App;
