import React, { useEffect, useState } from 'react';
import SearchBarComponent from '../components/SearchBarComponent';
import TableComponent from '../components/TableComponent';
import CardComponent from '../components/CardComponent';
import TableLevelComponent from '../components/TableLevelComponent'; // Import du composant TableLevelComponent
import { useParams } from 'react-router-dom';

interface ArticlesPageProps {
  backgroundColor?: string;
}

const ArticlesPages: React.FC<ArticlesPageProps> = ({ backgroundColor }) => {
  const { id } = useParams(); // Récupère l'ID de l'article depuis l'URL
  const [data, setData] = useState<any>({});
  const [levelOne, setLevelOne] = useState<any[]>([]); // Modifiez le type en any[]
  const [levelTwo, setLevelTwo] = useState<any[]>([]); // Modifiez le type en any[]
  const [levelThree, setLevelThree] = useState<any[]>([]); // Modifiez le type en any[]

  useEffect(() => {
    // Fetch main data
    fetch(`http://10.10.30.100:3031/article/${id}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        // Assurez-vous que les données existent avant de les traiter
        if (Array.isArray(data.level_one)) {
          setLevelOne(data.level_one);
        } else if (data.level_one) {
          setLevelOne([data.level_one]);
        }
        if (Array.isArray(data.level_two)) {
          setLevelTwo(data.level_two);
        } else if (data.level_two) {
          setLevelTwo([data.level_two]);
        }
        if (Array.isArray(data.level_three)) {
          setLevelThree(data.level_three);
        } else if (data.level_three) {
          setLevelThree([data.level_three]);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <br />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: '20px' }}>
        {levelOne.length > 0 && (
          <div>
            <h2>Composants niveau 1</h2>
            <CardComponent>
              <TableLevelComponent data={levelOne} />
            </CardComponent>
          </div>
        )}
        {levelTwo.length > 0 && (
          <div>
            <h2>Composants niveau 2</h2>
            <CardComponent>
              <TableLevelComponent data={levelTwo} />
            </CardComponent>
          </div>
        )}
        {levelThree.length > 0 && (
          <div>
            <h2>Composants niveau 3</h2>
            <CardComponent>
              <TableLevelComponent data={levelThree} />
            </CardComponent>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticlesPages;
