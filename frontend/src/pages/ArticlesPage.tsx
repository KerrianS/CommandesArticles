import React, { useEffect, useState } from 'react';
import CardComponent from '../components/CardComponent';
import TableComponent from '../components/TableComponent';
import { useParams } from 'react-router-dom';

interface ArticlesPageProps {
  backgroundColor?: string;
}

const generateColor = (index: number) => {
  const hue = (index * 137.508) % 360; // Utilisation d'une formule pour générer une couleur unique en fonction de l'index
  return `hsl(${hue}, 70%, 80%)`;
};

const ArticlesPages: React.FC<ArticlesPageProps> = ({ backgroundColor }) => {
  const { id } = useParams(); 
  const [data, setData] = useState<any>({});
  const [levelOne, setLevelOne] = useState<any[]>([]); 
  const [levelTwo, setLevelTwo] = useState<any[]>([]); 
  const [levelThree, setLevelThree] = useState<any[]>([]); 

  useEffect(() => {
    fetch(`http://10.15.81.2:3039/article/${id}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
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

  const columns = [
    { id: 'composant', label: 'Composant' },
    { id: 'quantity', label: 'Quantité' },
    { id: 'stock', label: 'Stock' },
    { id: 'composant_parent', label: 'Composant Parent', isVisible: false }
  ];

  const defaultQuantity = 0;
  const defaultStock = 0;

  // Stocker les couleurs des composants parents dans un objet
  const parentColors: { [key: string]: string } = {};

  // Fonction pour récupérer ou générer une couleur pour un composant parent
  const getColorForParent = (parent: string) => {
    if (!parentColors[parent]) {
      const index = Object.keys(parentColors).length + 1; // Obtenir un index unique pour chaque composant parent
      parentColors[parent] = generateColor(index);
    }
    return parentColors[parent];
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <br />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: '20px' }}>
        <div>
          <CardComponent>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <h2>Niveau 1</h2>
            </div>
            <TableComponent 
              data={levelOne.map(item => ({
                ...item,
                quantity: item.quantity || defaultQuantity,
                stock: item.stock || defaultStock,
                backgroundColor: getColorForParent(item.composant)
              }))} 
              columns={columns.slice(0, 3)} 
            />
          </CardComponent>
        </div>
        <div>
          <CardComponent>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <h2>Niveau 2</h2>
            </div>
            <TableComponent 
              data={levelTwo.map(item => ({
                ...item,
                quantity: item.quantity || defaultQuantity,
                stock: item.stock || defaultStock,
                backgroundColor: getColorForParent(item.composant_parent)
              }))} 
              columns={columns} 
            />
          </CardComponent>
        </div>
        <div>
          <CardComponent>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <h2>Niveau 3</h2>
            </div>
            <TableComponent 
              data={levelThree.map(item => ({
                ...item,
                quantity: item.quantity || defaultQuantity,
                stock: item.stock || defaultStock,
                backgroundColor: getColorForParent(item.composant_parent)
              }))} 
              columns={columns} 
            />
          </CardComponent>
        </div>
      </div>
    </div>
  );
}

export default ArticlesPages;
