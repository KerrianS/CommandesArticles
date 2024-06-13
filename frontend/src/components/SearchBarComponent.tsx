// src/components/SearchBar.tsx
import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBarComponent: React.FC = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Recherche..."
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ bgcolor: 'white', borderRadius: 1 }}
    />
  );
}

export default SearchBarComponent;
