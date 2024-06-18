// src/components/CardComponent.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface MiniCardComponentProps {
  text: string;
  backgroundColor?: string;
}

const MiniCardComponent: React.FC<MiniCardComponentProps> = ({ text, backgroundColor }) => {
  const defaultBackgroundColor = backgroundColor || (() => {
    switch (text) {
      case 'Disponible':
        return '#32CD32';
      case 'Indisponible':
        return '#E50000';
      default:
        return 'white';
      case 'EN STOCK':
        return '#32CD32'; 
      case 'RUPTURE':
        return '#E50000'; 
    }
  })();

  return (
    <Card sx={{ minWidth: 100, maxWidth: 100, marginRight: 1, borderRadius: 2, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: defaultBackgroundColor }}>
      <CardContent sx={{ padding: 0, ':last-child': { paddingBottom: 0 } }}>
        <Typography variant="body2" color="white" sx={{ textAlign: 'center' }}>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MiniCardComponent;
