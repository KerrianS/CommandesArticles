import React, { useState } from 'react';
import { TextField, InputAdornment, CircularProgress, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TableComponent from '../components/TableComponent';
import CardComponent from '../components/CardComponent';
import { FaInfoCircle } from 'react-icons/fa';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

interface CommandesPagesProps {
  backgroundColor?: string;
}

const CommandesPage: React.FC<CommandesPagesProps> = ({ backgroundColor }) => {
  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  const fetchMainData = async () => {
    const response = await fetch('http://10.15.81.2:3031/commande/etat');
    if (!response.ok) {
      throw new Error('Error fetching main data');
    }
    return response.json();
  };

  const { data: mainData, isLoading: loadingMainData } = useQuery('mainData', fetchMainData);

  const fetchAdditionalData = async (DO_Piece: string) => {
    const response = await fetch(`http://10.15.81.2:3031/commande/${DO_Piece}`);
    if (!response.ok) {
      throw new Error('Error fetching additional data');
    }
    return response.json();
  };

  const { data: additionalData, isLoading: loadingAdditionalData, refetch } = useQuery(
    ['additionalData', clickedRowIndex],
    () => fetchAdditionalData(mainData ? mainData[clickedRowIndex!].DO_Piece : ''),
    {
      enabled: !!clickedRowIndex && showDetails && !!mainData,
    }
  );

  const columns = [
    { id: 'etat', label: 'Etat' },
    { id: 'DO_Piece', label: 'N° de commande' },
    { id: 'DO_Ref', label: 'Référence' },
    { id: 'DO_DateLivr', label: 'Date de livraison' },
    { id: 'etatLivraison', label: 'Livraison' },
    { id: 'DO_Tiers', label: 'Tiers' },
    { id: 'probleme', label: 'Problème'}
  ];

  const additionalColumns = [
    { id: 'DO_Piece', label: 'N° de pièce' },
    { id: 'AR_Ref', label: 'Référence Article' },
  ];

  const handleIconClick = (rowData: any) => {
    if (mainData) {
      const rowIndex = mainData.findIndex((item: any) => item.DO_Piece === rowData.DO_Piece);
      setClickedRowIndex(rowIndex);
      setShowDetails(true);
      refetch();
    }
  };

  const handleAdditionalIconClick = (rowData: any) => {
    navigate(`/articles/${rowData.AR_Ref}`);
  };

  const filteredData = mainData?.filter((item: any) =>
    item.DO_Piece.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const determineEtat = (item: any): string => {
    if (!item.DO_Tiers) {
      return 'Indisponible';
    }
    return item.status ? 'Disponible' : 'Indisponible';
  };

  const determineEtatLivraison = (item: any): string => {
    const deliveryDate = dayjs(item.DO_DateLivr);
    const today = dayjs();
    return deliveryDate.isAfter(today) ? 'NON LIVRE' : 'LIVRE';
  };

  const newData = filteredData.map((item: any) => ({
    ...item,
    DO_DateLivr: dayjs(item.DO_DateLivr).format('DD/MM/YYYY'), 
    etatLivraison: determineEtatLivraison(item),
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
                mainData && (
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
                )
              )}
            </CardComponent>
          </div>

          {clickedRowIndex !== null && showDetails && mainData && (
            <div style={{ maxWidth: '400px' }}>
              <CardComponent backgroundColor={backgroundColor || 'white'}>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                  <h2>Articles de la commande "{mainData[clickedRowIndex].DO_Piece}"</h2>
                </div>
                {loadingAdditionalData ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                    <CircularProgress color="primary" size={40} thickness={5} />
                  </Box>
                ) : (
                  additionalData && (
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
                  )
                )}
              </CardComponent>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandesPage;
