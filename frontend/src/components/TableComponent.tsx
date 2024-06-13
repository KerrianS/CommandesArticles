// src/components/TableComponent.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import { FaGitlab } from 'react-icons/fa';  // Import de l'icône GitHub
import CardComponent from './CardComponent'; // Import du composant CardComponent

interface TableComponentProps {
  data: any[]; // Les données à afficher dans la table
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>N°</TableCell>
            <TableCell>NOM</TableCell>
            <TableCell>DESCRIPTION</TableCell>
            <TableCell>DATE CREATION</TableCell>
            <TableCell>ETAT</TableCell>
            <TableCell>PHASE</TableCell>
            <TableCell>ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>
                <CardComponent text={row.etat} />
              </TableCell>
              <TableCell>
                <CardComponent text={row.phase} backgroundColor="lightgrey" />
              </TableCell>
              <TableCell>
                <IconButton aria-label="download pdf">
                  <PictureAsPdfIcon />
                </IconButton>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="github">
                  <FaGitlab />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
