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
      case 'EN STOCK':
        return '#32CD32'; 
      case 'RUPTURE':
        return '#E50000';
      case 'EN COURS':
        return '#ff8000'; 
      case 'FABRICABLE':
        return '#9ACD32';
      case 'INFABRICABLE':
        return '#ff8000';
      case 'LIVRE':
        return '#65c368';
      case 'NON LIVRE':
        return '#ff8000';
      default:
        return 'white';
    }
  })();

  return (
    <Card sx={{ minWidth: 110, maxWidth: 110, marginRight: 1, borderRadius: 2, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: defaultBackgroundColor }}>
      <CardContent sx={{ padding: 0, ':last-child': { paddingBottom: 0 } }}>
        <Typography variant="body2" color="white" sx={{ textAlign: 'center' }}>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MiniCardComponent;
