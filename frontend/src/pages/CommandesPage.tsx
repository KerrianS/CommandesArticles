import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
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
  const navigate = useNavigate();

  const columns = [
    { id: 'etat', label: 'ETAT' },
    { id: 'DO_Piece', label: 'N° de commande' },
    { id: 'DO_Ref', label: 'Référence' },
    { id: 'DO_Tiers', label: 'Tiers' },
  ];

  const additionalColumns = [
    { id: 'DO_Piece', label: 'N° de pièce' },
    { id: 'AR_Ref', label: 'Référence Article' },
  ];

  useEffect(() => {
    // Fetch main data
    fetch('http://10.10.30.100:3031/commande')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleIconClick = (rowData: any) => {
    const rowIndex = data.findIndex(item => item.DO_Piece === rowData.DO_Piece);
    setClickedRowIndex(rowIndex);

    fetch(`http://10.10.30.100:3031/commande/${rowData.DO_Piece}`)
      .then(response => response.json())
      .then(data => {
        setAdditionalData(data);
        setShowDetails(true);
      })
      .catch(error => console.error('Error fetching additional data:', error));
  };

  const handleAdditionalIconClick = (rowData: any) => {
    navigate(`/articles/${rowData.AR_Ref}`);
  };

  const filteredData = data.filter(item =>
    item.DO_Piece.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction pour déterminer l'état en fonction des données
  const determineEtat = (item: any): string => {
    // Mettez ici votre logique pour déterminer l'état
    // Par exemple, si l'état est disponible lorsque DO_Tiers est non vide
    return item.DO_Tiers ? 'Disponible' : 'Indisponible';
  };

  // Ajout de la colonne "ETAT" avec la fonction determineEtat
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
              <TableComponent
                data={newData} // Utiliser newData avec la colonne "ETAT" ajoutée
                columns={columns}
                cellStyle={{ padding: '12px 60px' }}
                actionColumn={{
                  label: 'Détails',
                  onClick: handleIconClick,
                  icon: <FaInfoCircle />,
                }}
              />
            </CardComponent>
          </div>

          {clickedRowIndex !== null && showDetails && (
            <div style={{ maxWidth: '400px' }}>
              <CardComponent backgroundColor={backgroundColor || 'white'}>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                  <h2>Articles de la commande "{data[clickedRowIndex].DO_Piece}"</h2>
                </div>
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
              </CardComponent>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default CommandesPages;
