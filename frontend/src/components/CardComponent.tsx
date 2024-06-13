import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface CardComponentProps {
  backgroundColor?: string;
  children: React.ReactNode; // Accepter les enfants
}

const CardComponent: React.FC<CardComponentProps> = ({ backgroundColor, children }) => {
  const defaultBackgroundColor = backgroundColor || 'white'; 

  return (
    <Card sx={{ backgroundColor: defaultBackgroundColor, width: '100%', marginBottom: 2 }}>
      <CardContent>
        <Typography variant="body1">
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardComponent;
