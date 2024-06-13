import React, { useEffect, useState } from 'react';
import TableComponent from '../components/TableComponent';
import SearchBarComponent from '../components/SearchBarComponent';
import CardComponent from '../components/CardComponent';
import { FaInfoCircle } from 'react-icons/fa';

interface ArticlesPageProps {
  backgroundColor?: string;
}

const ArticlesPages: React.FC<ArticlesPageProps> = ({ backgroundColor }) => {
  const [data, setData] = useState<any[]>([]);
  const [additionalData, setAdditionalData] = useState<any[]>([]);
  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const columns = [
    { id: 'id', label: 'N°' },
    { id: 'name', label: 'NOM' },
    { id: 'description', label: 'DESCRIPTION' },
  ];

  useEffect(() => {
    // Fetch main data
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleIconClick = (rowData: any) => {
    console.log('Clicked on info icon for row:', rowData);
    const rowIndex = data.findIndex(item => item.id === rowData.id);
    setClickedRowIndex(rowIndex);
    
    // Fetch additional data based on the clicked row
    fetch(`https://api.example.com/data/${rowData.id}/components`)
      .then(response => response.json())
      .then(data => {
        setAdditionalData(data);
        setShowDetails(true);
      })
      .catch(error => console.error('Error fetching additional data:', error));
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <br />
      <SearchBarComponent />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '20px' }}>
        <div>
          <TableComponent 
            data={data} 
            columns={columns}
            actionColumn={{
              label: 'DETAILS',
              onClick: handleIconClick,
              icon: <FaInfoCircle />,
            }}
          />
        </div>
        {clickedRowIndex !== null && showDetails && (
          <div style={{ maxWidth: '400px' }}>
            <CardComponent backgroundColor={backgroundColor || 'white'}>
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <h2>Composants "{data[clickedRowIndex].name}"</h2>
              </div>
              <TableComponent 
                data={additionalData} 
                columns={columns}
              />
            </CardComponent>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticlesPages;
