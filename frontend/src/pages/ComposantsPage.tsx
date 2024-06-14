import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TableComponent from '../components/TableComponent';
import SearchBarComponent from '../components/SearchBarComponent';
import CardComponent from '../components/CardComponent';
import { FaInfoCircle } from 'react-icons/fa';

interface ComposantsPageProps {
  backgroundColor?: string;
}

const ComposantsPage: React.FC<ComposantsPageProps> = ({ backgroundColor }) => {
  const { articleId } = useParams<{ articleId: string }>();
  const [data, setData] = useState<any[]>([]);
  const [n1Data, setN1Data] = useState<any[]>([]);
  const [n2Data, setN2Data] = useState<any[]>([]);
  const [n3Data, setN3Data] = useState<any[]>([]);
  const [showN2, setShowN2] = useState<boolean>(false);
  const [showN3, setShowN3] = useState<boolean>(false);

  const columns = [
    { id: 'id', label: 'N°' },
    { id: 'name', label: 'NOM' },
    { id: 'description', label: 'DESCRIPTION' },
  ];

  useEffect(() => {
    fetch(`https://api.example.com/data/${articleId}/components`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [articleId]);

  const fetchNestedData = (id: number, setDataCallback: React.Dispatch<React.SetStateAction<any[]>>, setShowCallback: React.Dispatch<React.SetStateAction<boolean>>) => {
    fetch(`https://api.example.com/data/${id}/components`)
      .then(response => response.json())
      .then(data => {
        setDataCallback(data);
        setShowCallback(true);
      })
      .catch(error => console.error('Error fetching nested data:', error));
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <br />
      <div>
        <TableComponent 
          data={data} 
          columns={columns}
          actionColumn={{
            label: 'N1',
            onClick: (rowData) => fetchNestedData(rowData.id, setN1Data, () => setShowN2(false)),
            icon: <FaInfoCircle />,
          }}
        />
        {showN2 && (
          <CardComponent backgroundColor={backgroundColor || 'white'}>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <h2>Composants de N1</h2>
            </div>
            <TableComponent 
              data={n1Data} 
              columns={columns}
              actionColumn={{
                label: 'N2',
                onClick: (rowData) => fetchNestedData(rowData.id, setN2Data, () => setShowN3(false)),
                icon: <FaInfoCircle />,
              }}
            />
          </CardComponent>
        )}
        {showN3 && (
          <CardComponent backgroundColor={backgroundColor || 'white'}>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <h2>Composants de N2</h2>
            </div>
            <TableComponent 
              data={n2Data} 
              columns={columns}
              actionColumn={{
                label: 'N3',
                onClick: (rowData) => fetchNestedData(rowData.id, setN3Data, () => {}),
                icon: <FaInfoCircle />,
              }}
            />
          </CardComponent>
        )}
      </div>
    </div>
  );
}

export default ComposantsPage;
