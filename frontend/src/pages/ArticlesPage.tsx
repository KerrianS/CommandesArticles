import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, CircularProgress, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TableComponent from '../components/TableComponent';
import CardComponent from '../components/CardComponent';
import { useNavigate } from 'react-router-dom';

interface ArticlesPageProps {
  backgroundColor?: string;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ backgroundColor }) => {
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loadingMainData, setLoadingMainData] = useState<boolean>(true);
  const navigate = useNavigate();

  const columns = [
    { id: 'AR_Ref', label: 'Article' },
    { id: 'AS_QteSto', label: 'Stock' },
    { id: 'total_commande', label: 'Total article commandé' },
    { id: 'etat', label: 'État' },
  ];

  useEffect(() => {
    fetch('http://10.10.30.100:3031/articles')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoadingMainData(false);
      })
      .catch(error => {
        console.error('Error fetching main data:', error);
        setLoadingMainData(false);
      });
  }, []);

  const filteredData = data.filter(item =>
    item.AR_Ref.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const determineEtat = (item: any): string => {
    return item.AS_QteSto < item.total_commande ? 'RUPTURE' : 'EN STOCK';
  };

  const newData = filteredData.map(item => ({
    ...item,
    etat: determineEtat(item),
  }));

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: '40px' }}>
          <div>
            <CardComponent backgroundColor={backgroundColor || 'white'}>
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <h2>Tableau des articles</h2>
              </div>
              <TextField
                variant="outlined"
                placeholder="Recherche (N° article)"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ bgcolor: 'white', borderRadius: 1 }}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {loadingMainData ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <TableComponent
                  data={newData}
                  columns={columns}
                  cellStyle={{ padding: '12px 60px' }}
                />
              )}
            </CardComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
