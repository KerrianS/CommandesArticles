import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import MiniCardComponent from './MiniCardComponent'; // Import du composant MiniCardComponent

interface Column {
  id: string;
  label: string;
}

interface ActionColumn {
  label: string;
  onClick: (rowData: any) => void;
  icon: React.ReactNode;
}

interface TableComponentProps {
  data: any[]; 
  columns: Column[];
  actionColumn?: ActionColumn; 
  cellStyle?: React.CSSProperties; 
}

const TableComponent: React.FC<TableComponentProps> = ({ data, columns, actionColumn, cellStyle }) => {

  return (
    <div style={{ overflowX: 'auto', paddingRight: '5px' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: '#f5f5f5' }}> 
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ fontWeight: 'bold', textAlign: 'center' }}>{column.label}</TableCell>
              ))}
              {actionColumn && (
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>{actionColumn.label}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} style={{ backgroundColor: row.backgroundColor || 'inherit' }}> {/* Ajout de la couleur de fond */}
                {columns.map((column) => (
                  <TableCell key={column.id} style={{ ...cellStyle, textAlign: 'center' }}>
                    {column.id === 'etat' ? (
                      <MiniCardComponent text={row[column.id]} />
                    ) : column.id === 'probleme' ? (
                      <strong>{row[column.id]}</strong> // Mettre en gras si c'est la colonne Problème
                    ) : (
                      row[column.id]
                    )}
                  </TableCell>
                ))}
                {actionColumn && (
                  <TableCell style={{ textAlign: 'center' }}>
                    <IconButton aria-label="detail" onClick={() => actionColumn.onClick(row)}>
                      {actionColumn.icon}
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableComponent;
