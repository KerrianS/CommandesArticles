// src/components/CardComponent.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface CardComponentProps {
  text: string;
  backgroundColor?: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ text, backgroundColor }) => {
  // Définir la couleur de fond par défaut si non spécifiée
  const defaultBackgroundColor = backgroundColor || (() => {
    switch (text) {
      case 'EN COURS':
        return '#E5E500';
      case 'TERMINE':
        return '#ADFF2F';
      default:
        return 'white';
    }
  })();

  return (
    <Card sx={{ minWidth: 100, maxWidth: 100, marginRight: 1, borderRadius: 2, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: defaultBackgroundColor }}>
      <CardContent sx={{ padding: 0, ':last-child': { paddingBottom: 0 } }}>
        <Typography variant="body2" color="text.primary" sx={{ textAlign: 'center' }}>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardComponent;
