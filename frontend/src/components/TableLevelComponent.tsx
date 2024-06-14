import React from 'react';

interface TableLevelComponentProps {
  data: any[]; // Tableau d'objets à afficher dans les cellules
}

const TableLevelComponent: React.FC<TableLevelComponentProps> = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index} style={{ marginBottom: '8px' }}>
          {Object.values(item).map((value: any, i: number) => ( // Spécifier any pour le type de value
            <span key={i} style={{ marginRight: '16px' }}>{value}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TableLevelComponent;
