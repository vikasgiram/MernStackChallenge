import React, { useState, useEffect } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, CircularProgress, Typography, TextField, MenuItem,
  Select, FormControl, InputLabel, TablePagination
} from '@mui/material';
import { listTransactions } from '../utils/api';

import './TransactionTable.css';

const columns = [
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 170, align: 'right' },
  { id: 'dateOfSale', label: 'Date of Sale', minWidth: 170, align: 'right' },
  { id: 'sold', label: 'Sold Status', minWidth: 170, align: 'right' },
];

const months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

export default function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [month, setMonth] = useState(3); // Default to March
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchTransactions();
  }, [month, search, page, rowsPerPage]);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listTransactions({ month, search, page: page + 1, perPage: rowsPerPage });
      setTransactions(data);
    } catch (error) {
      setError(error.message || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className='container' sx={{ width: '100%', overflow: 'hidden' }}>
      <FormControl sx={{ m: 2, minWidth: 120, bgcolor:'#76ABAE' }}>
        <InputLabel>Month</InputLabel>
        <Select value={month} onChange={handleMonthChange} label="Month">
          {months.map((month) => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        sx={{ m: 2, bgcolor:'#76ABAE'}}
        label="Search"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
      />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer sx={{ maxHeight: 700, bgcolor:'#76ABAE'}}>
          <Table stickyHeader aria-label="sticky table" className='transaction-table' >
            <TableHead className='table-head'>
              <TableRow sx={{bgcolor:"#76ABAE"}}>
                {columns.map((column) => (
                  <TableCell className='table-cell'
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow className='table-row' hover role="checkbox" tabIndex={-1} key={transaction._id}>
                  {columns.map((column) => {
                    let value = transaction[column.id];
                    if (column.id === 'sold') {
                      value = value ? 'Sold' : 'Unsold';
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </Paper>
  );
}
