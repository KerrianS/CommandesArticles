import React from 'react';
import TableComponent from '../components/TableComponent';
import SearchBarComponent from '../components/SearchBarComponent';
import CardComponent from '../components/CardComponent';
import { FaInfoCircle } from 'react-icons/fa'; // Import de l'icône ici

interface HomePageProps {
  backgroundColor?: string;
}

const HomePage: React.FC<HomePageProps> = ({ backgroundColor }) => {
  const [additionalData, setAdditionalData] = React.useState<any[]>([]);
  const [clickedRowIndex, setClickedRowIndex] = React.useState<number | null>(null);

  const data = [
    { id: 1, name: 'Article 1', description: 'Description de l\'Article 1', date: '10/06/24', etat: 'EN COURS', phase: 'PRODUCTION' },
    { id: 2, name: 'Article 2', description: 'Description de l\'Article 2', date: '10/06/24', etat: 'TERMINE', phase: 'MAQUETTE'},
    { id: 3, name: 'Article 3', description: 'Description de l\'Article 3', date: '10/06/24', etat: 'EN COURS', phase: 'DEPLOIEMENT' },
  ];

  const columns = [
    { id: 'id', label: 'N°' },
    { id: 'name', label: 'NOM' },
    { id: 'description', label: 'DESCRIPTION' },
  ];

  const componentData = [
    [
      { id: 4, name: 'Composant A', description: 'Description' },
      { id: 5, name: 'Composant B', description: 'Description' },
    ],
    [
      { id: 6, name: 'Composant C', description: 'Description' },
      { id: 7, name: 'Composant D', description: 'Description' },
    ],
    [
      { id: 8, name: 'Composant E', description: 'Description' },
      { id: 9, name: 'Composant F', description: 'Description' },
    ],
  ];

  const handleIconClick = (rowData: any) => {
    console.log('Clicked on info icon for row:', rowData);
    const rowIndex = data.findIndex(item => item.id === rowData.id); // Find index of clicked row
    setAdditionalData(componentData[rowIndex]);
    setClickedRowIndex(rowIndex);
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <br></br>
      <SearchBarComponent />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '20px' }}>
        <div>
          <TableComponent 
            data={data} 
            columns={columns}
            actionColumn={{
              label: 'DETAILS',
              onClick: handleIconClick, // Pass the correct function signature
              icon: <FaInfoCircle />,
            }}
          />
        </div>
        {clickedRowIndex !== null && additionalData.length > 0 && (
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

export default HomePage;
