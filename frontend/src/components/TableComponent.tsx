// src/components/TableComponent.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';

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
  actionColumn?: ActionColumn; // Ajout d'une colonne d'action optionnelle
}

const TableComponent: React.FC<TableComponentProps> = ({ data, columns, actionColumn }) => {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
            {actionColumn && ( // Vérifier si une colonne d'action est fournie
              <TableCell>{actionColumn.label}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
              {actionColumn && ( // Afficher la colonne d'action si elle est fournie
                <TableCell>
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
  );
}

export default TableComponent;
