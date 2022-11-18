import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

function createData(
  title: string,
  description: string,
  deadline: string,
  priority: string,
  isComplete: number,
  action: number,
) {
  return { title, description, deadline, priority, isComplete, action };
}

const rows = [
  createData('03/01/01', 'hi', '03/03/03', 'low', 24, 4.0),
  createData('Ice cream sandwich', 'hi', '03/03/03', 'low', 37, 4.3),
  createData('Eclair', 'hi', '03/03/03', 'low', 24, 6.0),
  createData('Cupcake', 'hi', '03/03/03', 'low', 67, 4.3),
  createData('Gingerbread', 'hi', '03/03/03', 'low', 49, 3.9),
];

function App() {
  return (
    <Card sx={{ margin: '-8px' }}>
      <CardHeader
        sx={{ bgcolor: 'primary.dark', color: 'white' }}
        title={
          <>
            FRAMEWORKS
          </>
        }
        style={{ textAlign: 'center' }}
        action={
          <>
            <Button
              variant="contained"
              onClick={() => {
              }}
              sx={{ width: 100, marginRight: '7px' }}
            >
              &nbsp; ADD
            </Button>
          </>
        }
      ></CardHeader>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: 'gray' }}>
                Title
              </TableCell>
              <TableCell align="center" sx={{ color: 'gray' }}>
                Description
              </TableCell>
              <TableCell align="center" sx={{ color: 'gray' }}>
                Deadline
              </TableCell>
              <TableCell align="center" sx={{ color: 'gray' }}>
                Priority
              </TableCell>
              <TableCell align="center" sx={{ color: 'gray' }}>
                Is Complete
              </TableCell>
              <TableCell align="center" sx={{ color: 'gray' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default App;
