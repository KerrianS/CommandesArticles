import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, CircularProgress, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TableComponent from '../components/TableComponent';
import CardComponent from '../components/CardComponent';
import { FaInfoCircle } from 'react-icons/fa';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

interface CommandesPagesProps {
  backgroundColor?: string;
}

const CommandesPages: React.FC<CommandesPagesProps> = ({ backgroundColor }) => {
  const [data, setData] = useState<any[]>([]);
  const [additionalData, setAdditionalData] = useState<any[]>([]);
  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loadingMainData, setLoadingMainData] = useState<boolean>(true);
  const [loadingAdditionalData, setLoadingAdditionalData] = useState<boolean>(false);
  const navigate = useNavigate();

  const columns = [
    { id: 'etat', label: 'Etat' },
    { id: 'DO_Piece', label: 'N° de commande' },
    { id: 'DO_Ref', label: 'Référence' },
    { id: 'DO_Tiers', label: 'Tiers' },
    { id: 'probleme', label: 'Problème', render: (row: any) => <strong>{row.probleme}</strong> }
  ];

  const additionalColumns = [
    { id: 'DO_Piece', label: 'N° de pièce' },
    { id: 'AR_Ref', label: 'Référence Article' },
  ];

  useEffect(() => {
    fetch('http://10.10.30.100:3031/commande/etat')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoadingMainData(false); // Arrêter le loader une fois que les données principales sont chargées
      })
      .catch(error => {
        console.error('Error fetching main data:', error);
        setLoadingMainData(false); // En cas d'erreur, arrêter le loader
      });
  }, []);

  const handleIconClick = (rowData: any) => {
    const rowIndex = data.findIndex(item => item.DO_Piece === rowData.DO_Piece);
    setClickedRowIndex(rowIndex);
    setLoadingAdditionalData(true); // Afficher le loader pendant la récupération des données supplémentaires

    fetch(`http://10.10.30.100:3031/commande/${rowData.DO_Piece}`)
      .then(response => response.json())
      .then(data => {
        setAdditionalData(data);
        setShowDetails(true);
        setLoadingAdditionalData(false); // Arrêter le loader une fois les données supplémentaires chargées
      })
      .catch(error => {
        console.error('Error fetching additional data:', error);
        setLoadingAdditionalData(false); // En cas d'erreur, arrêter le loader
      });
  };

  const handleAdditionalIconClick = (rowData: any) => {
    navigate(`/articles/${rowData.AR_Ref}`); // Utilisation de backticks
  };

  const filteredData = data.filter(item =>
    item.DO_Piece.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const determineEtat = (item: any): string => {
    if (!item.DO_Tiers) {
      return 'Indisponible';
    }
    return item.status ? 'Disponible' : 'Indisponible';
  };

  const newData = filteredData.map(item => ({
    ...item,
    etat: determineEtat(item),
    probleme: item.message || ''
  }));

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: '40px' }}>
          <div>
            <CardComponent backgroundColor={backgroundColor || 'white'}>
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <h2>Tableau des commandes</h2>
              </div>
              <TextField
                variant="outlined"
                placeholder="Recherche (N° de piece)"
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
                  actionColumn={{
                    label: 'Détails',
                    onClick: handleIconClick,
                    icon: <FaInfoCircle />,
                  }}
                />
              )}
            </CardComponent>
          </div>

          {clickedRowIndex !== null && showDetails && (
            <div style={{ maxWidth: '400px' }}>
              <CardComponent backgroundColor={backgroundColor || 'white'}>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                  <h2>Articles de la commande "{data[clickedRowIndex].DO_Piece}"</h2>
                </div>
                {loadingAdditionalData ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                    <CircularProgress color="primary" size={40} thickness={5} />
                  </Box>
                ) : (
                  <TableComponent
                    data={additionalData}
                    columns={additionalColumns}
                    cellStyle={{ padding: '12px 20px' }}
                    actionColumn={{
                      label: 'Détails',
                      onClick: handleAdditionalIconClick,
                      icon: <ArrowForwardIcon />,
                    }}
                  />
                )}
              </CardComponent>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandesPages;
