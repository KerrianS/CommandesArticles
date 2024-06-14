import React, { useEffect, useState } from 'react';
import TableComponent from '../components/TableComponent';
import SearchBarComponent from '../components/SearchBarComponent';
import CardComponent from '../components/CardComponent';
import { FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface CommandesPagesProps {
  backgroundColor?: string;
}

const CommandesPages: React.FC<CommandesPagesProps> = ({ backgroundColor }) => {
  const [data, setData] = useState<any[]>([]);
  const [additionalData, setAdditionalData] = useState<any[]>([]);
  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const navigate = useNavigate();

  const columns = [
    { id: 'DO_Piece', label: 'N° de pièce' },
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

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <br />
      <h1> Tableau des commandes </h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '20px' }}>
        <div>
          <TableComponent 
            data={data} 
            columns={columns}
            actionColumn={{
              label: 'Détails',
              onClick: handleIconClick,
              icon: <FaInfoCircle />,
            }}
          />
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
                actionColumn={{
                  label: 'Détails',
                  onClick: handleAdditionalIconClick,
                  icon: <FaInfoCircle />,
                }}
              />
            </CardComponent>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommandesPages;
