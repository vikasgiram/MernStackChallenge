import { useState,useEffect } from "react";
import { statistics } from "../utils/api";
import Card from 'react-bootstrap/Card';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import './Statistics.css';

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


export default function Statistics(){
    const [transactions,setTransactions]=useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [month, setMonth] = useState(3); // Default to March

    useEffect(() => {
        fetchTransactions();
      }, [month]);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await statistics(month);
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



  return (
    <div>
        <Card text="dark" className="card">
          <Card.Header>Statistics</Card.Header>
          <Card.Title> 
            <FormControl sx={{ m: 2, minWidth: 120 }}>
                <InputLabel>Month</InputLabel>
                <Select value={month} onChange={handleMonthChange} label="Month">
                {months.map((month) => (
                    <MenuItem key={month.value} value={month.value}>
                    {month.label}
                    </MenuItem>
                ))}
                </Select>
            </FormControl> 
          </Card.Title>
          <Card.Body>
            <Card.Text>
              <p>Total Sell Amount: {transactions.totalSaleAmount}<br></br>
              Total Sold Items: {transactions.totalSoldItems}<br></br>
              Total Not Sold Items: {transactions.totalNotSoldItems}<br></br>
              </p>
            </Card.Text>
          </Card.Body>
        </Card>

    </div>
  )
}

