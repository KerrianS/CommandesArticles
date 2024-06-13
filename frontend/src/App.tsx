// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticlesPage from './pages/ArticlesPage';
import ComposantsPage from './pages/ComposantsPage';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <HeaderComponent /> 
        <Routes>
          <Route path="/" element={<ArticlesPage />} />
          <Route path="/composants" element={<ComposantsPage />} />
        </Routes>
        <FooterComponent /> 
      </div>
    </Router>
  );
}

export default App;
