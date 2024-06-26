import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import MiniCardComponent from './MiniCardComponent';

interface Column {
  id: string;
  label: string;
  width?: string;
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
  compact?: boolean;
}

const TableComponent: React.FC<TableComponentProps> = ({ data, columns, actionColumn, cellStyle, compact }) => {

  return (
    <div style={{ overflowX: 'auto', paddingRight: '5px' }}>
      <TableContainer component={Paper} style={{ width: '100%' }}>
        <Table size="small">
          <TableHead style={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: column.width,
                    padding: compact ? '4px' : '8px'
                  }}>
                  {column.label}
                </TableCell>
              ))}
              {actionColumn && (
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center', padding: compact ? '4px' : '8px' }}>{actionColumn.label}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} style={{ backgroundColor: row.backgroundColor || 'inherit' }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      ...cellStyle,
                      textAlign: 'center',
                      width: column.width,
                      padding: compact ? '4px' : '8px'
                    }}>
                    {column.id === 'etat' || column.id === 'etatFabricable' || column.id === 'etatLivraison' ? (
                      <MiniCardComponent text={row[column.id]} />
                    ) : column.id === 'probleme' || column.id === 'DO_DateLivr' ? (
                      <strong>{row[column.id]}</strong>
                    ) : (
                      row[column.id]
                    )}
                  </TableCell>
                ))}
                {actionColumn && (
                  <TableCell style={{ textAlign: 'center', padding: compact ? '4px' : '8px' }}>
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
