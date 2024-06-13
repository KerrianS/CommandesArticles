// src/components/Footer.tsx
import React from 'react';
import { Typography } from '@mui/material';

const FooterComponent: React.FC = () => {
  return (
    <footer style={{ marginTop: 'auto', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <Typography variant="body2" align="center">© 2024 Mon Application. Tous droits réservés.</Typography>
    </footer>
  );
}

export default FooterComponent;
