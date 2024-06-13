// src/pages/HomePage.tsx
import React from 'react';
import TableComponent from '../components/TableComponent'; 
import SearchBarComponent from '../components/SearchBarComponent'; 

const HomePage: React.FC = () => {
  const data = [
    { id: 1, name: 'Projet 1', description: 'Description du Projet 1', date: '10/06/24', etat: 'EN COURS', phase: 'PRODUCTION' },
    { id: 2, name: 'Projet 2', description: 'Description du Projet 2', date: '10/06/24', etat: 'TERMINE', phase: 'MAQUETTE'},
    { id: 3, name: 'Projet 3', description: 'Description du Projet 3', date: '10/06/24', etat: 'EN COURS', phase: 'DEPLOIMENT' },
  ];

  return (
    <div>
      <h1></h1>
      <SearchBarComponent />
      <TableComponent data={data} />
    </div>
  );
}

export default HomePage;
