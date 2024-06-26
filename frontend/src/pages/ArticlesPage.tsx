import React, { useState } from 'react';
import { TextField, InputAdornment, CircularProgress, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TableComponent from '../components/TableComponent';
import CardComponent from '../components/CardComponent';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useQuery } from 'react-query';

interface Article {
  AR_Ref: string;
  AS_QteSto: number;
  total_commande_vendu: number;
  total_commande_acheter: number;
  fabricable: number;
}

interface ArticlesPageProps {
  backgroundColor?: string;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ backgroundColor }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  const columns = [
    { id: 'AR_Ref', label: 'Article' },
    { id: 'total_commande_vendu', label: 'Commande client' },
    { id: 'AS_QteSto', label: 'Stock' },
    { id: 'total_commande_acheter', label: 'Commande fournisseur' },
    { id: 'etat', label: 'État' },
    { id: 'fabricable', label: 'Quantité fabricable' },
    { id: 'etatFabricable', label: 'Composant' },
  ];

  const fetchArticles = async () => {
    const response = await fetch('http://10.15.81.2:3031/articles');
    if (!response.ok) {
      throw new Error('Error fetching articles data');
    }
    return response.json();
  };

  const { data, isLoading, error } = useQuery<Article[]>('articles', fetchArticles);
  const filteredData = data?.filter(item =>
    item.AR_Ref.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const determineEtat = (item: Article): string => {
    if (item.total_commande_vendu > (item.AS_QteSto + item.total_commande_acheter)) {
      return 'RUPTURE';
    }
    if (item.total_commande_vendu > item.AS_QteSto && (item.total_commande_acheter + item.AS_QteSto) >= item.total_commande_vendu) {
      return 'EN COURS';
    }
    if (item.total_commande_vendu <= item.AS_QteSto) {
      return 'EN STOCK';
    }
    return 'INCONNU';
  };

  const determineFabricable = (item: Article): string => {
    if (item.fabricable > 0) {
      return "FABRICABLE";
    } else {
      return "INFABRICABLE";
    }
  }

  const newData = filteredData.map((item: Article) => ({
    ...item,
    etat: determineEtat(item),
    etatFabricable: determineFabricable(item),
  }));

  const handleAdditionalIconClick = (rowData: Article) => {
    navigate(`/articles/${rowData.AR_Ref}`);
  };

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
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color: 'red' }}>
                  <p>Error loading data</p>
                </Box>
              ) : (
                <TableComponent
                  data={newData}
                  columns={columns}
                  cellStyle={{ padding: '12px 60px' }}
                  actionColumn={{
                    label: 'Nomenclature',
                    onClick: handleAdditionalIconClick,
                    icon: <ArrowForwardIcon />,
                  }}
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
